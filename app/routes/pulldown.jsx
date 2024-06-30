import { useState, useRef } from "react";

const PullDown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="options">テンプレートでフィルター:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="就活">就活</option>
        <option value="日記">日記</option>
      </select>
      <p>Selected option: {selectedOption}</p>

      <table></table>
    </div>
  );
};

export default PullDown;
