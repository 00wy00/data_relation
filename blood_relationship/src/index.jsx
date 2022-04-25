// App.js
import React, { useEffect, useState, useRef } from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import './index.css';
import ReactDOM from 'react-dom';
// import { RECIPES, DATASET_ICONS } from '@src/constants/graph';
import img1 from './circle.png';
// import _ from 'lodash';
import { Switch, Button, Tooltip, Loading } from '@tencent/care-ui-react';
import '@tencent/care-ui-react/dist/care-ui.css';

export default function Dome(props) {
  const {
    superior,
    linkDataArray,
    subordinate,
    onModelChange,
    onHoverNode,
    nodeDataArray,
    tableTooltip,
    serverTooltip,
    transformpTooltip,
    onClickNode,
    hoverDelay,
    scale,
    minScale,
    maxScale,
    allowZoom,
    isMoreTooltip,
    mode,
    nodeWidth,
    tablePositions,
    recipePositions,
    isMorePositions,
    load,
  } = props;

  const [nodeArr, setNodeArr] = useState([]);
  const [linkArr, setLinkArr] = useState([]);
  // const [maskChecked, setMaskChecked] = useState(true);
  // const [loading, setLoading] = useState(true);
  // const [treeMode, setTreeMode] = useState([]);
  const currentFontSize = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '');
  const diagramRef = useRef();
  function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      defaultScale: scale || 1, // 初始视图大小比例
      minScale: minScale || 0.5, // 最小视图的缩小比例
      maxScale: maxScale || 2.5, // 最大视图的放大比例
      // 不允许水平滚动
      allowHorizontalScroll: true,
      // 不允许垂直滚动
      allowVerticalScroll: true,
      // 不允许移动对象
      allowMove: false,
      // 是否允许缩放
      allowZoom: allowZoom || false,
      // initialContentAlignment: go.Spot.Center, // 设置整个图表在容器中的位置 https://gojs.net/latest/api/symbols/Spot.html
      // allowZoom: true,
      // initialDocumentSpot: go.Spot.Center,
      // initialViewportSpot: go.Spot.Center,
      // initialContentAlignment: go.Spot.Center,
      contentAlignment: go.Spot.Center,
      // hover在节点上的秒数，用来触发mouseHover
      'toolManager.hoverDelay': hoverDelay || 1,
      'grid.visible': false, // 是否显示背景栅格
      'grid.gridCellSize': new go.Size(5, 5), // 栅格大小
      'commandHandler.copiesTree': false, // 禁用复制快捷键
      'commandHandler.deletesTree': false, // 禁用删除快捷键
      // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 启用视图放大缩小
      // allowLink: true, // 是否允许拖拽连线
      // allowRelink: true, // 是否允许重新连线
      padding: 10,
      'undoManager.isEnabled': true, // enable undo & redo
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
      layout: $(go.LayeredDigraphLayout, {
        direction: mode && mode === 'Vertical' ? 90 : 0,
        layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
      }),
      // 点击节点时，不显示边框
      // nodeSelectionAdornmentTemplate:
      //   $(
      //     go.Adornment, 'Auto',
      //     $(go.Shape, 'Rectangle', { fill: 'white', stroke: null }),
      //   ),
    });

    diagram.layoutDiagram(true);

    const itemTempl = $(
      go.Panel,
      'TableRow',
      {
        mouseHover(_, obj) {
          const { data } = obj;
          // eslint-disable-next-line no-param-reassign
          obj.data = {
            ...data,
            bcg: true,
            strLength: getTextWidth(data.name, currentFontSize.fontSize) > nodeWidth + 13,
          };
        },
        mouseLeave(_, obj) {
          const { data } = obj;
          // eslint-disable-next-line no-param-reassign
          obj.data = { ...data, bcg: false, strLength: false };
        },
      },
      new go.Binding('background', 'bcg', (bcg) => (bcg === true ? '#eee' : '#fff')),
      $(
        go.TextBlock,
        {
          isMultiline: false,
          editable: false,
          // row: 1,
          // column: 1,
          // alignment: go.Spot.Left,
          // margin: new go.Margin(0, 40, 0, 0),
          width: nodeWidth,
          maxLines: 1,
          wrap: go.TextBlock.None,
          overflow: go.TextBlock.OverflowEllipsis,
        },
        new go.Binding('text', 'name').makeTwoWay(),
        {
          // define a tooltip for each node that displays the color as text
          toolTip: $(
            'ToolTip',
            $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'name')),
            new go.Binding('visible', 'strLength').makeTwoWay(),
          ), // end of Adornment
        },
      ),
      $(
        go.TextBlock,
        {
          isMultiline: false,
          editable: false,
          stroke: '#333',
          opacity: 0.4,
          // row: 1,
          column: 1,
          margin: new go.Margin(4, 0, 4, 0),
          textAlign: 'end',
          alignment: go.Spot.Right,
        },
        new go.Binding('text', 'type').makeTwoWay(),
      ),
    );

    // function diagramInfo(model) {
    //   return `Model:\n${model.nodeDataArray.length} nodes, ${model.linkDataArray.length} links`;
    // }

    // diagram.toolTip = $(
    //   'ToolTip',
    //   $(
    //     go.TextBlock,
    //     { margin: 4 },
    //     // use a converter to display information about the diagram model
    //     new go.Binding('text', '', diagramInfo),
    //   ),
    // );

    let ifAddEvent = false;

    // Horizontal 水平   Vertical垂直
    // 上下级表
    diagram.nodeTemplateMap.add(
      'DATASET',
      $(
        go.Node,
        'Auto',
        {
          movable: false, // 禁止拖动
          deletable: false, // 禁止删除
        },
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
            $(go.Placeholder),
          ), // end Adornment
        },
        { selectionObjectName: 'Content', selectionChanged: nodeSelectionChanged },
        new go.Binding('isSelected', 'select').makeTwoWay(),
        $(
          go.Panel,
          mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal',
          $(
            go.Panel,
            'Auto',
            { margin: 0, background: '#fff', name: 'Content' },
            $(go.Shape, 'Rectangle', {
              fill: '#fff',
              stroke: '#eee',
              strokeWidth: 1,
            }),
            $(
              go.Panel,
              'Vertical',
              $(
                go.Panel,
                'Table',
                { background: '#fff' },
                $(
                  go.Panel,
                  'TableRow',
                  { name: 'Pn', background: '#0075FF', opacity: 0.8 },
                  {
                    mouseLeave(_, obj) {
                      // obj参数是当前的节点node
                      // const position = node.findObject('TB').
                      showPopup(obj, false);
                    },
                    mouseOver() {
                      diagram.currentCursor = 'pointer';
                    },
                    mouseHover(_, obj) {
                      showPopup(obj, true);
                    },
                  },
                  $(
                    go.Picture,
                    { margin: new go.Margin(5, 8, 5, 8), width: 40, height: 40, alignment: go.Spot.Left },
                    new go.Binding('source'),
                  ),
                  $(
                    go.TextBlock,
                    {
                      alignment: go.Spot.Left,
                      margin: new go.Margin(0, 20, 0, 60),
                      font: '11pt sans-serif',
                      isMultiline: false,
                      editable: false,
                      stroke: '#fff',
                      overflow: go.TextBlock.OverflowEllipsis,
                      maxLines: 2,
                      width: nodeWidth || 150,
                    },
                    new go.Binding('text', 'table_title').makeTwoWay(),
                  ),
                ),
                $(
                  go.Panel,
                  'Table',
                  { name: 'LIST' },
                  new go.Binding('itemArray', 'detail'),
                  new go.Binding('visible', 'visible'),
                  new go.Binding('height', 'height', (height) => (height ? 113 : 'unset')).makeTwoWay(),
                  {
                    stretch: go.GraphObject.Fill,
                    row: 1,
                    defaultAlignment: go.Spot.Left,
                    padding: new go.Margin(0, 8, 0, 8),
                    itemTemplate: itemTempl,
                  },
                ),
              ),
              $(
                go.Panel,
                'Vertical',
                {
                  // defaultStretch: go.GraphObject.None,
                  stretch: go.GraphObject.Fill,
                },
                new go.Binding('visible', 'visible').makeTwoWay(),
                $(
                  go.TextBlock,
                  { text: '更多', stroke: '#0075ff' },
                  {
                    alignment: go.Spot.Right,
                    margin: 5,
                  },
                  new go.Binding('visible', 'isMore').makeTwoWay(),
                  {
                    // second arg will be this GraphObject, which in this case is the Node itself:
                    mouseHover(_, node) {
                      showDataInfo(node, true);
                    },
                    mouseLeave(_, node) {
                      showDataInfo(node, false);
                    },
                    mouseOver() {
                      diagram.currentCursor = 'pointer';
                    },
                  },
                ),
              ),
            ),
          ),
          $(
            go.Panel,
            { width: 20, height: 20 },
            {
              mouseOver() {
                diagram.currentCursor = 'pointer';
              },
            },
            $(
              go.Picture,
              { width: 20, height: 20, source: img1 },
              new go.Binding('visible', 'isTreeLeaf', (leaf) => !leaf).ofObject(),
            ),
            $(
              go.Panel,
              'Table',
              { visible: false, desiredSize: new go.Size(20, 20) },
              // 绑定自定义数据
              new go.Binding('visible', 'isTreeLeaf', (leaf) => !leaf).ofObject(),
              $(
                go.Shape,
                {
                  name: 'ButtonIcon',
                  figure: 'MinusLine', // 自动生成几何图形 这里生成“-”
                  desiredSize: new go.Size(10, 10), // 尺寸
                },
                new go.Binding(
                  'figure',
                  'isCollapsed', // 根据collapsed函数的返回值设置图形是“+”还是“-”
                  (collapsed) => (collapsed ? 'PlusLine' : 'MinusLine'),
                ),
              ),
              {
                click(e, obj) {
                  e.diagram.startTransaction(); // 开始点击事件的标志函数
                  const node = obj.part;
                  if (node.data.isCollapsed) {
                    expandFrom(node, node);
                  } else {
                    collapseFrom(node, node);
                  }
                  e.diagram.commitTransaction('toggled visibility of dependencies'); // 提交点击事件的标志函数
                },
              },
            ),
          ),
        ),
      ),
    );
    // 数据服务节点
    diagram.nodeTemplateMap.add(
      'DATASERVICE',
      $(
        go.Node,
        'Auto',
        {
          movable: false, // 禁止拖动
          deletable: false, // 禁止删除
        },
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
            $(go.Placeholder),
          ), // end Adornment
        },
        { selectionObjectName: 'Content', selectionChanged: nodeSelectionChanged },
        new go.Binding('isSelected', 'select').makeTwoWay(),
        $(
          go.Panel,
          mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal',
          $(
            go.Panel,
            'Auto',
            { margin: 0, background: '#fff', name: 'Content' },
            $(go.Shape, 'Rectangle', {
              fill: '#fff',
              stroke: '#eee',
              strokeWidth: 1,
            }),
            $(
              go.Panel,
              'Vertical',
              $(
                go.Panel,
                'Table',
                { background: '#fff' },
                $(
                  go.Panel,
                  'TableRow',
                  { name: 'Pn', background: '#0075FF', opacity: 0.8 },
                  {
                    mouseLeave(_, obj) {
                      // obj参数是当前的节点node
                      // const position = node.findObject('TB').
                      showPopup(obj, false);
                    },
                    mouseOver() {
                      diagram.currentCursor = 'pointer';
                    },
                    mouseHover(_, obj) {
                      showPopup(obj, true);
                    },
                  },
                  $(
                    go.Picture,
                    { margin: new go.Margin(5, 8, 5, 8), width: 40, height: 40, alignment: go.Spot.Left },
                    new go.Binding('source'),
                  ),
                  $(
                    go.TextBlock,
                    {
                      alignment: go.Spot.Left,
                      margin: new go.Margin(0, 20, 0, 60),
                      font: '11pt sans-serif',
                      isMultiline: false,
                      editable: false,
                      stroke: '#fff',
                      overflow: go.TextBlock.OverflowEllipsis,
                      maxLines: 2,
                      width: nodeWidth || 150,
                    },
                    new go.Binding('text', 'table_title').makeTwoWay(),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
    // 算子
    diagram.nodeTemplateMap.add(
      'RECIPE',
      $(
        go.Node,
        'Auto', // the Shape will go around the TextBlock
        {
          movable: false, // 禁止拖动
          deletable: false, // 禁止删除
        },
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
            $(go.Placeholder),
          ), // end Adornment
        },
        { selectionObjectName: 'Content', selectionChanged: nodeSelectionChanged },
        new go.Binding('isSelected', 'select').makeTwoWay(),
        $(
          go.Shape,
          'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0, width: 70, height: 70 },
          new go.Binding('fill', 'color'),
        ),
        $(
          go.Picture,
          {
            mouseOver() {
              diagram.currentCursor = 'pointer';
            },
            mouseLeave(_, obj) {
              showPopup(obj, false);
              ifAddEvent = false;
            },
            mouseHover(_, obj) {
              if (!ifAddEvent) {
                ifAddEvent = true;
                showPopup(obj, true);
              }
            },
          },
          { width: 90, height: 90 },
          new go.Binding('source', 'icon'),
        ),
      ),
    );
    // 中间表
    diagram.nodeTemplateMap.add(
      'MIDDLE',
      $(
        go.Node,
        'Auto',
        {
          movable: false, // 禁止拖动
          deletable: false, // 禁止删除
        },
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            $(go.Shape, 'RoundedRectangle', { fill: null, stroke: 'dodgerblue', strokeWidth: 4 }),
            $(go.Placeholder),
          ), // end Adornment
        },
        { selectionObjectName: 'Content', selectionChanged: nodeSelectionChanged },
        new go.Binding('isSelected', 'select').makeTwoWay(),
        $(
          go.Panel,
          mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal',
          $(
            go.Panel,
            'Auto',
            { margin: 0, background: '#fff', name: 'Content' },

            $(go.Shape, 'Rectangle', {
              fill: '#fff',
              stroke: '#eeeeee',
              strokeWidth: 1,
            }),
            $(
              go.Panel,
              'Vertical',
              $(
                go.Panel,
                'Table',
                { background: '#fff' },
                $(
                  go.Panel,
                  'TableRow',
                  { background: '#0075FF' },
                  {
                    mouseLeave(_, obj) {
                      showPopup(obj, false);
                    },
                    mouseOver() {
                      diagram.currentCursor = 'pointer';
                    },
                    mouseHover(_, obj) {
                      showPopup(obj, true);
                    },
                  },
                  $(
                    go.Picture,
                    { margin: new go.Margin(5, 8, 5, 8), width: 40, height: 40, alignment: go.Spot.Left },
                    new go.Binding('source'),
                  ),
                  $(
                    go.TextBlock,
                    {
                      alignment: go.Spot.Left,
                      margin: new go.Margin(0, 20, 0, 60),
                      font: '11pt sans-serif',
                      isMultiline: false,
                      editable: false,
                      stroke: '#fff',
                      overflow: go.TextBlock.OverflowEllipsis,
                      maxLines: 2,
                      width: nodeWidth || 150,
                    },
                    new go.Binding('text', 'table_title').makeTwoWay(),
                  ),
                ),
                $(
                  go.Panel,
                  'Table',
                  { name: 'LIST' },
                  new go.Binding('itemArray', 'detail'),
                  new go.Binding('visible', 'visible'),
                  new go.Binding('height', 'height', (height) => (height ? 113 : 'unset')).makeTwoWay(),
                  {
                    stretch: go.GraphObject.Fill,
                    row: 1,
                    defaultAlignment: go.Spot.Left,
                    padding: new go.Margin(0, 8, 0, 8),
                    itemTemplate: itemTempl,
                  },
                ),
              ),
              $(
                go.Panel,
                'Vertical',
                {
                  // defaultStretch: go.GraphObject.Horizontal,
                  stretch: go.GraphObject.Fill,
                },
                new go.Binding('visible', 'visible').makeTwoWay(),
                $(
                  go.TextBlock,
                  { text: '更多', stroke: '#0075ff' },
                  {
                    alignment: go.Spot.Right,
                    margin: 5,
                  },
                  new go.Binding('visible', 'isMore').makeTwoWay(),
                  {
                    // second arg will be this GraphObject, which in this case is the Node itself:
                    mouseHover(_, node) {
                      showDataInfo(node, true);
                    },
                    mouseLeave(_, node) {
                      showDataInfo(node, false);
                    },
                    mouseOver() {
                      diagram.currentCursor = 'pointer';
                    },
                  },
                ),
              ),
            ),
          ),
          $(
            go.Panel,
            { width: 20, height: 20 },
            {
              mouseOver() {
                diagram.currentCursor = 'pointer';
              },
            },
            $(
              go.Picture,
              { width: 20, height: 20, source: img1 },
              new go.Binding('visible', 'isTreeLeaf', (leaf) => !leaf).ofObject(),
            ),
            $(
              go.Panel,
              'Table',
              { visible: false, desiredSize: new go.Size(20, 20) },
              // 绑定自定义数据
              new go.Binding('visible', 'isTreeLeaf', (leaf) => !leaf).ofObject(),
              $(
                go.Shape,
                {
                  name: 'ButtonIcon',
                  figure: 'MinusLine', // 自动生成几何图形 这里生成“-”
                  desiredSize: new go.Size(10, 10), // 尺寸
                },
                new go.Binding(
                  'figure',
                  'isCollapsed', // 根据collapsed函数的返回值设置图形是“+”还是“-”
                  (collapsed) => (collapsed ? 'PlusLine' : 'MinusLine'),
                ),
              ),
              {
                click(e, obj) {
                  e.diagram.startTransaction();
                  const node = obj.part;
                  if (node.data.isCollapsed) {
                    expandFrom(node, node);
                  } else {
                    collapseFrom(node, node);
                  }
                  e.diagram.commitTransaction('toggled visibility of dependencies');
                },
              },
            ),
          ),
        ),
      ),
    );

    diagram.addDiagramListener('BackgroundSingleClicked', () => '');

    diagram.commandHandler.zoomToFit(),
      (diagram.linkTemplate = $(
        go.Link,
        {
          toShortLength: 15,
          routing: go.Link.AvoidsNodes,
          corner: 10,
        }, // rounded corners
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' }),
      ));

    // eslint-disable-next-line arrow-body-style
    diagram.addDiagramListener('ObjectDoubleClicked', () => {
      return;
    });

    diagram.addDiagramListener('BackgroundDoubleClicked', () => '');
    return diagram;
  }

  // 收缩
  function collapseFrom(node, start) {
    if (node.data.isCollapsed) return;
    node.diagram.model.setDataProperty(node.data, 'isCollapsed', true);
    // eslint-disable-next-line no-param-reassign
    if (node !== start) node.visible = false;
    node.findNodesOutOf().each(collapseFrom);
  }

  // 展开
  function expandFrom(node, start) {
    if (!node.data.isCollapsed) return;
    node.diagram.model.setDataProperty(node.data, 'isCollapsed', false);
    // eslint-disable-next-line no-param-reassign
    if (node !== start) node.visible = true;
    node.findNodesOutOf().each(expandFrom);
  }

  function showDataInfo(node, Is) {
    if (Is) {
      const popup = document.getElementById('popInfo');
      if (popup) {
        return;
      }
      const app = document.getElementById('blood_wrap');
      const popInfo = document.createElement('div');
      const diagram = diagramRef.current.getDiagram();
      // const pt = diagram.lastInput.viewPoint;
      const loc = node.getDocumentPoint(go.Spot.BottomRight);
      const pos = diagram.transformDocToView(loc);
      popInfo.id = 'popInfo';
      popInfo.style = 'position:absolute;z-index:10000;background:#fff;box-shadow:0px 0px 5px 0px #eee';
      app.appendChild(popInfo);
      popInfo.style.left = `${pos.x + isMorePositions[0]}px`;
      popInfo.style.top = `${pos.y + isMorePositions[1]}px`;
      const renderDiv = isMoreTooltip(node.part.data);
      ReactDOM.render(<div className="content_wrap">{renderDiv}</div>, document.getElementById('popInfo'));
      popInfo.addEventListener('mouseleave', (e) => {
        // eslint-disable-next-line prefer-destructuring
        const canvas = document.getElementsByTagName('canvas')[0];
        // eslint-disable-next-line prefer-destructuring
        const position = canvas.getClientRects()[0];
        if (
          e.x < position.x ||
          e.y < position.y ||
          e.x > position.x + position.width ||
          e.y > position.y + position.height
        ) {
          app.removeChild(popInfo);
        }
      });
    } else {
      const popInfo = document.getElementById('popInfo');
      const app = document.getElementById('blood_wrap');
      if (popInfo) {
        app.removeChild(popInfo);
      }
    }
  }

  function showPopup(obj, ispopup) {
    if (ispopup) {
      const existPopup = document.getElementById('popup_style');
      if (existPopup) {
        return;
      }
      // const scollHeight = document.getElementById('app-container').scrollTop;
      const app = document.getElementById('blood_wrap');
      const popup = document.createElement('div');
      const diagram = diagramRef.current.getDiagram();
      const loc = obj.getDocumentPoint(go.Spot.TopLeft);
      const pos = diagram.transformDocToView(loc);
      popup.id = 'popup_style';
      popup.style = 'position:absolute;z-index:10000;background:#fff;box-shadow:0px 0px 5px 0px #eee';
      app.appendChild(popup);
      const detailData = obj.part.data;
      handleRenderDom(detailData, pos, popup);
      popup.addEventListener('mouseleave', (e) => {
        // eslint-disable-next-line prefer-destructuring
        const canvas = document.getElementsByTagName('canvas')[0];
        // eslint-disable-next-line prefer-destructuring
        const position = canvas.getClientRects()[0];
        if (
          e.x < position.x ||
          e.y < position.y ||
          e.x > position.x + position.width ||
          e.y > position.y + position.height
        ) {
          app.removeChild(popup);
        }
      });
    } else {
      const popup = document.getElementById('popup_style');
      const app = document.getElementById('blood_wrap');
      if (popup) {
        app.removeChild(popup);
      }
    }
  }

  function handleRenderDom(detailData, pt, popup) {
    onHoverNode && onHoverNode(detailData);
    if (detailData) {
      const popUp = popup;
      if (detailData.category === 'DATASET' || detailData.category === 'MIDDLE') {
        popUp.style.left = `${pt.x + tablePositions[0]}px`;
        popUp.style.top = `${pt.y + tablePositions[1]}px`;
        const renderDiv = tableTooltip(detailData);
        ReactDOM.render(<div>{renderDiv}</div>, document.getElementById('popup_style'));
      } else if (detailData.category === 'RECIPE') {
        popUp.style.left = `${pt.x + recipePositions[0]}px`;
        popUp.style.top = `${pt.y + recipePositions[1]}px`;
        const renderDiv = transformpTooltip(detailData);
        ReactDOM.render(<div>{renderDiv}</div>, document.getElementById('popup_style'));
      } else if (detailData.category === 'DATASERVICE') {
        popUp.style.left = `${pt.x + tablePositions[0]}px`;
        popUp.style.top = `${pt.y + tablePositions[1]}px`;
        const renderDiv = serverTooltip(detailData);
        ReactDOM.render(<div>{renderDiv}</div>, document.getElementById('popup_style'));
      }
    } else return;
  }

  function handleClick(e) {
    if (e.target.checked) {
      const arr = nodeArr.map((v) => ({
        ...v,
        visible: true,
      }));
      setNodeArr(arr);
    } else {
      const arr = nodeArr.map((v) => ({
        ...v,
        visible: false,
      }));
      setNodeArr(arr);
    }
  }
  const handleEnlarge = () => {
    const diagram = diagramRef.current.getDiagram();
    diagram.commandHandler.increaseZoom();
  };
  const handleNarrow = () => {
    const diagram = diagramRef.current.getDiagram();
    diagram.commandHandler.decreaseZoom();
  };
  const nodeSelectionChanged = (node) => {
    const diagram = diagramRef.current.getDiagram();
    if (node.isSelected) {
      // 节点选中执行的内容
      // console.log(node.data);// 节点的属性信息
      // console.log(node.data.key);// 拿到节点的Key,拿其他属性类似
      const node1 = diagram.model.findNodeDataForKey(node.data.key);
      onClickNode && onClickNode(node.data);
      diagram.model.setDataProperty(node1, 'select', true);
    } else {
      // 节点取消选中执行的内容
      const node1 = diagram.model.findNodeDataForKey(node.data.key);
      diagram.model.setDataProperty(node1, 'select', false);
    }
  };
  const handleReload = () => {
    const diagram = diagramRef.current.getDiagram();
    diagram.scale = 1;
    const model = diagram.model.toJson();
    diagram.model = go.Model.fromJson(model);
  };
  const getTextWidth = (str, fontSize) => {
    let result = 0;
    const ele = document.createElement('span');
    // 字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
    // str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
    ele.innerText = str;
    // 不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
    ele.style.fontSize = fontSize;

    // 由于父节点的样式会影响子节点，这里可按需添加到指定节点上
    document.documentElement.append(ele);

    result = ele.offsetWidth;

    document.documentElement.removeChild(ele);
    return result;
  };

  useEffect(() => {
    let key = false;

    const keydownChange = (event) => {
      if (event.keyCode === 91 || event.keyCode === 18) {
        key = true;
        document.body.style.overflow = 'hidden';
      }
    };
    const keyupChange = (event) => {
      if (event.keyCode === 91 || event.keyCode === 18) {
        key = false;
        document.body.style.overflow = 'auto';
      }
    };
    const mousewheelChange = (e) => {
      const diagram = diagramRef.current.getDiagram();
      const ev = e || window.event;
      let down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
      down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
      if (down && key) {
        diagram.commandHandler.decreaseZoom();
      } else if (!down && key) {
        diagram.commandHandler.increaseZoom();
      }
      return false;
    };
    window.addEventListener('keydown', keydownChange);
    window.addEventListener('keyup', keyupChange);
    window.addEventListener('mousewheel', mousewheelChange);
    return () => {
      window.removeEventListener('keydown', keydownChange);
      window.removeEventListener('keyup', keyupChange);
      window.removeEventListener('mousewheel', mousewheelChange);
    };
  }, []);

  useEffect(() => {
    if (nodeDataArray.length > 0) {
      setNodeArr(nodeDataArray);
      setLinkArr(linkDataArray);
      // setLoading(false);
      // setMaskChecked(false);
    }
  }, [nodeDataArray, linkDataArray, superior, subordinate, mode]);
  return (
    <div id="blood_wrap">
      <Loading loading={load || false} text="加载中..." mask={load || false} className="loading_style">
        <div className="blood_style">
          <div className="relation_top_wrap">
            <div className="relation_top_info">
              <div className="up_info">直接上游:{superior}</div>
              <div className="down_info">直接下游:{subordinate}</div>
            </div>
            <div className="realtion_top_switch">
              <div className="switch_wrap">
                <div>字段展开:</div>
                <Switch className="switch_wrap_content" defaultChecked={true} onClick={handleClick} />
              </div>
              <div className="realtion_btn_wrap">
                <div>
                  <Tooltip message={<div>定位到中心位置</div>} triggerType="hover" dark>
                    <Button onClick={handleReload} size="large" icon="location"></Button>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip message={<div>放大</div>} triggerType="hover" dark>
                    <Button onClick={handleEnlarge} size="large" icon="line_circle_add"></Button>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip message={<div>缩小</div>} triggerType="hover" dark>
                    <Button onClick={handleNarrow} size="large" icon="line_circle_remove"></Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <ReactDiagram
            ref={diagramRef}
            copiesArrays={true}
            copiesArrayObjects={true}
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={nodeArr}
            linkDataArray={linkArr}
            onModelChange={onModelChange}
          />
        </div>
      </Loading>
    </div>
  );
}
