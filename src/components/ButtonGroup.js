import { isVNode, ref } from 'vue';

const ButtonGroup = {
  name: 'ButtonGroup',
  props: {
    btnList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const { btnList } = props;
    const isRenderFns = ref(false);

    isRenderFns.value = btnList.every(item => typeof item === 'function');

    const generateComponent = () => {
      let $component;
      if (isRenderFns.value) {
        $component = btnList.map(renderFn => (
          <el-col span={1.1}>
            {{
              default: () => renderFn(),
            }}
          </el-col>
        ));
      } else {
        $component = btnList.map(
          ({ name, style, span, offset, push, pull, ...rest }) => (
            <el-col
              span={span || 1.1}
              offset={offset || 0}
              push={push || 0}
              pull={pull || 0}
              style={style || ''}
            >
              <el-button {...rest}>{name}</el-button>
            </el-col>
          )
        );
      }
      return $component;
    };

    return () => <el-row {...context.attrs}>{generateComponent()}</el-row>;
  },
};

export default ButtonGroup;
