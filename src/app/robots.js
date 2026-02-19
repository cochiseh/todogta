export default function robots() {
    return {
        rules: { userAgent: '*', allow: '/', disallow: '/api/' },
        sitemap: 'https://gta6portal.com/sitemap.xml',
    };
}
