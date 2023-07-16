import toolService from "../../../services/tools.service";

export default {
  state: {
    tools: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allTools: (state) => state.tools,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.tools
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.tools.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // tools actions

    createTool({ commit }, data) {
      return toolService.create(data).then(
        (response) => {
          commit("newTool", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllTools({ commit }) {
      return toolService.getAll().then(
        (response) => {
          commit("setTools", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateTool({ commit }, data) {
      return toolService.update(data.ToolID, data).then(
        (response) => {
          commit("updTool", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteTool({ commit }, data) {
      return toolService.delete(data.ToolID).then(
        (response) => {
          commit("dltTool", data);
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
    // Tool EVENTS

    setTools: (state, tools) =>
      (state.tools = tools),
    newTool: (state, newTool) =>
      state.tools.unshift(newTool.tool),
    updTool: (state, updatedTool) => {
      const index = state.tools.findIndex(
        (c) => c.ToolID === updatedTool.ToolID
      );
      if (index !== -1) {
        state.tools.splice(index, 1, updatedTool);
      }
    },
    dltTool: (state, Tool) => {
      const index = state.tools.findIndex(
        (c) => c.ToolID === Tool.ToolID
      );
      if (index !== -1) {
        state.tools.splice(index, 1);
      }
    },
  },
};
