import { useState } from 'preact/hooks';
import './app.css';
import { CharacterChooser } from './characterChooser';

export function App() {
  const [character, setCharacter] = useState('🧖🏽');
  const [characterChooserOpen, setCharacterChooserOpen] = useState(false);

  return (
    <>
      <h1>emovejimaze</h1>
      <div class="card">
        {characterChooserOpen ? (
          <CharacterChooser
            onSelect={(chosenCharacter) => {
              setCharacter(chosenCharacter);
              setCharacterChooserOpen(false);
            }}
          />
        ) : (
          <>
            <p>
              <button onClick={() => setCharacterChooserOpen(true)}>
                {character}
              </button>
            </p>
            <p>Hello, world!</p>
          </>
        )}
      </div>
      <footer class="footer">
        &copy; 2022 by{' '}
        <a href="http://bernhardhaeussner.de/">Bernhard Häussner</a>, code on{' '}
        <a href="https://github.com/bxt/emovejimaze">GitHub</a>.
      </footer>
    </>
  );
}
