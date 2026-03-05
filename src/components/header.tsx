"use client";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-[var(--hp-gold)] px-10 py-5 flex justify-between items-center">
      <div className="text-[var(--hp-gold)] font-bold text-2xl tracking-wides\t">HOGWARTS</div>
      <nav className="flex gap-10">
        <Link href="/" className="text-[var(--hp-white)] hover:text-[var(--hp-gold)] transition-colors font-semibold uppercase tracking-wider">Inicio</Link>
        <Link href="/characters" className="text-[var(--hp-white)] hover:text-[var(--hp-gold)] transition-colors font-semibold uppercase tracking-wider">Personajes</Link>
        <Link href="/spells" className="text-[var(--hp-white)] hover:text-[var(--hp-gold)] transition-colors font-semibold uppercase tracking-wider">Hechizos</Link>
      </nav>
    </header>
  );
}