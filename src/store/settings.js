import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import variables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export default defineStore("settings", () => {
  const state = reactive({
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
  });

  const changeSetting = function ({ key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  };

  return {
    state,
    changeSetting,
  };
});
