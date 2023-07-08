import { useState } from 'react';

export default function Header() {
  const [acvtiveTab, setIsactive] = useState(null);

  return (
    <nav className="navbar">
      <ul>
        <li className={acvtiveTab === 0 ? `active-tab` : ''}>
          <a href="#" onClick={() => setIsactive(0)}>
            Vocabulary
          </a>
        </li>
        <li className={acvtiveTab === 1 ? `active-tab` : ''}>
          <a href="#" onClick={() => setIsactive(1)}>
            My lists
          </a>
        </li>
        <li className={acvtiveTab === 2 ? `active-tab` : ''}>
          <a href="#" onClick={() => setIsactive(2)}>
            My account
          </a>
        </li>
      </ul>
    </nav>
  );
}
