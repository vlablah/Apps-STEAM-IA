
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Impacto de las Redes Sociales en la Química Cerebral
      </h1>
      <p className="mt-2 text-slate-400 max-w-3xl mx-auto">
        Un simulador interactivo para explorar cómo el uso de redes sociales afecta tus hormonas, sueño y concentración.
      </p>
    </header>
  );
};
