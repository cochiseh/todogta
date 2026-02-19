export const metadata = {
    title: 'Comparativas GTA VI vs otros juegos',
    description: 'Comparativas detalladas entre GTA VI y GTA V, Red Dead Redemption 2 y otros mundos abiertos. Datos oficiales y análisis.',
};

const COMPARISONS = [
    {
        title: 'GTA VI vs GTA V',
        items: [
            { aspect: 'Ambientación', a: 'Leonida (Florida moderna)', b: 'Los Santos (California)' },
            { aspect: 'Protagonistas', a: '2 (Lucía y Jason)', b: '3 (Michael, Trevor, Franklin)' },
            { aspect: 'Mapa', a: '6 regiones + estado completo', b: '1 ciudad + condado rural' },
            { aspect: 'Motor gráfico', a: 'RAGE nueva generación', b: 'RAGE' },
            { aspect: 'Fecha lanzamiento', a: '19 Nov 2026', b: '17 Sep 2013' },
            { aspect: 'Plataformas', a: 'PS5, Xbox Series X|S', b: 'PS3, X360 (luego PS4/X1/PC)' },
        ],
    },
    {
        title: 'GTA VI vs Red Dead Redemption 2',
        items: [
            { aspect: 'Ambientación', a: 'Leonida (Florida moderna)', b: 'Frontera americana (1899)' },
            { aspect: 'Protagonistas', a: '2 jugables', b: '1 (Arthur Morgan)' },
            { aspect: 'Tono', a: 'Sátira social moderna', b: 'Drama western cinematográfico' },
            { aspect: 'Ecosistema', a: 'Fauna dinámica urbana + salvaje', b: 'Fauna realista extensa' },
            { aspect: 'Desarrollo', a: '~8 años', b: '~7 años' },
            { aspect: 'Ventas estimadas', a: '150-200M (analistas)', b: '60M+' },
        ],
    },
];

export default function ComparativasPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-cyan/10 border border-secondary-cyan/30 mb-4"><span className="material-symbols-outlined text-secondary-cyan text-sm">compare</span><span className="text-xs font-bold text-secondary-cyan uppercase tracking-wider">Análisis Comparativo</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4"><span className="text-gradient-vice">Comparativas</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">GTA VI frente a los grandes mundos abiertos de Rockstar.</p>
            </div>

            <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                {COMPARISONS.map(comp => (
                    <div key={comp.title} className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-white/5"><h2 className="text-2xl font-bold text-white">{comp.title}</h2></div>
                        <table className="w-full text-sm">
                            <thead><tr className="bg-white/[0.03]"><th className="py-3 px-5 text-left text-xs font-bold text-gray-500 uppercase tracking-widest w-1/4">Aspecto</th><th className="py-3 px-5 text-left text-xs font-bold text-primary uppercase tracking-widest">GTA VI</th><th className="py-3 px-5 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">{comp.title.split('vs ')[1]}</th></tr></thead>
                            <tbody>{comp.items.map((item, i) => <tr key={item.aspect} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}><td className="py-3 px-5 font-semibold text-gray-300 border-b border-white/5">{item.aspect}</td><td className="py-3 px-5 text-primary font-medium border-b border-white/5">{item.a}</td><td className="py-3 px-5 text-white border-b border-white/5">{item.b}</td></tr>)}</tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
