import axios from "axios";

axios.defaults.headers.common = {
  "Content-Type": "application/json",
};

export const login = async (userid, password) => {
  return axios
    .post("/api/login", {
      login_id: userid,
      password: password,
    })
    .then((response) => {
      if (response.data.user && response.data.jwt) {
        localStorage.setItem("token", response.data.jwt);
        return {
          user: response.data.user,
          success: response.data.success,
        };
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const autoLogin = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return await axios
      .post(
        "/api/check_auth",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (!response.data.error) {
          return response.data;
        }
      });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const checkScreenNameAvailability = async (screen_name) => {
  return axios
    .post("/api/users/check_screen_name_availability", {
      screen_name,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createUser = async (
  name,
  phone,
  email,
  screen_name,
  password,
  passwordConfirmation
) => {
  return axios
    .post("/api/users", {
      user: {
        screen_name,
        name,
        phone,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    })
    .then((response) => {
      localStorage.setItem("token", response.data.jwt);
      return response.data.user;
    })
    .catch((error) => {
      console.log(error);
    });
};
