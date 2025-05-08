// src/RotateControls.jsx
import React from 'react';

export default function RotateControls({ rotation, setRotation }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <button onClick={() => setRotation(rotation + 15)}>Rotate +15°</button>
      <button onClick={() => setRotation(rotation - 15)} style={{ marginLeft: '1rem' }}>
        Rotate -15°
      </button>
    </div>
  );
}
