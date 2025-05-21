
import React, { useState } from "react";
import './PW.css';
import RotateControls from "./RotateControls";
import { breakText } from './Function';
import ArcSegment from './ArcSegment';
import DefaultDescriptions from "./DefaultDescriptions";
import DescriptionEditor from "./DescriptionEditor";
import { SectorForm } from "./ArcSegment";
import SectorEditor from "./Edited";
import defaultsectors from "./Defaultsectors";
import "./ArcSegment.css"
import DataSaving from "./DataSaving";
import Download from "./Download";
import Login from "./Login";
import './BB.css';
import tinycolor from 'tinycolor2';



// Ring thickness for each of the 5 levels — each sector has 5 concentric layers
const ringWidths = [60, 60, 60, 60, 60,60];
const center = 500;          // Center of the circle (x, y)
const baseRadius = 60;       // Base radius for the innermost ring



// Utility function: add opacity to hex color for level distinction
function withOpacity(hex, opacity) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


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
  //login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  
  const [sectors, setSectors] = useState(defaultsectors);
  const [editing, setEditing] = useState(false);

  const [descriptions, setDescriptions] = useState(DefaultDescriptions);
  const [editingDescriptions, setEditingDescriptions] = useState(false);

  const [tooltipText, setTooltipText] = useState({ title: "", description: "" });  // Tooltip text content
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });                   // Tooltip position
  const [showTooltip, setShowTooltip] = useState(false);                         // Whether to show tooltip
  const groupedSectors = [...sectors].sort((a, b) =>
    (a.levels[4] || "").localeCompare(b.levels[4] || "") )
  const anglePerSector = 360 / groupedSectors.length;                             // Angle span per dimension
  const [rotation, setRotation] = useState(0);                                   // Current wheel rotation
  const [selectedSector, setSelectedSector] = useState(null);                    // Currently selected sector
  const [selectedLevel, setSelectedLevel] = useState("");                       // Selected level in form
  const [colorMap, setColorMap] = useState({});                                   // Record of selected sectors/colors




  // Function to handle form submission
  const handleFormSubmit = (level) => {                                         
    if (!selectedSector) return;
    const key = selectedSector.sector.label;//Like Gender-2
    setColorMap((previousColorMap) => {
      // Make a copy of the old color
      const updatedColorMap = { ...previousColorMap };
      updatedColorMap[key] = level;
      return updatedColorMap;
    });
    
    setSelectedSector(null);
    

  };
  

// Reset form 
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
if (editingDescriptions) {
  return (
    <div className="powerwheel-container" style={{ padding: "20px" }}>
      <DescriptionEditor
        descriptions={descriptions}
        setDescriptions={setDescriptions}
        onDone={() => setEditingDescriptions(false)}
      />
    </div>
  );
}

  return (
    <div className="powerwheel-container" >

<div className="button-bar">

{/*Edited is here！！！*/}
{!isLoggedIn ? (
  <>
    {!showLoginForm && (
      <button className="button" onClick={() => setShowLoginForm(true)}>
        Login
      </button>
    )}

    {showLoginForm && (
      <div className="modal-overlay">
        <div className="modal-content">
          <Login
            onLogin={() => {
              setIsLoggedIn(true);
              setShowLoginForm(false);
            }}
          />
          <button
            className=""
            onClick={() => setShowLoginForm(false)}
            style={{ marginTop: '10px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
) : (
  <>
    <>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button className="button" onClick={() => setEditing(true)}>Edit Sectors</button>
            <button className="button" onClick={() => setEditingDescriptions(true)}>Edit Descriptions</button>
            </div> </>
  </>
)}



{/* Import and export the edited data */}
<DataSaving sectors={sectors} setSectors={setSectors} />


<Download />
</div>


      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>


      {/* Clear the selection record */}
      <button className="button"style={{ marginRight: "16px" }} onClick={() => {
        if (window.confirm("Are you sure")) {
          setColorMap({});
        }
      }}>
        Reset Selection
      </button>

      {/* Restore the wheel structure */}
      <button className="button" onClick={() => {
          setSectors(defaultsectors);
          setDescriptions(DefaultDescriptions);
          setColorMap({});
        }}>Restore Default</button>

      </div>

      {/* Rotate control buttons */}
    <RotateControls rotation={rotation} setRotation={setRotation} />
    <div id="wheel-container">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
        {/*Center white circle and "Power Wheel" text */}
        <circle cx={center} cy={center} r={baseRadius - 5} fill="#fff" />
        <text x={center} y={center - 10} fontSize="18" fontWeight="bold" textAnchor="middle">THE</text>
        <text x={center} y={center + 10} fontSize="18" fontWeight="bold" textAnchor="middle">POWER</text>
        <text x={center} y={center + 30} fontSize="18" fontWeight="bold" textAnchor="middle">WHEEL</text>
  
        {/* Rotate e entire wheel */}
        <g transform = {`rotate(${rotation},${center}, ${center})`}> 
        
        {/* Render tooltip on hover */}
        {groupedSectors.map((sector, i) => {
          const startAngle = i * anglePerSector;
          const endAngle = (i + 1) * anglePerSector;
  
          return sector.levels.map((level, j) => {
            const innerRadius = baseRadius + j * ringWidths[j];
            const outerRadius = innerRadius + ringWidths[j];
            const fillOpacity = 0.3 + (j * 0.12); 
            const key = sector.label;  // he unique identification of each sector
            const isSelected = colorMap[key] === level; //  Whether it is the level selected by the user
            const category = sector.levels[4];
            const baseColor = categoryColors[category] || sector.color;
            const highlightColor = tinycolor(baseColor).darken(10).toString(); //  20%

            // Fix the highlight color
            
             const fillColor = isSelected ? highlightColor : (j === 4 ? "#fff" : withOpacity(baseColor, fillOpacity));
            const labelRadius = innerRadius + ringWidths[j]*3/4; 

            const angleRange = endAngle - startAngle;
            const startTextAngle = startAngle + 5;
            const endTextAngle = endAngle - 5;
  
            const lines = breakText(level, 1);// Long text automatically breaks lines
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
                      title: descriptions[sector.label]?.title || "",
                      description: descriptions[sector.label]?.description || ""
                    });
                    if(j >= 4){
                      setShowTooltip(true); 
                    } else{
                      setShowTooltip(false); 
                    }
                                      
                }}
                  onMouseLeave={() => setShowTooltip(false)}
                  onMouseMove={(e) => setTooltipPos({ x: e.clientX - 10, y: e.clientY - 20 })}
                  onClick={() => {
                    if (j >= 1 && j <= 3) // Only the 2nd to 4th floors are allowed to be clicked
                      {setSelectedSector({ sector, levelIndex: j });}// Where did the user click
                    
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
                <text fontWeight= ""    fontFamily="Tahoma, sans-serif;" letterSpacing="0.5" fontSize="11" fill={isSelected ? "#fff" : "#000"} key={idx}>
                  <textPath
                    href={`#arc-path-${i}-${j}-${idx}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {line}
                  </textPath>
                </text>
              ))}
  
                


              </g>
            );
          });
        })}
        </g>

      {/* Static right horizontal lines and text */}
      <line 
          x1={center + 60} 
          y1={center} 
          x2={center + 420} 
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
  
      {/*  Tooltip // Render tooltip on hover */}
      
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

    {/* Show form popup when a sector is clicked */}
    {/* Only if selectedSector is not null*/}
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