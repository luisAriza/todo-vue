import { createStore } from "vuex";

export default createStore({
  state: {
    user: localStorage.getItem("user"),
    showAdd: false,
    tags: ["Work", "Study", "Gym", "Urgent", "Important", "Other"],
  },
  getters: {},
  mutations: {
    showAdd() {
      this.state.showAdd = !this.state.showAdd;
    },
  },
  actions: {},
  modules: {},
});
