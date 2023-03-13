import { defineComponent, ref, onMounted } from 'vue';
import * as Echart from 'echarts';
import { option1, option2, option3, option4 } from './option';
import styles from './index.module.scss';

const chartPie = defineComponent(() => {
  onMounted(() => {
    const chartPie1 = Echart.init(document.querySelector('#pie1'));
    chartPie1.setOption(option1);
    // ===========================================================
    const chartPie2 = Echart.init(document.querySelector('#pie2'));
    chartPie2.setOption(option2);
    // ===========================================================
    const chartPie3 = Echart.init(document.querySelector('#pie3'));
    chartPie3.setOption(option3);
    // ===========================================================
    const chartPie4 = Echart.init(document.querySelector('#pie4'));
    chartPie4.setOption(option4);
  });
  const render = () => (
    <div class={styles.chartPie}>
      <div class={styles.box}>
        <div id="pie1" style="height:500px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="pie2" style="height:500px;width: 700px"></div>
      </div>
      <div class={styles.box}>
        <div id="pie3" style="height:500px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="pie4" style="height:500px;width: 700px"></div>
      </div>
    </div>
  );
  return render;
});

chartPie.name = 'chartPie';

export default chartPie;
