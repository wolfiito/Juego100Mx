import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { AdminPage } from './pages/AdminPage'; // <--- Importar esto

const Home = () => (
  <div className="h-screen flex flex-col items-center justify-center gap-6 bg-base-300">
    <h1 className="text-6xl font-black text-primary tracking-tighter">100 MEXICANOS</h1>
    <p className="text-xl opacity-60">Sistema de Control de Juego</p>
    <div className="flex gap-8 mt-8">
      <Link to="/board" target="_blank" className="card w-64 bg-base-100 hover:bg-base-200 transition-colors cursor-pointer shadow-xl border border-primary/20 group">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-primary group-hover:scale-110 transition-transform">📺 Proyector</h2>
            <p className="text-sm">Abre esta ventana en la pantalla extendida.</p>
        </div>
      </Link>
      
      <Link to="/admin" className="card w-64 bg-base-100 hover:bg-base-200 transition-colors cursor-pointer shadow-xl border border-accent/20 group">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-accent group-hover:scale-110 transition-transform">💻 Host</h2>
            <p className="text-sm">Panel de control para el conductor.</p>
        </div>
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* <--- Usar componente real */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;