import { createStore } from 'vuex';

export default createStore({
  state: {
    pickedGender: null,
    cholesterol: null,
    ldl: null,
    hdl: null,
    triglycerides: null,
    selected: 'mg/dl'
  },
  mutations: {
    setFormData(state, data) {
      state.pickedGender = data.pickedGender;
      state.cholesterol = data.cholesterol;
      state.ldl = data.ldl;
      state.hdl = data.hdl;
      state.triglycerides = data.triglycerides;
      state.selected = data.selected;
    },
    setUnit(state, data) {
      state.selected = data.selected;
    }
  },
  actions: {
    updateFormData({ commit }, data) {
      commit('setFormData', data);
    },
    changeUnit({ commit }, data){
      commit('setUnit', data);
    },
  },
  getters: {
    getFormData(state) {
      return {
        pickedGender: state.pickedGender,
        cholesterol: state.cholesterol,
        ldl: state.ldl,
        hdl: state.hdl,
        triglycerides: state.triglycerides,
        selected: state.selected
      };
    }
  }
});
