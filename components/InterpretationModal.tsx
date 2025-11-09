
import React from 'react';

interface InterpretationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  interpretation: string;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
    <p className="text-slate-300">La IA está analizando tus datos...</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center">
    <h3 className="text-lg font-semibold text-red-400">Error</h3>
    <p className="mt-2 text-slate-300">{message}</p>
  </div>
);

export const InterpretationModal: React.FC<InterpretationModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  interpretation,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Análisis de Bienestar Digital
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorDisplay message={error} />}
          {!isLoading && !error && interpretation && (
            <div 
              className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 prose-strong:text-cyan-400 prose-a:text-blue-400 hover:prose-a:text-blue-300" 
              dangerouslySetInnerHTML={{ __html: interpretation.replace(/\n/g, '<br />') }}
            />
          )}
        </div>
        <div className="p-4 border-t border-slate-700 text-right">
           <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
