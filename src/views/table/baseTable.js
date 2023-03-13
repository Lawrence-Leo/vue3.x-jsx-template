import { defineComponent, ref } from 'vue';
import BaseTable from '@/components/BaseTable';
import ButtonModal from '@/components/ButtonModal';

const baseTableDemo = defineComponent(() => {
  console.log('start');
  const btnModalVisible = ref(false);
  const tableData = [
    {
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 4,
      lesson: ['js从入门到入土'],
      result: 99,
      user: '蔡徐坤',
      learnCode: '2014130257',
    },
    {
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 8,
      lesson: ['js从入门到入土', 'js函数式编程'],
      result: 19,
      user: '吴亦凡',
      learnCode: '2013145200',
    },
    {
      startDate: '2022-10-21 13:21:00',
      endDate: '2022-12-21 14:21:11',
      learnTime: 6,
      lesson: ['js从入门到入土', 'js函数式编程'],
      result: 59,
      user: '李易峰',
      learnCode: '2020131400',
    },
  ];
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
    {
      label: '操作',
      labelWidth: 100,
      render: scope => (
        <ButtonModal
          v-model={[btnModalVisible.value, 'visible']}
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
  const render = () => (
    <>
      <BaseTable tableData={tableData} columns={columns} />
    </>
  );
  return render;
});

baseTableDemo.name = 'baseTableDemo';

export default baseTableDemo;
