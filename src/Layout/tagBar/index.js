import {
  defineComponent,
  computed,
  reactive,
  watch,
  ref,
  withModifiers,
  onMounted,
  inject,
  nextTick,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import tagsViewStore from '@/store/tagsView';
import './index.scss';

const tagBar = defineComponent(() => {
  const tagViewList = ref([]);
  const currentTag = ref('');
  const selectView = ref({});
  const scrollPaneRef = ref(null);
  const showMenu = ref(false);
  const menu = reactive({ left: 0, top: 0 });
  const tagView = tagsViewStore();
  const router = useRouter();
  const route = useRoute();
  const reload = inject('reload');
  let mainOffset, mainTop;
  watch(tagView.visitedViews, () => (tagViewList.value = tagView.visitedViews));
  watch(
    () => tagView.currentView,
    () => (currentTag.value = tagView.currentView.meta.title),
    { deep: true }
  );
  onMounted(() => {
    const { left, top } = document
      .querySelector('.el-main')
      ?.getBoundingClientRect() || {}
    mainTop = top;
    mainOffset = left;
  });
  const toLastView = visitedViews => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      router.push(latestView.fullPath);
    }
  };
  const openMenu = (view, event) => {
    selectView.value = view;
    menu.left = event.clientX - mainOffset;
    menu.top = event.clientY - mainTop + 20;
    showMenu.value = true;
  };
  const handleMenuClick = event => {
    if (event.target.innerText == '刷新') {
      showMenu.value = false;
      reload();
    }
    if (event.target.innerText == '关闭') {
      tagView.delView(selectView.value).then(({ visitedViews }) => {
        toLastView(visitedViews);
        showMenu.value = false;
      });
    }
    if (event.target.innerText == '关闭其他') {
      router.push(selectView.value.path);
      tagView.delOthersViews(selectView.value);
    }
    if (event.target.innerText == '关闭所有') {
    }
  };
  const handleTagClick = view => {
    router.push({ path: view.path });
    tagView
      .addCurrentView(view)
      .then(() => (currentTag.value = view.meta.title));
  };
  const render = () => (
    <el-scrollbar ref={scrollPaneRef} style="height:40px;overflow:visible">
      <ul class="tagBar-wrap">
        {tagViewList.value?.map(v => (
          <li
            class="tagBar-item"
            style={{
              backgroundColor:
                currentTag.value == v.meta.title ? '#BD93F9' : '#fff',
              color: currentTag.value == v.meta.title ? '#fff' : '#000',
            }}
            onClick={() => handleTagClick(v)}
            onContextmenu={withModifiers(
              $event => openMenu(v, $event),
              ['prevent', 'native']
            )}
          >
            {v.meta.title}
          </li>
        ))}
      </ul>
      <ul
        v-show={showMenu.value}
        class="context-menu"
        style={{ left: menu.left + 'px', top: menu.top + 'px' }}
        onClick={event => handleMenuClick(event)}
        onMouseleave={() => (showMenu.value = false)}
      >
        <li class="context-menu-item">刷新</li>
        <li class="context-menu-item">关闭</li>
        {/* <li class="context-menu-item">关闭其他</li>
        <li class="context-menu-item">关闭所有</li> */}
      </ul>
    </el-scrollbar>
  );
  return render;
});

export default tagBar;
