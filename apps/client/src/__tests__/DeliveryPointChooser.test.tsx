import { render } from '@testing-library/react';
import { it } from 'vitest';
import DeliveryPointChooser from '../components/DeliveryPointChooser';

it('DeliveryPointChooser.tsx', async () => {
  render(<DeliveryPointChooser />);
  const element = document.getElementById(
    'delivery-point-chooser-root-element',
  );
  expect(element).not.toBeNull();
});
