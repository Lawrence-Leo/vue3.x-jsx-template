import { defineComponent, ref, onMounted } from 'vue';
import * as Echart from 'echarts';
import { option1, option2, option3, option4, option5 } from './option';
import styles from './index.module.scss';

const chartBar = defineComponent(() => {
  const timer = ref(null);
  onMounted(() => {
    const bar1Ref = document.querySelector('#bar1');
    const chartBar1 = Echart.init(bar1Ref);
    chartBar1.setOption(option1);
    //--------------------------------------------------------------
    const bar2Ref = document.querySelector('#bar2');
    const chartBar2 = Echart.init(bar2Ref);
    chartBar2.setOption(option2);
    //--------------------------------------------------------------
    const bar3Ref = document.querySelector('#bar3');
    const chartBar3 = Echart.init(bar3Ref);
    chartBar3.setOption(option3);
    //--------------------------------------------------------------
    const bar4Ref = document.querySelector('#bar4');
    const chartBar4 = Echart.init(bar4Ref);
    chartBar4.setOption(option4);
    let count = 0;
    timer.value = setInterval(() => {
      chartBar4.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count,
      });
      count++;
      count > 7 && (count = 0);
    }, 1000);
    chartBar4.on('mouseover', function (params) {
      clearInterval(timer.value);
      chartBar4.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
    });
    chartBar4.on('mouseout', function (params) {
      timer.value && clearInterval(timer.value);
      count = params.dataIndex + 1;
      timer.value = setInterval(() => {
        chartBar4.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
        count > 7 && (count = 0);
      }, 1000);
    });
    //--------------------------------------------------------------
    const bar5Ref = document.querySelector('#bar5');
    const chartBar5 = Echart.init(bar5Ref);
    chartBar5.setOption(option5);
  });
  const render = () => (
    <div class={styles.chartBar}>
      <div class={styles.box}>
        <div id="bar1" style="height:300px;width: 200px"></div>
      </div>
      <div class={styles.box}>
        <div id="bar2" style="height:300px;width: 500px"></div>
      </div>
      <div class={styles.box}>
        <div id="bar3" style="height:300px;width: 560px"></div>
      </div>
      <div class={styles.box}>
        <div id="bar4" style="height:400px;width: 600px"></div>
      </div>
      <div class={styles.box}>
        <div id="bar5" style="height:400px;width: 700px"></div>
      </div>
    </div>
  );
  return render;
});

chartBar.name = 'chartBar';

export default chartBar;
