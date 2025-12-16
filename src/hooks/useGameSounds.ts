import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

// IMPORTAR TUS ARCHIVOS LOCALES
// Asegúrate de que existan en src/assets/sounds/
import correctSfx from '../assets/sounds/correct.mp3';
import wrongSfx from '../assets/sounds/wrong.mp3';

export const useGameSounds = () => {
  const { strikes, questions, currentRoundIndex } = useGameStore();
  
  const prevStrikes = useRef(strikes);
  const prevRevealedCount = useRef(0);

  // Crear referencias de Audio una sola vez
  const correctAudio = useRef(new Audio(correctSfx));
  const wrongAudio = useRef(new Audio(wrongSfx));

  useEffect(() => {
    // Precargar para que suenen al instante
    correctAudio.current.load();
    wrongAudio.current.load();
  }, []);

  // 1. EFECTO DE STRIKES (Error)
  useEffect(() => {
    // Si los strikes aumentan (o si ya son 3 pero volvió a sonar el buzzer)
    // Usamos una lógica simple: si strikes > 0 y cambió el valor, suena.
    // (Gracias al buzzerTrigger del store, esto se actualizará siempre)
    if (strikes > 0) {
      // Pequeño hack: comparamos si realmente fue una acción nueva
      // O simplemente confiamos en que el componente se renderizó por el cambio
      console.log("🔊 Play: ERROR");
      wrongAudio.current.currentTime = 0;
      wrongAudio.current.play().catch(e => console.error("Error audio:", e));
    }
  }, [useGameStore.getState().buzzerTrigger]); // Escuchamos el gatillo directo

  // 2. EFECTO DE RESPUESTA CORRECTA
  useEffect(() => {
    const currentQuestion = questions[currentRoundIndex];
    const currentRevealedCount = currentQuestion.answers.filter(a => a.revealed).length;

    if (currentRevealedCount > prevRevealedCount.current) {
        console.log("🔊 Play: CORRECTO");
        correctAudio.current.currentTime = 0;
        correctAudio.current.play().catch(e => console.error("Error audio:", e));
    }
    
    // Reset para nueva ronda
    if (currentRoundIndex !== -1 && currentRevealedCount === 0) {
        prevRevealedCount.current = 0;
    } else {
        prevRevealedCount.current = currentRevealedCount;
    }
  }, [questions, currentRoundIndex]);
};