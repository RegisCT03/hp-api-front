"use client";
import { Spell } from '../../types/interfaces'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SpellsPage() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_GATEWAY_API}/api/spells`)
      .then(async res => {
        if (!res.ok) throw new Error("No se pudieron descifrar los pergaminos");
        return res.json();
      })
      .then(data => {
        let filtered = data;
        if (searchTerm) {
          filtered = data.filter((s: Spell) => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setSpells(filtered);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spells.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(spells.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-black pt-28 px-8 md:px-20 text-white">
      <Link href="/" className="text-hp-gold mb-8 inline-block font-bold hover:text-white transition-colors">
        ← REGRESAR
      </Link>

      <h1 className="text-5xl font-black mb-10 uppercase tracking-tighter">
        Libro de <span className="text-hp-gold">Hechizos</span>
      </h1>

      <div className="mb-12 max-w-md">
        <label className="text-[10px] font-black text-hp-gold uppercase tracking-widest mb-2 block">Encantamiento Específico</label>
        <input 
          type="text"
          placeholder="Ej. Expecto Patronum..."
          className="w-full bg-black border-2 border-white/20 text-white px-5 py-3 font-bold uppercase text-sm focus:border-hp-gold outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suppressHydrationWarning={true}
        />
      </div>

      {loading ? (
        <div className="text-hp-gold text-center font-black animate-pulse py-20 tracking-widest text-xl uppercase">Descifrando Pergaminos...</div>
      ) : error ? (
        <div className="text-center py-20 border-2 border-dashed border-hp-gold/20 rounded-xl">
           <p className="text-hp-gold font-black text-xl">{error}</p>
        </div>
      ) : spells.length === 0 ? (
        <div className="text-center py-32 bg-white/5 border border-white/10 rounded-lg">
          <div className="text-4xl mb-6 opacity-20">🪄</div>
          <p className="text-hp-gold font-black text-xl mb-2 uppercase tracking-widest">Hechizo no encontrado</p>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Intenta con otro nombre de encantamiento</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((spell: Spell) => (
              <div key={spell.id} className="bg-white/5 border border-white/10 p-6 hover:border-hp-gold transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-white uppercase leading-none">{spell.name}</h3>
                    <span className="text-[10px] bg-hp-gold/20 text-hp-gold px-2 py-1 font-black rounded-sm">MAGIA</span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${expandedId === spell.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 border-t border-white/10">
                      <p className="text-base text-white/90 font-medium leading-relaxed italic">
                        "{spell.description}"
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setExpandedId(expandedId === spell.id ? null : spell.id)}
                  className="mt-6 w-full py-3 bg-white/5 hover:bg-hp-gold hover:text-hp-brown transition-all font-black text-xs uppercase tracking-widest"
                >
                  {expandedId === spell.id ? "Ocultar Efecto" : "Ver Descripción"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-8 mt-16 pb-20">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="font-black text-hp-gold disabled:opacity-20 hover:text-white transition-colors uppercase text-sm"
            >
              Anterior
            </button>
            <span className="font-black text-xs tracking-widest">PÁG {currentPage} / {totalPages || 1}</span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="font-black text-hp-gold disabled:opacity-20 hover:text-white transition-colors uppercase text-sm"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </main>
  );
}