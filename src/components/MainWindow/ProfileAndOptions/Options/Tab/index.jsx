import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function Tab({ imgSrc, name, to = '/' }) {
  return (
    <div className="tab">
      <Link to={to}>
        <img
          src={imgSrc}
          alt="Tab"
        />
        <p>{name}</p>
      </Link>
    </div>
  );
}
