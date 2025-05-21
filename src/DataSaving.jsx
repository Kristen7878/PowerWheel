import React from "react";

export default function DataSaving({ sectors, setSectors, descriptions, setDescriptions }) {


  const DownloadJson = () => {
    const sectorsAndDescriptions = {
      sectors,
      descriptions,
    };
    const dataString = JSON.stringify(sectorsAndDescriptions, null, 2);
    const blob = new Blob([dataString], { type: "json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "powerwheel_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  const UploadJson = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          setSectors(importedData);
          alert("Successful！");
        } else if(importedData.sectors && importedData.descriptions){
          setSectors(importedData.sectors);
          setDescriptions(importedData.descriptions);
          alert("Successful！");
        } else {
          alert("Error！");
        }
      } catch (error) {
        alert("Something wrong！");
      }
    };
    reader.readAsText(file);
  }


  return (

    
    <div className="data-buttons">
      <button className= "button " 
      style={{
    position: "fixed",
    bottom: "60px",
    right: "20px",
    zIndex: 1000 
  }}
  onClick={DownloadJson}>Download JSON</button>
      <label className= "button "
      style={{
        position: "fixed",
        bottom: "10px",
        right: "20px",
        zIndex: 1000 
      }}>
       Upload JSON
        <input
          type="file"
          accept="application/json"
          onChange={UploadJson}
       />
      </label>
    </div>

  );

}
