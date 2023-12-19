import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function Tab({ imgSrc, name, to = '/' }) {
  return (
    <Link to={to}>
      <div className="tab">
        <img
          src={imgSrc}
          alt="Tab"
        />
        <p>{name}</p>
      </div>
    </Link>
  );
}
