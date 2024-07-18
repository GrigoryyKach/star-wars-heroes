import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import Characteristics from './Characteristics';
import { URL } from '@/constants/urls';

const HeroDetailGraph = ({ hero }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // Function to fetch data with a delay
    const fetchWithDelay = async (urls, delay) => {
      const results = [];
      for (let i = 0; i < urls.length; i++) {
        try {
          const response = await axios.get(urls[i]);
          results.push(response);
        } catch (error) {
          console.error(`Error fetching ${urls[i]}:`, error); // Log any errors
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      return results;
    };

    // Function to fetch hero details from the API
    const fetchHeroDetails = async () => {
      try {
        const filmUrls = hero.films ? hero.films.map((id) => `${URL}/films/${id}`) : [];
        const starshipUrls = hero.starships ? hero.starships.map((id) => `${URL}/starships/${id}`) : [];

        const films = await fetchWithDelay(filmUrls, 10);
        const starships = await fetchWithDelay(starshipUrls, 10);

        const heroNode = {
          id: 'hero',
          data: { label: hero.name },
          position: { x: 700, y: 100 },
          style: {
            'font-weight': 'bold'
          }
        };

        const filmsNode = {
          id: 'films',
          data: { label: 'Films' },
          position: { x: 400, y: 300 },
          style: {
            'font-weight': 'bold'
          }
        };

        const starshipsNode = {
          id: 'starships',
          data: { label: 'Starships' },
          position: { x: 1000, y: 300 },
          style: {
            'font-weight': 'bold'
          }
        };

        const characteristicsNode = {
          id: 'characteristics',
          data: { label: <Characteristics hero={hero} /> },
          position: { x: 676, y: 250 },
          style: {
            width: 200,
          }
        };

        const arrangeNodesInLine = (parentX, parentY, count, distanceX, direction) => {
          return Array.from({ length: count }, (_, idx) => ({
            x: parentX + (direction === 'right' ? distanceX * idx : -distanceX * idx),
            y: parentY + distanceX,
          }));
        };

        // Position the nodes relative to the parent element
        const filmNodesPositions = arrangeNodesInLine(filmsNode.position.x, filmsNode.position.y, films.length, 150, 'left');
        const starshipNodesPositions = arrangeNodesInLine(starshipsNode.position.x, starshipsNode.position.y, starships.length, 150, 'right');

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

        // Set the nodes for the graph
        setNodes(nodes); 
        setEdges(edges);

      } catch (error) {
        console.error('Error fetching hero details:', error); // Log any errors
      }
    };

    fetchHeroDetails();
  }, [hero]);

  return (
    <div className="h-[calc(100vh-100px)] bg-black">
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background color='white' style={{ "backgroundColor": 'black' }} />
      </ReactFlow>
    </div>
  );
};

export default HeroDetailGraph;
