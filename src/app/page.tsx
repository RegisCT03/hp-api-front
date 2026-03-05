"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/characters?search=${query}`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--hp-white)]">
      
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--hp-red)] drop-shadow-md">
          Mundo Mágico API
        </h1>
        <p className="text-[var(--hp-brown)] text-lg opacity-80 font-medium italic">
          Explora el catálogo de personajes y hechizos de Hogwarts
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-lg flex shadow-md mb-16">
        <input
          type="text"
          placeholder="Busca un personaje (ej. Harry)..."
          className="flex-1 p-4 rounded-l-lg border-2 border-[var(--hp-grey)] bg-white text-[var(--hp-brown)] focus:outline-none focus:border-[var(--hp-gold)] transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-[var(--hp-red)] hover:bg-[var(--hp-gold)] text-[var(--hp-white)] px-8 py-4 rounded-r-lg font-bold transition-all active:scale-95"
        >
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        <Link href="/characters" className="group">
          <div className="p-10 bg-white rounded-3xl border-2 border-[var(--hp-grey)] group-hover:border-[var(--hp-gold)] group-hover:shadow-2xl transition-all text-center shadow-lg transform group-hover:-translate-y-2">
            <div className="text-6xl mb-4">foto</div>
            <h2 className="text-3xl font-bold text-[var(--hp-brown)] mb-2">Personajes</h2>
            <p className="text-[var(--hp-grey)] text-lg font-medium italic underline decoration-[var(--hp-gold)] underline-offset-8">
              Ver estudiantes, profesores y más.
            </p>
          </div>
        </Link>

        <Link href="/spells" className="group">
          <div className="p-10 bg-white rounded-3xl border-2 border-[var(--hp-grey)] group-hover:border-[var(--hp-gold)] group-hover:shadow-2xl transition-all text-center shadow-lg transform group-hover:-translate-y-2">
            <div className="text-6xl mb-4">Foto</div>
            <h2 className="text-3xl font-bold text-[var(--hp-brown)] mb-2">Hechizos</h2>
            <p className="text-[var(--hp-grey)] text-lg font-medium italic underline decoration-[var(--hp-gold)] underline-offset-8">
              Consulta el catálogo de hechizos.
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-20 opacity-30 text-2xl text-[var(--hp-gold)]">
        ⚡ ━━━ ϟ ━━━ ⚡
      </div>
    </div>
  );
}