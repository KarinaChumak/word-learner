import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const KEY = 'b5484523-be3a-d1ba-0294-b9113d48287c:fx';

export default function ModalAddWord({ onAddWord }) {
  const [wordToTranslate, setwordToTranslate] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');
  const [suggestedTranslations, setSuggestedTranslations] = useState(
    []
  );
  const [wordRecentlyAdded, setWordRecentlyAdded] = useState(false);

  useEffect(
    function () {
      async function fetchTranslation() {
        const { data } = await axios.get(
          `https://api-free.deepl.com/v2/translate?auth_key=${KEY}&text=${wordToTranslate}&target_lang=uk`
        );

        console.log(data);
        setSuggestedTranslations(data?.translations);
      }
      fetchTranslation();
    },
    [wordToTranslate, setSuggestedTranslations]
  );

  function handleAddWord() {
    setWordRecentlyAdded(true);
    onAddWord({ ukr: translatedWord, ger: wordToTranslate });
    setwordToTranslate('');
    setTranslatedWord('');
    setTimeout(() => {
      setwordToTranslate('');
      setTranslatedWord('');
      setWordRecentlyAdded(false);
    }, 2000);
  }

  return (
    <div className="modal-addWord">
      <div className="form-addWord">
        <div className="form-row">
          <h3>Add new word</h3>
        </div>
        <div className="form-row">
          <label> German</label>
          <input
            type="text"
            value={wordToTranslate}
            onChange={(e) => setwordToTranslate(e.target.value)}
          ></input>
        </div>
        <div className="form-row">
          <label> Ukrainian</label>
          <input
            type="text"
            value={translatedWord}
            onChange={(e) => setTranslatedWord(e.target.value)}
          ></input>
        </div>

        <button className="btn--save" onClick={handleAddWord}>
          Save
        </button>
      </div>

      <div className="suggestedTranslations">
        <h3>Suggested translations</h3>

        {wordToTranslate && (
          <ul>
            {suggestedTranslations.map((suggestion) => (
              <li
                key={suggestion.text}
                onClick={() => setTranslatedWord(suggestion.text)}
              >
                {suggestion.text}
              </li>
            ))}
          </ul>
        )}

        {wordRecentlyAdded && (
          <div className="add-success">
            <span>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <p>Word successfully added</p>
          </div>
        )}
      </div>
    </div>
  );
}
