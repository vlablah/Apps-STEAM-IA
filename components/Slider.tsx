
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, unit, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-lg font-semibold text-cyan-400">{value} <span className="text-xs text-slate-400">{unit}</span></span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          style={{ 
            background: `linear-gradient(to right, #22d3ee ${percentage}%, #334155 ${percentage}%)`
          }}
        />
      </div>
    </div>
  );
};
