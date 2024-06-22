import React from 'react';

function Modal({ file, setSelectedFile }) {
  return (
    <div className="modal" onClick={() => setSelectedFile(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setSelectedFile(null)}>&times;</span>
        <img src={file.url} alt={file.name} style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default Modal;
