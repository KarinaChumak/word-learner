import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModalConfirmAction({ onConfirm, children }) {
  return (
    <div className="modal-confirmAction">
      <h2>{children}</h2>
      <div className="confirm-options">
        <button className="btn btn-no" autoFocus>
          No
        </button>
        <button className="btn btn-yes" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </div>
  );
}
