import axios from "axios";



const http = axios.create({
    baseURL:"http://localhost:3000/api/v1"
});
//request interceptors
http.interceptors.request.use(function (config) {
    config.headers.authorization = `BEARER ${localStorage.getItem("token")}`
   return config
})
//response interceptors
http.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response?.status === 401 &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        // navigate refreshing page
        localStorage.removeItem("token");
        window.location.replace("/login");
      }
  
      return Promise.reject(error);
    }
  );
  
  

export function createUser(data) {
    return http.post("/user", data)
}
export function login(data) {
    return http.post("/login", data)
        .then((response) => {
            localStorage.setItem("token", response.data.accessToken)
            return response
        })
}

export function getUserProfile(data) {
   return http.get("/profile", data)
}

export function updateUser(data) {
  console.log(`update user y la data ${data.email}`)
  return http.patch("/profile", data)
}

export function logout() {
  localStorage.removeItem("token");
}

export function getMovies(params) {
  //console.log(params)
  return http.get("/movies", { params })

}
export function getMovieDetails(id){
 
  return http.get(`/movies/${id}`)
}

export function createComment(data, movieId) {
 // console.log(`esto es la data desde createComment ${data.comments}`)
  return http.post(`/movie/${movieId}/comments`,data)
}

export function removeFavorites(movieId,userId){
  //console.log(`esto es la data desde removeFavorites ${params}`)
  const data = {
    movieId:movieId
  }
  return http.patch(`/user/favorites/${userId}/remove`,data)
}
export function deleteComment(id){
  return http.delete(`/movie/${id}/comments`)
}
//router.delete("/movie/:id/comments", comments.delete)