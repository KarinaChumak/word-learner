import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function MyLists({
  wordlists,
  selectedList,
  setSelectedList,
  onSelectList,
  onToggleModal,
}) {
  return (
    <div>
      <h2>My lists</h2>
      <ul className="my-lists">
        {wordlists.map((list) => (
          <li
            key={list.listName}
            className={selectedList === list.listName ? 'active' : ''}
            onClick={() => onSelectList(list.listName)}
          >
            <span>{list.emoji}</span>
            {list.listName}
          </li>
        ))}
        {
          <li onClick={() => onToggleModal('createList')}>
            <span>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: '#5a6cf1' }}
              />
            </span>
            Add new list
          </li>
        }
      </ul>
    </div>
  );
}
