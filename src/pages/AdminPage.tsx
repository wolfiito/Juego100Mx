import { useGameStore } from '../store/useGameStore';
import { Eye, EyeOff, XCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

export const AdminPage = () => {
  const {
    questions,
    currentRoundIndex,
    revealAnswer,
    addStrike,
    resetStrikes,
    strikes,
    addPointsToTeam,
    nextRound,
    currentRoundPoints,
    teamAScore,
    teamBScore
  } = useGameStore();

  const currentQuestion = questions[currentRoundIndex];

  return (
    // FORZAMOS FONDO CLARO Y TEXTO OSCURO (Ignorando tema global)
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-6">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-300">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-blue-700">Panel de Control</h1>
          <p className="text-sm text-gray-500">Ronda {currentRoundIndex + 1} de {questions.length}</p>
        </div>
        
        <div className="flex gap-6 items-center bg-gray-50 px-6 py-2 rounded-lg border border-gray-200">
            <div className="text-right">
                <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">En la mesa</span>
                <span className="text-3xl font-mono font-bold text-green-600">${currentRoundPoints}</span>
            </div>
            <button 
                onClick={nextRound}
                className="btn btn-warning btn-sm gap-2 text-gray-900"
            >
                Siguiente Ronda <ArrowRight size={16} />
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA 1 & 2: Gestión de Preguntas */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Tarjeta de la Pregunta */}
            <div className="bg-white p-6 rounded-xl border-l-8 border-blue-600 shadow-sm">
                <h2 className="text-sm font-bold text-gray-400 uppercase mb-2">Pregunta Actual</h2>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    {currentQuestion.question}
                </p>
            </div>

            {/* Lista de Respuestas (Tabla) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-sm font-bold text-gray-500">#</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Respuesta</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Pts</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Estado</th>
                            <th className="p-4 text-sm font-bold text-gray-500">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentQuestion.answers.map((answer) => (
                            <tr key={answer.id} className={`hover:bg-gray-50 transition-colors ${answer.revealed ? 'bg-green-50' : ''}`}>
                                <td className="p-4 font-mono text-gray-400">{answer.id}</td>
                                <td className="p-4 font-bold text-gray-800 text-lg">{answer.text}</td>
                                <td className="p-4 font-mono font-bold text-blue-600">{answer.points}</td>
                                <td className="p-4">
                                    {answer.revealed ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            <Eye size={12}/> Visible
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-600">
                                            <EyeOff size={12}/> Oculta
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => revealAnswer(answer.id)}
                                        disabled={answer.revealed}
                                        className={`btn btn-sm ${answer.revealed ? 'btn-disabled opacity-50' : 'btn-primary text-white'}`}
                                    >
                                        {answer.revealed ? 'Lista' : 'Revelar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* COLUMNA 3: Acciones (Strikes y Puntos) */}
        <div className="space-y-6">
            
            {/* Panel de Strikes */}
            <div className="bg-white shadow-sm rounded-xl border border-red-100 overflow-hidden">
                <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-center">
                    <h2 className="font-bold text-red-700 flex items-center gap-2">
                        <XCircle size={20}/> Control de Errores
                    </h2>
                    <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded">
                        {strikes} / 3
                    </span>
                </div>
                
                <div className="p-6">
                    <div className="flex justify-center gap-3 mb-6">
                        {[1, 2, 3].map((i) => (
                             <div key={i} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                                 i <= strikes 
                                 ? 'bg-red-600 border-red-600 text-white shadow-lg scale-110' 
                                 : 'bg-gray-100 border-gray-200 text-gray-300'
                             }`}>
                                <XCircle size={24} />
                             </div>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={addStrike} 
                            className="btn btn-error w-full text-white font-bold shadow-red-200 shadow-lg hover:shadow-xl transition-all"
                        >
                            <XCircle className="mr-2" /> MARCAR ERROR (X)
                        </button>
                        <button 
                            onClick={resetStrikes} 
                            className="btn btn-ghost btn-xs w-full text-gray-400 hover:text-gray-600"
                        >
                            <RotateCcw size={12} className="mr-1"/> Resetear Contador
                        </button>
                    </div>
                </div>
            </div>

            {/* Asignación de Puntos */}
            <div className="bg-white shadow-sm rounded-xl border border-yellow-200 overflow-hidden">
                <div className="bg-yellow-50 p-4 border-b border-yellow-100">
                    <h2 className="font-bold text-yellow-800 flex items-center gap-2">
                        <Trophy size={20}/> Asignar Puntos de Ronda
                    </h2>
                </div>

                <div className="p-6">
                    <p className="text-xs text-gray-500 mb-4 text-center">
                        Al terminar la ronda, envía los <b>${currentRoundPoints}</b> puntos al ganador.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                            <div className="text-xs font-bold text-gray-400 mb-1">FAMILIA 1</div>
                            <div className="text-2xl font-mono font-black text-gray-800 mb-2">{teamAScore}</div>
                            <button 
                                onClick={() => addPointsToTeam('A')}
                                disabled={currentRoundPoints === 0}
                                className="btn btn-success btn-xs w-full text-white"
                            >
                                + Asignar
                            </button>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                            <div className="text-xs font-bold text-gray-400 mb-1">FAMILIA 2</div>
                            <div className="text-2xl font-mono font-black text-gray-800 mb-2">{teamBScore}</div>
                            <button 
                                onClick={() => addPointsToTeam('B')}
                                disabled={currentRoundPoints === 0}
                                className="btn btn-info btn-xs w-full text-white"
                            >
                                + Asignar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};