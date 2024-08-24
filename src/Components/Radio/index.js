import React from 'react';
import './style.css';

export default function index(props) {
    const {name, value, onChange, label, checked = false} = props;
  return (
    <label className="radio-container">{label}
      <input type="radio" name={name} value={value} onChange={onChange} checked={checked}/>
      <span className="radio-checkmark"></span>
    </label>
  )
}
