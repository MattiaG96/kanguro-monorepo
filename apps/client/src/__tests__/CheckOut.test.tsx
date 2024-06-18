import { it, expect } from 'vitest';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import CheckOut from '../screens/CheckOut';
import { Point } from '../models/PointsModel';

it('CheckOut.tsx - render', () => {
  render(<CheckOut />);
  const element = document.getElementById('checkout-delivery-point-button');
  expect(element).not.toBeNull();
});

it('CheckOut.tsx - postMessage success', async () => {
  const point: Point = {
    id: 1,
    name: 'Unit test',
    longitude: '1',
    latitude: '1',
    address: 'Unit test address',
    schedule: 'Something',
  };
  render(<CheckOut />);
  window.top?.postMessage({ point: point }, '*');

  await waitFor(() => {
    const element = document.getElementById('checkout-delivery-point-box');
    expect(element).not.toBeNull();
  });
});

it('CheckOut.tsx - postMessage fail', async () => {
  render(<CheckOut />);
  window.top?.postMessage({ something: '' }, '*');

  const element = document.getElementById('checkout-delivery-point-box');
  expect(element).toBeNull();
});

it('CheckOut.tsx - open iframe', async () => {
  render(<CheckOut />);
  const button = document.getElementById('checkout-delivery-point-button');
  if (!button) return;
  act(() => {
    fireEvent.click(button);
  });
  await waitFor(() => {
    const iFrame = document.getElementById('checkout-delivery-point-iframe');
    expect(iFrame).not.toBeNull();
  });
});
