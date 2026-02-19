import { getArticles } from '@/data/articles';
import NoticiasClient from './NoticiasClient';

export const revalidate = 60;

export const metadata = {
    title: 'Todas las Noticias de GTA 6',
    description: 'Cada anuncio oficial, confirmación, rumor y novedad sobre Grand Theft Auto VI, verificada y clasificada.',
};

export default async function NoticiasPage() {
    const articles = await getArticles();

    return <NoticiasClient articles={articles} />;
}
