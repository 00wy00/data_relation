"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Dome;

var _react = _interopRequireWildcard(require("react"));

var go = _interopRequireWildcard(require("gojs"));

var _gojsReact = require("gojs-react");

require("./index.css");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _circle = _interopRequireDefault(require("./circle.png"));

var _careUiReact = require("@tencent/care-ui-react");

require("@tencent/care-ui-react/dist/care-ui.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Dome(props) {
  var superior = props.superior,
      linkDataArray = props.linkDataArray,
      subordinate = props.subordinate,
      onModelChange = props.onModelChange,
      onHoverNode = props.onHoverNode,
      nodeDataArray = props.nodeDataArray,
      tableTooltip = props.tableTooltip,
      serverTooltip = props.serverTooltip,
      transformpTooltip = props.transformpTooltip,
      onClickNode = props.onClickNode,
      hoverDelay = props.hoverDelay,
      scale = props.scale,
      minScale = props.minScale,
      maxScale = props.maxScale,
      allowZoom = props.allowZoom,
      isMoreTooltip = props.isMoreTooltip,
      mode = props.mode,
      nodeWidth = props.nodeWidth,
      tablePositions = props.tablePositions,
      recipePositions = props.recipePositions,
      isMorePositions = props.isMorePositions,
      load = props.load;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      nodeArr = _useState2[0],
      setNodeArr = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      linkArr = _useState4[0],
      setLinkArr = _useState4[1]; // const [maskChecked, setMaskChecked] = useState(true);
  // const [loading, setLoading] = useState(true);
  // const [treeMode, setTreeMode] = useState([]);


  var currentFontSize = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '');
  var diagramRef = (0, _react.useRef)();

  function initDiagram() {
    var $ = go.GraphObject.make;
    var diagram = $(go.Diagram, {
      defaultScale: scale || 1,
      // 初始视图大小比例
      minScale: minScale || 0.5,
      // 最小视图的缩小比例
      maxScale: maxScale || 2.5,
      // 最大视图的放大比例
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
      'grid.visible': false,
      // 是否显示背景栅格
      'grid.gridCellSize': new go.Size(5, 5),
      // 栅格大小
      'commandHandler.copiesTree': false,
      // 禁用复制快捷键
      'commandHandler.deletesTree': false,
      // 禁用删除快捷键
      // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 启用视图放大缩小
      // allowLink: true, // 是否允许拖拽连线
      // allowRelink: true, // 是否允许重新连线
      padding: 10,
      'undoManager.isEnabled': true,
      // enable undo & redo
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel

      }),
      layout: $(go.LayeredDigraphLayout, {
        direction: mode && mode === 'Vertical' ? 90 : 0,
        layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
      }) // 点击节点时，不显示边框
      // nodeSelectionAdornmentTemplate:
      //   $(
      //     go.Adornment, 'Auto',
      //     $(go.Shape, 'Rectangle', { fill: 'white', stroke: null }),
      //   ),

    });
    diagram.layoutDiagram(true);
    var itemTempl = $(go.Panel, 'TableRow', {
      mouseHover: function mouseHover(_, obj) {
        var data = obj.data; // eslint-disable-next-line no-param-reassign

        obj.data = _objectSpread(_objectSpread({}, data), {}, {
          bcg: true,
          strLength: getTextWidth(data.name, currentFontSize.fontSize) > nodeWidth + 13
        });
      },
      mouseLeave: function mouseLeave(_, obj) {
        var data = obj.data; // eslint-disable-next-line no-param-reassign

        obj.data = _objectSpread(_objectSpread({}, data), {}, {
          bcg: false,
          strLength: false
        });
      }
    }, new go.Binding('background', 'bcg', function (bcg) {
      return bcg === true ? '#eee' : '#fff';
    }), $(go.TextBlock, {
      isMultiline: false,
      editable: false,
      // row: 1,
      // column: 1,
      // alignment: go.Spot.Left,
      // margin: new go.Margin(0, 40, 0, 0),
      width: nodeWidth,
      maxLines: 1,
      wrap: go.TextBlock.None,
      overflow: go.TextBlock.OverflowEllipsis
    }, new go.Binding('text', 'name').makeTwoWay(), {
      // define a tooltip for each node that displays the color as text
      toolTip: $('ToolTip', $(go.TextBlock, {
        margin: 4
      }, new go.Binding('text', 'name')), new go.Binding('visible', 'strLength').makeTwoWay()) // end of Adornment

    }), $(go.TextBlock, {
      isMultiline: false,
      editable: false,
      stroke: '#333',
      opacity: 0.4,
      // row: 1,
      column: 1,
      margin: new go.Margin(4, 0, 4, 0),
      textAlign: 'end',
      alignment: go.Spot.Right
    }, new go.Binding('text', 'type').makeTwoWay())); // function diagramInfo(model) {
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

    var ifAddEvent = false; // Horizontal 水平   Vertical垂直
    // 上下级表

    diagram.nodeTemplateMap.add('DATASET', $(go.Node, 'Auto', {
      movable: false,
      // 禁止拖动
      deletable: false // 禁止删除

    }, {
      selectionAdornmentTemplate: $(go.Adornment, 'Auto', $(go.Shape, 'RoundedRectangle', {
        fill: null,
        stroke: 'dodgerblue',
        strokeWidth: 4
      }), $(go.Placeholder)) // end Adornment

    }, {
      selectionObjectName: 'Content',
      selectionChanged: nodeSelectionChanged
    }, new go.Binding('isSelected', 'select').makeTwoWay(), $(go.Panel, mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal', $(go.Panel, 'Auto', {
      margin: 0,
      background: '#fff',
      name: 'Content'
    }, $(go.Shape, 'Rectangle', {
      fill: '#fff',
      stroke: '#eee',
      strokeWidth: 1
    }), $(go.Panel, 'Vertical', $(go.Panel, 'Table', {
      background: '#fff'
    }, $(go.Panel, 'TableRow', {
      name: 'Pn',
      background: '#0075FF',
      opacity: 0.8
    }, {
      mouseLeave: function mouseLeave(_, obj) {
        // obj参数是当前的节点node
        // const position = node.findObject('TB').
        showPopup(obj, false);
      },
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      },
      mouseHover: function mouseHover(_, obj) {
        showPopup(obj, true);
      }
    }, $(go.Picture, {
      margin: new go.Margin(5, 8, 5, 8),
      width: 40,
      height: 40,
      alignment: go.Spot.Left
    }, new go.Binding('source')), $(go.TextBlock, {
      alignment: go.Spot.Left,
      margin: new go.Margin(0, 20, 0, 60),
      font: '11pt sans-serif',
      isMultiline: false,
      editable: false,
      stroke: '#fff',
      overflow: go.TextBlock.OverflowEllipsis,
      maxLines: 2,
      width: nodeWidth || 150
    }, new go.Binding('text', 'table_title').makeTwoWay())), $(go.Panel, 'Table', {
      name: 'LIST'
    }, new go.Binding('itemArray', 'detail'), new go.Binding('visible', 'visible'), new go.Binding('height', 'height', function (height) {
      return height ? 113 : 'unset';
    }).makeTwoWay(), {
      stretch: go.GraphObject.Fill,
      row: 1,
      defaultAlignment: go.Spot.Left,
      padding: new go.Margin(0, 8, 0, 8),
      itemTemplate: itemTempl
    })), $(go.Panel, 'Vertical', {
      // defaultStretch: go.GraphObject.None,
      stretch: go.GraphObject.Fill
    }, new go.Binding('visible', 'visible').makeTwoWay(), $(go.TextBlock, {
      text: '更多',
      stroke: '#0075ff'
    }, {
      alignment: go.Spot.Right,
      margin: 5
    }, new go.Binding('visible', 'isMore').makeTwoWay(), {
      // second arg will be this GraphObject, which in this case is the Node itself:
      mouseHover: function mouseHover(_, node) {
        showDataInfo(node, true);
      },
      mouseLeave: function mouseLeave(_, node) {
        showDataInfo(node, false);
      },
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      }
    })))), $(go.Panel, {
      width: 20,
      height: 20
    }, {
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      }
    }, $(go.Picture, {
      width: 20,
      height: 20,
      source: _circle["default"]
    }, new go.Binding('visible', 'isTreeLeaf', function (leaf) {
      return !leaf;
    }).ofObject()), $(go.Panel, 'Table', {
      visible: false,
      desiredSize: new go.Size(20, 20)
    }, // 绑定自定义数据
    new go.Binding('visible', 'isTreeLeaf', function (leaf) {
      return !leaf;
    }).ofObject(), $(go.Shape, {
      name: 'ButtonIcon',
      figure: 'MinusLine',
      // 自动生成几何图形 这里生成“-”
      desiredSize: new go.Size(10, 10) // 尺寸

    }, new go.Binding('figure', 'isCollapsed', // 根据collapsed函数的返回值设置图形是“+”还是“-”
    function (collapsed) {
      return collapsed ? 'PlusLine' : 'MinusLine';
    })), {
      click: function click(e, obj) {
        e.diagram.startTransaction(); // 开始点击事件的标志函数

        var node = obj.part;

        if (node.data.isCollapsed) {
          expandFrom(node, node);
        } else {
          collapseFrom(node, node);
        }

        e.diagram.commitTransaction('toggled visibility of dependencies'); // 提交点击事件的标志函数
      }
    }))))); // 数据服务节点

    diagram.nodeTemplateMap.add('DATASERVICE', $(go.Node, 'Auto', {
      movable: false,
      // 禁止拖动
      deletable: false // 禁止删除

    }, {
      selectionAdornmentTemplate: $(go.Adornment, 'Auto', $(go.Shape, 'RoundedRectangle', {
        fill: null,
        stroke: 'dodgerblue',
        strokeWidth: 4
      }), $(go.Placeholder)) // end Adornment

    }, {
      selectionObjectName: 'Content',
      selectionChanged: nodeSelectionChanged
    }, new go.Binding('isSelected', 'select').makeTwoWay(), $(go.Panel, mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal', $(go.Panel, 'Auto', {
      margin: 0,
      background: '#fff',
      name: 'Content'
    }, $(go.Shape, 'Rectangle', {
      fill: '#fff',
      stroke: '#eee',
      strokeWidth: 1
    }), $(go.Panel, 'Vertical', $(go.Panel, 'Table', {
      background: '#fff'
    }, $(go.Panel, 'TableRow', {
      name: 'Pn',
      background: '#0075FF',
      opacity: 0.8
    }, {
      mouseLeave: function mouseLeave(_, obj) {
        // obj参数是当前的节点node
        // const position = node.findObject('TB').
        showPopup(obj, false);
      },
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      },
      mouseHover: function mouseHover(_, obj) {
        showPopup(obj, true);
      }
    }, $(go.Picture, {
      margin: new go.Margin(5, 8, 5, 8),
      width: 40,
      height: 40,
      alignment: go.Spot.Left
    }, new go.Binding('source')), $(go.TextBlock, {
      alignment: go.Spot.Left,
      margin: new go.Margin(0, 20, 0, 60),
      font: '11pt sans-serif',
      isMultiline: false,
      editable: false,
      stroke: '#fff',
      overflow: go.TextBlock.OverflowEllipsis,
      maxLines: 2,
      width: nodeWidth || 150
    }, new go.Binding('text', 'table_title').makeTwoWay())))))))); // 算子

    diagram.nodeTemplateMap.add('RECIPE', $(go.Node, 'Auto', // the Shape will go around the TextBlock
    {
      movable: false,
      // 禁止拖动
      deletable: false // 禁止删除

    }, {
      selectionAdornmentTemplate: $(go.Adornment, 'Auto', $(go.Shape, 'RoundedRectangle', {
        fill: null,
        stroke: 'dodgerblue',
        strokeWidth: 4
      }), $(go.Placeholder)) // end Adornment

    }, {
      selectionObjectName: 'Content',
      selectionChanged: nodeSelectionChanged
    }, new go.Binding('isSelected', 'select').makeTwoWay(), $(go.Shape, 'RoundedRectangle', {
      name: 'SHAPE',
      fill: 'white',
      strokeWidth: 0,
      width: 70,
      height: 70
    }, new go.Binding('fill', 'color')), $(go.Picture, {
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      },
      mouseLeave: function mouseLeave(_, obj) {
        showPopup(obj, false);
        ifAddEvent = false;
      },
      mouseHover: function mouseHover(_, obj) {
        if (!ifAddEvent) {
          ifAddEvent = true;
          showPopup(obj, true);
        }
      }
    }, {
      width: 90,
      height: 90
    }, new go.Binding('source', 'icon')))); // 中间表

    diagram.nodeTemplateMap.add('MIDDLE', $(go.Node, 'Auto', {
      movable: false,
      // 禁止拖动
      deletable: false // 禁止删除

    }, {
      selectionAdornmentTemplate: $(go.Adornment, 'Auto', $(go.Shape, 'RoundedRectangle', {
        fill: null,
        stroke: 'dodgerblue',
        strokeWidth: 4
      }), $(go.Placeholder)) // end Adornment

    }, {
      selectionObjectName: 'Content',
      selectionChanged: nodeSelectionChanged
    }, new go.Binding('isSelected', 'select').makeTwoWay(), $(go.Panel, mode && mode === 'Vertical' ? 'Vertical' : 'Horizontal', $(go.Panel, 'Auto', {
      margin: 0,
      background: '#fff',
      name: 'Content'
    }, $(go.Shape, 'Rectangle', {
      fill: '#fff',
      stroke: '#eeeeee',
      strokeWidth: 1
    }), $(go.Panel, 'Vertical', $(go.Panel, 'Table', {
      background: '#fff'
    }, $(go.Panel, 'TableRow', {
      background: '#0075FF'
    }, {
      mouseLeave: function mouseLeave(_, obj) {
        showPopup(obj, false);
      },
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      },
      mouseHover: function mouseHover(_, obj) {
        showPopup(obj, true);
      }
    }, $(go.Picture, {
      margin: new go.Margin(5, 8, 5, 8),
      width: 40,
      height: 40,
      alignment: go.Spot.Left
    }, new go.Binding('source')), $(go.TextBlock, {
      alignment: go.Spot.Left,
      margin: new go.Margin(0, 20, 0, 60),
      font: '11pt sans-serif',
      isMultiline: false,
      editable: false,
      stroke: '#fff',
      overflow: go.TextBlock.OverflowEllipsis,
      maxLines: 2,
      width: nodeWidth || 150
    }, new go.Binding('text', 'table_title').makeTwoWay())), $(go.Panel, 'Table', {
      name: 'LIST'
    }, new go.Binding('itemArray', 'detail'), new go.Binding('visible', 'visible'), new go.Binding('height', 'height', function (height) {
      return height ? 113 : 'unset';
    }).makeTwoWay(), {
      stretch: go.GraphObject.Fill,
      row: 1,
      defaultAlignment: go.Spot.Left,
      padding: new go.Margin(0, 8, 0, 8),
      itemTemplate: itemTempl
    })), $(go.Panel, 'Vertical', {
      // defaultStretch: go.GraphObject.Horizontal,
      stretch: go.GraphObject.Fill
    }, new go.Binding('visible', 'visible').makeTwoWay(), $(go.TextBlock, {
      text: '更多',
      stroke: '#0075ff'
    }, {
      alignment: go.Spot.Right,
      margin: 5
    }, new go.Binding('visible', 'isMore').makeTwoWay(), {
      // second arg will be this GraphObject, which in this case is the Node itself:
      mouseHover: function mouseHover(_, node) {
        showDataInfo(node, true);
      },
      mouseLeave: function mouseLeave(_, node) {
        showDataInfo(node, false);
      },
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      }
    })))), $(go.Panel, {
      width: 20,
      height: 20
    }, {
      mouseOver: function mouseOver() {
        diagram.currentCursor = 'pointer';
      }
    }, $(go.Picture, {
      width: 20,
      height: 20,
      source: _circle["default"]
    }, new go.Binding('visible', 'isTreeLeaf', function (leaf) {
      return !leaf;
    }).ofObject()), $(go.Panel, 'Table', {
      visible: false,
      desiredSize: new go.Size(20, 20)
    }, // 绑定自定义数据
    new go.Binding('visible', 'isTreeLeaf', function (leaf) {
      return !leaf;
    }).ofObject(), $(go.Shape, {
      name: 'ButtonIcon',
      figure: 'MinusLine',
      // 自动生成几何图形 这里生成“-”
      desiredSize: new go.Size(10, 10) // 尺寸

    }, new go.Binding('figure', 'isCollapsed', // 根据collapsed函数的返回值设置图形是“+”还是“-”
    function (collapsed) {
      return collapsed ? 'PlusLine' : 'MinusLine';
    })), {
      click: function click(e, obj) {
        e.diagram.startTransaction();
        var node = obj.part;

        if (node.data.isCollapsed) {
          expandFrom(node, node);
        } else {
          collapseFrom(node, node);
        }

        e.diagram.commitTransaction('toggled visibility of dependencies');
      }
    })))));
    diagram.addDiagramListener('BackgroundSingleClicked', function () {
      return '';
    });
    diagram.commandHandler.zoomToFit(), diagram.linkTemplate = $(go.Link, {
      toShortLength: 15,
      routing: go.Link.AvoidsNodes,
      corner: 10
    }, // rounded corners
    $(go.Shape), $(go.Shape, {
      toArrow: 'Standard'
    })); // eslint-disable-next-line arrow-body-style

    diagram.addDiagramListener('ObjectDoubleClicked', function () {
      return;
    });
    diagram.addDiagramListener('BackgroundDoubleClicked', function () {
      return '';
    });
    return diagram;
  } // 收缩


  function collapseFrom(node, start) {
    if (node.data.isCollapsed) return;
    node.diagram.model.setDataProperty(node.data, 'isCollapsed', true); // eslint-disable-next-line no-param-reassign

    if (node !== start) node.visible = false;
    node.findNodesOutOf().each(collapseFrom);
  } // 展开


  function expandFrom(node, start) {
    if (!node.data.isCollapsed) return;
    node.diagram.model.setDataProperty(node.data, 'isCollapsed', false); // eslint-disable-next-line no-param-reassign

    if (node !== start) node.visible = true;
    node.findNodesOutOf().each(expandFrom);
  }

  function showDataInfo(node, Is) {
    if (Is) {
      var popup = document.getElementById('popInfo');

      if (popup) {
        return;
      }

      var app = document.getElementById('blood_wrap');
      var popInfo = document.createElement('div');
      var diagram = diagramRef.current.getDiagram(); // const pt = diagram.lastInput.viewPoint;

      var loc = node.getDocumentPoint(go.Spot.BottomRight);
      var pos = diagram.transformDocToView(loc);
      popInfo.id = 'popInfo';
      popInfo.style = 'position:absolute;z-index:10000;background:#fff;box-shadow:0px 0px 5px 0px #eee';
      app.appendChild(popInfo);
      popInfo.style.left = "".concat(pos.x + isMorePositions[0], "px");
      popInfo.style.top = "".concat(pos.y + isMorePositions[1], "px");
      var renderDiv = isMoreTooltip(node.part.data);

      _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement("div", {
        className: "content_wrap"
      }, renderDiv), document.getElementById('popInfo'));

      popInfo.addEventListener('mouseleave', function (e) {
        // eslint-disable-next-line prefer-destructuring
        var canvas = document.getElementsByTagName('canvas')[0]; // eslint-disable-next-line prefer-destructuring

        var position = canvas.getClientRects()[0];

        if (e.x < position.x || e.y < position.y || e.x > position.x + position.width || e.y > position.y + position.height) {
          app.removeChild(popInfo);
        }
      });
    } else {
      var _popInfo = document.getElementById('popInfo');

      var _app = document.getElementById('blood_wrap');

      if (_popInfo) {
        _app.removeChild(_popInfo);
      }
    }
  }

  function showPopup(obj, ispopup) {
    if (ispopup) {
      var existPopup = document.getElementById('popup_style');

      if (existPopup) {
        return;
      } // const scollHeight = document.getElementById('app-container').scrollTop;


      var app = document.getElementById('blood_wrap');
      var popup = document.createElement('div');
      var diagram = diagramRef.current.getDiagram();
      var loc = obj.getDocumentPoint(go.Spot.TopLeft);
      var pos = diagram.transformDocToView(loc);
      popup.id = 'popup_style';
      popup.style = 'position:absolute;z-index:10000;background:#fff;box-shadow:0px 0px 5px 0px #eee';
      app.appendChild(popup);
      var detailData = obj.part.data;
      handleRenderDom(detailData, pos, popup);
      popup.addEventListener('mouseleave', function (e) {
        // eslint-disable-next-line prefer-destructuring
        var canvas = document.getElementsByTagName('canvas')[0]; // eslint-disable-next-line prefer-destructuring

        var position = canvas.getClientRects()[0];

        if (e.x < position.x || e.y < position.y || e.x > position.x + position.width || e.y > position.y + position.height) {
          app.removeChild(popup);
        }
      });
    } else {
      var _popup = document.getElementById('popup_style');

      var _app2 = document.getElementById('blood_wrap');

      if (_popup) {
        _app2.removeChild(_popup);
      }
    }
  }

  function handleRenderDom(detailData, pt, popup) {
    onHoverNode && onHoverNode(detailData);

    if (detailData) {
      var popUp = popup;

      if (detailData.category === 'DATASET' || detailData.category === 'MIDDLE') {
        popUp.style.left = "".concat(pt.x + tablePositions[0], "px");
        popUp.style.top = "".concat(pt.y + tablePositions[1], "px");
        var renderDiv = tableTooltip(detailData);

        _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement("div", null, renderDiv), document.getElementById('popup_style'));
      } else if (detailData.category === 'RECIPE') {
        popUp.style.left = "".concat(pt.x + recipePositions[0], "px");
        popUp.style.top = "".concat(pt.y + recipePositions[1], "px");

        var _renderDiv = transformpTooltip(detailData);

        _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement("div", null, _renderDiv), document.getElementById('popup_style'));
      } else if (detailData.category === 'DATASERVICE') {
        popUp.style.left = "".concat(pt.x + tablePositions[0], "px");
        popUp.style.top = "".concat(pt.y + tablePositions[1], "px");

        var _renderDiv2 = serverTooltip(detailData);

        _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement("div", null, _renderDiv2), document.getElementById('popup_style'));
      }
    } else return;
  }

  function handleClick(e) {
    if (e.target.checked) {
      var arr = nodeArr.map(function (v) {
        return _objectSpread(_objectSpread({}, v), {}, {
          visible: true
        });
      });
      setNodeArr(arr);
    } else {
      var _arr2 = nodeArr.map(function (v) {
        return _objectSpread(_objectSpread({}, v), {}, {
          visible: false
        });
      });

      setNodeArr(_arr2);
    }
  }

  var handleEnlarge = function handleEnlarge() {
    var diagram = diagramRef.current.getDiagram();
    diagram.commandHandler.increaseZoom();
  };

  var handleNarrow = function handleNarrow() {
    var diagram = diagramRef.current.getDiagram();
    diagram.commandHandler.decreaseZoom();
  };

  var nodeSelectionChanged = function nodeSelectionChanged(node) {
    var diagram = diagramRef.current.getDiagram();

    if (node.isSelected) {
      // 节点选中执行的内容
      // console.log(node.data);// 节点的属性信息
      // console.log(node.data.key);// 拿到节点的Key,拿其他属性类似
      var node1 = diagram.model.findNodeDataForKey(node.data.key);
      onClickNode && onClickNode(node.data);
      diagram.model.setDataProperty(node1, 'select', true);
    } else {
      // 节点取消选中执行的内容
      var _node = diagram.model.findNodeDataForKey(node.data.key);

      diagram.model.setDataProperty(_node, 'select', false);
    }
  };

  var handleReload = function handleReload() {
    var diagram = diagramRef.current.getDiagram();
    diagram.scale = 1;
    var model = diagram.model.toJson();
    diagram.model = go.Model.fromJson(model);
  };

  var getTextWidth = function getTextWidth(str, fontSize) {
    var result = 0;
    var ele = document.createElement('span'); // 字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
    // str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');

    ele.innerText = str; // 不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息

    ele.style.fontSize = fontSize; // 由于父节点的样式会影响子节点，这里可按需添加到指定节点上

    document.documentElement.append(ele);
    result = ele.offsetWidth;
    document.documentElement.removeChild(ele);
    return result;
  };

  (0, _react.useEffect)(function () {
    var key = false;

    var keydownChange = function keydownChange(event) {
      if (event.keyCode === 91 || event.keyCode === 18) {
        key = true;
        document.body.style.overflow = 'hidden';
      }
    };

    var keyupChange = function keyupChange(event) {
      if (event.keyCode === 91 || event.keyCode === 18) {
        key = false;
        document.body.style.overflow = 'auto';
      }
    };

    var mousewheelChange = function mousewheelChange(e) {
      var diagram = diagramRef.current.getDiagram();
      var ev = e || window.event;
      var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作

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
    return function () {
      window.removeEventListener('keydown', keydownChange);
      window.removeEventListener('keyup', keyupChange);
      window.removeEventListener('mousewheel', mousewheelChange);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (nodeDataArray.length > 0) {
      setNodeArr(nodeDataArray);
      setLinkArr(linkDataArray); // setLoading(false);
      // setMaskChecked(false);
    }
  }, [nodeDataArray, linkDataArray, superior, subordinate, mode]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "blood_wrap"
  }, /*#__PURE__*/_react["default"].createElement(_careUiReact.Loading, {
    loading: load || false,
    text: "\u52A0\u8F7D\u4E2D...",
    mask: load || false,
    className: "loading_style"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "blood_style"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relation_top_wrap"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relation_top_info"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "up_info"
  }, "\u76F4\u63A5\u4E0A\u6E38:", superior), /*#__PURE__*/_react["default"].createElement("div", {
    className: "down_info"
  }, "\u76F4\u63A5\u4E0B\u6E38:", subordinate)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "realtion_top_switch"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "switch_wrap"
  }, /*#__PURE__*/_react["default"].createElement("div", null, "\u5B57\u6BB5\u5C55\u5F00:"), /*#__PURE__*/_react["default"].createElement(_careUiReact.Switch, {
    className: "switch_wrap_content",
    defaultChecked: true,
    onClick: handleClick
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "realtion_btn_wrap"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_careUiReact.Tooltip, {
    message: /*#__PURE__*/_react["default"].createElement("div", null, "\u5B9A\u4F4D\u5230\u4E2D\u5FC3\u4F4D\u7F6E"),
    triggerType: "hover",
    dark: true
  }, /*#__PURE__*/_react["default"].createElement(_careUiReact.Button, {
    onClick: handleReload,
    size: "large",
    icon: "location"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_careUiReact.Tooltip, {
    message: /*#__PURE__*/_react["default"].createElement("div", null, "\u653E\u5927"),
    triggerType: "hover",
    dark: true
  }, /*#__PURE__*/_react["default"].createElement(_careUiReact.Button, {
    onClick: handleEnlarge,
    size: "large",
    icon: "line_circle_add"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_careUiReact.Tooltip, {
    message: /*#__PURE__*/_react["default"].createElement("div", null, "\u7F29\u5C0F"),
    triggerType: "hover",
    dark: true
  }, /*#__PURE__*/_react["default"].createElement(_careUiReact.Button, {
    onClick: handleNarrow,
    size: "large",
    icon: "line_circle_remove"
  })))))), /*#__PURE__*/_react["default"].createElement(_gojsReact.ReactDiagram, {
    ref: diagramRef,
    copiesArrays: true,
    copiesArrayObjects: true,
    initDiagram: initDiagram,
    divClassName: "diagram-component",
    nodeDataArray: nodeArr,
    linkDataArray: linkArr,
    onModelChange: onModelChange
  }))));
}