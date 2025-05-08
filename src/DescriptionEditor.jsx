import React from "react";
import "./ArcSegment.css";

export default function DescriptionEditor({ descriptions, setDescriptions, onDone }) {
  const handleChange = (key, field, value) => {
    const updated = { ...descriptions };
    updated[key] = { ...updated[key], [field]: value };
    setDescriptions(updated);
  };

  return (
    <div className="basic-grey">
      <h2>Edit Descriptions</h2>
      {Object.entries(descriptions).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
          <h3>{key}</h3>
          <label>
            Title:
            <input
              type="text"
              value={value.title}
              onChange={(e) => handleChange(key, "title", e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={value.description}
              onChange={(e) => handleChange(key, "description", e.target.value)}
            />
          </label>
        </div>
      ))}
      <button className="button" onClick={onDone}>Save and Return</button>
    </div>
  );
}
