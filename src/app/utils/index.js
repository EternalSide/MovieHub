import axios from "axios";

const moviesApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  params: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDYzNGNmNTM5NTAzYzg0Y2Y2ZTFmMTUyYTgxNTY5ZCIsInN1YiI6IjY0Nzc1NzNjMTJjNjA0MDEzZWQ5MTUzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MiSpprUoEpd5WV-yv_In0zzCiXWm1otsrBinRQgloaw",
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get("/authentication/token/new");
    const token = data.request_token;
    if (data.success) {
      console.log("Успех");
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log("Ошибка");
  }
};
