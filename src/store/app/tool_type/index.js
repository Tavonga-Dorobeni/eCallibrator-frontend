import tool_typeService from "../../../services/tool_types.service";

export default {
  state: {
    tool_types: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allToolTypes: (state) => state.tool_types,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.tool_types
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.tool_types.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // tool_types actions

    createToolType({ commit }, data) {
      return tool_typeService.create(data).then(
        (response) => {
          commit("newToolType", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllToolTypes({ commit }) {
      return tool_typeService.getAll().then(
        (response) => {
          commit("setToolTypes", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateToolType({ commit }, data) {
      return tool_typeService.update(data.ToolTypeID, data).then(
        (response) => {
          commit("updToolType", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteToolType({ commit }, data) {
      return tool_typeService.delete(data.ToolTypeID).then(
        (response) => {
          commit("dltToolType", data);
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
    // ToolType EVENTS

    setToolTypes: (state, tool_types) =>
      (state.tool_types = tool_types),
    newToolType: (state, newToolType) =>
      state.tool_types.unshift(newToolType.tool_type),
    updToolType: (state, updatedToolType) => {
      const index = state.tool_types.findIndex(
        (c) => c.ToolTypeID === updatedToolType.ToolTypeID
      );
      if (index !== -1) {
        state.tool_types.splice(index, 1, updatedToolType);
      }
    },
    dltToolType: (state, ToolType) => {
      const index = state.tool_types.findIndex(
        (c) => c.ToolTypeID === ToolType.ToolTypeID
      );
      if (index !== -1) {
        state.tool_types.splice(index, 1);
      }
    },
  },
};
