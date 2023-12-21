export const state = () => ({
    isLoggedIn: !!localStorage.getItem("token"),
  });

export const mutations = {
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
  };
  
  