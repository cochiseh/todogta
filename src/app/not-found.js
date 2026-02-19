import Link from 'next/link';

export const metadata = {
    title: 'Página no encontrada',
    description: 'La página que buscas no existe o ha sido movida.',
};

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6 min-h-[60vh] justify-center">
            <span className="material-symbols-outlined text-primary text-8xl">explore_off</span>
            <h1 className="text-6xl md:text-8xl font-black text-white">404</h1>
            <p className="text-xl text-gray-400 max-w-md">La página que buscas no existe en el estado de Leonida... todavía.</p>
            <div className="flex gap-4 mt-4">
                <Link href="/" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined">home</span> Volver al inicio
                </Link>
                <Link href="/noticias" className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-xl border border-white/10 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined">newspaper</span> Noticias
                </Link>
            </div>
        </div>
    );
}
