import React, { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import './style.css'

export default function DeleteModal(props) {
    const { show, onChange, setConfirm, size = 'lg' } = props
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
                <div className="p-5 px-3">
                    <h5 className="text-center fw-medium">Do you want to delete this record?</h5>
                    <div className="text-center mt-4">
                        <button className='btn btn-outline-danger ' onClick={() => setConfirm()}>
                            Delete
                        </button>

                        <button className='btn btn-outline-secondary  mx-3' onClick={() => onChange(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}