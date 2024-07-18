"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import HeroCard from './HeroCard';
import { URL } from '@/constants/urls';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]); // State to store the list of heroes
  const [page, setPage] = useState(1); // State to store the current page
  const [totalPages, setTotalPages] = useState(0); // State to store the total number of pages
  const heroesPerPage = 10; // Number of heroes per page

  useEffect(() => {
    // Function to fetch heroes from the API
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(`${URL}/people?page=${page}`);
        setHeroes([response.data.results]); // Set the heroes data
        setTotalPages(Math.ceil(response.data.count / heroesPerPage)); // Calculate and set the total number of pages
      } catch (error) {
        console.error('Error fetching heroes:', error); // Log any errors
      }
    };

    fetchHeroes();
  }, [page]);

  // Function to handle next page button click
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl text-center font-bold mb-4'>Star Wars Heroes</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {heroes.length > 0 ? heroes[0].map((hero) => (
          <li key={hero.id} className='mb-2'>
            <Link href={`/hero/${hero.id}`}>
              <HeroCard heroName={hero.name} />
            </Link>
          </li>
        )) : <p>Loading...</p>}
      </ul>

      <div className='flex justify-center gap-5 mt-4'>
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-400 text-black rounded disabled:bg-gray-300'
        >
          ≪
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className='px-4 py-2 bg-gray-200 hover:bg-gray-400 text-black rounded disabled:bg-gray-300'
        >
          ≫
        </button>
      </div>
      <p className='mt-2 text-center'>Page {page} of {totalPages}</p>
    </div>
  );
};

export default HeroList;
