import React from "react";
import "./ArcSegment.css";

/**
 * ArcSegment - Renders a ring-shaped SVG arc segment.
 * Useful for visualizations like pie or donut charts.
 */
export default function ArcSegment({
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
}) {
  const center = 500; // Fixed center coordinate for the SVG circle

  /**
   * Converts polar coordinates (angle, radius) to cartesian (x, y)
   * @param {number} angleDeg - Angle in degrees
   * @param {number} radius - Distance from center
   * @returns {Object} x and y coordinates
   */
  const toCartesian = (angleDeg, radius) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  // Calculate key points for the outer and inner arcs
  const startOuter = toCartesian(startAngle, outerRadius);
  const endOuter = toCartesian(endAngle, outerRadius);
  const startInner = toCartesian(endAngle, innerRadius);
  const endInner = toCartesian(startAngle, innerRadius);

  // Determine whether the arc should be a large arc (> 180 degrees)
  const angleDiff = (endAngle - startAngle + 360) % 360;
  const largeArc = angleDiff > 180 ? 1 : 0;

  // Build the SVG path for the arc segment
  const pathData = [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");

  return (
    <g>
      <path
        className="arc-segment"
        d={pathData}
        fill={fill}
        stroke="#fff"
        strokeWidth="1"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onClick={onClick}
      />
    </g>
  );
}

/**
 * SectorForm - Displays a form for selecting a level from a sector.
 * Used in combination with ArcSegment when user clicks on a segment.
 */
export function SectorForm({
  selectedSector,
  selectedLevel,
  setSelectedLevel,
  onSubmit,
  onReset,
  onCancel,
}) {
  if (!selectedSector) return null; // Don't render if no sector is selected

  const { sector, levelIndex } = selectedSector;

  // Only show levels 2 to 4 as options
  const options = sector.levels.slice(1, 4);

  return (
    <div className="sector-form">
      <h3>{sector.label}</h3>
      {/* Render radio inputs for each level option */}
      {options.map((option, idx) => (
        <label key={idx} className="form-option">
          <input
            type="radio"
            value={option}
            checked={selectedLevel === option}
            onChange={() => setSelectedLevel(option)}
          />
          {option}
        </label>
      ))}
      {/* Submit, Cancel, and Reset buttons */}
      <div className="form-buttons">
        <button onClick={() => onSubmit(selectedLevel)}>Submit</button>{" "}
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
