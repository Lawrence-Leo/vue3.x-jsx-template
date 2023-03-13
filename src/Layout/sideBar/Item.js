import { defineComponent, ref, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import tagsViewStore from '@/store/tagsView';
import './item.scss';
import './item.modules.scss';

import eventBus from '@/utils/eventBus';

const SideBarItem = defineComponent((props, { attrs, emit, slots }) => {
  const { item } = props;
  const popRef = ref(null);
  const router = useRouter();
  const route = useRoute();
  const tagView = tagsViewStore();

  const handleClick = event => {
    if (event.target.tagName !== 'LI') {
      return;
    }
    popRef.value.popperRef.contentRef.style = 'display:none';
    router.push(event.target.dataset.url).then(() => {
      tagView.addVisitedView(route);
      tagView.addCurrentView(route);
    });
  };

  const render = () => (
    <el-popover
      ref={popRef}
      placement="right"
      width={200}
      open-delay={100}
      close-delay={0}
      offset={10}
      popper-class="z-index: 9999"
      trigger="hover"
    >
      {{
        default: () => {
          return (
            <div
              class="pop-panel"
              onClick={e => handleClick(e)}
              onMouseenter={() => eventBus.emit('onPopPanel', true)}
              onMouseleave={() => {
                eventBus.emit('onPopPanel', false);
              }}
            >
              {item.children?.map(child => (
                <>
                  {child.name && <p class="second-menu-title">{child.name}</p>}
                  {child.children?.length && (
                    <ul class="second-menu-item-wrap">
                      {child.children?.map(i => (
                        <li class="second-menu-item" data-url={i.path}>
                          {i.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ))}
            </div>
          );
        },
        reference: () => (
          <div class="first-menu-title">
            <i
              class={'iconfont icon-' + item?.icon}
              style="margin-right: 6px;font-size: 20px;"
            ></i>
            {item.name}
          </div>
        ),
      }}
    </el-popover>
  );
  return render;
});

SideBarItem.props = {
  item: {
    type: Object,
  },
};

export default SideBarItem;
