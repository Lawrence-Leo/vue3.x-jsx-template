import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SideBarItem from './Item';
import eventBus from '@/utils/eventBus';
import { routes } from '@/router';
import './index.module.scss';

function genMenuItem(routes) {
  const genItem = function (route) {
    let item = null;
    if (route.children) {
      const { children, ...rest } = route;
      item = { ...rest };
      const $children = children?.map?.(item => genItem(item));
      item.children = $children;
    } else {
      item = { ...route };
    }
    return item;
  };
  const a = routes.map(ab => {
    return genItem(ab);
  });
  return a;
}

const SideBar = defineComponent(() => {
  routes.shift();
  const res = genMenuItem(routes);
  const route = useRoute();
  console.log('path');
  const active = computed(() => {
    const arr = route.path.split('/');
    return '/' + arr[1];
  });
  const render = () => (
    <el-scrollbar>
      <el-menu
        default-active={active.value}
        onMouseenter={() => eventBus.emit('onMenu', true)}
        onMouseleave={() => eventBus.emit('onMenu', false)}
      >
        {res.map((item, index) => (
          <el-menu-item index={item.path}>
            <SideBarItem item={item} />
          </el-menu-item>
        ))}
      </el-menu>
    </el-scrollbar>
  );
  return render;
});

export default SideBar;
