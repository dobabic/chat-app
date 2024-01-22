import React from 'react';
import search from 'Assets/magnifying-glass.svg';
import Search from './Search';
import './style.scss';

export default function SearchBar() {
  return (
    <div className="search-container">
      <Search imgSrcs={{ search }} />
    </div>
  );
}
