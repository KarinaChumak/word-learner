import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrashCan,
  faXmark,
  faPlus,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons';

export default function Controls({ onToggleModal }) {
  return (
    <div className="controls-panel">
      <button
        className="control-button "
        onClick={() => onToggleModal('edit')}
      >
        <span>
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <p>Edit this list</p>
      </button>
      <button
        className="control-button"
        onClick={() => onToggleModal('confirm-clear')}
      >
        <span>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <p>Clear this list</p>
      </button>
      <button
        className="control-button"
        onClick={() => onToggleModal('confirm-delete')}
      >
        <span>
          <FontAwesomeIcon icon={faTrashCan} />
        </span>
        <p>Delete this list</p>
      </button>
      <button
        className="control-button"
        onClick={() => onToggleModal('add')}
      >
        <span>
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <p>Add words</p>
      </button>
      <button
        className="control-button"
        onClick={() => onToggleModal('import')}
      >
        <span>
          <FontAwesomeIcon icon={faFileImport} />
        </span>
        <p>Import words </p>
      </button>
    </div>
  );
}
