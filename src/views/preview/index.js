import { defineComponent, ref } from 'vue';

const Preview = defineComponent(() => {
  const render = () => <>render</>;
  return render;
});

Preview.name = 'Preview';

export default Preview;
