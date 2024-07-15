"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const heroesPerPage = 10;

  useEffect(() => {
    const fetchHeroes = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`https://sw-api.starnavi.io/people?page=${page}`);
        setHeroes([response.data.results]);
        setTotalPages(Math.ceil(response.data.count / heroesPerPage));
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  console.log(heroes);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Star Wars Heroes</h1>
      <ul>
        {heroes.length > 0 ? heroes[0].map((hero) => (
          <li key={hero.id} className='mb-2'>
            <Link href={`/hero/${hero.id}`}>
              <p className='text-blue-500 hover:underline'>{hero.name}</p>
            </Link>
          </li>
        )) : <p>Loading...</p>}
      </ul>

      <div className='flex gap-5 mt-4'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-400 text-black rounded disabled:bg-gray-300'
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-400 text-black rounded disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
      <p className='mt-2'>Page {page} of {totalPages}</p>
    </div>
  );
};

export default HeroList;
