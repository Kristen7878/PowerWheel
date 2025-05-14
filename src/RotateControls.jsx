// src/RotateControls.jsx
import React from 'react';
import './ArcSegment.css'

export default function RotateControls({ rotation, setRotation }) {
  return (
    <div  className="btn-container">
      <button className = "btn-87" onClick={() => setRotation(rotation + 15)}>Rotate +15°</button>
      <button className = "btn-87" onClick={() => setRotation(rotation - 15)} style={{ marginLeft: '1rem' }}>
        Rotate -15°
      </button>
    </div>
  );
}
