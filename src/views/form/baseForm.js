import { defineComponent, ref } from 'vue';
import FormCreate from '@/components/FormCreate';
import styles from './baseForm.module.scss';

const BaseForm = defineComponent(() => {
  const formConfig = {
    labelWidth: '80px',
    labelPosition: 'top',
    class: styles.formStyle,
  };
  const formItems = [
    {
      label: '姓名',
      field: 'name',
      component: <el-input />,
    },
    {
      label: '性别',
      field: 'sex',
      component: (
        <el-select>
          <el-option label="女" value="0" />
          <el-option label="男" value="1" />
        </el-select>
      ),
    },
    {
      label: '爱好',
      field: 'hobby',
      component: (
        <el-checkbox-group>
          <el-checkbox label="0">看书</el-checkbox>
          <el-checkbox label="1">游戏</el-checkbox>
          <el-checkbox label="2">运动</el-checkbox>
        </el-checkbox-group>
      ),
    },
  ];
  const render = () => (
    <div class={styles.baseForm}>
      <FormCreate formItems={formItems} formConfig={formConfig} />
    </div>
  );
  return render;
});

BaseForm.name = 'BaseForm';

export default BaseForm;
