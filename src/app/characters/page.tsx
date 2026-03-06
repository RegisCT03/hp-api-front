"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [house, setHouse] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    let endpoint = `${process.env.NEXT_PUBLIC_GATEWAY_API}/api/characters`;
    if (house !== 'all') {
      endpoint = `${process.env.NEXT_PUBLIC_GATEWAY_API}/api/house/${house}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        let filtered = data;
        
        if (roleFilter === 'student') {
          filtered = data.filter((c: any) => c.hogwartsStudent === true);
        } else if (roleFilter === 'staff') {
          filtered = data.filter((c: any) => c.hogwartsStaff === true);
        }

        if (searchTerm) {
          filtered = filtered.filter((c: any) => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        setCharacters(filtered);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch(() => setLoading(false));
  }, [house, roleFilter, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = characters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(characters.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-black pt-28 px-8 md:px-20 text-white">
      <Link href="/" className="text-hp-gold mb-8 inline-block font-bold hover:text-white transition-colors">
        ← REGRESAR
      </Link>

      <h1 className="text-5xl font-black mb-10 uppercase tracking-tighter">
        Registros <span className="text-hp-gold">Hogwarts</span>
      </h1>

      <div className="flex flex-wrap gap-6 mb-12 items-end">
        <div className="flex flex-col gap-2 w-full md:w-80">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Buscar Personaje</label>
          <input 
            type="text"
            placeholder="Ej. Harry Potter..."
            className="bg-black border-2 border-white/20 text-white px-4 py-2 font-bold uppercase text-xs focus:border-hp-gold outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suppressHydrationWarning={true}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-hp-gold uppercase tracking-widest">Casa</label>
          <select 
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            className="bg-black border-2 border-hp-gold text-white px-4 py-2 font-bold uppercase text-xs outline-none"
          >
            <option value="all">Todas</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Slytherin">Slytherin</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Rol</label>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-black border-2 border-white/20 text-white px-4 py-2 font-bold uppercase text-xs outline-none"
          >
            <option value="all">Todos</option>
            <option value="student">Estudiantes</option>
            <option value="staff">Profesores</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-hp-gold text-center font-black animate-pulse py-20 tracking-widest text-xl">PROCESANDO ARCHIVOS...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((char: any) => (
              <div key={char.id} className="bg-white/5 border border-white/10 p-5 hover:border-hp-gold transition-all group">
                <div className="h-64 overflow-hidden mb-4 relative">
                  <img 
                    src={char.image || "https://placehold.co/400x600/3b2f24/eceae4?text=Desconocido"} 
                    alt={char.name} 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <h3 className="text-xl font-black uppercase mb-1">{char.name}</h3>
                <p className="text-hp-gold text-[10px] font-black uppercase tracking-widest mb-4">
                  {char.house || "Sin Casa"}
                </p>

                <div className={`overflow-hidden transition-all duration-500 ${expandedId === char.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-white/10 space-y-2 text-[10px] uppercase font-bold text-white/60">
                    <p><span className="text-hp-gold text-sm">Actor:</span> <span className='text-hp-white text-sm'>{char.actor || 'N/A'}</span></p>
                    <p><span className="text-hp-gold text-sm">Especie:</span> <span className='text-hp-white text-sm'>{char.species}</span></p>
                    <p><span className="text-hp-gold text-sm">Patronus:</span> <span className='text-hp-white text-sm'>{char.patronus || 'Ninguno'}</span></p>
                  </div>
                </div>

                <button 
                  onClick={() => setExpandedId(expandedId === char.id ? null : char.id)}
                  className="mt-4 w-full py-2 border border-hp-gold/30 hover:bg-hp-gold hover:text-hp-brown transition-all font-black text-[10px] uppercase tracking-widest"
                >
                  {expandedId === char.id ? "Cerrar" : "Ver Detalles"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-8 mt-16 pb-20">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="font-black text-hp-gold disabled:opacity-20 hover:text-white transition-colors"
            >
              PREV
            </button>
            <span className="font-black text-xs">PÁGINA {currentPage} DE {totalPages || 1}</span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="font-black text-hp-gold disabled:opacity-20 hover:text-white transition-colors"
            >
              NEXT
            </button>
          </div>
        </>
      )}
    </main>
  );
}