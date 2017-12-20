import React, {Component} from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Link} from 'react-router-dom';
import NotFound from '../components/NotFound';

const renderer = new ShallowRenderer();
renderer.render(<NotFound />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
