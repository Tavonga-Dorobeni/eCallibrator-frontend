import userService from "../../../services/user.service";

export default {
  state: {
    users: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allusers: (state) => state.users,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.users
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.users.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // users actions

    createUser({ commit }, data) {
      return userService.create(data).then(
        (response) => {
          commit("newUser", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllusers({ commit }) {
      return userService.getAll().then(
        (response) => {
          commit("setusers", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateUser({ commit }, data) {
      return userService.update(data.id, data).then(
        (response) => {
          commit("updUser", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteUser({ commit }, data) {
      return userService.delete(data.id).then(
        (response) => {
          commit("dltUser", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },

  //********************************************************************MUTATIONS***************************************************************************************
  //********************************************************************************************************************************************************************
  mutations: {
    // User EVENTS

    setusers: (state, users) => (state.users = users),
    newUser: (state, newUser) => state.users.unshift(newUser.data),
    updUser: (state, updatedUser) => {
      const index = state.users.findIndex(
        (c) => c.id === updatedUser.id
      );
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    dltUser: (state, User) => {
      const index = state.users.findIndex((c) => c.id === User.id);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
  },
};
