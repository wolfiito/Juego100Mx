import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; 
import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore'; // Importamos el store directo

// Quitamos los props, lo sacaremos del store
export const StrikesOverlay = () => {
  const { strikes, buzzerTrigger } = useGameStore(); // Usamos el trigger
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Si el trigger cambia y es mayor a 0 (para evitar el inicio)
    if (buzzerTrigger > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [buzzerTrigger]); // <--- Escuchamos el CLICK, no el número de strikes

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
          <div className="flex gap-4">
            {/* Mostramos 1 X siempre que suene el buzzer, o puedes mostrar 'strikes' si prefieres ver 1, 2 o 3 */}
            <motion.div
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 rounded-full" />
                <div className="relative bg-gradient-to-br from-red-500 to-red-900 border-4 border-red-400 w-64 h-64 rounded-xl flex items-center justify-center shadow-2xl">
                    <X className="w-48 h-48 text-white drop-shadow-md" strokeWidth={4} />
                </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};