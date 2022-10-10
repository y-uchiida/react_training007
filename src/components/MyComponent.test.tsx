import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';
import '@testing-library/jest-dom';

test('「Hello Test」が描画されている', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello Test')).toBeInTheDocument();
})
