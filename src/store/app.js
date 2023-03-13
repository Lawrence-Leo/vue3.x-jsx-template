import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("app", () => {
  const state = reactive({
    sidebar: {
      opened: localStorage.getItem('sidebarStatus')
        ? !!+localStorage.getItem('sidebarStatus')
        : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    size: localStorage.getItem('size') || 'medium',
  });

  const sidebar = computed(() => state.sidebar);

  const size = computed(() => state.size)

  const device = computed(() => state.device)

  const toggleSideBar = function () {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      localStorage.setItem("sidebarStatus", 1);
    } else {
      localStorage.setItem('sidebarStatus', 0);
    }
  };

  const closeSideBar = function (withoutAnimation) {
    localStorage.setItem('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  };

  const toggleDevice = function (device) {
    state.device = device;
  };

  const setSize = function (size) {
    state.size = size;
    localStorage.setItem('size', size);
  };

  return {
    state,
    sidebar,
    size,
    device,
    toggleSideBar,
    closeSideBar,
    toggleDevice,
    setSize,
  };
});
