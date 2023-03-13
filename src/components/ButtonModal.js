import { Teleport, ref, defineComponent } from 'vue';
import './ButtonModal.module.scss'

const ButtonModal = defineComponent((props, context) => {
  const visible = ref(false);
  const { modalConfig, btnConfig } = props;
  const { events, ...$attrs } = modalConfig;
  const openModal = () => {
    visible.value = true;
    events?.init?.();
  };

  const closeModal = () => {
    visible.value = false;
    events?.close?.();
  };

  const handleConfirm = () => {
    visible.value = false;
    events?.confirm?.();
  };

  const footer = () => (
    <>
      <el-button onClick={() => closeModal()}>取消</el-button>
      <el-button type="primary" onClick={() => handleConfirm()}>确定</el-button>
    </>
  );
  const render = () => (
    <>
      <el-button onClick={() => openModal()} {...btnConfig}>
        {btnConfig?.name || '按钮'}
      </el-button>
      <Teleport to="body">
        {visible.value && (
          <el-dialog
            v-model={visible.value}
            onClose={() => closeModal()}
            {...$attrs}
          >
            {{
              footer,
              default: () => context.slots.default?.(),
            }}
          </el-dialog>
        )}
      </Teleport>
    </>
  );
  return render;
});

ButtonModal.name = 'ButtonModal';
// 关闭继承警告
ButtonModal.inheritAttrs = false

ButtonModal.props = {
  btnConfig: {
    type: Object,
    default: () => ({}),
  },
  modalConfig: {
    type: Object,
    default: () => ({}),
    required: true,
  },
};

export default ButtonModal;
