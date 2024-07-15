import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import Characteristics from './Characteristics';

const HeroDetailGraph = ({ hero }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const URL = 'https://sw-api.starnavi.io/';
  console.log(hero);

  useEffect(() => {
    const fetchWithDelay = async (urls, delay) => {
      const results = [];
      for (let i = 0; i < urls.length; i++) {
        try {
          const response = await axios.get(urls[i]);
          results.push(response);
        } catch (error) {
          console.error(`Error fetching ${urls[i]}:`, error);
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      return results;
    };

    const fetchHeroDetails = async () => {
      try {
        const filmUrls = hero.films ? hero.films.map((id) => `${URL}/films/${id}`) : [];
        const starshipUrls = hero.starships ? hero.starships.map((id) => `${URL}/starships/${id}`) : [];

        const films = await fetchWithDelay(filmUrls, 10);
        const starships = await fetchWithDelay(starshipUrls, 10);

        const heroNode = {
          id: 'hero',
          data: { label: hero.name },
          position: { x: 900, y: 100 },
          style: {
            'font-weight': 'bold'
          }
        };

        const filmsNode = {
          id: 'films',
          data: { label: 'Films' },
          position: { x: 600, y: 300 },
          style: {
            'font-weight': 'bold'
          }
        };

        const starshipsNode = {
          id: 'starships',
          data: { label: 'Starships' },
          position: { x: 1200, y: 300 },
          style: {
            'font-weight': 'bold'
          }
        };

        const characteristicsNode = {
          id: 'characteristics',
          data: { label: <Characteristics hero={hero} /> },
          position: { x: 877, y: 250 },
          style: {
            width: 200,
          }
        };

        const arrangeNodesInLine = (parentX, parentY, count, distanceX, negativeDistance = 0) => {
          return Array.from({ length: count }, (_, idx) => ({
            x: (parentX - negativeDistance) + distanceX * idx,
            y: parentY + distanceX,
          }));
        };

        const filmNodesPositions = arrangeNodesInLine(filmsNode.position.x, filmsNode.position.y, films.length, 150, 750);
        const starshipNodesPositions = arrangeNodesInLine(starshipsNode.position.x, starshipsNode.position.y, starships.length, 150);

        const filmNodes = films.map((film, idx) => ({
          id: `film-${idx}`,
          data: { label: film.data.title },
          position: filmNodesPositions[idx],
        }));

        const starshipNodes = starships.map((starship, idx) => ({
          id: `starship-${idx}`,
          data: { label: starship.data.name },
          position: starshipNodesPositions[idx],
        }));

        const nodes = [heroNode, filmsNode, starshipsNode, characteristicsNode, ...filmNodes, ...starshipNodes];
        const edges = [
          { id: 'e1', source: 'hero', target: 'films' },
          { id: 'e2', source: 'hero', target: 'starships' },
          { id: 'e3', source: 'hero', target: 'characteristics' },
          ...filmNodes.map((filmNode) => ({ id: `e-${filmNode.id}`, source: 'films', target: filmNode.id })),
          ...starshipNodes.map((starshipNode) => ({ id: `e-${starshipNode.id}`, source: 'starships', target: starshipNode.id }))
        ];

        setNodes(nodes);
        setEdges(edges);

      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    };

    fetchHeroDetails();
  }, [hero]);

  return (
    <div style={{ height: 'calc(100vh - 100px)' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background color='white' style={{ "backgroundColor": 'black' }} />
      </ReactFlow>
    </div>
  );
};

export default HeroDetailGraph;
