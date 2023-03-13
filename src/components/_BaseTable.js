import { toRef, ref } from 'vue';

const BaseTable = {
  name: 'BaseTable',
  components: {},
  props: {
    tableData: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    header: {
      type: Object,
    },
  },
  setup(props, context) {
    const tableData = toRef(props, 'tableData');
    const { columns, header } = props;
    const isShowBtns = ref(false);
    const selectedRows = ref([]);

    header.children.forEach(item => {
      const cb = item.props['onClick'];
      item.props['onClick'] = () => cb(selectedRows.value);
    });

    const handleSelectionChange = selected => {
      selected.length > 0
        ? (isShowBtns.value = true)
        : (isShowBtns.value = false);
      selectedRows.value = selected;
    };

    return () => (
      <div class="baseTable">
        <el-row style="height:32px">
          <el-col v-show={isShowBtns.value}>{header}</el-col>
        </el-row>
        <el-table
          data={tableData.value}
          {...context.attrs}
          onSelectionChange={handleSelectionChange}
        >
          {columns.map(({ dateIndex, title, render, ...rest }) => (
            <el-table-column prop={dateIndex} label={title} {...rest}>
              {{ default: render }}
            </el-table-column>
          ))}
        </el-table>
      </div>
    );
  },
};

export default BaseTable;
