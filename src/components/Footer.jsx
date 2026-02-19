import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-surface-dark border-t border-white/5 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-black text-white"><span className="text-primary">VI</span> Portal</Link>
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">El portal fan no oficial de GTA 6 con la información más completa y verificada en español.</p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Secciones</h4>
                        <div className="flex flex-col gap-2">
                            {[
                                { href: '/noticias', label: 'Noticias' },
                                { href: '/confirmado', label: 'Todo lo Confirmado' },
                                { href: '/rumores', label: 'Rumores' },
                                { href: '/mapa', label: 'Mapa de Leonida' },
                            ].map(l => <Link key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-primary transition-colors">{l.label}</Link>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Contenido</h4>
                        <div className="flex flex-col gap-2">
                            {[
                                { href: '/fecha', label: 'Fecha de Lanzamiento' },
                                { href: '/trailers', label: 'Análisis de Trailers' },
                                { href: '/comparativas', label: 'Comparativas' },
                                { href: '/guias', label: 'Guías' },
                            ].map(l => <Link key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-primary transition-colors">{l.label}</Link>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Legal</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="/contacto" className="text-sm text-gray-400 hover:text-primary transition-colors">Contacto</Link>
                            <Link href="/contacto" className="text-sm text-gray-400 hover:text-primary transition-colors">Aviso Legal</Link>
                            <Link href="/contacto" className="text-sm text-gray-400 hover:text-primary transition-colors">Política de Privacidad</Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">© 2024 VI Portal — Sitio fan no oficial. No afiliado a Rockstar Games ni Take-Two Interactive.</p>
                    <div className="flex gap-4">
                        <a href="https://x.com/RockstarGames" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">share</span></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
