import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NotFound from '../components/NotFound';

const renderer = new ShallowRenderer();
renderer.render(<NotFound />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
