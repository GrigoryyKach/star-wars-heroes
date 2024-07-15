const HeroCard = ({heroName}) => {
  return (
    <div className="bg-black text-yellow-500 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-center text-lg font-bold">{heroName}</h2>
    </div>
  )
}

export default HeroCard;
