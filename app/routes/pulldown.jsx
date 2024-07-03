import { useState, useRef } from "react";

const PullDown = ({ selectedOption, setSelectedOption }) => {
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="options">テンプレートでフィルター:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="">未選択</option>
        <option value="就活">就活</option>
        <option value="日記">日記</option>
      </select>
      <p>Selected option: {selectedOption}</p>

      <table></table>
    </div>
  );
};

export default PullDown;
