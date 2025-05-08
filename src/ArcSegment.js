import React from "react"; // 引入 React // Import React
import "./ArcSegment.css"; // 引入样式文件 // Import CSS styles

// ArcSegment 是一个绘制圆环扇形的可复用组件
// ArcSegment is a reusable component to draw a ring-shaped arc
export default function ArcSegment({
  innerRadius, // 内半径 // Inner radius
  outerRadius, // 外半径 // Outer radius
  startAngle, // 起始角度 // Start angle
  endAngle, // 结束角度 // End angle
  fill, // 填充颜色 // Fill color
  onMouseEnter, // 鼠标进入事件 // Mouse enter event
  onMouseLeave, // 鼠标离开事件 // Mouse leave event
  onMouseMove, // 鼠标移动事件 // Mouse move event
  onClick, // 鼠标点击事件 // Mouse click event
}) {
  const center = 500; // 圆心坐标固定为 (500, 500) // Center of the circle

  // 将角度 + 半径 转换为 (x, y) 坐标
  // Convert polar coordinates (angle + radius) to cartesian (x, y)
  const toCartesian = (angleDeg, radius) => {
    const rad = (angleDeg - 90) * (Math.PI / 180); // 转为弧度 // Convert to radians
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  // 计算路径的四个关键点 // Calculate the 4 key points of the arc
  const startOuter = toCartesian(startAngle, outerRadius); // 外弧起点 // Outer arc start
  const endOuter = toCartesian(endAngle, outerRadius); // 外弧终点 // Outer arc end
  const startInner = toCartesian(endAngle, innerRadius); // 内弧起点 // Inner arc start
  const endInner = toCartesian(startAngle, innerRadius); // 内弧终点 // Inner arc end

  const angleDiff = (endAngle - startAngle + 360) % 360;
  const largeArc = angleDiff > 180 ? 1 : 0;
  // 判断是否是大弧 // Determine if large arc

  // 构造 SVG 路径数据 // Construct SVG path string
  const pathData = [
    `M ${startOuter.x} ${startOuter.y}`, // 移动到外弧起点 // Move to outer start
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`, // 外弧 // Outer arc
    `L ${startInner.x} ${startInner.y}`, // 连线到内弧起点 // Line to inner start
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`, // 内弧 // Inner arc
    "Z", // 闭合路径 // Close path
  ].join(" ");

  return (
    <g>
      <path
        className="arc-segment" // 给样式用的 class // CSS class
        d={pathData} // SVG 路径数据 // Path data
        fill={fill} // 填充颜色 // Fill color
        stroke="#fff" // 白色边框 // White border
        strokeWidth="1" // 边框宽度 // Border width
        onMouseEnter={onMouseEnter} // 绑定事件 // Bind events
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onClick={onClick}
      />
    </g>
  );
}
// 表单组件，用于选择某个扇形的 level 等级
// SectorForm component — select a level from a sector
export function SectorForm({
  selectedSector, // 当前点击选中的扇形 // Currently selected sector
  selectedLevel, // 当前选择的等级 // Current selected level
  setSelectedLevel, // 设置等级的函数 // Function to update level
  onSubmit, // 提交按钮回调 // Submit handler
  onReset, // 重置按钮回调 // Reset handler
  onCancel, // 取消按钮回调 // Cancel handler
}) {
  if (!selectedSector) return null; // 如果没选中扇形，不渲染任何内容 // Don't render if nothing selected

  const { sector, levelIndex } = selectedSector; // 解构 sector 信息 // Extract sector data

  const options = sector.levels.slice(1, 4); // 只取 level2-4（跳过空项） // Use only levels 2-4

  return (
    <div className="sector-form">
      <h3>{sector.label}</h3> {/* 显示扇形名称 // Show sector name */}
      {/* 遍历每个可选的 level 作为单选项 // Render radio buttons for each level */}
      {options.map((option, idx) => (
        <label key={idx} className="form-option">
          <input
            type="radio" // 单选按钮 // Radio input
            value={option} // 值为当前选项文字 // Value = option string
            checked={selectedLevel === option} // 是否选中 // Checked state
            onChange={() => setSelectedLevel(option)} // 选择后更新状态 // Update selected level
          />
          {option} {/* 显示选项文字 // Show option text */}
        </label>
      ))}
      {/* 底部按钮区域 // Form action buttons */}
      <div className="form-buttons">
        <button onClick={() => onSubmit(selectedLevel)}>Submit</button>{" "}
        {/* 提交 // Submit */}
        <button onClick={onCancel}>Cancel</button> {/* 取消 // Cancel */}
        <button onClick={onReset}>Reset</button> {/* 重置 // Reset */}
      </div>
    </div>
  );
}
