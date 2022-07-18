import { createStore } from "vuex";

export default createStore({
  state: {
    count: 1,
    showAdd: false,
    tags: ["Work", "Study", "Gym", "Urgent", "Important", "Other"],
  },
  getters: {},
  mutations: {
    aumentar() {
      this.state.count++;
    },
  },
  actions: {},
  modules: {},
});
