import React from 'react'
import './style.scss';

export default function index(props) {
  const { type = "text", name, value, onChange, placeholder, rows = 3} = props;
  return (
    <label className="input  w-100">
      <textarea 
       className="input__field" 
       type={type} 
       name={name}
       value={value}
       rows={rows}
       onChange={onChange}
       placeholder=" " 
      >
      </textarea>
      
      <span className="input__label">{placeholder}</span>
      {
        props?.icon &&
        <div className='absoulte' style={{position :'absolute', top : '25%', right : '5%'}}>
          {props?.icon}
        </div>
      }
    </label>
  )
}
