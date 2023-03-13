import * as Echart from 'echarts';
export const option1 = {
  grid: {
    bottom: 20,
    right: 20,
    left: 40,
    top: 40,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    // 折线图是否需贴边展示
    boundaryGap: false,
    splitLine: {
      show: true,
      //添加网格线
      lineStyle: {
        color: ['#F40'],
        type: 'dashed',
      },
    },
  },
  yAxis: {
    type: 'value',
    name: '价格（元/吨）',
    // 设置 y 轴刻度最小值（可以动态设置）
    min: 100,
    splitLine: {
      show: true,
      //添加网格线
      lineStyle: {
        color: ['#F40'],
        type: 'dashed',
      },
    },
  },
  series: [
    {
      //   折线图拐点类型
      symbol: 'emptyCircle',
      symbolSize: 10,
      data: [
        150,
        230,
        224,
        218,
        {
          value: 135,
          itemStyle: {
            color: '#f40',
          },
        },
        147,
        260,
      ],
      type: 'line',
      // 设置区域样式 https://echarts.apache.org/zh/option.html#color
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              // 0% 处的颜色
              color: '#0661EA',
            },
            {
              offset: 1,
              // 100% 处的颜色
              color: '#fff',
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  ],
};
// ===============================================================
export const option2 = {
  grid: {
    bottom: 20,
    right: 40,
    left: 40,
    top: 40,
  },
  tooltip: {
    // 触发 tooltip 的方式
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: new Echart.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 253, 255, 0.6)' },
          { offset: 1, color: 'rgba(73, 201, 229, 0)' },
        ]),
        width: 'auto',
      },
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    // 轴线
    axisLine: {
      show: false
    },
    // 分割线
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      // 额外标记线 （标记平均值）
      markLine: {
        silent: true,
        data: [
          {
            type: 'average',
            name: '平均值',
          },
        ],
        precision: 0,
        label: {
          normal: {
            formatter: '平均值: \n {c}',
          },
        },
        lineStyle: {
          normal: {
            color: 'rgba(248,211,81,.7)',
          },
        },
      },
    },
  ],
};
// ===============================================================
export const option3 = {
  tooltip: {
    //触发类型
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line',
    },
    formatter: function (params) {
      return (
        params[0].name +
        '<br>' +
        params[0].marker +
        '今年:' +
        params[0].value +
        '<br>' +
        params[1].marker +
        '去年:' +
        Math.abs(params[1].value)
      );
    },
  },
  legend: {
    data: ['今年', '去年'],
    align: 'center',
    width: 200,
  },
  grid: {
    left: 20,
    bottom: 20,
    top: 50,
    //grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
    containLabel: true,
  },
  xAxis: [
    {
      show: true,
      name: '日期',
      nameTextStyle: {
        fontSize: 16,
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          fontSize: 16,
        },
      },
      splitLine: {
        show: false,
      },
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '金额',
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
        lineStyle: {
          fontSize: 16,
        },
      },
      splitLine: {
        show: false,
      },
      nameTextStyle: {
        fontSize: 16,
      },
      axisLabel: {
        //让x轴左边的数显示为正数
        formatter: function (v) {
          return v > 0 ? v : -v;
        },
      },
    },
  ],
  series: [
    {
      name: '今年',
      type: 'line',
      stack: '总量',
      smooth: true,
      itemStyle: {
        normal: {
          color: '#39FDA1',
        },
      },
      lineStyle: {
        normal: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(85,254,139,1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(7,252,202,1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(14,245,210,1)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
      label: {
        show: true,
        color: 'rgba(255,255,255,1)',
        fontSize: 16,
        position: 'top',
      },
      areaStyle: {
        normal: {
          color: new Echart.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(102,153,255,1)',
              },
              {
                offset: 0.8,
                color: 'rgba(102,153,255,0.08)',
              },
              {
                offset: 1,
                color: 'rgba(9,173,208,0.15)',
              },
            ],
            false
          ),
        },
      },
      data: [320, 302, 341, 374, 390, 450, 420],
    },
    {
      name: '去年',
      type: 'line',
      stack: '总量',
      smooth: true,
      label: {
        show: true, //控制柱状图是否显示数值
        color: 'rgba(255,255,255,1)',
        fontSize: 16,
        position: 'bottom',
        formatter: function (params) {
          //格式化柱状图里的数字
          return -params.value;
        },
      },
      itemStyle: {
        normal: {
          color: '#C8EE55',
        },
      },
      lineStyle: {
        normal: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(157,169,36,1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(157,169,36,1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(157,169,36,1)', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
        },
      },
      areaStyle: {
        normal: {
          color: new Echart.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: 'rgba(157,169,36,1)',
              },
              {
                offset: 0.8,
                color: 'rgba(102,153,255,0.08)',
              },
              {
                offset: 1,
                color: 'rgba(157,169,36,0.15)',
              },
            ],
            false
          ),
        },
      },
      data: [-220, -332, -301, -434, -290, -230, -510],
    },
  ],
};
// ===============================================================
let xData = (function () {
  var data = [];
  for (var i = 1; i < 31; i++) {
    data.push(i + '日');
  }
  return data;
})();
export const option4 = {
  backgroundColor: '#1A1835',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    },
  },
  grid: {
    borderWidth: 0,
    top: 110,
    bottom: 95,
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    x: '46%',
    top: '11%',
    textStyle: {
      color: '#90979c',
    },
    data: ['访问量', '订单量'],
  },

  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(204,187,225,0.5)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: xData,
    },
  ],

  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(204,187,225,0.5)',
        },
      },
    },
  ],
  dataZoom: [
    {
      show: true,
      height: 30,
      xAxisIndex: [0],
      bottom: 30,
      start: 10,
      end: 50,
      handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: '#5B3AAE',
      },
      textStyle: {
        color: 'rgba(204,187,225,0.5)',
      },
      fillerColor: 'rgba(67,55,160,0.4)',
      borderColor: 'rgba(204,187,225,0.5)',
    },
    {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35,
    },
  ],
  series: [
    {
      name: '访问量',
      type: 'line',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        color: '#6f7de3',
      },
      markPoint: {
        label: {
          textStyle: {
            color: '#fff',
          },
        },
        data: [
          {
            type: 'max',
            name: '最大值',
          },
          {
            type: 'min',
            name: '最小值',
          },
        ],
      },
      data: [
        509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117, 2000,
        1455, 1210, 719, 733, 944, 2285, 2208, 3372, 3936, 3693, 2962, 2810,
        3519, 2455, 2610, 2719, 2484, 2078,
      ],
    },
    {
      name: '订单量',
      type: 'line',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        color: '#c257F6',
      },
      markPoint: {
        label: {
          normal: {
            textStyle: {
              color: '#fff',
            },
          },
        },
        data: [
          {
            type: 'max',
            name: '最大值',
          },
          {
            type: 'min',
            name: '最小值',
          },
        ],
      },
      data: [
        2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019, 3433,
        3544, 3885, 4208, 3372, 3484, 3915, 3748, 3675, 4009, 4433, 3544, 3285,
        4208, 3372, 3484, 3915, 3823, 4265, 4298,
      ],
    },
  ],
};