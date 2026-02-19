import Countdown from '@/components/Countdown';

export const metadata = {
    title: 'Fecha de Lanzamiento de GTA VI - Cuenta Atrás',
    description: 'GTA VI se lanza el 19 de noviembre de 2026 en PS5 y Xbox Series X|S. Cuenta atrás en directo y cronología completa de anuncios.',
};

const TIMELINE = [
    { date: '2014', title: 'Inicio del desarrollo', desc: 'Rockstar comienza el trabajo preliminar en GTA VI.', active: false },
    { date: 'Sep 2022', title: 'Hackeo masivo', desc: 'Filtración de 90+ vídeos de gameplay pre-alpha por "teapotuberhacker".', active: false },
    { date: '5 Dic 2023', title: 'Trailer 1 oficial', desc: 'Rompe todos los récords de YouTube. Confirma Vice City, Lucía y Jason.', active: false },
    { date: 'Feb 2024', title: 'Take-Two confirma fecha', desc: 'Ventana de otoño 2025 confirmada en informe fiscal.', active: false },
    { date: '2025', title: 'Primer retraso', desc: 'Aplazamiento de otoño 2025 a mayo 2026.', active: false },
    { date: 'Nov 2025', title: 'Segundo retraso', desc: 'Aplazamiento de mayo 2026 al 19 de noviembre de 2026.', active: true },
    { date: '19 Nov 2026', title: '🎮 LANZAMIENTO', desc: 'Grand Theft Auto VI - PlayStation 5 y Xbox Series X|S.', active: true },
];

export default function FechaPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4"><span className="material-symbols-outlined text-primary text-sm">calendar_month</span><span className="text-xs font-bold text-primary uppercase tracking-wider">Cuenta Atrás Oficial</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Fecha de <span className="text-primary">Lanzamiento</span></h1>
                <p className="text-2xl font-bold text-white mt-4">19 de noviembre de 2026</p>
                <p className="text-gray-400 text-lg">PlayStation 5 &bull; Xbox Series X|S</p>
            </div>

            <div className="bg-surface-dark rounded-2xl border border-white/5 p-8 md:p-12 mb-12 text-center">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Tiempo restante para el lanzamiento</h2>
                <Countdown variant="large" />
                <p className="text-xs text-gray-600 mt-6">Basado en la fecha oficial: 19 de noviembre de 2026, 00:00 hora local.</p>
            </div>

            <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">timeline</span> Cronología de Anuncios</h2>
                <div className="flex flex-col gap-4">
                    {TIMELINE.map(t => (
                        <div key={t.date} className="flex gap-4 items-start">
                            <div className={`flex-shrink-0 size-4 rounded-full ${t.active ? 'bg-primary neon-box-glow' : 'bg-surface-border'} border-2 border-background-dark mt-1.5`}></div>
                            <div className={`bg-background-dark rounded-xl border ${t.active ? 'border-primary/30' : 'border-white/5'} p-4 flex-1`}>
                                <span className={`text-sm font-bold ${t.active ? 'text-primary' : 'text-gray-500'}`}>{t.date}</span>
                                <h3 className="text-white font-semibold mt-1">{t.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary-pink/10 rounded-2xl border border-primary/20 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">¿Versión de PC?</h2>
                <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">Rockstar no ha confirmado una fecha para la versión de PC. Siguiendo la tradición de GTA V (que tardó 18 meses), los analistas estiman que la versión de PC podría llegar en <strong className="text-white">2027 o principios de 2028</strong>.</p>
            </div>
        </div>
    );
}
