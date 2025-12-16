import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { AnswerCard } from '../components/game/AnswerCard';
import { ScoreBoard } from '../components/game/ScoreBoard';
import { StrikesOverlay } from '../components/game/StrikesOverlay';
import { useGameSounds } from '../hooks/useGameSounds';
import { Volume2 } from 'lucide-react';

export const BoardPage = () => {
  // 1. Activar el hook de sonidos (escucha cambios en el store y genera audio)
  useGameSounds();

  // 2. Estado local para el "Botón de Arranque" (evita bloqueo de audio del navegador)
  const [audioEnabled, setAudioEnabled] = useState(false);

  // 3. Conectar al Store
  const { 
    questions, 
    currentRoundIndex, 
    teamAScore, 
    teamBScore, 
    currentRoundPoints,
    // Nota: Ya no extraemos 'strikes' aquí, el componente Overlay lo hace solo
  } = useGameStore();

  const currentQuestion = questions[currentRoundIndex];

  // Lógica para rellenar visualmente hasta 8 espacios
  const totalSlots = 8;
  const answersToRender = Array.from({ length: totalSlots }).map((_, i) => {
    return currentQuestion.answers[i] || null;
  });

  return (
    <div className="min-h-screen bg-base-300 flex flex-col overflow-hidden relative font-sans">
      
      {/* --- PANTALLA DE INICIO (DESBLOQUEO DE AUDIO) --- */}
      {!audioEnabled && (
        <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-white p-4 text-center">
          <h1 className="text-5xl font-bold mb-6 font-display tracking-widest text-primary drop-shadow-lg">
            SISTEMA LISTO
          </h1>
          <button 
            onClick={() => setAudioEnabled(true)}
            className="btn btn-primary btn-lg gap-3 animate-pulse shadow-[0_0_50px_rgba(var(--p),0.6)] text-xl px-12"
          >
            <Volume2 size={32} /> HABILITAR SONIDO E INICIAR
          </button>
          <p className="mt-8 text-white/50 text-sm max-w-md">
            (Requerido para permitir efectos de sonido en el proyector)
          </p>
        </div>
      )}

      {/* LAYER DE STRIKES (Autónomo: escucha el buzzerTrigger del store) */}
      <StrikesOverlay />

      {/* HEADER: Puntos de la mesa */}
      <header className="h-32 w-full flex items-center justify-center relative z-10 pt-6">
        <div className="bg-gradient-to-b from-primary/30 to-primary/10 backdrop-blur-md px-16 py-4 rounded-3xl border border-primary/50 shadow-[0_0_40px_rgba(var(--p),0.4)]">
          <span className="text-7xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tighter font-display">
            ${currentRoundPoints}
          </span>
        </div>
      </header>

      {/* MAIN AREA */}
      <main className="flex-1 flex items-center justify-between px-4 md:px-12 gap-4 w-full max-w-[1920px] mx-auto z-0 pb-8">
        
        {/* Marcador Izquierda */}
        <ScoreBoard teamName="Familia 1" score={teamAScore} position="left" />

        {/* TABLERO CENTRAL */}
        <div className="flex-1 order-2 max-w-6xl w-full">
          {/* Pregunta */}
          <div className="mb-10 text-center relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
            <h1 className="relative text-3xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-xl bg-base-100/40 p-6 rounded-2xl backdrop-blur-md border border-white/10 font-display leading-tight">
              {currentQuestion.question}
            </h1>
          </div>

          {/* Grid de Respuestas */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 perspective-1000">
            {answersToRender.map((answer, index) => (
              answer ? (
                <AnswerCard
                  key={answer.id}
                  index={index + 1}
                  text={answer.text}
                  points={answer.points}
                  revealed={answer.revealed}
                />
              ) : (
                // Placeholder vacío para mantener estructura
                <div key={`empty-${index}`} className="h-24 w-full border border-white/5 rounded-lg bg-base-100/5 backdrop-blur-sm" />
              )
            ))}
          </div>
        </div>

        {/* Marcador Derecha */}
        <ScoreBoard teamName="Familia 2" score={teamBScore} position="right" />

      </main>

      {/* Footer Decorativo */}
      <footer className="h-10 w-full text-center opacity-20 text-xs text-white uppercase tracking-[0.5em] mb-2">
        100 Mexicanos New Gen • System Active
      </footer>
    </div>
  );
};