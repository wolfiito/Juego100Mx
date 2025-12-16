interface ScoreBoardProps {
    teamName: string;
    score: number;
    position: 'left' | 'right'; // Para saber de qué lado poner el borde neón
  }
  
  export const ScoreBoard = ({ teamName, score, position }: ScoreBoardProps) => {
    const isLeft = position === 'left';
    
    return (
      <div className={`flex flex-col items-center justify-center p-1 w-48 ${isLeft ? 'order-1' : 'order-3'}`}>
        {/* Caja del Nombre */}
        <div className="w-full bg-base-100/50 backdrop-blur text-center py-2 rounded-t-lg border-b-2 border-primary/30">
          <h2 className="text-xl font-bold uppercase tracking-widest text-primary truncate px-2">
            {teamName}
          </h2>
        </div>
  
        {/* Caja de Puntos (Estilo Display Digital) */}
        <div className={`
          relative w-full h-32 flex items-center justify-center bg-black/80 rounded-b-lg border-2 
          ${isLeft ? 'border-l-4 border-l-secondary' : 'border-r-4 border-r-accent'}
          border-base-content/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]
        `}>
          {/* Efecto de fondo de rejilla */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none" />
          
          <span className="font-mono text-7xl font-black text-white z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            {score.toString().padStart(3, '0')}
          </span>
        </div>
      </div>
    );
  };