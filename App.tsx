
import React, { useState, useMemo, useCallback } from 'react';
import { getInterpretation } from './services/geminiService';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Dashboard } from './components/Dashboard';
import { InterpretationModal } from './components/InterpretationModal';
import { Footer } from './components/Footer';

export interface SimulationData {
  timeOnSocialMedia: number;
  notificationFrequency: number;
  sleep: number;
  cortisol: number;
  dopamine: number;
  concentration: number;
  serotonin: number;
  endorphin: number;
  oxytocin: number;
}

const App: React.FC = () => {
  const [timeOnSocialMedia, setTimeOnSocialMedia] = useState<number>(0);
  const [notificationFrequency, setNotificationFrequency] = useState<number>(0);
  const [sleep, setSleep] = useState<number>(8);
  
  const [interpretation, setInterpretation] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const simulationData: SimulationData = useMemo(() => {
    const sleepDeficit = Math.max(0, 8 - sleep);
    
    // Existing calculations
    const cortisol = 2 + (timeOnSocialMedia / 2) + (sleepDeficit * 0.5);
    const dopamine = Math.max(2, 2 + (notificationFrequency / 20));
    const concentration = Math.max(0, 10 - (notificationFrequency / 10)); // Adjusted for better range

    // New neurotransmitter calculations
    // Serotonin: Influenced by sleep quality and negatively by excessive social media.
    const serotonin = Math.max(0, 6 + (sleep - 8) * 0.5 - (timeOnSocialMedia / 4));
    // Endorphin: Short-term reward from social media, but reduced by lack of sleep.
    const endorphin = Math.max(0, 2 + (timeOnSocialMedia / 6) - (sleepDeficit * 0.2));
    // Oxytocin: Reduced by screen time which can displace real social interaction.
    const oxytocin = Math.max(0, 5 - (timeOnSocialMedia / 3) + (sleep - 8) * 0.1);

    return {
      timeOnSocialMedia,
      notificationFrequency,
      sleep: parseFloat(sleep.toFixed(2)),
      cortisol: parseFloat(cortisol.toFixed(2)),
      dopamine: parseFloat(dopamine.toFixed(2)),
      concentration: parseFloat(concentration.toFixed(2)),
      serotonin: parseFloat(serotonin.toFixed(2)),
      endorphin: parseFloat(endorphin.toFixed(2)),
      oxytocin: parseFloat(oxytocin.toFixed(2)),
    };
  }, [timeOnSocialMedia, notificationFrequency, sleep]);

  const handleReset = useCallback(() => {
    setTimeOnSocialMedia(0);
    setNotificationFrequency(0);
    setSleep(8);
    setInterpretation('');
    setError(null);
  }, []);

  const handleInterpretation = useCallback(async () => {
    setIsLoading(true);
    setIsModalOpen(true);
    setError(null);
    try {
      const result = await getInterpretation(simulationData);
      setInterpretation(result);
    } catch (e) {
      setError('Failed to get interpretation. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [simulationData]);
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <Controls
              timeOnSocialMedia={timeOnSocialMedia}
              setTimeOnSocialMedia={setTimeOnSocialMedia}
              notificationFrequency={notificationFrequency}
              setNotificationFrequency={setNotificationFrequency}
              sleep={sleep}
              setSleep={setSleep}
              onReset={handleReset}
              onInterpret={handleInterpretation}
              isInterpretDisabled={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            <Dashboard data={simulationData} />
          </div>
        </div>
      </main>
      <Footer />
      <InterpretationModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        isLoading={isLoading}
        interpretation={interpretation}
        error={error}
      />
    </div>
  );
};

export default App;
