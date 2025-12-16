import { create } from 'zustand';
import type{ GameState } from '../types/game';
import { mockGameData } from '../data/mockGame';

// 1. Canal de comunicación (Fuera del hook para que sea único)
const gameChannel = new BroadcastChannel('100_mexicanos_channel');

export const useGameStore = create<GameState>((set, get) => {

  // 2. Configurar el "Oído": Escuchar mensajes de otras pestañas
  gameChannel.onmessage = (event) => {
    // Al recibir datos, actualizamos el estado local
    console.log("Sincronizando datos...", event.data);
    set(event.data);
  };

  // 3. Función auxiliar SEGURA para transmitir
  // Esta función actualiza el estado local Y avisa a las otras pestañas
  const setAndBroadcast = (partialState: Partial<GameState> | ((state: GameState) => Partial<GameState>)) => {
    set((state) => {
      // Calcular el nuevo estado
      const nextStatePartial = typeof partialState === 'function' ? partialState(state) : partialState;
      const finalState = { ...state, ...nextStatePartial };
      
      // EXTRAER SOLO LOS DATOS (Payload)
      // Importante: No enviamos funciones, solo variables
      const broadcastPayload = {
        questions: finalState.questions,
        currentRoundIndex: finalState.currentRoundIndex,
        teamAScore: finalState.teamAScore,
        teamBScore: finalState.teamBScore,
        currentRoundPoints: finalState.currentRoundPoints,
        strikes: finalState.strikes,
        buzzerTrigger: finalState.buzzerTrigger, // <--- Vital para la animación de la X
      };

      // Enviamos el mensaje
      gameChannel.postMessage(broadcastPayload);
      
      return finalState;
    });
  };

  // 4. Retornar el Estado Inicial y las Acciones
  return {
    // --- ESTADO (DATA) ---
    questions: mockGameData,
    currentRoundIndex: 0,
    teamAScore: 0,
    teamBScore: 0,
    currentRoundPoints: 0,
    strikes: 0,
    buzzerTrigger: 0, // Inicializamos en 0

    // --- ACCIONES (FUNCIONES) ---
    
    setGameData: (data) => setAndBroadcast({ questions: data }),

    revealAnswer: (answerId) => {
      const state = get();
      const currentQuestion = state.questions[state.currentRoundIndex];
      const answerExists = currentQuestion.answers.find((a) => a.id === answerId);

      if (!answerExists || answerExists.revealed) return;

      const updatedQuestions = state.questions.map((q, index) => {
        if (index !== state.currentRoundIndex) return q;
        return {
          ...q,
          answers: q.answers.map((a) =>
            a.id === answerId ? { ...a, revealed: true } : a
          ),
        };
      });

      setAndBroadcast({
        questions: updatedQuestions,
        currentRoundPoints: state.currentRoundPoints + answerExists.points,
      });
    },

    addStrike: () => {
      const state = get();
      setAndBroadcast({
        strikes: state.strikes < 3 ? state.strikes + 1 : 3, // Tope visual en 3
        buzzerTrigger: state.buzzerTrigger + 1, // <--- Siempre suma 1 para disparar la animación
      });
    },

    resetStrikes: () => setAndBroadcast({ strikes: 0, buzzerTrigger: 0 }),

    addPointsToTeam: (team) => {
      const state = get();
      const points = state.currentRoundPoints;
      setAndBroadcast({
        teamAScore: team === 'A' ? state.teamAScore + points : state.teamAScore,
        teamBScore: team === 'B' ? state.teamBScore + points : state.teamBScore,
        currentRoundPoints: 0,
      });
    },

    nextRound: () => {
      const state = get();
      setAndBroadcast({
        currentRoundIndex:
          state.currentRoundIndex < state.questions.length - 1
            ? state.currentRoundIndex + 1
            : state.currentRoundIndex,
        currentRoundPoints: 0,
        strikes: 0,
        buzzerTrigger: 0,
      });
    },
  };
});