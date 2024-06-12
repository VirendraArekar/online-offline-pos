import React from 'react'
import './style.scss';

export default function index(props) {
  const { type = "text", name, value, onChange, placeholder, options = []} = props;
  return (
    <label class="input  w-100">
      <select 
       class="input__field" 
       type={type} 
       name={name}
       value={value}
       onChange={onChange}
       placeholder=" " 
      >
        <option value={''}>{`Select ${name}`}</option>
        {
            options.map((opt, key) => <option value={opt.value}>{opt.label}</option>)
        }
      </select>
      <span class="input__label">{placeholder}</span>
    </label>
  )
}
