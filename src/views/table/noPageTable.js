import { defineComponent, ref } from 'vue';
import BaseTable from '@/components/BaseTable';

const noPageTable = defineComponent(() => {
  const tableData = ref([]);
  tableData.value = new Array(20).fill(0).map(() => {
    return {
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 8,
      lesson: ['js从入门到入土', 'js函数式编程'],
      result: 19,
      user: '吴亦凡',
      learnCode: '2013145200',
    };
  });
  const columns = [
    {
      type: 'selection',
      labelWidth: 40,
    },
    {
      label: '用户',
      dataIndex: 'user',
      labelWidth: 100,
      render: scope => (
        <span style="color:#f40;cursor:pointer">{scope.row.user}</span>
      ),
    },
    {
      label: '学号',
      dataIndex: 'learnCode',
      labelWidth: 110,
    },
    {
      label: '学习课程',
      dataIndex: 'lesson',
      showOverflowTooltip: true,
      render: scope => <span>{scope.row.lesson.join('、')}</span>,
    },
    {
      label: '学习时间/天',
      dataIndex: 'learnTime',
      labelWidth: 160,
      render: {
        default: scope => <span>{scope.row.learnTime + '/h'}</span>,
        header: () => <span>{'学习时间/天' + '🤣🤣🤣'}</span>,
      },
    },
    {
      label: '学习成绩',
      dataIndex: 'result',
      labelWidth: 120,
      render: {
        default: scope => (
          <span style="font-weight:bold">{scope.row.result}</span>
        ),
        header: () => <span>{'🤣' + '学习成绩' + '🤣'}</span>,
      },
    },
    {
      label: '学习成绩',
      dataIndex: 'result',
      labelWidth: 80,
    },
    {
      label: '开始时间',
      dataIndex: 'startDate',
      labelWidth: 180,
    },
    {
      label: '完成时间',
      dataIndex: 'endDate',
      labelWidth: 180,
    },
  ];
  const load = () => {
    const array = new Array(20).fill(0).map(() => ({
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 8,
      lesson: ['js从入门到入土', 'js函数式编程'],
      result: 19,
      user: '吴亦凡',
    }));
    tableData.value = [...tableData.value, ...array];
  };
  const render = () => (
    <>
      <BaseTable
        v-el-table-infinite-scroll={load}
        infinite-scroll-disabled={false}
        tableData={tableData}
        columns={columns}
        height={400}
      />
    </>
  );
  return render;
});

noPageTable.name = 'noPageTable';

export default noPageTable;
