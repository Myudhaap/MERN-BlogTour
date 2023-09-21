import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formdata) => {
  return API.post("users/signin", formdata);
};

export const signUp = (formData) => {
  return API.post("users/signup", formData);
};

export const createTour = (tourData) => {
  return API.post("/tour", tourData);
};

export const getTours = (page) => API.get(`/tour?page=${page}`);

export const getTour = (id) => API.get(`/tour/${id}`);

export const getToursByUser = (id) => API.get(`/tour/userTours/${id}`);

export const deleteTour = (id) => API.delete(`/tour/${id}`);

export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData);

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getToursByTag = (tag) => API.get(`/tour/tag/${tag}`);

export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);

export const likeTour = (id) => API.patch(`/tour/like/${id}`);
