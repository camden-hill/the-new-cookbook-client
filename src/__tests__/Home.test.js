import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Home from '../components/Home';

const renderer = new ShallowRenderer();
renderer.render(<Home />);
const result = renderer.getRenderOutput();

test('return recipes', () => {
  expect(result.type).toBe('div');
});
