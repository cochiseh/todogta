'use client';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = ['Todas', 'Oficial', 'Confirmado', 'Trailer', 'Industria', 'Premios'];

export default function NoticiasClient({ articles }) {
    const [activeFilter, setActiveFilter] = useState('Todas');
    const filtered = activeFilter === 'Todas' ? articles : articles.filter(a => a.tag === activeFilter);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4"><span className="material-symbols-outlined text-primary text-sm">newspaper</span><span className="text-xs font-bold text-primary uppercase tracking-wider">Centro de Noticias</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Todas las <span className="text-primary">Noticias</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Cada anuncio, confirmación y novedad sobre GTA VI, verificada y clasificada.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${activeFilter === cat ? 'bg-primary text-white border-primary' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>{cat}</button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(article => (
                    <Link href={`/articulo/${article.id}`} key={article.id} className="flex flex-col gap-4 group cursor-pointer">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface-dark border border-white/5">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${article.image}")` }}></div>
                            <div className="absolute top-3 left-3"><span className={`px-2 py-1 bg-surface-dark/90 backdrop-blur text-[10px] font-bold uppercase rounded tracking-wider ${article.tag === 'Oficial' ? 'text-primary border-primary/30' : article.tag === 'Confirmado' ? 'text-secondary-cyan border-secondary-cyan/30' : article.tag === 'Trailer' ? 'text-secondary-pink border-secondary-pink/30' : 'text-white border-white/30'}`}>{article.tag}</span></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2">{article.desc}</p>
                            <div className="flex items-center gap-2 mt-1"><img alt={article.author} className="w-6 h-6 rounded-full border border-white/10 object-cover" src={article.authorImg} /><span className="text-xs text-gray-500">{article.author} • {article.time} • {article.readTime}</span></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
