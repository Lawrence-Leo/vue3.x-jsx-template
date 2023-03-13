import { toRefs, defineComponent } from 'vue';

const noEmpty = o => Object.keys(o).length;

const BaseTable = defineComponent((props, context) => {
  const { columns, tableData } = toRefs(props);
  const render = () => (
    <el-table
      data={tableData.value}
      style="width: 100%"
      {...context.attrs}
    >
      {columns?.value?.map(item => {
        let $component = null;
        const $slots = {};
        if (item.render) {
          const values = Object.values(item.render);
          if (values.length) {
            if (values.every(fn => typeof fn === 'function')) {
              for (let key in item.render) {
                $slots[key] = scope => item.render[key](scope);
              }
            }
          }
        }
        if (noEmpty($slots)) {
          $component = (
            <el-table-column
              type={item.type}
              label={item.label}
              prop={item.dataIndex}
              width={item.labelWidth}
              {...item}
            >
              {$slots}
            </el-table-column>
          );
        } else if (item.render) {
          $component = (
            <el-table-column
              type={item.type}
              label={item.label}
              prop={item.dataIndex}
              width={item.labelWidth}
              {...item}
            >
              {scope => item.render(scope)}
            </el-table-column>
          );
        } else {
          $component = (
            <el-table-column
              type={item.type}
              label={item.label}
              prop={item.dataIndex}
              width={item.labelWidth}
              {...item}
            />
          );
        }
        return $component;
      })}
    </el-table>
  );
  return render;
});

BaseTable.name = 'BaseTable';
BaseTable.props = {
  columns: {
    type: Array,
    default: () => [],
  },
  tableData: Array,
  default: () => [],
};

export default BaseTable;
