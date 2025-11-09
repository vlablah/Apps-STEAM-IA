
import React from 'react';
import { Slider } from './Slider';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ControlsProps {
  timeOnSocialMedia: number;
  setTimeOnSocialMedia: (value: number) => void;
  notificationFrequency: number;
  setNotificationFrequency: (value: number) => void;
  sleep: number;
  setSleep: (value: number) => void;
  onReset: () => void;
  onInterpret: () => void;
  isInterpretDisabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  timeOnSocialMedia,
  setTimeOnSocialMedia,
  notificationFrequency,
  setNotificationFrequency,
  sleep,
  setSleep,
  onReset,
  onInterpret,
  isInterpretDisabled,
}) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg h-full flex flex-col space-y-8">
      <h2 className="text-2xl font-semibold text-slate-200 border-b border-slate-700 pb-3">Controles del Simulador</h2>
      
      <Slider
        label="Tiempo diario en redes sociales"
        value={timeOnSocialMedia}
        min={0}
        max={12}
        step={0.5}
        unit="horas"
        onChange={(e) => setTimeOnSocialMedia(parseFloat(e.target.value))}
      />

      <Slider
        label="Horas de sueño"
        value={sleep}
        min={0}
        max={12}
        step={0.5}
        unit="horas"
        onChange={(e) => setSleep(parseFloat(e.target.value))}
      />
      
      <Slider
        label="Frecuencia de notificaciones"
        value={notificationFrequency}
        min={0}
        max={100}
        step={5}
        unit="/ hora"
        onChange={(e) => setNotificationFrequency(parseInt(e.target.value))}
      />

      <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar
        </button>
        <button
          onClick={onInterpret}
          disabled={isInterpretDisabled}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isInterpretDisabled ? 'Analizando...' : 'Interpretar con IA'}
        </button>
      </div>
    </div>
  );
};
