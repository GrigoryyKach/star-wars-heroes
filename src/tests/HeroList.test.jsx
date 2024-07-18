import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HeroList from '../components/HeroList';
import { URL } from '@/constants/urls';

jest.mock('axios');

describe('HeroList', () => {
  it('fetches and displays heroes', async () => {
    const heroesData = {
      data: {
        results: [
          { id: 1, name: 'Obi-Wan Kenobi' }
        ],
        count: 1
      }
    };

    axios.get.mockResolvedValueOnce(heroesData);

    render(<HeroList />);

    // Проверяем, что элемент "Loading..." присутствует
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Ожидаем, что элемент "Obi-Wan Kenobi" будет найден
    const heroName = await screen.findByText('Obi-Wan Kenobi');

    // Проверяем, что элемент "Obi-Wan Kenobi" присутствует
    expect(heroName).toBeInTheDocument();
  });
});
