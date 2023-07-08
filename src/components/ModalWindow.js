export default function ModalWindow({
  modalIsOpen,
  onToggleModal,
  size = 'large',
  children,
}) {
  return (
    <div className={`modal ${modalIsOpen ? 'modal--visible' : ''}`}>
      <div className={`modal-content modal--${size}`}>
        <button className="btn--close" onClick={onToggleModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
