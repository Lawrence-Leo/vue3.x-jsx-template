import { defineComponent, ref, onMounted } from 'vue';
import * as Echart from 'echarts';
import { option1, option2, option3, option4 } from './option';
import styles from './index.module.scss';

const chartLine = defineComponent(() => {
  onMounted(() => {
    const chartLine1 = Echart.init(document.querySelector('#line1'));
    chartLine1.setOption(option1);
    // ===========================================================
    const chartLine2 = Echart.init(document.querySelector('#line2'));
    chartLine2.setOption(option2);
    const timer = ref(null);
    let count = 0;
    timer.value = setInterval(() => {
      chartLine2.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count,
      });
      count++;
      count > 7 && (count = 0);
    }, 1000);
    chartLine2.on('mouseover', function (params) {
      clearInterval(timer.value);
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
    chartLine2.on('mouseout', function (params) {
      timer.value && clearInterval(timer.value);
      count = params.dataIndex + 1;
      timer.value = setInterval(() => {
        chartLine2.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
        count > 7 && (count = 0);
      }, 1000);
    });
    // ===========================================================
    const chartLine3 = Echart.init(document.querySelector('#line3'));
    chartLine3.setOption(option3);
    // ===========================================================
    const chartLine4 = Echart.init(document.querySelector('#line4'));
    chartLine4.setOption(option4);
  });
  const render = () => (
    <>
      <div class={styles.lineBar}>
        <div class={styles.box}>
          <div id="line1" style="height:300px;width: 600px"></div>
        </div>
        <div class={styles.box}>
          <div id="line2" style="height:300px;width: 700px"></div>
        </div>
        <div class={styles.box}>
          <div id="line3" style="height:400px;width: 600px"></div>
        </div>
        <div class={styles.box}>
          <div id="line4" style="height:400px;width: 700px"></div>
        </div>
      </div>
    </>
  );
  return render;
});

chartLine.name = 'chartLine';

export default chartLine;
