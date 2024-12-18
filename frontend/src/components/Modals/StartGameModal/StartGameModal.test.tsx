import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StartGameModal from './StartGameModal';
import { Photo } from '../../../../types';

const mockHandleStartGame = vi.fn();

const mockPhoto: Photo = {
  id: 1,
  image: '/photo1.png',
  name: 'Test Photo 1',
  scores: [
    {
      id: 1,
      photoId: 1,
      time: 1200, // deciseconds
      username: 'Player1',
      date: '2024-11-29T12:00:00Z',
    },
    {
      id: 2,
      photoId: 1,
      time: 1500,
      username: 'Player2',
      date: '2024-11-28T10:30:00Z',
    },
  ],
  characters: [
    {
      id: 1,
      name: 'Character 1',
      image: '/image1.png',
      found: false,
      photoId: 1,
      positionX: 0.2,
      positionY: 0.3,
    },
    {
      id: 2,
      name: 'Character 2',
      image: '/image2.png',
      found: false,
      photoId: 1,
      positionX: 0.5,
      positionY: 0.6,
    },
    {
      id: 3,
      name: 'Character 3',
      image: '/image3.png',
      photoId: 1,
      positionX: 0.8,
      positionY: 0.7,
      found: false,
    },
  ],
  slug: 'test-photo-1',
};

describe('StartGameModal', () => {
  it('should render the modal with characters and start button', () => {
    render(
      <StartGameModal
        photo={mockPhoto}
        handleStartGame={mockHandleStartGame}
      />,
    );

    expect(
      screen.getByText('Find the Following Characters'),
    ).toBeInTheDocument();

    mockPhoto.characters.forEach((char) => {
      expect(screen.getByAltText(`${char.name} Icon`)).toBeInTheDocument();
    });

    expect(screen.getByText('Start Game')).toBeInTheDocument();
  });

  it('should call handleStartGame when the button is clicked', () => {
    render(
      <StartGameModal
        photo={mockPhoto}
        handleStartGame={mockHandleStartGame}
      />,
    );

    const startButton = screen.getByText('Start Game');

    fireEvent.click(startButton);

    expect(mockHandleStartGame).toHaveBeenCalledTimes(1);
  });
});
