import React from "react"
import html2canvas from 'html2canvas';

export default function Download() {
    const downloadWheel = () => {
        const element = document.getElementById('wheel-container');
        html2canvas(element).then(canvas => {
          const link = document.createElement('a');
          link.download = 'my_power_wheel.png';
          link.href = canvas.toDataURL();
          link.click();
        });
      };
    
    return (
        /* --- BUTTONS --- */
        <div className="buttons">
            <button onClick={downloadWheel}>Download My Wheel</button>
        </div>
    );

    
}

