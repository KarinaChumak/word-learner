import { useEffect, useState } from 'react';
import './App.css';
import './components/Header';
import Header from './components/Header';
import LayoutOne from './components/LayoutOne';
import MyLists from './components/MyLists';
import WordTable from './components/WordTable';
import Controls from './components/Controls';
import ModalAddWord from './components/ModalAddWord';
import ModalWindow from './components/ModalWindow';
import ModalConfirmAction from './components/ModalConfirmAction';
import ModalCreateEditList from './components/ModalCreateEditList';

let tempMyLists = [
  {
    emoji: `👨🏻‍🦱`,
    listName: 'Nicos Weg',
    words: [
      { ukr: 'брати на себе', ger: 'übernehmen' },
      { ukr: 'схожий', ger: 'ähnlich' },
    ],
  },
  {
    emoji: `🧳`,

    listName: 'Schritte International',
    words: [
      { ukr: 'власник будинку', ger: 'der Hausbesitzer' },
      { ukr: 'давати знати комусь щось', ger: 'jdm. Bescheid geben' },
      { ukr: 'кінець робочого дня', ger: 'der Feierabend' },
      { ukr: 'хвилюючий, хвилююче', ger: 'aufregend' },
      { ukr: 'розглядати, спостерігати', ger: 'betrachten' },
      { ukr: 'команда', ger: 'die Mannschaft' },
      { ukr: 'карніз', ger: 'die Vorhangstange' },
      { ukr: 'придбати, дістати якусь річ/товар', ger: 'besorgen' },
      { ukr: 'кидати, покидати', ger: 'verlassen' },
      { ukr: 'криниця', ger: 'der Brunnen' },
      { ukr: 'скаржитися', ger: 'beklagen' },
      { ukr: 'нахабний', ger: 'frech' },
      { ukr: 'нюхати', ger: 'riechen' },
    ],
  },
  {
    emoji: `⭐️`,
    listName: 'Most popular verbs',
    words: [{ ukr: 'word1', ger: '' }],
  },
];

function getWordsFromList(listname) {
  return tempMyLists.find((list) => list.listName === listname)
    ?.words;
}

function addWordToList(word, listname) {
  const list = tempMyLists.find((list) => list.listName === listname);
  list.words = [...list.words, word];
  return list.words;
}

function deleteList(listname) {
  tempMyLists = tempMyLists.filter(
    (list) => list.listName !== listname
  );
}

function clearList(listname) {
  const list = tempMyLists.find((list) => list.listName === listname);
  list.words = [];
}

function editListName(oldName, newName) {
  const list = tempMyLists.find((list) => list.listName === oldName);
  list.listName = newName;
}

function addNewList(listname) {
  tempMyLists = [
    ...tempMyLists,
    {
      emoji: `👨🏻‍🦱`,
      listName: listname,
      words: [],
    },
  ];
}

function App() {
  const [selectedList, setSelectedList] = useState('Nicos Weg');
  const [words, setWords] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openModalType, setOpenModalType] = useState('');

  function handleSelectList(listName) {
    setSelectedList(listName);
  }

  function handleToggleModal(modalType) {
    setModalIsOpen((modalIsOpen) => !modalIsOpen);
    setOpenModalType(modalIsOpen ? '' : modalType);
  }

  function handleAddWord(word) {
    const modifiedList = addWordToList(word, selectedList);
    setWords(modifiedList);
  }

  function handleDeleteList(listname) {
    deleteList(listname);
    setWords(selectedList === listname && []);
    setSelectedList(tempMyLists.at(0)?.listName);
    handleToggleModal();
  }

  function handleClearList(listname) {
    clearList(listname);
    setWords([]);
    handleToggleModal();
  }

  function handleEditListName(newListName) {
    editListName(selectedList, newListName);
    setSelectedList(newListName);
    handleToggleModal();
  }

  function handleCreateList(newListName) {
    addNewList(newListName);
    setSelectedList(newListName);
    handleToggleModal();
  }

  useEffect(
    function () {
      setWords(getWordsFromList(selectedList));
    },
    [selectedList]
  );

  return (
    <div className="App">
      <Header></Header>

      {openModalType === 'add' && (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          onToggleModal={handleToggleModal}
        >
          <ModalAddWord onAddWord={handleAddWord}></ModalAddWord>
        </ModalWindow>
      )}
      {openModalType === 'confirm-delete' && (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          onToggleModal={handleToggleModal}
          size="medium"
        >
          <ModalConfirmAction
            onConfirm={() => handleDeleteList(selectedList)}
          >
            Are you sure you want to delete the list?
          </ModalConfirmAction>
        </ModalWindow>
      )}
      {openModalType === 'confirm-clear' && (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          onToggleModal={handleToggleModal}
          size="medium"
        >
          <ModalConfirmAction
            onConfirm={() => handleClearList(selectedList)}
          >
            Are you sure you want to clear the list?
          </ModalConfirmAction>
        </ModalWindow>
      )}
      {openModalType === 'edit' && (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          onToggleModal={handleToggleModal}
          size="small"
        >
          <ModalCreateEditList onSave={handleEditListName}>
            <h2>Edit list</h2>
          </ModalCreateEditList>
        </ModalWindow>
      )}

      {openModalType === 'createList' && (
        <ModalWindow
          modalIsOpen={modalIsOpen}
          onToggleModal={handleToggleModal}
          size="small"
        >
          <ModalCreateEditList onSave={handleCreateList}>
            <h2>CreateList list</h2>
          </ModalCreateEditList>
        </ModalWindow>
      )}

      {openModalType === 'import' && <></>}
      <LayoutOne>
        <MyLists
          wordlists={tempMyLists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          onSelectList={handleSelectList}
          onToggleModal={handleToggleModal}
        ></MyLists>
        <WordTable wordList={words}></WordTable>
        <Controls onToggleModal={handleToggleModal}></Controls>
      </LayoutOne>
    </div>
  );
}

export default App;
