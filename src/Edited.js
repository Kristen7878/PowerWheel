import React from "react";
import "./ArcSegment.css";

// SectorEditor 组件，用于编辑 sector
// SectorEditor component function, used to edit sectors
export default function SectorEditor({ sectors, setSectors, onDone }) {
  // 处理标签变化的函数
  // Function to handle label changes
  const handleLabelChange = (index, newLabel) => {
    const updated = [...sectors]; // 创建 sectors 的副本
    // Create a copy of sectors
    updated[index].label = newLabel; // 更新对应索引的 label
    // Update the label of the sector at the given index
    setSectors(updated); // 更新 sectors 状态
    // Set the updated sectors state
  };

  // 处理 level 变化的函数
  // Function to handle level changes
  const handleLevelChange = (index, levelIndex, newLevel) => {
    const updated = [...sectors]; // 创建 sectors 的副本
    // Create a copy of sectors
    updated[index].levels[levelIndex] = newLevel; // 更新 levels 中对应索引的值
    // Update the level at the given index for the specified sector
    setSectors(updated); // 更新 sectors 状态
    // Set the updated sectors state
  };

  //
  // 添加一个新的 sector
  // Function to add a new sector
  const addSector = () => {
    setSectors([
      ...sectors, // 保留原来的 sectors
      // Keep the original sectors
      {
        label: "New Sector", // 新的 sector 的 label
        // The label of the new sector
        levels: ["", "", "", "", "", "New Sector"], // 新的 levels
        // The levels for the new sector
        color: "#cccccc", // 新的颜色
        // The color of the new sector
      },
    ]);
  };

  // 移除指定索引的 sector
  // Function to remove a sector by its index
  const removeSector = (index) => {
    const updated = [...sectors]; // 创建 sectors 的副本
    // Create a copy of sectors
    updated.splice(index, 1); // 删除指定索引的 sector
    // Remove the sector at the given index
    setSectors(updated); // 更新 sectors 状态
    // Set the updated sectors state
  };

  return (
    <div className="basic-grey">
      <h2>Edit Sectors</h2>
      {/* 遍历 sectors 并为每个 sector 渲染输入框 */}
      {/* Iterate over the sectors and render inputs for each sector */}
      {sectors.map((sector, idx) => (
        <div
          key={idx}
          style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}
        >
          <label>
            <strong>Label:</strong>
            <input
              type="text"
              value={sector.label}
              onChange={(e) => handleLabelChange(idx, e.target.value)} // 标签变化时更新
              // Update the label when changed
              style={{ marginLeft: "10px" }}
            />
          </label>
          <div style={{ marginTop: "10px" }}>
            <strong>Levels (0-5):</strong>
            {/* 渲染 0-5 级别的输入框 */}
            {/* Render input fields for levels 0-5 */}
            {[0, 1, 2, 3, 4, 5].map((levelIndex) => (
              <div key={levelIndex}>
                {/* 如果是 level 1，显示图片上传框 */}
                {/* If level is 1, show image upload input */}
                {levelIndex === 0 && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      // Update when an image is uploaded
                    />
                  </div>
                )}
                {/* 如果是 level 4，显示下拉选择框 */}
                {/* If level is 4, show a dropdown select */}
                {levelIndex === 4 ? (
                  <div>
                    <label>Level {levelIndex} (Type):</label>
                    <select
                      value={sector.levels[4]}
                      onChange={
                        (e) => handleLevelChange(idx, 4, e.target.value) // 选择时更新 level 4
                        // Update level 4 when selected
                      }
                    >
                      <option value="">--Please choose type--</option>
                      <option value="race">Race</option>
                      <option value="gender&sexuality">
                        Gender & Sexuality
                      </option>
                      <option value="career">Career</option>
                      <option value="living&culture">Living & Culture</option>
                      <option value="caregiving">Caregiving</option>
                      <option value="childhood&development">
                        Childhood & Development
                      </option>
                      <option value="healthy">Healthy</option>
                    </select>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={sector.levels[levelIndex]}
                    onChange={
                      (e) => handleLevelChange(idx, levelIndex, e.target.value) // 输入时更新对应 level
                      // Update the level when changed
                    }
                  />
                )}
              </div>
            ))}
          </div>
          {/* 移除 sector 的按钮 */}
          {/* Button to remove the sector */}
          <button className="button" onClick={() => removeSector(idx)}>
            Remove Sector
          </button>
        </div>
      ))}
      {/* 添加新 sector 的按钮 */}
      {/* Button to add a new sector */}
      <button className="button" onClick={addSector}>
        Add Sector
      </button>
      {/* 保存并返回的按钮 */}
      {/* Button to save and return */}
      <button
        className="button"
        onClick={onDone}
        style={{ marginLeft: "200px" }}
      >
        Save and Return
      </button>
    </div>
  );
}
