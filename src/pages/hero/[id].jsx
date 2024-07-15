import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import HeroDetailGraph from "@/components/HeroDetailGraph";

const HeroDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [heroData, setHeroData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://sw-api.starnavi.io/people/${id}`);
          setHeroData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching hero data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchHeroData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!heroData.name) {
    return <p>Hero not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{heroData.name}</h1>
      <HeroDetailGraph hero={heroData} />
    </div>
  );
};

export default HeroDetailPage;
