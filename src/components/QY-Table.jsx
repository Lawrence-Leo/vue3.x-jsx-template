import { computed, reactive, ref, toRefs, watch, isVNode } from 'vue';
import FilterTool from './FilterTool';
import BaseTable from './BaseTable';
import ButtonGroup from './ButtonGroup';
import ButtonModal from './ButtonModal';

const QYTable = {
  name: 'QYTable',
  components: { FilterTool, BaseTable, ButtonGroup, ButtonModal },
  props: {
    queryApiHook: {
      type: Function,
      default: () => {},
      required: true,
    },
    formatParamsHook: {
      type: Function,
      default: () => {},
    },
    filterItems: {
      type: Function,
      default: () => {},
    },
    onSelectionChange: {
      type: Function,
      default: () => {},
    },
    filterItems: {
      type: Array,
      default: () => [],
      required: true,
    },
    filterBtn: {
      type: Object,
      default: () => ({}),
    },
    btnGroup: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  setup(props) {
    const {
      queryApiHook,
      formatParamsHook,
      onSelectionChange,
      filterItems,
      filterBtn,
      btnGroup,
      columns,
    } = props;

    const showBtnGroup = ref(false);

    const handleSelected = selected => {
      if (selected.length) {
        showBtnGroup.value = true;
        onSelectionChange(selected);
      } else {
        showBtnGroup.value = false;
      }
    };

    const dataSource = [
      {
        user: 'James',
        tel: '18081562260',
        addr: '四川省南充市',
      },
      {
        user: 'Jake',
        tel: '18081562261',
        addr: '四川省成都市',
      },
    ];

    return () => (
      <div class="app">
        <FilterTool
          gutter={20}
          queryApiHook={queryApiHook}
          formatParamsHook={formatParamsHook}
          filterItems={filterItems}
          btnConfig={filterBtn}
        />
        {btnGroup.length && (
          <Button-group
            v-show={showBtnGroup.value}
            gutter={10}
            btnList={btnGroup}
          />
        )}
        <BaseTable
          columns={columns}
          dataSource={dataSource}
          onSelectionChange={selected => handleSelected(selected)}
        ></BaseTable>
      </div>
    );
  },
};

export default QYTable;
