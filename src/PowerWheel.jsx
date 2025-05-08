// 引入 React
import React, { useState } from "react";
import './PW.css';
import RotateControls from "./RotateControls";
import { breakText } from './Function';
import ArcSegment from './ArcSegment';
import tooltipInfoMap from "./Descriptions";
import { SectorForm } from "./ArcSegment";
import SectorEditor from "./Edited";
import defaultsectors from "./Defaultsectors";
import "./ArcSegment.css"
import DataSaving from "./DataSaving";
import Download from "./Download";
  

// 每层环的厚度，5层，每个扇形都有 5 层
// Ring thickness for each of the 5 levels — each sector has 5 concentric layers
const ringWidths = [60, 60, 60, 60, 60,60];
const center = 500;          // 圆心位置 (x, y)// Center of the circle (x, y)
const baseRadius = 60;       // 最内圈的起始半径// Base radius for the innermost ring


// 工具函数：颜色添加透明度（用于区分层级）
// Utility function: add opacity to hex color for level distinction
function withOpacity(hex, opacity) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// 工具函数：将极坐标（角度 + 半径）转换为 SVG 二维坐标
// Utility function: convert polar coordinates (angle + radius) to SVG 2D coordinates
function polarToCartesian(angleDeg, r) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: center + r * Math.cos(angleRad),
    y: center + r * Math.sin(angleRad),
  };
}

const categoryColors = {
  race: "#f44336",
  "gender&sexuality": "#e91e63",
  career: "#3f51b5",
  "living&culture": "#4caf50",
  caregiving: "#ff9800",
  "childhood&development": "#9c27b0",
  healthy: "#009688",
};

function getCategoryColor(category) {
  return categoryColors[category] || "#9e9e9e";
}


export default function PowerWheel() 
{
  
  const [sectors, setSectors] = useState(defaultsectors);
  const [editing, setEditing] = useState(false);
  const [tooltipText, setTooltipText] = useState({ title: "", description: "" }); // Tooltip 的文字内容 // Tooltip text content
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });                   // Tooltip 的位置 // Tooltip position
  const [showTooltip, setShowTooltip] = useState(false);                         // 是否显示 Tooltip // Whether to show tooltip
  const groupedSectors = [...sectors].sort((a, b) =>
    (a.levels[4] || "").localeCompare(b.levels[4] || "") )
  const anglePerSector = 360 / groupedSectors.length;                                  // 每个维度所占的角度范围 // Angle span per dimension
  const [rotation, setRotation] = useState(0);                                   // 当前旋转角度 // Current wheel rotation
  const [selectedSector, setSelectedSector] = useState(null);                    // 当前点击的扇形 // Currently selected sector
  const [selectedLevel, setSelectedLevel] = useState("");                        // 当前选择的等级 // Selected level in form
  const [colorMap, setColorMap] = useState({});                                  // 储存用户已经选择的扇形颜色记录 // Record of selected sectors/colors




  // 提交表单时的处理函数 // Function to handle form submission
  const handleFormSubmit = (level) => {                                         
    if (!selectedSector) return;
    const key = selectedSector.sector.label;//Like Gender-2
    setColorMap((previousColorMap) => {
      // 复制一份旧的颜色Make a copy of the old color
      const updatedColorMap = { ...previousColorMap };
      // 更新或新增这一块扇形的选择记录Update or add the selection record of this sector
      updatedColorMap[key] = level;
      // 返回新的状态Return to a new state
      return updatedColorMap;
    });
    
    setSelectedSector(null);
    

  };
  

// 表单重置功能 // Reset form 
function  handleResetForm ()
{                                              
 if (!selectedSector) return;
 const key = selectedSector.sector.label;
 setColorMap(prev => ({ ...prev, [key]: null }));
 setSelectedLevel("");
};
if (editing) {
  return (
    <div className="powerwheel-container" style={{ padding: "20px" }}>
      <SectorEditor
        sectors={sectors}
        setSectors={setSectors}
        onDone={() => setEditing(false)}
      />
    </div>
  );
}

  return (
    <div className="powerwheel-container" >

      <div className="button-bar">
      {/* 编辑在这里！！！Edited is */}
       <button className="button" onClick={() => setEditing(true)}>Edit Sectors</button>
      {/* 导入导出编辑后的数据 */}
      <DataSaving sectors ={sectors} setSectors={setSectors}/>

      <Download />
      </div>

      {/* 控制旋转按钮 // Rotate control buttons */}
    <RotateControls rotation={rotation} setRotation={setRotation} />
    <div id="wheel-container">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
        {/* 最中心的空心白圆和文字标识 // Center white circle and "Power Wheel" text */}
        <circle cx={center} cy={center} r={baseRadius - 5} fill="#fff" />
        <text x={center} y={center - 10} fontSize="18" fontWeight="bold" textAnchor="middle">THE</text>
        <text x={center} y={center + 10} fontSize="18" fontWeight="bold" textAnchor="middle">POWER</text>
        <text x={center} y={center + 30} fontSize="18" fontWeight="bold" textAnchor="middle">WHEEL</text>
  
        {/* 旋转整个图形 // Rotate the entire wheel */}
        <g transform = {`rotate(${rotation},${center}, ${center})`}> 
        
        {/* 悬停显示 Tooltip // Render tooltip on hover */}
        {groupedSectors.map((sector, i) => {
          const startAngle = i * anglePerSector;
          const endAngle = (i + 1) * anglePerSector;
  
          return sector.levels.map((level, j) => {
            const innerRadius = baseRadius + j * ringWidths[j];
            const outerRadius = innerRadius + ringWidths[j];
            const fillOpacity = 0.3 + (j * 0.12); // 透明度diaphaneity
            const key = sector.label;  // 每个扇形的唯一标识The unique identification of each sector
            const isSelected = colorMap[key] === level; // 是否为用户选择的等级// Whether it is the level selected by the user
            const category = sector.levels[4];
            const baseColor = categoryColors[category] || sector.color;
            const fillColor = isSelected
            ? "#00c853" // 固定高亮色// Fix the highlight color
             : (j === 4 ? "#fff" : withOpacity(baseColor, fillOpacity));
 
            //const midAngle = (startAngle + endAngle) / 2; // 放文字时的中心角度
            const labelRadius = innerRadius + ringWidths[j]*3/4; // 文字贴合的中线
            //const labelPos = polarToCartesian(midAngle, labelRadius); // 得到放文字的坐标

            const angleRange = endAngle - startAngle;
            const startTextAngle = startAngle + 5;
            const endTextAngle = endAngle - 5;
  
            const lines = breakText(level, 1); // 长文本自动换行// Long text automatically breaks lines
            //Here!!!Here!!
            return (
              <g key={`${sector.label}-${j}`}>{/*Like Gender-2 */}
                <ArcSegment
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  fill={fillColor}
                  onMouseEnter={() => {
                    setTooltipText({
                      title: tooltipInfoMap[sector.label]?.title || "",
                      description: tooltipInfoMap[sector.label]?.description || ""
                    });
                    setShowTooltip(true);
                  }}
                  onMouseLeave={() => setShowTooltip(false)}
                  onMouseMove={(e) => setTooltipPos({ x: e.clientX - 10, y: e.clientY - 20 })}
                  onClick={() => {
                    if (j >= 1 && j <= 3) // 只允许点击第2~4层Only the 2nd to 4th floors are allowed to be clicked
                      {setSelectedSector({ sector, levelIndex: j });}//记录了用户点了哪里// Where did the user click
                    
                  }}
                />

              <defs>
              {lines.map((line, idx) => {
                const spacing = 10;
                const r = labelRadius - idx * spacing;
                const start = polarToCartesian(startTextAngle, r);
                const end = polarToCartesian(endTextAngle, r);
                const largeArc = angleRange > 180 ? 1 : 0;

                
                return(
                // 定义弧形路径用于文字贴合
                <path
                key={idx}
                id={`arc-path-${i}-${j}-${idx}`}
                d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
                fill="none"
                />
                );

              }
              )}
            </defs>

              {lines.map((line, idx) => (
                <text fontSize="10" fill="#000" key={idx}>
                  <textPath
                    href={`#arc-path-${i}-${j}-${idx}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {line}
                  </textPath>
                </text>
              ))}
  
                {/* 注释的是与弧形文字 */}
                {/*lines.length > 0 && (
                  <text fontSize="9" fill="#000" textAnchor="middle" x={labelPos.x} y={labelPos.y}>
                    {lines.map((line, idx) => (
                      <tspan key={idx} x={labelPos.x} dy={idx === 0 ? "0" : "1.1em"}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )*/}


              </g>
            );
          });
        })}
        </g>

      {/* 静态右侧横线和文本 */}
      <line 
          x1={center + 60} 
          y1={center} 
          x2={center + 500} 
          y2={center} 
          stroke="white" 
          strokeWidth="12" 
        />

        <text 
          x={center + 230} 
          y={center + 3} 
          fill="black" 
          fontSize="10" 
          fontWeight="bold" 
          textAnchor="middle"
        >
          {'<------------ INCREASING PRIVILEGE / POWER <--------'}
        </text>


      </svg>
      </div>
  
      {/* 悬停显示 Tooltip // Render tooltip on hover */}
      {showTooltip && (
        <div
        className="tooltip"
        style={{
          top: tooltipPos.y,
          left: tooltipPos.x
        }}
      >
          <div className="tooltip-title" style={{ fontWeight: "bold", marginBottom: "4px" }}>{tooltipText.title}</div>
          <div className="tooltip-description">{tooltipText.description}</div>
        </div>
      )}

    {/* 弹出表单（扇形被点击时） // Show form popup when a sector is clicked */}
    {/* 只有当 selectedSector 不是 null//Only if selectedSector is not null*/}
    {selectedSector && (
      <SectorForm
        selectedSector={selectedSector}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        onSubmit={handleFormSubmit}
        onCancel={() => setSelectedSector(null)}
        onReset={handleResetForm}

      />
    )}

    
    
    </div>
  );
}