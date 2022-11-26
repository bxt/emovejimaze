import { useState } from 'preact/hooks';
import './app.css';
import { CharacterChooser } from './characterChooser';
import { GridTile } from './gridTile';

const GRID_WIDTH = 7;
const GRID_HEIGHT = 7;
const gridData = [
  [3, 3, 2, 10, 2, 10, 6],
  [5, 12, 1, 5, 10, 2, 5],
  [1, 9, 1, 9, 2, 5, 4],
  [5, 10, 9, 4, 8, 12, 5],
  [1, 9, 8, 12, 4, 5, 4],
  [9, 9, 6, 1, 12, 5, 12],
  [9, 8, 8, 12, 8, 10, 12],
];
const placeable = 8;

export function App() {
  const [character, setCharacter] = useState('🧖🏽');
  const [characterChooserOpen, setCharacterChooserOpen] = useState(false);

  return (
    <div class="layoutGrid">
      <div>
        <h1>emovejimaze</h1>
        {characterChooserOpen ? null : (
          <p>
            <button onClick={() => setCharacterChooserOpen(true)}>
              {character}
            </button>
          </p>
        )}
      </div>
      {characterChooserOpen ? (
        <div class="card">
          <CharacterChooser
            onSelect={(chosenCharacter) => {
              setCharacter(chosenCharacter);
              setCharacterChooserOpen(false);
            }}
          />
        </div>
      ) : (
        <div
          class="grid"
          style={{
            gridTemplate: `repeat(${GRID_HEIGHT}, 1fr) / repeat(${GRID_WIDTH}, 1fr)`,
          }}
        >
          {[...Array(GRID_HEIGHT).keys()].map((y) =>
            [...Array(GRID_WIDTH).keys()].map((x) => (
              <GridTile key={`${x}-${y}`} number={gridData[y][x]} />
            )),
          )}
        </div>
      )}
      <footer class="footer">
        <p>
          &copy; 2022 by{' '}
          <a href="http://bernhardhaeussner.de/">Bernhard Häussner</a>, code on{' '}
          <a href="https://github.com/bxt/emovejimaze">GitHub</a>.
        </p>
      </footer>
    </div>
  );
}
