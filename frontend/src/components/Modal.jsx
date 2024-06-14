import React from 'react';

function Modal({ file, handleClose }) {
  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>&times;</span>
        <img src={file.url} alt={file.name} style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default Modal;
