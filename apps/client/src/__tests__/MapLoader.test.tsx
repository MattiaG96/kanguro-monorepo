import { render } from '@testing-library/react';
import { it } from 'vitest';
import { MapLoader } from '../components/MapLoader';

it('MapLoader.tsx - render', () => {
  render(<MapLoader />);
  const element = document.getElementById('loading-title');
  expect(element).not.toBeNull();
});
