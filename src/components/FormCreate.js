import ButtonGroup from './ButtonGroup';
import { toRef, h, reactive, watch, ref, computed, withModifiers } from 'vue';
const FormCreate = {
  name: 'FormCreate',
  components: { ButtonGroup },
  props: {
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    apiHook: {
      type: Function,
      default: () => {},
    },
    formatParamsHook: {
      type: Function,
      default: () => {},
    },
    btnConfig: {
      type: Object,
    },
  },
  setup(props, context) {
    const formItems = toRef(props, 'formItems');
    const { formatParamsHook, apiHook, btnConfig, formConfig } = props;
    // collection state
    const formState = ref({});
    if (!formItems.value.length) {
      return;
    }
    const formItemList = formItems.value.map(item => {
      const { value, component, field, ...rest } = item;
      formState.value[field] = value;
      // generate render function
      return {
        renderComponent: () => {
          // const { type } = component;
          // v-model
          const $props = {
            modelValue: formState.value[item.field],
            'onUpdate:modelValue': value => {
              formState.value[item.field] = value;
            },
          };
          // https://github.com/vuejs/babel-plugin-jsx
          // if (type.name === 'ElInput') {
          //   // .enter 修饰符
          //   $props['onKeyup'] = withModifiers(() => handleSearch(), ['enter']);
          // }
          return h(component, $props);
        },
        ...rest,
      };
    });

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
      const formatState = formatParamsHook(PreHandleParams(formState.value));
      console.log('formState', formState.value);
      apiHook(formatState);
    };

    const reset = () => {
      formItems.value.forEach(
        ({ value, field }) => (formState.value[field] = value)
      );
    };

    const btnList = [
      {
        type: 'primary',
        name: '查 询',
        onClick: () => handleSearch(),
        ...btnConfig?.search,
      },
      {
        type: 'default',
        name: '重 置',
        onClick: () => reset(),
        ...btnConfig?.reset,
      },
    ];
    return () => (
      <el-form model={formState} {...formConfig}>
        {formItemList.map(({ label, field, renderComponent, ...rest }) => (
          <el-form-item label={label} prop={field} {...rest}>
            {renderComponent?.()}
          </el-form-item>
        ))}
        {
          <el-form-item>
            <button-group gutter={10} btnList={btnList} />
          </el-form-item>
        }
      </el-form>
    );
  },
};

export default FormCreate;
