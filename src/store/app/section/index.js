import sectionService from "../../../services/sections.service";

export default {
  state: {
    sections: [],
  },

  //********************************************************************GETTERS*****************************************************************************************
  //********************************************************************************************************************************************************************

  getters: {
    allSections: (state) => state.sections,
    // unconfirmedDeposits: (state) => {
    //   return [
    //     state.sections
    //       .filter((t) => t.CheckerID == 0)
    //       .filter((t) => t.TransactionCodeID == 1),
    //     [(state.sections.title = "Contributions")],
    //   ];
    // },
  },

  //********************************************************************ACTIONS*****************************************************************************************
  //********************************************************************************************************************************************************************

  actions: {
    // sections actions

    createSection({ commit }, data) {
      return sectionService.create(data).then(
        (response) => {
          commit("newSection", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    getAllSections({ commit }) {
      return sectionService.getAll().then(
        (response) => {
          commit("setSections", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    updateSection({ commit }, data) {
      return sectionService.update(data.SectionID, data).then(
        (response) => {
          commit("updSection", data);
          return Promise.resolve(response);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    deleteSection({ commit }, data) {
      return sectionService.delete(data.SectionID).then(
        (response) => {
          commit("dltSection", data);
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
    // Section EVENTS

    setSections: (state, sections) =>
      (state.sections = sections),
    newSection: (state, newSection) =>
      state.sections.unshift(newSection.section),
    updSection: (state, updatedSection) => {
      const index = state.sections.findIndex(
        (c) => c.SectionID === updatedSection.SectionID
      );
      if (index !== -1) {
        state.sections.splice(index, 1, updatedSection);
      }
    },
    dltSection: (state, Section) => {
      const index = state.sections.findIndex(
        (c) => c.SectionID === Section.SectionID
      );
      if (index !== -1) {
        state.sections.splice(index, 1);
      }
    },
  },
};
