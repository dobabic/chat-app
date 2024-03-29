import React from 'react';
import './style.scss';

export default function Search({ imgSrcs }) {
  return (
    <div className="search">
      <input type="search" placeholder="People, groups, messages" />
      <img
        src={imgSrcs.search}
        alt="Search icon"
      />
    </div>
  );
}
