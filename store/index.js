import axios from "axios";
import Cookies from "js-cookie";

//state
export const state = () => ({
  // recipes: [
  //   {
  //     id: 1,
  //     recipeImage: "https://i.ibb.co/SBsMYNC/Rendang.jpg",
  //     recipeTitle: "Rendang",
  //     likes: 100,
  //     body: "Rendang Recipe",
  //   },
  //   {
  //     id: 2,
  //     recipeImage: "https://i.ibb.co/MRNhgzW/Tomyam.jpg",
  //     recipeTitle: "Tomyam",
  //     likes: 40,
  //     body: "Tomyam Recipe",
  //   },
  //   {
  //     id: 3,
  //     recipeImage: "https://i.ibb.co/CW4tVvp/Spaghetti-aglioo-o-lio.jpg",
  //     recipeTitle: "Spagethi Aglio Olio",
  //     likes: 200,
  //     body: "Spagethi Aglio Olio Recipe",
  //   },
  //   {
  //     id: 4,
  //     recipeImage: "https://i.ibb.co/z7zRVxV/Spaghetti-Carbonara.jpg",
  //     recipeTitle: "Spagethi Carbonara",
  //     likes: 200,
  //     body: "Spagethi Carbonara Recipe",
  //   },
  //   {
  //     id: 5,
  //     recipeImage: "https://i.ibb.co/Cn1XPNB/Kimchi.jpg",
  //     recipeTitle: "Kimchi",
  //     likes: 10,
  //     body: "Kimchi Recipe",
  //   },
  // ],
  recipes: [],
  token: null,
  userData: null,
});
// getter
export const getters = {
  recipeData(state) {
    return state.recipes; // getter untuk di panggil oleh commponent atau function untuk mendapatkan data.
  },
  lastIdRecipe(state) {
    let recipesLength = state.recipes.length;
    return state.recipes[recipesLength - 1].id;
  },
  detailRecipe: (state) => (id) => {
    return state.recipes.find((recipe) => recipe.id === id);
  },
  isAuthenticated(state) {
    return state.token != null;
  },
  userId(state) {
    return state.userData.userId;
  },
};
//mutations

export const mutations = {
  addNewRecipe(state, payload) {
    return state.recipes.push(payload);
  },
  setRecipe(state, payload) {
    state.recipes = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setUserData(state, payload) {
    state.userData = payload;
  },
};

// actions
export const actions = {
  nuxtServerInit({ commit }) {
    return axios
      .get(
        "https://bootcamp-timedoor-vuejs-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      )
      .then((response) => {
        const recipeArray = [];
        for (const key in response.data) {
          recipeArray.push({ ...response.data[key], id: key });
        }
        commit("setRecipe", recipeArray);
      })
      .catch((e) => context.error(e));
  },
  addRecipe({ commit, state }, recipe) {
    return axios
      .post(
        "https://bootcamp-timedoor-vuejs-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json?auth=" +
          state.token,
        { ...recipe, userId: state.userData.userId }
      )
      .then((response) => {
        commit("addNewRecipe", { ...recipe, userId: state.userData.userId });
        alert("RESEP BERHASIL DITAMBAHKAN!!!");
      });
  },
  authenticateUser({ commit }, authData) {
    let webAPIKey = "AIzaSyDOMzLV3S9yuKCl3NocmM0pm63Dou0Xyqw";
    let authUrl = authData.isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    return axios
      .post(authUrl + webAPIKey, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        displayName: authData.displayName,
      })
      .then((response) => {
        // console.log(response);
        commit("setToken", response.data.idToken);
        commit("setUserData", {
          username: response.data.displayName,
          userId: response.data.localId,
          email: response.data.email,
        });
        console.log(authData);
        localStorage.setItem("token", response.data.idToken);
        Cookies.set("jwt", response.data.idToken);
        const userData = {
          username: response.data.displayName,
          userId: response.data.localId,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        Cookies.set("acc_user", JSON.stringify(userData));
        // localStorage.setItem("token", response.data.idToken);
        // Cookies.set("jwt", response.data.idToken);
        // alert("SUKSES!!!!");
      })
      .catch((error) => console.log(error));
  },
  initAuth({ commit }, req) {
    let user;
    let token;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));
      const accUserCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("acc_user="));

      const userCookie = accUserCookie.substr(accUserCookie.indexOf("=") + 1);
      user = JSON.parse(decodeURIComponent(userCookie));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    } else {
      token = localStorage.getItem("token");
      user = JSON.parse(localStorage.getItem("user"));
    }
    commit("setToken", token);
    commit("setUserData", user);
  },

  logout({ commit }) {
    commit("setToken", null);
    Cookies.remove("jwt");
    Cookies.remove("acc_user");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
};
