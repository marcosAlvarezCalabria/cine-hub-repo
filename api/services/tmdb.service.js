const localMovies = require("../data/movies.json");
const genreMap = require("../data/genres.json");

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function hasTmdbCredentials() {
  return Boolean(process.env.TMDB_BEARER_TOKEN || process.env.TMDB_API_KEY);
}

function listLocalMovies(genreName) {
  return localMovies
    .map((movie) => normalizeMovie(movie))
    .filter((movie) => !genreName || movie.genres.includes(genreName));
}

function getLocalMovieById(movieId) {
  const localMovie = localMovies.find((movie) => movie.id === movieId);
  return localMovie ? normalizeMovie(localMovie) : null;
}

function buildRequestUrl(endpoint, params = {}) {
  const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  if (!process.env.TMDB_BEARER_TOKEN && process.env.TMDB_API_KEY) {
    url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  }

  return url;
}

async function tmdbFetch(endpoint, params = {}) {
  const headers = { accept: "application/json" };

  if (process.env.TMDB_BEARER_TOKEN) {
    headers.Authorization = `Bearer ${process.env.TMDB_BEARER_TOKEN}`;
  }

  const response = await fetch(buildRequestUrl(endpoint, params), { headers });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`TMDB request failed for ${endpoint}: ${response.status} ${errorBody}`);
  }

  return response.json();
}

function normalizeMovie(movie, trailerId = null) {
  const normalizedGenres = movie.genre_ids
    ? movie.genre_ids.map((genreId) => genreMap[String(genreId)]).filter(Boolean)
    : (movie.genres || [])
        .map((genre) => (typeof genre === "string" ? genre : genre.name?.toLowerCase()))
        .filter(Boolean);

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date || movie.releaseDate,
    popularity: movie.popularity,
    voteAverage: movie.vote_average || movie.voteAverage,
    voteCount: movie.vote_count || movie.voteCount,
    genres: normalizedGenres,
    posterURL: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : movie.posterURL,
    backdropURL: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : movie.backdropURL,
    trailerId: trailerId || movie.trailerId || null,
  };
}

async function fetchTrailerId(movieId) {
  const payload = await tmdbFetch(`/movie/${movieId}/videos`, { language: "en-US" });
  const videos = payload.results || [];
  const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official);
  const fallback = videos.find((video) => video.site === "YouTube");

  return trailer?.key || fallback?.key || null;
}

async function resolveGenreByName(genreName) {
  const payload = await tmdbFetch("/genre/movie/list", { language: "en-US" });
  const genres = payload.genres || [];
  return genres.find((genre) => genre.name.toLowerCase() === genreName.toLowerCase()) || null;
}

async function listMoviesByGenre(genreName) {
  if (!hasTmdbCredentials()) {
    return listLocalMovies(genreName);
  }

  try {
    const params = {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
      vote_count_gte: "250",
    };

    let payload = await tmdbFetch("/discover/movie", params);

    if (genreName) {
      const matchingGenre = await resolveGenreByName(genreName);

      if (!matchingGenre) {
        return [];
      }

      payload = await tmdbFetch("/discover/movie", {
        ...params,
        with_genres: matchingGenre.id,
      });
    }

    return Promise.all(
      (payload.results || []).map(async (movie) => {
        const trailerId = await fetchTrailerId(movie.id);
        return normalizeMovie(movie, trailerId);
      })
    );
  } catch (error) {
    console.warn(`Falling back to local movies catalog: ${error.message}`);
    return listLocalMovies(genreName);
  }
}

async function getMovieById(movieId) {
  const numericMovieId = Number.parseInt(movieId, 10);

  if (Number.isNaN(numericMovieId)) {
    return null;
  }

  if (!hasTmdbCredentials()) {
    return getLocalMovieById(numericMovieId);
  }

  try {
    const movie = await tmdbFetch(`/movie/${numericMovieId}`, { language: "en-US" });
    const trailerId = await fetchTrailerId(numericMovieId);
    return normalizeMovie(movie, trailerId);
  } catch (error) {
    console.warn(`Falling back to local movie detail: ${error.message}`);
    return getLocalMovieById(numericMovieId);
  }
}

module.exports = {
  getMovieById,
  hasTmdbCredentials,
  listMoviesByGenre,
};
