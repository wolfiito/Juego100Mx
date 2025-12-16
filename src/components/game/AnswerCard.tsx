import { motion } from "framer-motion";
import clsx from "clsx";

// Definimos qué datos necesita la tarjeta para funcionar
interface AnswerCardProps {
  index: number;    // El número grande (1, 2, 3...)
  text: string;     // La respuesta (Ej: "VER EL CELULAR")
  points: number;   // Los puntos (Ej: 35)
  revealed: boolean; // ¿Está volteada o no?
}

export const AnswerCard = ({
  index,
  text,
  points,
  revealed,
}: AnswerCardProps) => {
  // Estilos base compartidos para ambas caras de la tarjeta
  const cardFaceBaseStyles =
    "absolute inset-0 h-full w-full rounded-lg border flex items-center justify-center overflow-hidden backface-hidden shadow-lg transition-colors";

  return (
    // 1. Contenedor que define el espacio 3D
    <div className="perspective-1000 h-24 w-full">
      
      {/* 2. El elemento que realmente gira (usando framer-motion) */}
      <motion.div
        className="relative h-full w-full preserve-3d"
        // La magia de la animación está aquí: si 'revealed' es true, rota 180 grados
        animate={{ rotateX: revealed ? 180 : 0 }}
        // Configuración del "resorte" para que el giro se sienta físico y satisfactorio
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        
        {/* ---- CARA FRONTAL (Oculta / El Número) ---- */}
        <div
          className={clsx(
            cardFaceBaseStyles,
            // Estilo Cyberpunk: Fondo oscuro translúcido con borde neón sutil
            "bg-base-300/80 border-primary/40 backdrop-blur-sm"
          )}
        >
          {/* Efecto de "scanline" digital sutil */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>
          
          {/* El número grande con gradiente y brillo */}
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary via-secondary to-accent drop-shadow-[0_0_15px_rgba(var(--p))]">
            {index}
          </span>
        </div>

        {/* ---- CARA TRASERA (Revelada / Texto y Puntos) ---- */}
        <div
          className={clsx(
            cardFaceBaseStyles,
            // Estilo Revelado: Más brillante, borde neón intenso
            "rotate-x-180 bg-secondary/20 border-secondary backdrop-blur-md"
          )}
        >
          <div className="flex w-full h-full items-center justify-between px-6">
            {/* Texto de la respuesta */}
            <span className="text-2xl md:text-3xl font-bold uppercase text-secondary-content tracking-wider drop-shadow-md truncate mr-4">
              {text}
            </span>
            {/* Puntos */}
            <div className="flex items-center justify-center bg-secondary text-secondary-content font-black text-3xl h-full px-5 -mr-6 clip-path-slant">
             <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{points}</span>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};