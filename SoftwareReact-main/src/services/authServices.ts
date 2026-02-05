import axios from "axios";
import login from "../components/login";

const API_URL = "http://localhost:3000/api/auth";

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};