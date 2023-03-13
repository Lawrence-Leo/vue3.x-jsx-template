import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import * as Echart from 'echarts';
import 'echarts-liquidfill';
import option1 from './option1';
import option2 from './option2';
import option3 from './option3';
import option4 from './option4';
import option5 from './option5';
import option6 from './option6';
import { onMounted as destroy, mounted as init } from './option7';
import styles from './index.module.scss';

const chartExample = defineComponent(() => {
  const timer = ref(null);
  onMounted(() => {
    const example1 = Echart.init(document.querySelector('#example1'));
    example1.setOption(option1);
    // =============================================================
    const example2 = Echart.init(document.querySelector('#example2'));
    example2.setOption(option2);
    // =============================================================
    const example3 = Echart.init(document.querySelector('#example3'));
    example3.setOption(option3);
    // =============================================================
    const example4 = Echart.init(document.querySelector('#example4'));
    example4.setOption(option4);
    // =============================================================
    const example5 = Echart.init(document.querySelector('#example5'));
    example5.setOption(option5);
    // =============================================================
    const example6 = Echart.init(document.querySelector('#example6'));
    example6.setOption(option6);
    // =============================================================
    init();
    // =============================================================
    
  });
  onUnmounted(() => {
    destroy();
    clearInterval(timer.value);
  });
  const render = () => (
    <div class={styles.example}>
      <div class={styles.box}>
        <div id="example1" style="height:500px;width: 700px"></div>
      </div>
      <div class={styles.box}>
        <div id="example2" style="height:500px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="example3" style="height:500px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="example4" style="height:500px;width: 700px"></div>
      </div>
      <div class={styles.box}>
        <div id="example5" style="height:500px;width: 700px"></div>
      </div>
      <div class={styles.box}>
        <div id="example6" style="height:500px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="example7" style="height:400px;width: 400px"></div>
      </div>
    </div>
  );
  return render;
});

chartExample.name = 'chartExample';

export default chartExample;
