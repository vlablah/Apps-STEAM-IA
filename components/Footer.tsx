
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 text-xs text-slate-500 border-t border-slate-800 mt-8">
      <p>Este es un simulador educativo. Los datos son generados por fórmulas y no representan mediciones médicas reales.</p>
      <p>&copy; {new Date().getFullYear()} Brain Chemistry Simulator. Todos los derechos reservados.</p>
    </footer>
  );
};
