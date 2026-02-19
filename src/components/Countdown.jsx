'use client';
import { useState, useEffect } from 'react';

const LAUNCH_DATE = new Date('2026-11-19T00:00:00');

function calcTimeLeft() {
    const diff = LAUNCH_DATE - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function pad(n) { return String(n).padStart(2, '0'); }

function CountdownUnit({ value, label, large }) {
    return (
        <div className="flex flex-col items-center">
            <div className={`${large ? 'w-20 h-20 md:w-28 md:h-28 text-3xl md:text-5xl' : 'w-14 h-14 text-xl'} bg-surface-dark rounded-xl border border-white/10 flex items-center justify-center font-black text-white tabular-nums`}>
                {pad(value)}
            </div>
            <span className={`${large ? 'text-xs md:text-sm' : 'text-[10px]'} text-gray-500 uppercase tracking-widest mt-2 font-medium`}>{label}</span>
        </div>
    );
}

export default function Countdown({ variant = 'large' }) {
    const [time, setTime] = useState(calcTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTime(calcTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const large = variant === 'large';

    return (
        <div className={`flex ${large ? 'gap-3 md:gap-6' : 'gap-2'} justify-center countdown-active`}>
            <CountdownUnit value={time.days} label="Días" large={large} />
            <CountdownUnit value={time.hours} label="Horas" large={large} />
            <CountdownUnit value={time.minutes} label="Min" large={large} />
            <CountdownUnit value={time.seconds} label="Seg" large={large} />
        </div>
    );
}
