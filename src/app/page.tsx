"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/characters?name=${search}`);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-start px-12 md:px-24 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/fondo-hogwarts.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-3xl text-left">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight uppercase tracking-tighter">
          MUNDO <span className="text-hp-gold">MÁGICO</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed font-light italic">
          Explora la base de datos oficial del Colegio Hogwarts de Magia y Hechicería. 
          Consulta registros de estudiantes, personal y encantamientos.
        </p>
      </div>
    </main>
  );
}