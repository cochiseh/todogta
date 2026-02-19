import Link from 'next/link';
import { getArticleById, getRelatedArticles, getAllArticleIds } from '@/data/articles';
import { notFound } from 'next/navigation';

export const revalidate = 60; // ISR: regenerate every 60 seconds

export async function generateStaticParams() {
    return await getAllArticleIds();
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) return { title: 'Artículo no encontrado' };
    return {
        title: article.title,
        description: article.desc,
        openGraph: {
            title: article.title,
            description: article.desc,
            type: 'article',
            images: [{ url: article.image }],
        },
    };
}

export default async function ArticuloPage({ params }) {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) notFound();
    const related = await getRelatedArticles(id, 3);

    return (
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                <span>/</span>
                <Link href="/noticias" className="hover:text-primary transition-colors">Noticias</Link>
                <span>/</span>
                <span className="text-gray-400 line-clamp-1">{article.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main content */}
                <div className="lg:col-span-8">
                    {/* Hero image */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/5">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${article.image}")` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                            <span className={`px-3 py-1 ${article.tagColor} text-white text-xs font-bold uppercase rounded-md mb-3 inline-block`}>{article.tag}</span>
                            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{article.title}</h1>
                        </div>
                    </div>

                    {/* Author + meta */}
                    <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <img alt={article.author} className="w-10 h-10 rounded-full border border-white/10 object-cover" src={article.authorImg} />
                            <div><p className="text-white font-medium text-sm">{article.author}</p><p className="text-xs text-gray-500">{article.time} · {article.readTime}</p></div>
                        </div>
                        <div className="flex gap-2">
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://todogta.es/articulo/${article.id}`)}`} target="_blank" rel="noopener noreferrer" className="size-9 bg-surface-dark rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">share</span></a>
                        </div>
                    </div>

                    {/* Subtitle */}
                    {article.subtitle && <p className="text-xl text-gray-300 font-medium leading-relaxed mb-8">{article.subtitle}</p>}

                    {/* Article content */}
                    <div className="article-content flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 sticky top-20">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Artículos Relacionados</h3>
                        <div className="flex flex-col gap-4">
                            {related.map(r => (
                                <Link href={`/articulo/${r.id}`} key={r.id} className="flex gap-3 group">
                                    <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url("${r.image}")` }}></div>
                                    <div className="flex flex-col gap-1"><h4 className="text-sm font-semibold text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4><span className="text-xs text-gray-500">{r.time}</span></div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/noticias" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-lg">arrow_back</span> Todas las noticias
                    </Link>
                </aside>
            </div>

            {/* JSON-LD: Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "NewsArticle",
                        "headline": article.title,
                        "description": article.desc,
                        "image": article.image,
                        "author": { "@type": "Person", "name": article.author },
                        "publisher": { "@type": "Organization", "name": "VI Portal" },
                        "datePublished": article.time,
                    })
                }}
            />
        </article>
    );
}
