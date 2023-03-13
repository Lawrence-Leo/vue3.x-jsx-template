import * as Echart from 'echarts';
export const option1 = {
  // 可缩放、宽度不够，可滚动
  dataZoom: [
    {
      // 是否显示底部滚动条
      // show: false,
      type: 'inside',
      realtime: true,
      start: 0,
      end: 50,
    },
  ],
  title: {
    text: '可拖动',
    textStyle: {
      color: '#f40',
      fontSize: 12,
    },
  },
  // 位置调整
  grid: {
    left: '40px',
    right: '40px',
    bottom: '20px',
  },
  // 即使没有配置，也不能去掉，不然 tooltip 会消失
  tooltip: {},
  // 头部标题,需要与 series 里面的name匹配
  legend: {
    data: ['销量', 'test'],
    right: 0,
    // 修改 icon 宽高
    itemWidth: 12,
    itemHeight: 8,
    formatter: function (name) {
      if (name === 'test') {
        return name + '（O_o）';
      } else {
        return name;
      }
    },
  },
  // x轴下标文字
  // 可以是数组，表示多个 x 轴
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  // 即使没有配置，也不能去掉 （作为一个组件）
  yAxis: [
    {
      type: 'value',
      name: '销量',
      position: 'left',
      axisLabel: {
        rotate: 30,
        color: '#f40',
        formatter: function (val) {
          return val + '个';
        },
      },
    },
    {
      type: 'value',
      name: '环比',
      min: 60,
      max: 100,
      position: 'right',
    },
  ],
  // 不仅表示数据，也表示数据映射成为的图
  // 数据不仅可以来自 series，也可以来自 dataset
  series: [
    {
      // 设置 toolbar 提示信息名字
      name: '销量',
      // 指定图表类型
      type: 'bar',
      // 柱状图数据
      data: [5, 20, 36, 10, 10, 20],
      // 鼠标 hover 时,单独显示该类型数据，其他类型透明
      emphasis: {
        focus: 'series',
      },
    },
    {
      yAxisIndex: 1,
      // 设置 toolbar 提示信息名字
      name: 'test',
      // 指定图表类型
      type: 'bar',
      // 柱状图数据
      data: [15, 30, 16, 20, 20, 10],
      emphasis: {
        focus: 'series',
      },
    },
  ],
};

export const option2 = {
  title: {
    text: '坐标指示器效果',
    subtext: 'subTitle',
    // 类似鼠标 hover 效果
    trigger: 'axis',
    // 坐标轴指示器，坐标轴触发有效
    axisPointer: {
      // 鼠标 hover 后，柱状图是 阴影效果 还是 虚线效果
      // 默认为直线，可选为：'line' | 'shadow'
      type: 'shadow',
    },
  },
  // 即使没有配置，也不能去掉，不然 tooltip 会消失
  tooltip: {
    trigger: 'axis',
    // 设置 提示虚线
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#f40',
      },
    },
  },
  // 头部标题
  legend: {
    data: ['销量'],
  },
  grid: {
    left: '60px',
    bottom: '30px',
  },
  // x轴下标文字
  // 可以是数组，表示多个 x 轴
  yAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  // 即使没有配置，也不能去掉 （作为一个组件）
  xAxis: {},
  // 不仅表示数据，也表示数据映射成为的图
  // 数据不仅可以来自 series，也可以来自 dataset
  series: [
    {
      // 设置 toolbar 提示信息名字
      name: '销量',
      // 指定图表类型
      type: 'bar',
      // 柱状图数据
      data: [
        5,
        {
          // 自定义单个柱子的颜色
          value: 20,
          itemStyle: {
            color: '#f40',
          },
        },
        36,
        10,
        10,
        20,
      ],
      // 是否开启背景
      showBackground: false,
      // 设置背景色
      backgroundStyle: {
        // 背景色不能使用 background
        color: 'rgba(0,0,0,0.2)',
      },
      // 动画延迟
      animationDelay: function (idx) {
        return idx * 200;
      },
    },
  ],
};

export const option3 = {
  title: {
    text: '渐变效果',
  },
  // 即使没有配置，也不能去掉，不然 tooltip 会消失
  tooltip: {},
  // 头部标题
  legend: {
    data: ['销量'],
  },
  grid: {
    bottom: '20px',
  },
  // x轴下标文字
  // 可以是数组，表示多个 x 轴
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    axisLabel: {
      inside: true,
      textStyle: {
        color: '#fff',
      },
    },
    // 去掉 x 轴坐标线
    axisTick: false,
    // 去掉 x 轴的轴线
    axisLine: false,
    z: 10,
  },
  // 即使没有配置，也不能去掉 （作为一个组件）
  yAxis: {
    // 设置 y 轴分割线颜色
    splitLine: {
      lineStyle: {
        color: ['#f40'],
        type: 'dashed',
        // 设置透明度
        opacity: 0.2,
      },
    },
  },
  // 不仅表示数据，也表示数据映射成为的图
  // 数据不仅可以来自 series，也可以来自 dataset
  series: [
    {
      // 设置 toolbar 提示信息名字
      name: '销量',
      // 指定图表类型
      type: 'bar',
      // 柱状图数据
      data: [5, 20, 36, 10, 10, 20],
      itemStyle: {
        //   设置线性渐变
        color: new Echart.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' },
        ]),
      },
      // 鼠标 hover 时的背景色
      emphasis: {
        itemStyle: {
          color: new Echart.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#f40' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' },
          ]),
        },
      },
    },
  ],
};

export const option4 = {
  title: {
    text: '轮播tooltip',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  legend: {
    data: ['检查数', '问题数'],
  },
  tooltip: {
    // 添加指示器，否则堆叠图标无法显示所有
    trigger: 'axis',
    formatter: function (item) {
      const [a, b] = item;
      return `<div style="background-color: skyblue">检查数：${a.value}</div>
       <div>问题数：${b.value}</div>
      `;
    },
  },
  yAxis: {
    type: 'value',
    // 隐藏 y 轴分割线
    splitLine: {
      show: false,
    },
  },
  grid: {
    bottom: 20,
  },
  series: [
    {
      stack: 'total',
      name: '检查数',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth: 30,
      // 在图形上展示数据信息
      label: {
        show: true,
      },
    },
    {
      stack: 'total',
      name: '问题数',
      data: [20, 20, 10, 30, 10, 10, 30],
      type: 'bar',
      barWidth: 30,
      // 在图形上展示数据信息
      label: {
        show: true,
        position: 'top',
        color: '#f40',
      },
    },
  ],
};

export const option5 = {
  backgroundColor: '#0f375f',
  grid: {
    bottom: 20,
    top: 20,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 'line' | 'shadow'
      type: 'shadow',
    },
    formatter: '{b} ({c})',
  },
  xAxis: [
    {
      gridIndex: 0,
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      gridIndex: 0,
      interval: 0,
      data: [
        '招生办',
        '就业处',
        '后勤',
        '招生办02',
        '就业处02',
        '后勤02',
        '招生办03',
        '就业处03',
        '后勤03',
      ],
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: '8px',
          color: '#36a8fa',
        },
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      barWidth: '45%',
      itemStyle: {
        normal: {
          color: new Echart.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              {
                offset: 0,
                color: 'rgba(41,134,207,1)',
              },
              {
                offset: 0.8,
                color: 'rgba(0,255,205,.9)',
              },
            ],
            false
          ),
        },
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#00FFCD',
          },
        },
      },
      data: ['135', '764', '692', '834', '549', '734', '861', '245', '397'],
    },
  ],
};
