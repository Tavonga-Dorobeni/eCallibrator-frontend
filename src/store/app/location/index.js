import locationService from "../../../services/locations.service";

export default {
  state: {
    locations: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allLocations: (state) => state.locations,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.locations
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.locations.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // locations actions

    createLocation({ commit }, data) {
      return locationService.create(data).then(
        (response) => {
          commit("newLocation", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllLocations({ commit }) {
      return locationService.getAll().then(
        (response) => {
          commit("setLocations", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateLocation({ commit }, data) {
      return locationService.update(data.LocationID, data).then(
        (response) => {
          commit("updLocation", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteLocation({ commit }, data) {
      return locationService.delete(data.LocationID).then(
        (response) => {
          commit("dltLocation", data);
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
    // Location EVENTS

    setLocations: (state, locations) =>
      (state.locations = locations),
    newLocation: (state, newLocation) =>
      state.locations.unshift(newLocation.location),
    updLocation: (state, updatedLocation) => {
      const index = state.locations.findIndex(
        (c) => c.LocationID === updatedLocation.LocationID
      );
      if (index !== -1) {
        state.locations.splice(index, 1, updatedLocation);
      }
    },
    dltLocation: (state, Location) => {
      const index = state.locations.findIndex(
        (c) => c.LocationID === Location.LocationID
      );
      if (index !== -1) {
        state.locations.splice(index, 1);
      }
    },
  },
};
