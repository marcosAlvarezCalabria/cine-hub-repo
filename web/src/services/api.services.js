import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response?.status === 401 &&
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function createUser(data) {
  return http.post("/user", data);
}

export function login(data) {
  return http.post("/login", data);
}

export function getUserProfile(data) {
  return http.get("/profile", data);
}

export function updateUser(data) {
  return http.patch("/profile", data);
}

export function logout() {
  return http.post("/logout");
}

export function getMovies(params) {
  return http.get("/movies", { params });
}

export function getMovieDetails(id) {
  return http.get(`/movies/${id}`);
}

export function createComment(data, movieId) {
  return http.post(`/movie/${movieId}/comments`, data);
}

export function removeFavorites(movieId, userId) {
  const data = {
    movieId: movieId,
  };

  return http.patch(`/user/favorites/${userId}/remove`, data);
}

export function deleteComment(id) {
  return http.delete(`/movie/${id}/comments`);
}
