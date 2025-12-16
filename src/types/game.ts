export interface Answer {
    id: number;
    text: string;
    points: number;
    revealed: boolean; // ¿Ya se mostró en el tablero?
  }
  
  export interface Question {
    id: number;
    question: string;
    answers: Answer[];
  }
  
  export interface GameState {
    questions: Question[];        // Todas las rondas del juego
    currentRoundIndex: number;    // En qué ronda estamos (0, 1, 2...)
    teamAScore: number;           // Puntos Familia 1
    teamBScore: number;           // Puntos Familia 2
    currentRoundPoints: number;   // Puntos acumulados en la ronda actual
    strikes: number;              // Los "X" (0, 1, 2, 3)
    buzzerTrigger: number;
    // Acciones (Actions) para modificar el estado
    setGameData: (data: Question[]) => void;
    revealAnswer: (answerId: number) => void;
    addStrike: () => void;
    resetStrikes: () => void;
    addPointsToTeam: (team: 'A' | 'B') => void;
    nextRound: () => void;
  }