'use client';
import { useState } from 'react';

export default function RumoresPage() {
    const [filter, setFilter] = useState('all');

    const RUMORS = {
        probable: [
            { title: 'Redes sociales in-game tipo TikTok', desc: 'El Trailer 1 muestra contenido tipo Instagram/TikTok grabado por NPCs con smartphones dentro del juego.', source: 'Trailer 1 + Bloomberg', time: 'Dic 2023', confidence: 95 },
            { title: 'Mapa significativamente mayor que GTA V', desc: 'Con 6 regiones confirmadas, el mundo abierto se perfila como el más grande de Rockstar.', source: 'Rockstar Official', time: 'Dic 2023', confidence: 95 },
            { title: 'Sistema de atracos como mecánica central', desc: 'El Trailer 1 muestra a Jason y Lucía robando una tienda. Los atracos serán parte integral de la narrativa.', source: 'Trailer 1', time: 'Dic 2023', confidence: 90 },
            { title: 'Fauna dinámica activa en el mundo', desc: 'El trailer muestra caimanes en zonas urbanas y pantanos, flamencos, y otros animales como parte del ecosistema.', source: 'Trailer 1', time: 'Dic 2023', confidence: 90 },
        ],
        dudoso: [
            { title: 'Eventos climáticos dinámicos (huracanes)', desc: 'Se especula que el juego incluirá huracanes que afecten al mapa en tiempo real.', source: 'Especulación fan', time: 'Ene 2024', confidence: 50 },
            { title: 'GTA Online 2.0 en el lanzamiento', desc: 'No está claro si el componente multijugador estará disponible desde el día 1.', source: 'Insider Gaming', time: 'Feb 2025', confidence: 45 },
            { title: 'Modo cooperativo para la campaña', desc: 'Posibilidad de jugar la historia principal con un amigo controlando al otro protagonista.', source: 'Reddit / especulación', time: 'Ene 2024', confidence: 35 },
        ],
        falso: [
            { title: 'Lanzamiento simultáneo en PC', desc: 'Desmentido: la versión de PC llegará después del lanzamiento en consolas.', source: 'Take-Two Fiscal Reports', time: 'Feb 2024', confidence: 5 },
            { title: 'Mapa abarcando toda la costa este de USA', desc: 'Falso: el mapa se centra exclusivamente en el estado ficticio de Leonida.', source: 'Rockstar Official', time: 'Dic 2023', confidence: 2 },
            { title: 'Fecha de lanzamiento verano 2025', desc: 'La fecha original fue retrasada dos veces hasta el 19 de noviembre de 2026.', source: 'Rockstar Games', time: 'Nov 2025', confidence: 0 },
        ]
    };

    function RumorCard({ r, color }) {
        const styles = { emerald: { bl: 'border-l-emerald-500', bg: 'bg-emerald-500', t: 'text-emerald-400' }, primary: { bl: 'border-l-primary', bg: 'bg-primary', t: 'text-primary' }, red: { bl: 'border-l-red-500', bg: 'bg-red-500', t: 'text-red-400' } };
        const c = styles[color];
        return (
            <div className={`bg-surface-dark rounded-xl border border-white/5 border-l-4 ${c.bl} p-5 flex flex-col gap-3 neon-hover`}>
                <div className="flex items-start justify-between gap-2"><h3 className="text-base font-bold text-white leading-snug">{r.title}</h3><div className="flex-shrink-0 size-10 rounded-full flex items-center justify-center bg-black/30"><span className={`text-xs font-black ${c.t}`}>{r.confidence}%</span></div></div>
                <p className="text-sm text-gray-400 line-clamp-3">{r.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5"><span className="text-xs text-gray-500"><span className="material-symbols-outlined text-[14px] align-text-bottom">source</span> {r.source}</span><span className="text-xs text-gray-600">{r.time}</span></div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${c.bg} rounded-full`} style={{ width: `${r.confidence}%` }}></div></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4"><span className="material-symbols-outlined text-primary text-sm">psychology</span><span className="text-xs font-bold text-primary uppercase tracking-wider">Centro de Inteligencia</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Rumores y <span className="text-gradient-vice">Filtraciones</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Cada rumor analizado y clasificado según su fiabilidad.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button onClick={() => setFilter('all')} className={`px-5 py-2.5 text-sm font-bold rounded-lg ${filter === 'all' ? 'bg-white/10 text-white border border-white/10' : 'bg-white/5 text-gray-400 border border-white/5'}`}>Todos</button>
                <button onClick={() => setFilter('probable')} className={`px-5 py-2.5 text-sm font-bold rounded-lg badge-probable ${filter === 'probable' ? 'ring-1 ring-emerald-500' : ''}`}>Muy Probables</button>
                <button onClick={() => setFilter('dudoso')} className={`px-5 py-2.5 text-sm font-bold rounded-lg badge-dudoso ${filter === 'dudoso' ? 'ring-1 ring-primary' : ''}`}>Dudosos</button>
                <button onClick={() => setFilter('falso')} className={`px-5 py-2.5 text-sm font-bold rounded-lg badge-falso ${filter === 'falso' ? 'ring-1 ring-red-500' : ''}`}>Desmentidos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(filter === 'all' || filter === 'probable') && (
                    <div className="flex flex-col gap-4"><div className="flex items-center gap-2 pb-3 border-b-2 border-emerald-500"><span className="size-3 rounded-full bg-emerald-500"></span><h2 className="text-lg font-bold text-emerald-400 uppercase tracking-wide">Muy Probable</h2><span className="ml-auto text-xs text-gray-500 bg-emerald-500/10 px-2 py-1 rounded-full">{RUMORS.probable.length}</span></div>{RUMORS.probable.map(r => <RumorCard key={r.title} r={r} color="emerald" />)}</div>
                )}
                {(filter === 'all' || filter === 'dudoso') && (
                    <div className="flex flex-col gap-4"><div className="flex items-center gap-2 pb-3 border-b-2 border-primary"><span className="size-3 rounded-full bg-primary"></span><h2 className="text-lg font-bold text-primary uppercase tracking-wide">Dudoso</h2><span className="ml-auto text-xs text-gray-500 bg-primary/10 px-2 py-1 rounded-full">{RUMORS.dudoso.length}</span></div>{RUMORS.dudoso.map(r => <RumorCard key={r.title} r={r} color="primary" />)}</div>
                )}
                {(filter === 'all' || filter === 'falso') && (
                    <div className="flex flex-col gap-4"><div className="flex items-center gap-2 pb-3 border-b-2 border-red-500"><span className="size-3 rounded-full bg-red-500"></span><h2 className="text-lg font-bold text-red-400 uppercase tracking-wide">Desmentido</h2><span className="ml-auto text-xs text-gray-500 bg-red-500/10 px-2 py-1 rounded-full">{RUMORS.falso.length}</span></div>{RUMORS.falso.map(r => <RumorCard key={r.title} r={r} color="red" />)}</div>
                )}
            </div>
        </div>
    );
}
