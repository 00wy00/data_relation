import React, { useState, useEffect } from 'react';
import Custom from '../src';
import './index.css';
const currentNode = '8';
const mode = 'Horizontal';
const linkDataArray = [
  { from: 8, to: '2768_SYNC_1' },
  { from: '2768_SYNC_1', to: '2' },
];
const nodeDataArray = [
  {
    // 连接标志
    key: 8,
    // 当前表节点标志：MIDDLE，算子节点标志：RECIPE，其他表节点标志：DATASET
    category: 'MIDDLE',
    // 字段数据
    detail: [
      { name: 'ID', type: 'string', length: '10' },
      { name: 'namesadkasdasdka(撒打算事实上大)', type: 'string', length: '10' },
      { name: 'pid', type: 'string', length: '20' },
    ],
    // 字段是否展开
    visible: true,
    // 是否限制表节点面板高度
    // height: true,
    // 是否有更多的标签
    isMore: false,
    // 表头图标
    source: 'http://localhost:9022/427e7123ba93e2de02fc96c89e2c3da3.png',
    // 初始状态时是否被选中
    select: true,
    // 表名
    table_title: 'qqqq',
  },
  {
    // 连接标志
    key: '2768_SYNC_1',
    // 当前表节点标志：MIDDLE，算子节点标志：RECIPE，其他表节点标志：DATASET
    category: 'DATASET',
    // 字段数据
    detail: [
      { name: 'ID', type: 'string', length: '10' },
      { name: 'name', type: 'string', length: '10' },
      { name: 'pid', type: 'string', length: '20' },
      { name: 'pid', type: 'string', length: '20' },
      { name: 'pid', type: 'string', length: '20' },
      { name: 'pid', type: 'string', length: '20' },
      { name: 'pid', type: 'string', length: '20' },
    ],
    // 字段是否展开
    visible: true,
    // 是否限制表节点面板高度
    height: true,
    // 是否有更多的标签
    isMore: true,
    // 表头图标
    source: 'http://localhost:9022/427e7123ba93e2de02fc96c89e2c3da3.png',
    // 初始状态时是否被选中
    select: false,
    // 表名
    table_title: 'qqqq',
  },
  {
    // 连接标志
    key: '2',
    // 当前表节点标志：MIDDLE，算子节点标志：RECIPE，其他表节点标志：DATASET
    category: 'DATASERVICE',
    // 字段是否展开
    visible: false,
    // 是否限制表节点面板高度
    height: true,
    // 是否有更多的标签
    isMore: false,
    // 表头图标
    source: 'http://localhost:9022/427e7123ba93e2de02fc96c89e2c3da3.png',
    // 初始状态时是否被选中
    select: false,
    // 表名
    table_title: 'qqqq',
  },
];
const superior = 2;
const subordinate = 4;
const tableTooltip = (data) => (
  <div>
    <div>{data.table_title}</div>
  </div>
);
const transformpTooltip = (data) => (
  <div>
    <div>{data.table_title}</div>
  </div>
);
const isMoreTooltip = (data) => (
  <div>
    <div>{data.key}</div>
  </div>
);
const onModelChange = (changes) => {
  console.log(changes);
  // alert('GoJS model changed!');
};
const hanldHoverNode = (data) => {
  console.log(data);
};
const clickNode = (data) => {
  console.log(data);
};

export default function Demo1() {
  const [nodeArr, setNodeArr] = useState([]);
  const [lineArr, setLineArr] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setNodeArr(nodeDataArray);
      setLineArr(linkDataArray);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="demo-content">
      <Custom
        // 当前默认节点
        currentNode={currentNode}
        // 直接上游
        superior={superior}
        // 所有的连线
        linkDataArray={lineArr}
        // 直接下游
        subordinate={subordinate}
        // 所有的节点信息
        nodeDataArray={nodeArr}
        // 表节点tooltip
        tableTooltip={tableTooltip}
        // 表节点tooltip
        serverTooltip={tableTooltip}
        // 表节点节点横纵坐标修正  [横坐标，纵坐标]
        tablePositions={[0, 0]}
        // 算子节点横纵坐标修正  [横坐标，纵坐标]
        recipePositions={[0, 0]}
        // 算子节点tooltip
        transformpTooltip={transformpTooltip}
        // 画布行为
        onModelChange={onModelChange}
        // hover返回节点信息
        onHoverNode={hanldHoverNode}
        // 点击返回节点信息
        onClickNode={clickNode}
        // hover在节点上的秒数，用来触发mouseHover
        hoverDelay={1}
        // 初始视图大小比例 默认为1
        scale={1}
        // 最小视图的缩小比例 默认为0.5
        minScale={0.2}
        // 最大视图的放大比例 默认为2.5
        maxScale={5.5}
        // 是否允许缩放
        allowZoom={true}
        // 更多按钮tooltip
        isMoreTooltip={isMoreTooltip}
        // 更多按钮tooltip坐标修正 [横坐标，纵坐标]
        isMorePositions={[0, 0]}
        // 垂直模式 Vertical  水平模式 Horizontal  默认水平模式
        mode={mode}
        // 表节点宽度
        nodeWidth={200}
        // loading 状态设置
        load={loading}
      />
    </div>
  );
}
