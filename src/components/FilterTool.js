import styles from './FilterTool.modules.scss';
import {
  toRef,
  h,
  reactive,
  watch,
  ref,
  computed,
  withModifiers,
  onMounted,
} from 'vue';
import ButtonGroup from './ButtonGroup';
const FilterTool = {
  props: {
    leftSpan: {
      type: Number,
      default: 19,
    },
    rightSpan: {
      type: Number,
      default: 4,
    },
    filterItems: {
      type: Array,
    },
    formatParamsHook: {
      type: Function,
    },
    queryApiHook: {
      type: Function,
    },
    onPanelOpen: {
      type: Function,
      default: () => {}
    },
    btnConfig: {
      type: Object,
    },
  },
  component: { ButtonGroup },
  setup(props, context) {
    const filterItems = toRef(props, 'filterItems');
    const {
      formatParamsHook,
      queryApiHook,
      btnConfig,
      leftSpan,
      rightSpan,
      onPanelOpen,
    } = props;
    // collection state
    const filterState = ref({});
    if (!filterItems.value.length) {
      return;
    }
    let allSpan = 0;
    let scrollHeight = 0;
    const isOpen = ref(false);
    const $scrollHeight = ref(32);
    onMounted(
      () => (scrollHeight = document.querySelector('#filterTool').scrollHeight)
    );
    const filterList = filterItems.value.map(item => {
      const { value, component, field, ...rest } = item;
      filterState.value[field] = value;
      allSpan += rest.span;
      // generate render function
      return {
        renderComponent: () => {
          const { type } = component;
          // v-modal
          const $props = {
            modelValue: filterState.value[item.field],
            'onUpdate:modelValue': value => {
              filterState.value[item.field] = value;
            },
          };

          if (type.name !== 'ElInput') {
            $props['onChange'] = () => handleSearch();
          }
          // https://github.com/vuejs/babel-plugin-jsx
          // if (type.name === 'ElInput') {
          //   // .enter 修饰符
          //   $props['onChange'] = withModifiers(() => handleSearch(), ['enter']);
          // }
          return h(component, $props);
        },
        ...rest,
      };
    });

    const btnList = [
      {
        type: 'primary',
        name: '查 询',
        onClick: () => handleSearch(),
        ...btnConfig.search,
      },
      {
        type: 'default',
        name: '重 置',
        onClick: () => reset(),
        ...btnConfig.reset,
      },
    ];

    const PreHandleParams = query => {
      const $query = {};
      for (let key in query) {
        if (typeof query[key] === 'string') {
          $query[key] = query[key].trim();
        } else {
          $query[key] = query[key];
        }
      }
      return $query;
    };

    const handleSearch = () => {
      const formatState = formatParamsHook(PreHandleParams(filterState.value));
      queryApiHook(formatState);
    };

    const reset = () => {
      filterItems.value.forEach(
        ({ value, field }) => (filterState.value[field] = value)
      );
    };
    const openCollapsePanel = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value){
        $scrollHeight.value = scrollHeight;
        onPanelOpen(scrollHeight-32);
      } else {
         $scrollHeight.value = 32
         onPanelOpen(0);
      }
    };
    return () => {
      const isCollapse = allSpan - 24;
      return (
        <div
          id="filterTool"
          class={styles['filter-tool']}
          style={{
            height: $scrollHeight.value + 'px',
          }}
        >
          <el-row justify="space-between">
            <el-col span={leftSpan} style="flex-wrap:wrap">
              <el-row gutter={20}>
                {filterList.map(item => (
                  <el-col span={item.span} class={styles['filter-item']}>
                    {item.label && (
                      <span
                        class={styles['filter-item-label']}
                        style={{ width: item.labelWidth + 'px' }}
                      >
                        {item.label}
                      </span>
                    )}
                    {item.renderComponent?.()}
                  </el-col>
                ))}
              </el-row>
            </el-col>
            <el-col span={rightSpan}>
              <el-row justify="space-between">
                {isCollapse && (
                  <el-link
                    underline={false}
                    onClick={() => openCollapsePanel()}
                  >
                    {isOpen.value ? '关闭' : '展开'}
                  </el-link>
                )}
                <ButtonGroup gutter={10} btnList={btnList} />
              </el-row>
            </el-col>
          </el-row>
        </div>
      );
    };
  },
};

export default FilterTool;
