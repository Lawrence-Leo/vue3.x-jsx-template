import * as Echart from 'echarts';
export const option1 = {
  title: {
    text: '饼图label（不需要计算占比）',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#f40',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      // 半径设置
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      // label 线设置
      labelLine: {
        // 视觉引导线，第二段长度
        length2: 50,
      },
      //   不需要自己计算百分比
      label: {
        formatter: '{a}\n\n{d}%',
      },
    },
  ],
};
// ===================================================================
const chartData = [
  {
    value: 520,
    name: 'A',
  },
  {
    value: 280,
    name: 'B',
  },
  {
    value: 100,
    name: 'C',
  },
  {
    value: 100,
    name: 'D',
  },
];
const colorList = [
  new Echart.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#CA8CCA',
    },
    {
      offset: 1,
      color: '#EFA5BB',
    },
  ]),
  new Echart.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#BFA4E4',
    },
    {
      offset: 1,
      color: '#E29CE2',
    },
  ]),
  new Echart.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#A8AAE5',
    },
    {
      offset: 1,
      color: '#BEA3E3',
    },
  ]),
  new Echart.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: '#A4D37D',
    },
    {
      offset: 1,
      color: '#E5F2A7',
    },
  ]),
];
const sum = chartData.reduce((per, cur) => per + cur.value, 0);
const gap = (1 * sum) / 100;
const pieData1 = [];
const pieData2 = [];
const gapData = {
  name: '',
  value: gap,
  itemStyle: {
    color: 'transparent',
  },
};
for (let i = 0; i < chartData.length; i++) {
  pieData1.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 100,
      shadowColor: '#2a2a34',
      shadowBlur: 5,
      shadowOffsetY: 0,
      shadowOffsetX: 0,
      borderColor: '#2a2a34',
      borderWidth: 2,
    },
  });
  pieData1.push(gapData);

  pieData2.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 10,
      color: colorList[i],
      opacity: 0.1,
      shadowColor: '#000',
      shadowBlur: 1,
      shadowOffsetY: 5,
      shadowOffsetX: 0,
    },
  });
  pieData2.push(gapData);
}
export const option2 = {
  backgroundColor: {
    color: '#000',
  },
  // 可以设置多个标题
  title: [
    {
      text: '75.0%',
      x: '60%',
      y: '43%',
      textAlign: 'center',
      textStyle: {
        fontSize: '40',
        fontWeight: '500',
        color: '#98b5d2',
        // 设置文字阴影效果
        textShadowColor: '#000',
        textShadowBlur: '1',
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
      },
    },
    {
      text: 'DESIGN ELEMENTS',
      left: '60%',
      top: '52%',
      textAlign: 'center',
      textStyle: {
        fontSize: '18',
        fontWeight: '400',
        color: '#5c5a68',
        // 设置文字阴影效果
        textShadowColor: '#000',
        textShadowBlur: '1',
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
      },
    },
  ],
  legend: {
    // 横幅距离左上角的位置
    left: '10%',
    top: '35%',
    // 横幅的宽度
    width: 100,
    // 横幅放置的位置
    align: 'left',
    // 间距
    itemGap: 18,
    itemWidth: 20,
    itemHeight: 20,
    // 文字阴影
    shadowBlur: 10,
    shadowOffsetY: 0,
    shadowOffsetX: 0,
    borderColor: '#2a2a34',
    borderWidth: 2,
    // 文本样式
    textStyle: {
      color: '#D8DDE3',
      rich: {
        name: {
          verticalAlign: 'right',
          align: 'left',
          fontSize: 18,
          color: '#D8DDE3',
        },
        // formatter 里面自定义字段
        percent: {
          padding: [0, 0, 0, 10],
          color: '#D8DDE3',
          fontSize: 18,
        },
      },
    },
    formatter: name => {
      const item = chartData.find(i => {
        return i.name === name;
      });
      const p = ((item.value / sum) * 100).toFixed(0);
      return '{name|' + name + '}' + '{percent|' + p + '}' + ' %';
    },
  },
  color: colorList,
  series: [
    {
      type: 'pie',
      z: 3,
      roundCap: true,
      radius: ['44%', '51%'],
      // grid 设置柱形图和折线图坐标系位置
      // center 设置饼图位置
      center: ['60%', '50%'],
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: pieData1,
    },
    {
      type: 'pie',
      z: 2,
      radius: ['40%', '55%'],
      // grid 设置柱形图和折线图坐标系位置
      // center 设置饼图位置
      center: ['60%', '50%'],
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      silent: true,
      data: pieData2,
    },
  ],
};

// ===================================================================
let angle = 0; //角度，用来做简单的动画效果的
let value = 78; //图上角度数据
export const option3 = {
  backgroundColor: '#061740',
  title: {
    text: '{a|' + value + '}{c|%}',
    x: 'center',
    y: 'center',
    textStyle: {
      rich: {
        a: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'bold',
        },
        c: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'normal',
        },
      },
    },
  },
  series: [
    //内环
    {
      name: '',
      type: 'custom',
      coordinateSystem: 'none',
      renderItem: function (params, api) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2.3) * 0.65,
            startAngle: ((0 + -angle) * Math.PI) / 180,
            endAngle: ((360 + -angle) * Math.PI) / 180,
          },
          style: {
            stroke: '#0CD3DB',
            fill: 'transparent',
            lineWidth: 0.5,
          },
          silent: true,
        };
      },
      data: [0],
    },
    //外环
    {
      name: '',
      type: 'pie',
      radius: ['85%', '70%'],
      silent: true,
      clockwise: true,
      startAngle: 90,
      z: 0,
      zlevel: 0,
      label: {
        position: 'center',
      },
      data: [
        {
          value: value,
          name: '',
          itemStyle: {
            //外环发光
            borderWidth: 0.5,
            shadowBlur: 20,
            borderColor: '#4bf3f9',
            shadowColor: '#9bfeff',
            color: {
              // 圆环的颜色
              colorStops: [
                {
                  offset: 0,
                  color: '#4bf3f9', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#4bf3f9', // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 100 - value,
          name: '',
          label: {
            show: false,
          },
          itemStyle: {
            color: '#173164',
          },
        },
      ],
    },
  ],
};
// ===================================================================
var scale = 1;
var echartData = [
  {
    value: 2154,
    name: '曲阜师范大学',
  },
  {
    value: 3854,
    name: '潍坊学院',
  },
  {
    value: 3515,
    name: '青岛职业技术学院',
  },
  {
    value: 3515,
    name: '淄博师范高等专科',
  },
  {
    value: 3854,
    name: '鲁东大学',
  },
  {
    value: 2154,
    name: '山东师范大学',
  },
];
var rich = {
  yellow: {
    color: '#ffc72b',
    fontSize: 30 * scale,
    padding: [5, 4],
    align: 'center',
  },
  total: {
    color: '#ffc72b',
    fontSize: 40 * scale,
    align: 'center',
  },
  white: {
    color: '#fff',
    align: 'center',
    fontSize: 14 * scale,
    padding: [21, 0],
  },
  blue: {
    color: '#49dff0',
    fontSize: 16 * scale,
    align: 'center',
  },
  hr: {
    borderColor: '#0b5263',
    width: '100%',
    borderWidth: 1,
    height: 0,
  },
};
export const option4 = {
  backgroundColor: '#031f2d',
  title: {
    text: '总考生数',
    left: 'center',
    top: '53%',
    padding: [24, 0],
    textStyle: {
      color: '#fff',
      fontSize: 18 * scale,
      align: 'center',
    },
  },
  legend: {
    selectedMode: false,
    formatter: function (name) {
      var total = 0; //各科正确率总和
      var averagePercent; //综合正确率
      echartData.forEach(function (value, index, array) {
        total += value.value;
      });
      return '{total|' + total + '}';
    },
    data: [echartData[0].name],
    // data: ['高等教育学'],
    // itemGap: 50,
    left: 'center',
    top: 'center',
    icon: 'none',
    align: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 16 * scale,
      rich: rich,
    },
  },
  series: [
    {
      name: '总考生数量',
      type: 'pie',
      radius: ['42%', '50%'],
      color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
      emphasis: { scale: false },
      label: {
        formatter: function (params, ticket, callback) {
          var total = 0; //考生总数量
          var percent = 0; //考生占比
          echartData.forEach(function (value, index, array) {
            total += value.value;
          });
          percent = ((params.value / total) * 100).toFixed(1);
          return (
            '{white|' +
            params.name +
            '}\n{hr|}\n{yellow|' +
            params.value +
            '}\n{blue|' +
            percent +
            '%}'
          );
        },
        rich: rich,
      },
      labelLine: {
        length: 55 * scale,
        length2: 0,
        lineStyle: {
          color: '#0b5263',
        },
      },
      data: echartData,
    },
  ],
};
