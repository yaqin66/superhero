import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSuperheroById } from '../api/index';

const SuperheroList = () => {
  const [allSuperheroes, setAllSuperheroes] = useState([]);
  const [displayedSuperheroes, setDisplayedSuperheroes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const superheroesPerPage = 10;
  const maxId = ''; // Total ID superhero yang ingin diambil
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Mengambil parameter dari URL jika ada
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const search = params.get('search');

    if (page) setCurrentPage(Number(page));
    if (search) setSearchQuery(search);
  }, [location.search]);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      setIsLoading(true);
      const superheroesList = [];

      if (searchQuery) {
        for (let id = 1; id <= maxId; id++) {
          try {
            const superhero = await fetchSuperheroById(id);
            if (superhero.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              superheroesList.push(superhero);
            }
          } catch (error) {
            console.error(`Error fetching superhero with ID ${id}`, error);
          }
        }
      }

      setAllSuperheroes(superheroesList);
      setDisplayedSuperheroes(superheroesList.slice(0, superheroesPerPage));
      setIsLoading(false);
    };

    fetchSuperheroes();
  }, [searchQuery]);

  useEffect(() => {
    if (allSuperheroes.length > 0) {
      const filteredSuperheroes = allSuperheroes.slice((currentPage - 1) * superheroesPerPage, currentPage * superheroesPerPage);
      setDisplayedSuperheroes(filteredSuperheroes);
    }
  }, [currentPage, allSuperheroes]);

  const handlePagination = (page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams();
    newParams.set('search', searchQuery);
    newParams.set('page', page);
    navigate(`?${newParams.toString()}`);
  };

  const handleSuperheroClick = (heroId) => {
    // Navigasi ke halaman detail superhero
    navigate(`/superhero/${heroId}`);
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className='items-center text-center'>Loading superheroes...</div>
      ) : (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari superhero..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {displayedSuperheroes.map((hero) => (
              <div 
                key={hero.id} 
                className="border p-4 bg-gray-100 rounded-lg text-center shadow-md cursor-pointer"
                onClick={() => handleSuperheroClick(hero.id)} // Menambahkan fungsi klik
              >
                <h2 className="font-bold">{hero.name}</h2>
                <img src={hero.image.url} alt={hero.name} className="w-full h-auto mt-2" />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                const newPage = Math.max(currentPage - 1, 1);
                handlePagination(newPage);
              }}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Halaman {currentPage} dari {Math.ceil(allSuperheroes.length / superheroesPerPage)}
            </span>
            <button
              onClick={() => {
                const newPage = Math.min(currentPage + 1, Math.ceil(allSuperheroes.length / superheroesPerPage));
                handlePagination(newPage);
              }}
              disabled={currentPage === Math.ceil(allSuperheroes.length / superheroesPerPage)}
              className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperheroList;
