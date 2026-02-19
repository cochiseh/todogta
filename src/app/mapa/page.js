export const metadata = {
    title: 'Mapa de Leonida - Estado completo de GTA VI',
    description: 'Las 6 regiones confirmadas del estado de Leonida en GTA VI: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia y Mount Kalaga.',
};

const STATS = [
    { value: '6', label: 'Regiones confirmadas', icon: 'map', color: 'text-primary' },
    { value: 'Vice City', label: 'Metrópolis principal', icon: 'location_city', color: 'text-secondary-pink' },
    { value: 'Leonida', label: 'Estado ficticio (Florida)', icon: 'public', color: 'text-secondary-cyan' },
    { value: 'Moderna', label: 'Ambientación temporal', icon: 'schedule', color: 'text-neon-green' },
];

const REGIONS = [
    { name: 'Vice City', desc: 'Metrópolis principal basada en Miami. Neon, nightclubs, yates, hoteles art deco de Ocean Beach, panaderías de Little Cuba y el VC Port.', year: 'Confirmada en Trailer 1' },
    { name: 'Leonida Keys', desc: 'Archipiélago tropical inspirado en los Florida Keys. "Las aguas más hermosas y peligrosas de América". Jason trabaja aquí para narcotraficantes.', year: 'Confirmada oficialmente' },
    { name: 'Grassrivers', desc: 'La "joya indomable" de Leonida. Pantanos inspirados en los Everglades con caimanes, vegetación densa y el "corazón misterioso" del estado.', year: 'Confirmada oficialmente' },
    { name: 'Port Gellhorn', desc: 'Pueblo costero decadente en la "costa olvidada". Moteles baratos, centros comerciales vacíos y atracciones abandonadas.', year: 'Confirmada oficialmente' },
    { name: 'Ambrosia', desc: 'Hub industrial en el centro de Leonida. Dominada por la refinería de azúcar Allied Crystal. Mezcla de control corporativo y bandas callejeras.', year: 'Confirmada oficialmente' },
    { name: 'Mount Kalaga National Park', desc: 'Parque nacional en el norte. Caza, pesca, rutas todoterreno, kayak. Habitado por radicales paranoicos fuera del sistema.', year: 'Confirmada oficialmente' },
];

const HISTORY = [
    { year: '1986 (GTA: Vice City)', desc: 'La primera Vice City: una isla compacta inspirada en la Miami de los 80. Dos islas principales conectadas por puentes, estética neón y cocaine cowboys.', highlight: false },
    { year: '2006 (Vice City Stories)', desc: 'Precuela ambientada en 1984. Misma geografía ampliada con nuevas áreas interiores y un sistema de negocios ilícitos.', highlight: false },
    { year: '2013 (GTA V - Los Santos)', desc: 'Rockstar establece un nuevo estándar con Los Santos y el condado de Blaine. ~127 km² de mundo abierto con montañas, desierto y ciudad.', highlight: false },
    { year: '2026 (GTA VI - Leonida)', desc: 'El mundo abierto más ambicioso de Rockstar. Un estado completo con 6 regiones distintas: metrópolis, cayos, pantanos, costa, industria y montaña.', highlight: true },
];

export default function MapaPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-cyan/10 border border-secondary-cyan/30 mb-4"><span className="material-symbols-outlined text-secondary-cyan text-sm">map</span><span className="text-xs font-bold text-secondary-cyan uppercase tracking-wider">Análisis Geográfico</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">El Estado de <span className="text-primary">Leonida</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">De la isla compacta de Vice City al vasto estado de Leonida. La versión ficticia de Florida de Rockstar Games.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {STATS.map(s => <div key={s.label} className="bg-surface-dark rounded-xl border border-white/5 p-5 text-center neon-hover"><span className={`material-symbols-outlined ${s.color} text-3xl mb-2`}>{s.icon}</span><p className={`text-2xl font-black ${s.color}`}>{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>)}
            </div>

            <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">public</span> Leonida: La Florida de Rockstar</h2>
                <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABoUP1zWdQjyRL910Oc_13lmuWPcV3Xe9PCm_4Kob5e2dB2t0fs-0L4WuR1V48dUY5w2rZ9Hx9uQI__Ne1XzcY5dQlI4xdc8cy0d_o35KYSZ9z0bqf1kQwgMvg756gmJCJvmZZgCPHRBmP_d36vH7eLkG0exEm_gnpgk4Rhq482kbeOppOmOrqgUfDLIGUo0r9PhLoN6_84gCsw72UIEmfA72t7CguGqSQElQ09vJVIIQWxzvcsAXig72QDZ9PWp2H3ztwwqsiMney")' }}></div>
                <p className="text-gray-300 leading-relaxed">El estado ficticio de <strong className="text-white">Leonida</strong> es la versión de Rockstar del estado de Florida. Incluye una reimaginación moderna de Vice City — esta vez ambientada en la era actual. El mundo se extiende desde las playas tropicales de los Keys hasta los pantanos salvajes de Grassrivers.</p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">explore</span> Las 6 Regiones de Leonida</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {REGIONS.map((r, i) => (
                    <div key={r.name} className="bg-surface-dark rounded-xl border border-white/5 p-6 neon-hover">
                        <div className="flex items-center gap-3 mb-3"><span className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</span><h3 className="text-xl font-bold text-white">{r.name}</h3></div>
                        <p className="text-sm text-gray-400 mb-3">{r.desc}</p>
                        <span className="text-xs text-secondary-cyan font-medium"><span className="material-symbols-outlined text-[14px] align-text-bottom">verified</span> {r.year}</span>
                    </div>
                ))}
            </div>

            <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">timeline</span> Evolución Histórica de Vice City</h2>
                <div className="flex flex-col gap-4">
                    {HISTORY.map(t => (
                        <div key={t.year} className="flex gap-4 items-start">
                            <div className={`flex-shrink-0 size-4 rounded-full ${t.highlight ? 'bg-primary neon-box-glow' : 'bg-surface-border'} border-2 border-background-dark mt-1.5`}></div>
                            <div className={`bg-background-dark rounded-xl border ${t.highlight ? 'border-primary/30' : 'border-white/5'} p-4 flex-1`}>
                                <span className={`text-sm font-bold ${t.highlight ? 'text-primary' : 'text-gray-500'}`}>{t.year}</span>
                                <p className="text-sm text-gray-300 mt-1">{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-surface-dark rounded-xl border border-white/5 p-6 text-center">
                <p className="text-sm text-gray-400"><span className="material-symbols-outlined text-primary text-[16px] align-text-bottom">info</span> Toda la información procede del Trailer 1 oficial y las descripciones publicadas por Rockstar Games.</p>
            </div>
        </div>
    );
}
