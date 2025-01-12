import React from "react";

const ToggleCheckbox = ({ checked, setChecked, label }) => {
  return (
    <div className="mt-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="form-checkbox"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default ToggleCheckbox;
