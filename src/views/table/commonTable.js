import { defineComponent,ref,computed } from 'vue';
import BaseTable from '@/components/BaseTable';
import ButtonModal from '@/components/ButtonModal';
import FilterTool from '@/components/FilterTool';

const commonTableDemo = defineComponent(() => {
  const panelH = ref(0)
  const tableHeight = computed(() => window.innerHeight - 174 - panelH.value);
  // const tableData = [
  //   {
  //     startDate: '2022-10-21 13:21:00',
  //     endDate: '2022-12-21 14:21:11',
  //     learnTime: 4,
  //     lesson: ['js从入门到入土'],
  //     result: 99,
  //     user: '蔡徐坤',
  //     learnCode: '2014130257',
  //   },
  //   {
  //     startDate: '2022-10-21 13:21:00',
  //     endDate: '2022-12-21 14:21:11',
  //     learnTime: 8,
  //     lesson: ['js从入门到入土', 'js函数式编程'],
  //     result: 19,
  //     user: '吴亦凡',
  //     learnCode: '2013145200',
  //   },
  //   {
  //     startDate: '2022-10-21 13:21:00',
  //     endDate: '2022-12-21 14:21:11',
  //     learnTime: 6,
  //     lesson: ['js从入门到入土', 'js函数式编程'],
  //     result: 59,
  //     user: '李易峰',
  //     learnCode: '2020131400',
  //   },
  // ];
  const tableData = new Array(50).fill().map(() => ({
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 6,
      lesson: ['js从入门到入土', 'js函数式编程'],
      result: 59,
      user: '李易峰',
      learnCode: '2020131400',
    }))
  const columns = [
    {
      type: 'selection',
      labelWidth: 40,
    },
    {
      label: '姓名',
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
      labelWidth: 80,
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
    {
      label: '操作',
      labelWidth: 100,
      render: scope => (
        <ButtonModal
          btnConfig={{
            link: true,
            name: '编辑',
            style: {
              color: '#f40',
            },
          }}
          modalConfig={{
            title: '编辑框',
            events: {
              init: () => console.log('init'),
              confirm: () => console.log('confirm'),
            },
          }}
        >
          <p style="font-size:30px;color:#f40">hello world ......</p>
        </ButtonModal>
      ),
    },
  ];
  // allSpan - 24 > 1 换行
  const filterItems = [
    {
      label: '姓名',
      field: 'user',
      labelWidth: 40,
      span: 6,
      component: <el-input placeholder="请输入姓名" />,
    },
    {
      label: '学号',
      field: 'learnCode',
      labelWidth: 40,
      span: 6,
      component: <el-input placeholder="请输入学号" />,
    },
    {
      label: '课程',
      field: 'lesson',
      labelWidth: 40,
      span: 6,
      component: <el-input placeholder="请输入课程" />,
    },
    {
      label: '成绩',
      field: 'result',
      labelWidth: 40,
      span: 6,
      component: <el-input placeholder="请输入成绩" />,
    },
    {
      label: '是否合格',
      field: 'status',
      labelWidth: 70,
      span: 5,
      component: (
        <el-select placeholder="请选择">
          <el-option value="1" label="是"></el-option>
          <el-option value="0" label="否"></el-option>
        </el-select>
      ),
    },
  ];
  const filterBtn = {
    search: {
      name: '搜 索',
      color: '#f40',
    },
    reset: {
      name: '重 置',
    },
  };
  const queryApiHook = () => {
    // 接口请求
  }
  const formatParamsHook = () => {
    // 查询参数格式化
  }
  const render = () => (
    <>
      <FilterTool
        leftSpan={19}
        rightSpan={4}
        queryApiHook={queryApiHook}
        formatParamsHook={formatParamsHook}
        filterItems={filterItems}
        btnConfig={filterBtn}
        onPanelOpen={h => (panelH.value = h)}
      />
      <BaseTable tableData={tableData} columns={columns} height={tableHeight.value} style="transition:height .8s" />
    </>
  );
  return render;
});

commonTableDemo.name = commonTableDemo;

export default commonTableDemo;
