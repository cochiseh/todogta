export const metadata = {
    title: 'Todo lo Confirmado sobre GTA VI',
    description: 'Guía completa con cada detalle oficialmente confirmado sobre Grand Theft Auto VI: protagonistas, mapa, regiones, ficha técnica y premios.',
};

const SECTIONS = [
    { id: 'protagonistas', label: 'Protagonistas', icon: 'people' },
    { id: 'mapa-leonida', label: 'Mapa de Leonida', icon: 'map' },
    { id: 'regiones', label: 'Regiones Confirmadas', icon: 'explore' },
    { id: 'desarrollo', label: 'Desarrollo', icon: 'build' },
    { id: 'ficha-tecnica', label: 'Ficha Técnica', icon: 'memory' },
    { id: 'premios', label: 'Premios', icon: 'emoji_events' },
];

const REGIONS = [
    { name: 'Vice City', desc: 'La metrópolis principal. Versión moderna de Miami con neon, nightclubs, yates, hoteles art deco de Ocean Beach y la bulliciosa Little Cuba.', icon: 'location_city', color: 'text-secondary-pink' },
    { name: 'Leonida Keys', desc: 'Archipiélago tropical inspirado en los Florida Keys. Descrito como "las aguas más hermosas y más peligrosas de América".', icon: 'sailing', color: 'text-secondary-cyan' },
    { name: 'Grassrivers', desc: 'La "joya indomable" de Leonida. Inspirada en los Everglades: pantanos misteriosos con caimanes, vegetación densa y niebla.', icon: 'forest', color: 'text-neon-green' },
    { name: 'Port Gellhorn', desc: 'Pueblo costero decadente con moteles baratos, centros comerciales vacíos y atracciones abandonadas en la "costa olvidada".', icon: 'anchor', color: 'text-primary' },
    { name: 'Ambrosia', desc: 'Hub industrial en el centro de Leonida. Dominada por la refinería de azúcar Allied Crystal. Mezcla de control corporativo y territorial de bandas.', icon: 'factory', color: 'text-yellow-500' },
    { name: 'Mount Kalaga National Park', desc: 'Parque nacional en el norte. Caza, pesca, rutas todoterreno y kayak. Habitado por radicales paranoicos que viven fuera del sistema.', icon: 'terrain', color: 'text-emerald-400' },
];

const TIMELINE = [
    { year: '2014', text: 'Rockstar comienza el trabajo preliminar en GTA VI.' },
    { year: '2018', text: 'Inicio del desarrollo activo del juego.' },
    { year: 'Sep 2022', text: 'El hacker "teapotuberhacker" filtra 90+ vídeos de gameplay pre-alpha. Rockstar confirma la brecha de seguridad.' },
    { year: 'Dic 2023', text: 'Rockstar publica el Trailer 1 oficial. Rompe récords como el trailer de videojuego más visto en 24 horas.' },
    { year: 'Feb 2024', text: 'Take-Two confirma la ventana de lanzamiento para otoño 2025 en su informe fiscal.' },
    { year: 'Abr 2024', text: 'Rockstar solicita regreso a oficinas 5 días/semana para las "etapas finales" del desarrollo.' },
    { year: 'Oct 2025', text: 'Despidos en Rockstar North y Toronto por filtrar información confidencial.' },
    { year: 'Nov 2025', text: 'Rockstar anuncia retraso al 19 de noviembre de 2026 para garantizar la máxima calidad.' },
];

const SPECS = [
    ['Título oficial', 'Grand Theft Auto VI'],
    ['Desarrollador', 'Rockstar North (líder) + Rockstar Studios global'],
    ['Publisher', 'Rockstar Games / Take-Two Interactive'],
    ['Motor gráfico', 'RAGE (Rockstar Advanced Game Engine) - nueva generación'],
    ['Plataformas de lanzamiento', 'PlayStation 5, Xbox Series X|S'],
    ['Versión PC', 'Posterior al lanzamiento en consolas (estimado 2027)'],
    ['Fecha de lanzamiento', '19 de noviembre de 2026'],
    ['Género', 'Acción-aventura, mundo abierto'],
    ['Ambientación', 'Estado ficticio de Leonida (Florida), era moderna'],
    ['Protagonistas', 'Lucía y Jason (dúo criminal)'],
    ['Clasificación', 'PEGI 18 / ESRB Mature 17+ (estimado)'],
];

const AWARDS = [
    'Most Wanted Game - Golden Joystick Awards 2024',
    'Most Anticipated Game - The Game Awards 2024',
    'Most Wanted Game - Golden Joystick Awards 2025',
    'Most Anticipated Game - The Game Awards 2025',
];

const LUCIA_FACTS = ['Primera protagonista femenina jugable en la saga principal', 'Origen hispano/latino confirmado', 'Aparece saliendo de prisión en el Trailer 1', 'Su padre le enseñó a pelear - background de superviviente', 'Lleva tobillera electrónica (posible libertad condicional)', 'Relación romántica y criminal con Jason'];
const JASON_FACTS = ['Protagonista masculino, pareja de Lucía', 'Descripción oficial de Rockstar: "quiere una vida fácil"', 'Creció entre estafadores y delincuentes', 'Tuvo un paso por el ejército', 'Trabaja para narcotraficantes en los Keys de Leonida', 'Dinámica Bonnie & Clyde confirmada por Rockstar'];

export default function ConfirmadoPage() {
    return (
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-secondary-cyan/20 text-secondary-cyan text-xs font-bold uppercase rounded-md border border-secondary-cyan/30"><span className="material-symbols-outlined text-[14px] align-text-bottom">verified</span> Información Oficial</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">update</span> Actualizado: 18 Feb 2026</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">GTA VI: Todo lo <span className="text-primary">Confirmado</span></h1>
                <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">Guía actualizada con cada detalle oficialmente confirmado sobre Grand Theft Auto VI. Solo información verificada de Rockstar Games, Take-Two Interactive y fuentes oficiales.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3">
                    <nav className="sticky top-20 bg-surface-dark rounded-2xl border border-white/5 p-4 flex flex-col gap-1">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">Índice</h3>
                        {SECTIONS.map(s => <a key={s.id} className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-all text-gray-400 hover:text-white hover:bg-white/5" href={`#${s.id}`}><span className="material-symbols-outlined text-[18px]">{s.icon}</span>{s.label}</a>)}
                    </nav>
                </aside>

                <div className="lg:col-span-9 flex flex-col gap-16">
                    {/* Protagonistas */}
                    <section id="protagonistas" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">people</span><h2 className="text-3xl font-bold text-white">Protagonistas</h2></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group">
                                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC13IpJuPD-oDRBB4IAJNztRhpt48PMr8IDG2OQOcGIwW_JXVfH-5uqG_b4UkiTT6DWVggcvrzvWzvjvLVRpCfjZloHDlc9z_N2Cn9KJZhYSKqsX9s-EY4BcgnhX-m-VSipfcKNY7SvIQ8CKhkD8NsxofbfSkhz1vkg5EaMGSPS-dqu3dVEi24zalkJiEnyyx-q0FVwC-0uxIGUGAgq_4Bc0gdc_lCKKT2o8x3Aj1QcpPWIadJbkVgipf4H5r2MT8hm7_Jf3DZY90Hi")' }}></div>
                                <div className="p-6 flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold text-white">Lucía</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Primera protagonista femenina y segunda latinoamericana en la saga principal de GTA. Aparece por primera vez en el trailer saliendo del Departamento Correccional de Leonida.</p>
                                    <ul className="flex flex-col gap-2 mt-2">
                                        {LUCIA_FACTS.map(t => <li key={t} className="flex items-start gap-2 text-sm text-gray-300"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{t}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group">
                                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8z-nJoj-zVYBWxliT_wx7A-7YSugCbpV5opnWcB8pnb5kAeVEWL6VVfJCBsEwZoPxKZ9i7bNzRYJiyIj854kqGTq9pCE8ntdXWHMevP5uBQQZbC7e0tn35SK472ZiffyCehzV3HpNTlBoAAbguQWgkbTcWAKVDroCbYADutPGVWQ_GsHV7OG3_rtvXxAkpO8i-gMwIq1ejA4ZA7PmlJWEyq3hEQXq7AK4QYn45J9PXZmyfY7FQyNYF4WRJv_SFlkaZ47HMA4UQ4sF")' }}></div>
                                <div className="p-6 flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold text-white">Jason</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">Segundo protagonista del juego. Según Rockstar: &ldquo;Jason quiere una vida fácil, pero las cosas no dejan de complicarse&rdquo;.</p>
                                    <ul className="flex flex-col gap-2 mt-2">
                                        {JASON_FACTS.map(t => <li key={t} className="flex items-start gap-2 text-sm text-gray-300"><span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>{t}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mapa */}
                    <section id="mapa-leonida" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">map</span><h2 className="text-3xl font-bold text-white">Mapa: Estado de Leonida</h2></div>
                        <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col gap-6">
                            <div className="aspect-video rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABoUP1zWdQjyRL910Oc_13lmuWPcV3Xe9PCm_4Kob5e2dB2t0fs-0L4WuR1V48dUY5w2rZ9Hx9uQI__Ne1XzcY5dQlI4xdc8cy0d_o35KYSZ9z0bqf1kQwgMvg756gmJCJvmZZgCPHRBmP_d36vH7eLkG0exEm_gnpgk4Rhq482kbeOppOmOrqgUfDLIGUo0r9PhLoN6_84gCsw72UIEmfA72t7CguGqSQElQ09vJVIIQWxzvcsAXig72QDZ9PWp2H3ztwwqsiMney")' }}></div>
                            <p className="text-gray-300 leading-relaxed"><strong className="text-white">Leonida</strong> es la versión ficticia del estado de Florida creada por Rockstar. Incluye la reimaginación moderna de <strong className="text-white">Vice City</strong> (basada en Miami) como metrópolis principal, rodeada de extensas zonas pantanosas, cayos tropicales, pueblos industriales y un parque nacional montañoso.</p>
                        </div>
                    </section>

                    {/* Regiones */}
                    <section id="regiones" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">explore</span><h2 className="text-3xl font-bold text-white">6 Regiones Confirmadas</h2></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {REGIONS.map(r => (
                                <div key={r.name} className="bg-surface-dark rounded-xl border border-white/5 p-5 flex gap-4 neon-hover">
                                    <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className={`material-symbols-outlined ${r.color}`}>{r.icon}</span></div>
                                    <div><h3 className="text-lg font-bold text-white mb-1">{r.name}</h3><p className="text-sm text-gray-400">{r.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Desarrollo */}
                    <section id="desarrollo" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">build</span><h2 className="text-3xl font-bold text-white">Historia del Desarrollo</h2></div>
                        <div className="flex flex-col gap-4">
                            {TIMELINE.map(e => (
                                <div key={e.year} className="flex gap-4 items-start"><div className="flex-shrink-0 w-20 text-right"><span className="text-xs font-bold text-primary uppercase">{e.year}</span></div><div className="size-3 rounded-full bg-primary mt-1.5 flex-shrink-0"></div><p className="text-sm text-gray-300 flex-1">{e.text}</p></div>
                            ))}
                        </div>
                    </section>

                    {/* Ficha Técnica */}
                    <section id="ficha-tecnica" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">memory</span><h2 className="text-3xl font-bold text-white">Ficha Técnica</h2></div>
                        <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                            <table className="w-full text-sm">
                                <tbody>{SPECS.map(([k, v], i) => <tr key={k} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}><td className="py-3 px-5 font-semibold text-gray-300 border-b border-white/5 w-1/3">{k}</td><td className="py-3 px-5 text-white border-b border-white/5">{v}</td></tr>)}</tbody>
                            </table>
                        </div>
                    </section>

                    {/* Premios */}
                    <section id="premios" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6"><span className="material-symbols-outlined text-primary text-3xl">emoji_events</span><h2 className="text-3xl font-bold text-white">Premios Recibidos</h2></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {AWARDS.map(a => <div key={a} className="flex items-center gap-3 bg-surface-dark rounded-lg border border-white/5 px-4 py-3 neon-hover"><span className="material-symbols-outlined text-yellow-500 text-lg">emoji_events</span><span className="text-sm text-white font-medium">{a}</span></div>)}
                        </div>
                    </section>
                </div>
            </div>
        </article>
    );
}
