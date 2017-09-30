import React from 'react';
import ReactDOM from 'react-dom';
import SymbolTicker from './SymbolTicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SymbolTicker />, div);
});
