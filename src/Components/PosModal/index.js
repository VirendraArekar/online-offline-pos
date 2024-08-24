import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import './style.css'

export default function index(props) {
  const { show, onChange, size = "lg" } = props;
  return (
    <Modal
      size={size}
      show={show}
      onHide={() => onChange(false)}
      dialogClassName="modal-90w"
      keyboard={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: -12, top: -12, borderRadius: 20, backgroundColor: '#FFFFFF' }} className='close-btn' onClick={() => onChange(false)}>
          <AiOutlineClose size={30} />
        </div>
        {props.children}
      </div>
    </Modal>
  )
}
