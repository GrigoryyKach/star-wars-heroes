import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import HeroDetailGraph from "@/components/HeroDetailGraph";
import { URL } from '@/constants/urls';

const HeroDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the hero ID from the router query

  const [heroData, setHeroData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch hero data from the API
    const fetchHeroData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${URL}/people/${id}`);
          setHeroData(response.data); // Set the hero data
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching hero data:", error); // Log any errors
          setIsLoading(false);
        }
      }
    };

    fetchHeroData();
  }, [id]);

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  if (isLoading) {
    return <p className="container text-2xl font-bold">Loading...</p>;
  }

  if (!heroData.name) {
    return <p>Hero not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <p
          className="cursor-pointer text-2xl mr-2"
          onClick={goBack}
        >
          🠔
        </p>
        <h1 className="text-2xl font-bold mb-4">{heroData.name}</h1>
      </div>
      <HeroDetailGraph hero={heroData} />
    </div>
  );
};

export default HeroDetailPage;
