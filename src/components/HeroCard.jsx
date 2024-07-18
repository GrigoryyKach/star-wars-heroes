import React from 'react';

const HeroCard = ({ heroName }) => {
  return (
    <div className="bg-black text-yellow-500 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 border border-orange-300 border-double">
      <h2 className="text-center text-lg font-bold truncate">{heroName}</h2>
    </div>
  )
}

export default HeroCard;
