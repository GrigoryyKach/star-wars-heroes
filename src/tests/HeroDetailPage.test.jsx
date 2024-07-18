import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { useRouter } from 'next/router';
import HeroDetailPage from '../pages/hero/[id]';
import { URL } from '../constants/urls';

// Mock Axios
jest.mock('axios');

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockHeroData = {
  name: 'Obi-Wan Kenobi',
  films: [1, 2, 3],
  starships: [1, 2],
  birth_year: '57BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'auburn',
  height: '182',
  homeworld: 'Tatooine',
  mass: '77',
  skin_color: 'fair'
};

describe('HeroDetailPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockHeroData });
    useRouter.mockReturnValue({
      query: { id: '1' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays hero details', async () => {
    render(<HeroDetailPage />);

    // Check if "Loading..." text is displayed initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the hero details to be loaded
    const heroName = await screen.findByText('Obi-Wan Kenobi', { timeout: 5000 });
    expect(heroName).toBeInTheDocument();

    // Check if the correct API URL was called
    expect(axios.get).toHaveBeenCalledWith(`${URL}/people/10`);
  });
});