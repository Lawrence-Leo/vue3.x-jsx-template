import {
  defineComponent,
  ref,
  watch,
  Transition,
  provide,
  nextTick,
} from 'vue';
import './index.scss';
import SideBar from './sideBar';
import TagBar from './tagBar';
import MainView from './mainView';
import eventBus from '@/utils/eventBus';

const Layout = defineComponent(() => {
  const isShowMask = ref(false);
  const onPanel = ref(false);
  const onMenu = ref(false);
  const reload = ref(false);
  const timer = ref(null);
  provide('reload', () => {
    reload.value = true;
    nextTick(() => (reload.value = false));
  });
  eventBus.on('onPopPanel', val => (onPanel.value = val));
  eventBus.on('onMenu', val => (onMenu.value = val));
  watch([onPanel, onMenu], val => {
    const [$onPanel, $onMenu] = val;
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        if ($onPanel && !$onMenu) {
          isShowMask.value = true;
        }
        if (!$onPanel && $onMenu) {
          isShowMask.value = true;
        }
        if (!$onPanel && !$onMenu) {
          isShowMask.value = false;
        }
      }, 100);
    } else {
      timer.value = setTimeout(() => {
        if ($onPanel && !$onMenu) {
          isShowMask.value = true;
        }
        if (!$onPanel && $onMenu) {
          isShowMask.value = true;
        }
        if (!$onPanel && !$onMenu) {
          isShowMask.value = false;
        }
      }, 100);
    }
  });

  const render = () => (
    <el-container class="layout-container">
      <el-header class="main-container-header">
        <div class="header-title">VUE 3.x Custom Component Usage</div>
        <div class="user">
          <img class="avatar" src={require('@/assets/avatar.png')} />
        </div>
      </el-header>
      <el-container class="main-container">
        <el-aside class="layout-aside">
          <SideBar />
        </el-aside>
        <el-main class="main-container-body">
          <TagBar />
          {!reload.value && <MainView />}
        </el-main>
        <Transition name="fade">
          <div v-show={isShowMask.value} class="main-container-mask"></div>
        </Transition>
      </el-container>
    </el-container>
  );
  return render;
});

export default Layout;
