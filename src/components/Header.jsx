'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/', label: 'Inicio', icon: 'home' },
    { href: '/noticias', label: 'Noticias', icon: 'newspaper' },
    { href: '/confirmado', label: 'Confirmado', icon: 'verified' },
    { href: '/rumores', label: 'Rumores', icon: 'psychology' },
    { href: '/mapa', label: 'Mapa', icon: 'map' },
    { href: '/fecha', label: 'Fecha', icon: 'calendar_month' },
    { href: '/trailers', label: 'Trailers', icon: 'movie' },
    { href: '/comparativas', label: 'Comparativas', icon: 'compare' },
    { href: '/guias', label: 'Guías', icon: 'menu_book' },
    { href: '/contacto', label: 'Contacto', icon: 'mail' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 glass-panel">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-white hover:text-primary transition-colors">
                    <span className="text-primary text-2xl font-black">VI</span>
                    <span className="hidden sm:inline">Portal</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.slice(0, 8).map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${pathname === link.href ? 'nav-active' : 'text-gray-400 hover:text-white'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="size-9 rounded-lg border border-white/10 bg-surface-dark flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </button>
                    <button
                        className="lg:hidden size-9 rounded-lg border border-white/10 bg-surface-dark flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                        onClick={() => setMobileOpen(true)}
                    >
                        <span className="material-symbols-outlined text-lg">menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[60]" onClick={() => setMobileOpen(false)}>
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <div
                        className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface-dark border-l border-surface-border transform transition-transform duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <span className="text-lg font-bold text-white">Menú</span>
                            <button onClick={() => setMobileOpen(false)} className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <nav className="p-4 flex flex-col gap-1">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === link.href ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">{link.icon}</span>
                                    <span className="text-sm font-medium">{link.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
