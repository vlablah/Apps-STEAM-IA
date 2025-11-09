
import React from 'react';
import type { SimulationData } from '../App';
import { BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar, CartesianGrid, ScatterChart, Scatter, ZAxis } from 'recharts';

interface DashboardProps {
  data: SimulationData;
}

const getEmoticon = (moodScore: number): string => {
  if (moodScore >= 0) return '😊';
  if (moodScore >= -5) return '😐';
  return '😨';
};

const getFocusEmojis = (concentration: number): string => {
  if (concentration > 7) return '🎯🧠💡'; // High Focus
  if (concentration > 3.5) return '🤔📝💭'; // Medium Focus
  return '📱🤯😵'; // Distracted & Anxious
};

const getStatusColor = (value: number, thresholds: [number, number], reverse: boolean = false): string => {
  const [good, moderate] = thresholds;
  if (!reverse) {
    if (value <= good) return '#22c55e'; // green
    if (value <= moderate) return '#facc15'; // yellow
    return '#ef4444'; // red
  } else {
    if (value >= good) return '#22c55e'; // green
    if (value >= moderate) return '#facc15'; // yellow
    return '#ef4444'; // red
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/80 p-2 border border-slate-600 rounded-md shadow-lg backdrop-blur-sm">
        <p className="label text-slate-300">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { sleep, cortisol, dopamine, concentration, serotonin, endorphin, oxytocin } = data;

  const scatterData = [{ x: sleep, y: cortisol }];
  const barChartData = [{ name: 'Dopamina y Concentración', 'Nivel de Dopamina': dopamine, 'Nivel de Concentración': concentration }];
  
  // Mood score calculation: positive neurotransmitters vs. stress hormone
  const moodScore = (serotonin + endorphin + oxytocin + (dopamine/2)) - cortisol;
  
  const status = {
    sleep: getStatusColor(sleep, [5, 6.5], true),
    cortisol: getStatusColor(cortisol, [4.5, 7.5]),
    dopamine: getStatusColor(dopamine, [5, 8]),
    concentration: getStatusColor(concentration, [5, 7], true),
    serotonin: getStatusColor(serotonin, [3, 5], true),
    endorphin: getStatusColor(endorphin, [1.5, 3]),
    oxytocin: getStatusColor(oxytocin, [3, 4], true),
  };

  const moodEmoticon = getEmoticon(moodScore);
  const focusEmojis = getFocusEmojis(concentration);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800/50 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Tabla de Valores</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.sleep}}>
              <span>Horas de Sueño</span><span className="font-bold text-lg">{sleep.toFixed(1)}</span>
            </div>
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.cortisol}}>
              <span>Nivel de Cortisol</span><span className="font-bold text-lg">{cortisol.toFixed(1)}</span>
            </div>
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.dopamine}}>
              <span>Nivel de Dopamina</span><span className="font-bold text-lg">{dopamine.toFixed(1)}</span>
            </div>
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.serotonin}}>
              <span>N. de Serotonina</span><span className="font-bold text-lg">{serotonin.toFixed(1)}</span>
            </div>
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.endorphin}}>
              <span>N. de Endorfinas</span><span className="font-bold text-lg">{endorphin.toFixed(1)}</span>
            </div>
            <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4`} style={{borderColor: status.oxytocin}}>
              <span>N. de Oxitocina</span><span className="font-bold text-lg">{oxytocin.toFixed(1)}</span>
            </div>
             <div className={`p-3 rounded-md bg-slate-700/50 flex justify-between items-center border-l-4 col-span-2 lg:col-span-3`} style={{borderColor: status.concentration}}>
              <span>Nivel de Concentración</span><span className="font-bold text-lg">{concentration.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center flex-1">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Estado Anímico</h3>
                <div className="text-7xl">{moodEmoticon}</div>
                 <p className="text-xs text-slate-400 mt-2 text-center">Balance neuroquímico</p>
            </div>
             <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg flex flex-col items-center justify-center flex-1">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Nivel de Enfoque</h3>
                <div className="text-4xl lg:text-5xl tracking-wider text-center h-16 flex items-center justify-center">{focusEmojis}</div>
                 <p className="text-xs text-slate-400 mt-2 text-center">Impacto de notificaciones</p>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg h-80">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">Relación Sueño vs. Cortisol</h3>
          <ResponsiveContainer width="100%" height="85%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Horas de Sueño" 
                unit="h" 
                stroke="#94a3b8" 
                domain={[0, 12]}
                ticks={[0, 2, 4, 6, 8, 10, 12]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Nivel de Cortisol" 
                stroke="#94a3b8" 
                domain={[2, 13]}
              />
              <ZAxis type="number" range={[150, 151]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                    backgroundColor: 'rgba(30, 41, 59, 0.8)',
                    borderColor: '#475569',
                    borderRadius: '0.5rem'
                }}
              />
              <Legend wrapperStyle={{color: '#cbd5e1'}}/>
              <Scatter name="Estado Actual" data={scatterData} fill={status.cortisol} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 shadow-lg h-80">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">Notificaciones vs. Dopamina y Concentración</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={barChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(71, 85, 105, 0.5)'}} />
                <Legend wrapperStyle={{color: '#cbd5e1'}}/>
                <Bar dataKey="Nivel de Dopamina" fill={status.dopamine} />
                <Bar dataKey="Nivel de Concentración" fill={status.concentration} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
