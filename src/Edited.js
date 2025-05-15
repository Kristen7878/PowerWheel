import React from "react";
import "./ArcSegment.css";

/**
 * SectorEditor - Allows editing of sector data, including:
 * - Editing sector label
 * - Updating levels (0–5), with custom input for level 0 (image) and level 4 (dropdown)
 * - Adding/removing sectors
 * - Saving and returning
 */
export default function SectorEditor({ sectors, setSectors, onDone }) {
  // Handle label text change
  const handleLabelChange = (index, newLabel) => {
    const updated = [...sectors];
    updated[index].label = newLabel;
    setSectors(updated);
  };

  // Handle individual level field change
  const handleLevelChange = (index, levelIndex, newLevel) => {
    const updated = [...sectors];
    updated[index].levels[levelIndex] = newLevel;
    setSectors(updated);
  };

  // Add a new blank sector
  const addSector = () => {
    setSectors([
      ...sectors,
      {
        label: "New Sector",
        levels: ["", "", "", "", "", "New Sector"],
        color: "#cccccc",
      },
    ]);
  };

  // Remove a sector by its index
  const removeSector = (index) => {
    const updated = [...sectors];
    updated.splice(index, 1);
    setSectors(updated);
  };

  return (
    <div className="basic-grey">
      <h2>Edit Sectors</h2>

      {/* Sector editing form */}
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
              onChange={(e) => handleLabelChange(idx, e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>

          <div style={{ marginTop: "10px" }}>
            <strong>Levels (0–5):</strong>
            {[0, 1, 2, 3, 4, 5].map((levelIndex) => (
              <div key={levelIndex}>
                {/* Level 0: image upload */}
                {levelIndex === 0 && (
                  <div>
                    <input type="file" accept="image/*" />
                  </div>
                )}

                {/* Level 4: dropdown select */}
                {levelIndex === 4 ? (
                  <div>
                    <label>Level {levelIndex} (Type):</label>
                    <select
                      value={sector.levels[4]}
                      onChange={(e) =>
                        handleLevelChange(idx, 4, e.target.value)
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
                    onChange={(e) =>
                      handleLevelChange(idx, levelIndex, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Button to remove sector */}
          <button className="button" onClick={() => removeSector(idx)}>
            Remove Sector
          </button>
        </div>
      ))}

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "40px",
          padding: "0 20px",
        }}
      ></div>

      <button className="button" onClick={addSector}>
        Add Sector
      </button>

      <button
        className="button"
        onClick={onDone}
        style={{ marginLeft: "20px" }}
      >
        Save and Return
      </button>
    </div>
  );
}
