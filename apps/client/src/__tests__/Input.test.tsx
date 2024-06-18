import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Input } from '../components/Inputs/Input';

it('Input.tsx - render', () => {
  render(
    <Input
      id="unit-testing-input"
      placeholder="Unit test"
      value=""
      onChange={() => vi.fn}
    />,
  );
  const element = document.getElementById('unit-testing-input');
  expect(element).not.toBeNull();
});
