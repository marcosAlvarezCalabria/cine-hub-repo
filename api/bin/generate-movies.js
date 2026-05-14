require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const DEFAULT_PAGES = 3;

const genreMap = require("../data/genres.json");

function parseNumberArg(flag, fallback) {
  const flagIndex = process.argv.indexOf(flag);

  if (flagIndex === -1) {
    return fallback;
  }

  const rawValue = process.argv[flagIndex + 1];
  const parsedValue = Number.parseInt(rawValue, 10);

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    throw new Error(`Invalid value for ${flag}: ${rawValue}`);
  }

  return parsedValue;
}

function buildRequestUrl(endpoint, params = {}) {
  const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  if (!process.env.TMDB_BEARER_TOKEN) {
    url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  }

  return url;
}

async function tmdbFetch(endpoint, params = {}) {
  const headers = {
    accept: "application/json",
  };

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

async function fetchCatalogPage(page) {
  const payload = await tmdbFetch("/discover/movie", {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page,
    sort_by: "popularity.desc",
    vote_count_gte: "250",
  });

  return payload.results || [];
}

async function fetchTrailerId(movieId) {
  const payload = await tmdbFetch(`/movie/${movieId}/videos`, {
    language: "en-US",
  });

  const trailer = (payload.results || []).find((video) => {
    return video.site === "YouTube" && video.type === "Trailer" && video.official;
  });

  const fallback = (payload.results || []).find((video) => {
    return video.site === "YouTube";
  });

  return trailer?.key || fallback?.key || null;
}

function normalizeMovie(movie, trailerId) {
  const genreIds = (movie.genre_ids || []).filter((genreId) => genreMap[String(genreId)]);

  if (!movie.poster_path || !movie.backdrop_path || genreIds.length === 0) {
    return null;
  }

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    popularity: movie.popularity,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    genreIds,
    posterURL: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,
    backdropURL: `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`,
    trailerId,
  };
}

async function main() {
  if (!process.env.TMDB_API_KEY && !process.env.TMDB_BEARER_TOKEN) {
    throw new Error("Set TMDB_API_KEY or TMDB_BEARER_TOKEN before running this script.");
  }

  const pages = parseNumberArg("--pages", DEFAULT_PAGES);
  const outputPath = path.join(__dirname, "..", "data", "movies.json");

  const catalogPages = await Promise.all(
    Array.from({ length: pages }, (_, index) => fetchCatalogPage(index + 1))
  );

  const rawMovies = catalogPages.flat();
  const uniqueMovies = Array.from(new Map(rawMovies.map((movie) => [movie.id, movie])).values());

  const normalizedMovies = [];

  for (const movie of uniqueMovies) {
    const trailerId = await fetchTrailerId(movie.id);
    const normalizedMovie = normalizeMovie(movie, trailerId);

    if (normalizedMovie) {
      normalizedMovies.push(normalizedMovie);
    }
  }

  await fs.writeFile(outputPath, `${JSON.stringify(normalizedMovies, null, 2)}\n`, "utf8");

  console.info(`Generated ${normalizedMovies.length} movies in ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
