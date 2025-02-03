import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { IoCloseOutline, IoAdd } from "react-icons/io5";

interface ArrayFieldProps {
  name: string;
  label: string;
  values: string[];
  onChange: (newValue: string[]) => void;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ name, label, values, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && /^[A-Za-z\s]+$/.test(inputValue.trim()) && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <label className="font-bold">{label}</label>
      <div className="flex gap-2">
        <Input 
          type="text" 
          value={inputValue} 
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-z\s]*$/.test(value)) { 
              setInputValue(value);
            }
          }}
          placeholder={`Enter ${label}`} 
          className="dark:bg-slate-800"
        />
        <Button size="icon" variant="outline" type="button" onClick={handleAdd} disabled={!inputValue.trim()}>
          <IoAdd />
        </Button>
      </div>
      <ul className="flex flex-wrap gap-2 mt-2">
        {values.map((value, index) => (
          <li key={index} className="bg-gray-200 dark:bg-blue-800 px-2 py-1 rounded-md flex items-center gap-2 text-sm">
            <span>{value}</span>
            <button type="button" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700">
              <IoCloseOutline />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArrayField;
