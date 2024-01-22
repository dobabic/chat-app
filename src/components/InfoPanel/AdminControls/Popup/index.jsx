import React from 'react';
import './style.scss';

export default function Popup(props) {
  const { trigger, children, setTrigger } = props;

  function handleClick() {
    setTrigger(false);
  }
  return (trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        {children}
        <button type="submit" className="close-btn" onClick={handleClick}>Close</button>
      </div>
    </div>
  ) : null;
}
