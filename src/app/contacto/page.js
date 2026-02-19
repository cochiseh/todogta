'use client';
import { useState } from 'react';

// ============================================================
// CONFIGURACIÓN: Cambia TU_EMAIL@ejemplo.com por tu email real.
// ============================================================
const TARGET_EMAIL = 'TU_EMAIL@ejemplo.com';

export default function ContactoPage() {
    const [formSent, setFormSent] = useState(false);
    const [nlSent, setNlSent] = useState(false);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4"><span className="material-symbols-outlined text-primary text-sm">mail</span><span className="text-xs font-bold text-primary uppercase tracking-wider">Contacto</span></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">Contacto y <span className="text-primary">Aviso Legal</span></h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Ponte en contacto con el equipo de VI Portal.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                {/* Contact Form */}
                <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">send</span> Formulario de Contacto</h2>
                    {formSent ? (
                        <div className="text-center py-10"><span className="material-symbols-outlined text-neon-green text-5xl">check_circle</span><p className="text-white font-bold mt-3">¡Mensaje enviado!</p><p className="text-gray-400 text-sm mt-1">Responderemos lo antes posible.</p></div>
                    ) : (
                        <form action={`https://formsubmit.co/${TARGET_EMAIL}`} method="POST" onSubmit={() => setFormSent(true)} className="flex flex-col gap-4">
                            <input type="text" name="_honey" style={{ display: 'none' }} />
                            <input type="hidden" name="_captcha" value="false" />
                            <div><label className="text-sm text-gray-400 mb-1 block">Nombre</label><input name="name" required className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Tu nombre" /></div>
                            <div><label className="text-sm text-gray-400 mb-1 block">Email</label><input name="email" type="email" required className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="tu@email.com" /></div>
                            <div><label className="text-sm text-gray-400 mb-1 block">Asunto</label><select name="subject" className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none"><option value="general">Consulta general</option><option value="error">Reportar error</option><option value="sugerencia">Sugerencia</option><option value="colaboracion">Colaboración</option></select></div>
                            <div><label className="text-sm text-gray-400 mb-1 block">Mensaje</label><textarea name="message" required rows={4} className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none resize-none" placeholder="Escribe tu mensaje..."></textarea></div>
                            <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"><span className="material-symbols-outlined text-lg">send</span> Enviar</button>
                        </form>
                    )}
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-8">
                    <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">notifications_active</span> Newsletter</h2>
                        <p className="text-gray-400 text-sm mb-4">Recibe notificaciones cuando se publique información oficial sobre GTA VI.</p>
                        {nlSent ? (
                            <div className="text-center py-6"><span className="material-symbols-outlined text-neon-green text-4xl">mark_email_read</span><p className="text-white font-bold mt-2">¡Suscrito!</p></div>
                        ) : (
                            <form action={`https://formsubmit.co/${TARGET_EMAIL}`} method="POST" onSubmit={() => setNlSent(true)} className="flex gap-2">
                                <input type="text" name="_honey" style={{ display: 'none' }} />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_subject" value="Nueva suscripción newsletter" />
                                <input name="email" type="email" required className="flex-1 bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Tu email" />
                                <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-5 rounded-lg transition-colors"><span className="material-symbols-outlined">send</span></button>
                            </form>
                        )}
                    </div>

                    <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">gavel</span> Aviso Legal</h2>
                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            <p><strong className="text-white">VI Portal</strong> es un sitio web fan no oficial.</p>
                            <p>No estamos afiliados, asociados, autorizados, respaldados o de ninguna manera conectados oficialmente con <strong className="text-white">Rockstar Games</strong>, <strong className="text-white">Take-Two Interactive</strong> o cualquiera de sus subsidiarias.</p>
                            <p>Grand Theft Auto, GTA, Vice City y Rockstar Games son marcas registradas de Take-Two Interactive Software, Inc.</p>
                            <p>Todas las imágenes y contenido editorial son utilizados con fines informativos bajo el principio de uso justo (fair use).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
