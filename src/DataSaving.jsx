import React from "react";

export default function DataSaving({ sectors, setSectors }) {

  //下载json文件
  const DownloadJson = () => {
    const dataString = JSON.stringify(sectors, null, 2);
    const blob = new Blob([dataString], { type: "json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "powerwheel_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  //上传json文件
  const UploadJson = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (Array.isArray(importedData)) {
          setSectors(importedData);
          alert("导入成功！");
        } else {
          alert("文件格式错误！");
        }
      } catch (error) {
        alert("读取文件失败！");
      }
    };
    reader.readAsText(file);
  }

  return (
    // <div style={{ marginBottom: "1rem", textAlign: "center" }}>
    //   <button onClick={DownloadJson}>Download JSON</button>
    //   <label style={{ marginLeft: "1rem", cursor: "pointer" }}>
    //     Upload JSON
    //     <input
    //       type="file"
    //       accept="application/json"
    //       onChange={UploadJson}
    //       style={{ display: "inline-block", marginLeft: "0.5rem" }}
    //     />
    //   </label>
    // </div>
    
    <div className="data-buttons">
      <button onClick={DownloadJson}>Download JSON</button>
      <label className="upload-label">
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