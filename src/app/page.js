import Link from 'next/link';
import Countdown from '@/components/Countdown';
import { getFeaturedArticle, getArticles } from '@/data/articles';

export const revalidate = 60; // ISR: regenerate every 60 seconds

export default async function HomePage() {
  const featured = await getFeaturedArticle();
  const allArticles = await getArticles();
  // News cards: non-featured, latest 4
  const newsCards = allArticles.filter(a => !a.isFeatured).slice(0, 4);

  // Tag styling helper
  const tagStyle = (tag) => {
    switch (tag) {
      case 'Confirmado': return { tagColor: 'text-secondary-cyan border-secondary-cyan/30', hoverColor: 'group-hover:text-secondary-cyan' };
      case 'Trailer': return { tagColor: 'text-secondary-pink border-secondary-pink/30', hoverColor: 'group-hover:text-secondary-pink' };
      case 'Oficial': return { tagColor: 'text-primary border-primary/30', hoverColor: 'group-hover:text-primary' };
      default: return { tagColor: 'text-white border-white/30', hoverColor: 'group-hover:text-primary' };
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[650px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url("${featured?.image || ''}")` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/30 via-background-dark/50 to-background-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-transparent to-background-dark/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8 pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
            <span className="size-2 rounded-full bg-green-500 live-pulse"></span>
            <span className="text-xs font-semibold text-white tracking-widest uppercase">Lanzamiento: 19 Nov 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
            Bienvenido a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-pink via-white to-secondary-cyan drop-shadow-2xl">Vice City</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl font-medium drop-shadow-md">
            La espera continúa. Sigue cada detalle confirmado, análisis de trailers y anuncio oficial del juego más esperado de la década.
          </p>
          <Countdown variant="large" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-dark to-transparent z-20"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-8 bg-primary rounded-full block"></span>
                Últimas Novedades
              </h2>
              <Link className="text-sm font-semibold text-primary hover:text-white transition-colors flex items-center gap-1" href="/noticias">
                Ver todas <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
              </Link>
            </div>

            {/* Featured */}
            {featured && (
              <Link className="group relative block w-full aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl" href={`/articulo/${featured.id}`}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${featured.image}")` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`px-3 py-1 ${featured.tagColor} text-white text-xs font-bold uppercase rounded-md`}>{featured.tag}</span>
                    <span className="text-gray-300 text-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {featured.time}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-primary transition-colors">{featured.title}</h3>
                  <p className="text-gray-300 line-clamp-2 text-sm md:text-base max-w-2xl">{featured.desc}</p>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsCards.map(card => {
                const style = tagStyle(card.tag);
                return (
                  <Link href={`/articulo/${card.id}`} key={card.id} className="flex flex-col gap-4 group cursor-pointer">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface-dark border border-white/5">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${card.image}")` }}></div>
                      <div className="absolute top-3 left-3"><span className={`px-2 py-1 bg-surface-dark/90 backdrop-blur ${style.tagColor} text-[10px] font-bold uppercase rounded tracking-wider`}>{card.tag}</span></div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className={`text-xl font-bold text-white leading-snug ${style.hoverColor} transition-colors`}>{card.title}</h4>
                      <p className="text-gray-400 text-sm line-clamp-2">{card.desc}</p>
                      <div className="flex items-center gap-2 mt-1"><img alt={card.author} className="w-6 h-6 rounded-full border border-white/10 object-cover" src={card.authorImg} /><span className="text-xs text-gray-500">{card.author} • {card.time}</span></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 relative overflow-hidden group"><div className="absolute top-0 right-0 w-32 h-32 bg-secondary-pink/20 blur-[60px] rounded-full -mr-10 -mt-10"></div><div className="relative z-10 flex flex-col gap-4"><h3 className="text-xl font-bold text-white">Únete a la Comunidad</h3><p className="text-sm text-gray-400">Recibe notificaciones de cada novedad oficial sobre GTA VI directamente en tu correo.</p><form className="flex gap-2"><input className="bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Tu email" type="email" /><button className="bg-primary hover:bg-orange-600 text-white p-2 rounded-lg transition-colors" type="submit"><span className="material-symbols-outlined">send</span></button></form></div></div>

            <div className="bg-[#000000] rounded-2xl border border-white/10 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/10 bg-[#161616] flex items-center justify-between"><div className="flex items-center gap-3"><div className="size-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold text-xl">R★</div><div className="flex flex-col"><span className="text-white text-sm font-bold">Rockstar Games</span><span className="text-gray-500 text-xs">@RockstarGames · Feed en directo</span></div></div><span className="material-symbols-outlined text-blue-400">verified</span></div>
              <div id="x-embed-container" className="overflow-y-auto scrollbar-hide" style={{ maxHeight: '500px' }}>
                <a className="twitter-timeline" data-theme="dark" data-chrome="noheader nofooter noborders transparent" data-tweet-limit="5" href="https://twitter.com/RockstarGames">Cargando tweets de @RockstarGames...</a>
              </div>
            </div>

            <div className="bg-surface-dark rounded-2xl p-6 border border-white/5"><h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Datos Clave Confirmados</h3><div className="flex flex-col gap-4">
              <Link className="flex justify-between items-center group" href="/confirmado"><div className="flex flex-col"><span className="text-white font-medium group-hover:text-primary transition-colors">Protagonistas: Lucía y Jason</span><span className="text-xs text-gray-500">Dúo criminal estilo Bonnie &amp; Clyde</span></div><span className="material-symbols-outlined text-gray-600">arrow_forward</span></Link>
              <Link className="flex justify-between items-center group" href="/mapa"><div className="flex flex-col"><span className="text-white font-medium group-hover:text-secondary-pink transition-colors">Estado de Leonida</span><span className="text-xs text-gray-500">6 regiones: Vice City, Keys, Grassrivers...</span></div><span className="material-symbols-outlined text-gray-600">arrow_forward</span></Link>
              <Link className="flex justify-between items-center group" href="/fecha"><div className="flex flex-col"><span className="text-white font-medium group-hover:text-secondary-cyan transition-colors">19 de noviembre de 2026</span><span className="text-xs text-gray-500">PS5 y Xbox Series X|S</span></div><span className="material-symbols-outlined text-gray-600">arrow_forward</span></Link>
            </div></div>
          </aside>
        </div>
      </div>
    </>
  );
}
