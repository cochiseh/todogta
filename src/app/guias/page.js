export const metadata = {
    title: 'Guías de GTA VI - Preparación para el lanzamiento',
    description: 'Guías útiles para prepararte para el lanzamiento de GTA VI: requisitos de consola, historia de GTA, mundo de Leonida y más.',
};

const GUIDES = [
    { icon: 'sports_esports', title: '¿Qué consola necesito para GTA VI?', desc: 'GTA VI se lanzará exclusivamente en PlayStation 5 y Xbox Series X|S. No estará disponible en PS4, Xbox One ni Switch. La versión de PC llegará después.', tips: ['PS5: Asegúrate de tener al menos 150-200GB libres (estimado)', 'Xbox Series X: Experiencia óptima en resolución 4K', 'Xbox Series S: Compatible pero posiblemente con resolución reducida', 'PC: Espera fecha posterior, posiblemente 2027-2028'] },
    { icon: 'history', title: 'Resumen de la saga GTA para nuevos jugadores', desc: 'No necesitas haber jugado a ningún GTA anterior. Cada entrega tiene una historia independiente. Sin embargo, conocer la historia de Vice City añade contexto.', tips: ['GTA VI es independiente de GTA V y GTA Online', 'Vice City (2002) fue la primera versión de esta ambientación', 'Leonida es la versión ficticia de Florida', 'Lucía y Jason son personajes completamente nuevos'] },
    { icon: 'explore', title: 'Las 6 regiones de Leonida que debes conocer', desc: 'Leonida incluye Vice City (Miami), Leonida Keys (Florida Keys), Grassrivers (Everglades), Port Gellhorn (costa olvidada), Ambrosia (industrial) y Mount Kalaga (montaña).', tips: ['Vice City: metrópolis principal con playas y nightclubs', 'Leonida Keys: narcotráfico y aguas cristalinas', 'Grassrivers: pantanos con caimanes y misterio', 'Mount Kalaga: supervivencialistas fuera del sistema'] },
    { icon: 'tips_and_updates', title: 'Cómo seguir las noticias oficiales', desc: 'Rockstar Games comunica a través de canales muy específicos. Sigue únicamente fuentes verificadas para evitar desinformación.', tips: ['Sigue @RockstarGames en X (Twitter)', 'newswire.rockstargames.com es la fuente oficial de comunicados', 'Ignora cuentas que prometen leaks exclusivos', 'VI Portal verifica toda la información antes de publicar'] },
];

export default function GuiasPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4"><span className="material-symbols-outlined text-primary text-sm">menu_book</span><span className="text-xs font-bold text-primary uppercase tracking-wider">Centro de Guías</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Guías de <span className="text-primary">Preparación</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Todo lo que necesitas saber para estar listo cuando llegue GTA VI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {GUIDES.map(g => (
                    <div key={g.title} className="bg-surface-dark rounded-2xl border border-white/5 p-6 flex flex-col gap-4 neon-hover">
                        <div className="flex items-center gap-3"><div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-primary text-2xl">{g.icon}</span></div><h2 className="text-xl font-bold text-white">{g.title}</h2></div>
                        <p className="text-sm text-gray-400 leading-relaxed">{g.desc}</p>
                        <ul className="flex flex-col gap-2 mt-2">
                            {g.tips.map(t => <li key={t} className="flex items-start gap-2 text-sm text-gray-300"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{t}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
