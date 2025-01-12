import React from "react";

const QuizOptionsToggle = ({ optionRender, setOptionRender }) => {
  return (
    <div className="mt-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={optionRender}
          onChange={() => setOptionRender(!optionRender)}
          className="form-checkbox"
        />
        <span>Switch option to LaTeX</span>
      </label>
    </div>
  );
};

export default QuizOptionsToggle;
