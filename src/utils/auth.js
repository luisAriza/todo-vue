import axios from "axios";
import Cookies from "js-cookie";

const ENDPOINT_PATH = "https://jsonplaceholder.typicode.com/users/1";

export default {
  setUserLogged(userLogged) {
    return Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  deleteUserLogged() {
    Cookies.remove("userLogged");
  },
  register(email, password) {
    const user = { email: email, website: password };
    return axios.post(ENDPOINT_PATH, user);
  },
  login(email, password) {
    const user = { email: email, website: password };
    return axios.post(ENDPOINT_PATH, user);
  },
};
