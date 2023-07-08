import { useState } from 'react';

export default function ModalCreateEditList({ onSave, children }) {
  const [newListName, setNewListName] = useState('');

  function handleOnSave() {
    onSave(newListName);
  }
  return (
    <div className="modal-editList">
      {children}
      <div className="new-list-name">
        <label> New list name</label>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        ></input>
      </div>

      <button className="btn--save" onClick={handleOnSave}>
        Save
      </button>
    </div>
  );
}
