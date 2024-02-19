import { useState } from 'react';
import style from './tangramSettings.css'
import { TangramService } from '../services/tangram-service';


export default function TangramSettings({ pattern, onPatternChange }) {
    let tangramService = new TangramService();

    const optionsList = tangramService.tangramModelList.map((key) => {
      return {value: key, label: key}
    });
  
    // State to manage the selected option
    const [selectedPattern, setSelectedPattern] = useState(optionsList.find((option) => option.value==pattern).value);
  
    // Function to handle change in the select
    const handleSelectChange = (event) => {
      setSelectedPattern(event.target.value);

      onPatternChange(event.target.value);
    };
  
    return (
      <div className='d-flex justify-content-around'>
        <label htmlFor="selectOption">Select a pattern:</label>
        <select id="selectOption" value={selectedPattern} onChange={handleSelectChange}>
          {optionsList.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }