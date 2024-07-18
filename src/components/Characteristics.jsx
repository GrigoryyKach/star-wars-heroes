import React from 'react';
import 'tailwindcss/tailwind.css';

const Characteristics = (hero) => {
  // Destructure hero characteristics
  const { birth_year, eye_color, gender, hair_color, height, homeworld, mass, skin_color } = hero.hero;

  return (
    <>
      <p
        className='text-lg font-bold mb-2'
      >
        Characteristics:
      </p>
      <ul className='list-outside mb-2'>
        <li>
          <b>Birth Year</b>: {birth_year}
        </li>
        <li>
          <b>Eye Color</b>: {eye_color}
        </li>
        <li>
          <b>Gender</b>: {gender}
        </li>
        <li>
          <b>Hair Color</b>: {hair_color}
        </li>
        <li>
          <b>Height</b>: {height}
        </li>
        <li>
          <b>Homeworld</b>: {homeworld}
        </li>
        <li>
          <b>Mass</b>: {mass}
        </li>
        <li>
          <b>Skin Color</b>: {skin_color}
        </li>
      </ul>
    </>
  )
}

export default Characteristics;