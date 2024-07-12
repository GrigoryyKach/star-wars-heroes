import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHeroes = async () => {}
  }, [page]);
}
