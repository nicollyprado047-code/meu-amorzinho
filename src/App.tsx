import { useState, useCallback } from 'react';
import StarfieldBackground from '@/components/StarfieldBackground';
import CursorTrail from '@/components/CursorTrail';
import MusicPlayer from '@/components/MusicPlayer';
import IntroScreen from '@/components/IntroScreen';
import LetterSection from '@/components/sections/LetterSection';
import SmallThingsSection from '@/components/sections/SmallThingsSection';
import MemoriesSection from '@/components/sections/MemoriesSection';
import ConstellationSection from '@/components/sections/ConstellationSection';
import CounterSection from '@/components/sections/CounterSection';
import SurpriseSection from '@/components/sections/SurpriseSection';
import FinalSection from '@/components/sections/FinalSection';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleEnter = useCallback(() => {
    setShouldPlayMusic(true);
    setIntroVisible(false);
    // Wait for the fade-out transition to finish before unmounting
    setTimeout(() => setEntered(true), 1500);
  }, []);

  return (
    <>
      {/* Animated night-sky background — always present */}
      <StarfieldBackground />

      {/* Custom cursor with luminous trail — desktop only */}
      <CursorTrail />

      {/* Music player — visible after entering */}
      {entered && <MusicPlayer shouldPlay={shouldPlayMusic} />}

      {/* Intro screen — covers everything until user clicks "Entrar" */}
      <IntroScreen onEnter={handleEnter} visible={introVisible} />

      {/* Main content — hidden until intro transition completes */}
      {entered && (
        <main
          className="relative z-10"
          style={{ animation: 'fadeIn 2s ease forwards' }}
        >
          <LetterSection />
          <SmallThingsSection />
          <MemoriesSection />
          <ConstellationSection />
          <CounterSection />
          <SurpriseSection />
          <FinalSection />
        </main>
      )}
    </>
  );
}
