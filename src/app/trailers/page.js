export const metadata = {
    title: 'Análisis de Trailers de GTA VI',
    description: 'Análisis frame a frame del Trailer 1 de GTA VI. Cada detalle confirmado, easter eggs, y personajes identificados.',
};

const TRAILER_DATA = {
    title: 'Trailer 1 — "Welcome to the State of Leonida"',
    date: '5 de diciembre de 2023',
    views: '+200M visualizaciones',
    duration: '1:31',
    youtubeId: 'QdBZY2fkU-0',
    keyFindings: [
        { time: '0:00-0:10', title: 'Introducción: vida cotidiana en Leonida', desc: 'Secuencia rápida de escenas que establecen el tono: playas, fiestas, fauna, cultura "Florida Man".', icon: 'videocam' },
        { time: '0:11-0:25', title: 'Lucía sale de prisión', desc: 'Primera aparición de Lucía. Sale del Departamento Correccional de Leonida. Un oficial le pregunta por su situación.', icon: 'person' },
        { time: '0:26-0:40', title: 'Vice City al atardecer', desc: 'Panorámica de Vice City moderna: rascacielos, Ocean Beach, tráfico, vida nocturna con neon.', icon: 'location_city' },
        { time: '0:41-0:55', title: 'Redes sociales in-game', desc: 'NPCs grabando con smartphones. Contenido tipo TikTok/Instagram satirizando la cultura de las redes sociales.', icon: 'smartphone' },
        { time: '0:56-1:10', title: 'Jason y Lucía juntos', desc: 'Se les ve robando una tienda, en un coche de huida, y en momentos íntimos. Dinámica Bonnie & Clyde.', icon: 'people' },
        { time: '1:10-1:31', title: 'Clímax y título', desc: '"Welcome to the state of Leonida" — título oficial: Grand Theft Auto VI. Coming 2025.', icon: 'movie' },
    ],
    records: [
        '93M+ visualizaciones en 24 horas (récord de YouTube)',
        '200M+ visualizaciones en menos de un mes',
        'Tendencia #1 mundial durante 72+ horas consecutivas',
        'Vídeo de videojuego más comentado de la historia',
    ],
};

export default function TrailersPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-pink/10 border border-secondary-pink/30 mb-4"><span className="material-symbols-outlined text-secondary-pink text-sm">movie</span><span className="text-xs font-bold text-secondary-pink uppercase tracking-wider">Análisis Frame a Frame</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Análisis de <span className="text-gradient-vice">Trailers</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Cada segundo del trailer oficial deconstruido y analizado.</p>
            </div>

            {/* Video embed */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                    <div className="aspect-video">
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${TRAILER_DATA.youtubeId}`} title="GTA VI Trailer 1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-2">{TRAILER_DATA.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {TRAILER_DATA.date}</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">visibility</span> {TRAILER_DATA.views}</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">timer</span> {TRAILER_DATA.duration}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frame analysis */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">frame_inspect</span> Análisis por Secuencia</h2>
                <div className="flex flex-col gap-4">
                    {TRAILER_DATA.keyFindings.map((kf, i) => (
                        <div key={i} className="bg-surface-dark rounded-xl border border-white/5 p-5 flex gap-4 neon-hover">
                            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-primary">{kf.icon}</span></div>
                            <div className="flex-1"><div className="flex items-center gap-3 mb-1"><span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{kf.time}</span><h3 className="text-base font-bold text-white">{kf.title}</h3></div><p className="text-sm text-gray-400">{kf.desc}</p></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Records */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-secondary-pink/10 to-secondary-cyan/10 rounded-2xl border border-secondary-pink/20 p-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-yellow-500">emoji_events</span> Récords del Trailer</h2>
                    <ul className="flex flex-col gap-3">
                        {TRAILER_DATA.records.map(r => <li key={r} className="flex items-start gap-2 text-gray-300"><span className="material-symbols-outlined text-yellow-500 text-[16px] mt-0.5">star</span>{r}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
