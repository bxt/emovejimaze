import { useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';
import './app.css';
import { CharacterChooser } from './characterChooser';
import { GridTile } from './gridTile';
import { useGrid } from './useGrid';

export function App() {
  const [character, setCharacter] = useState('🧖🏽');
  const [characterChooserOpen, setCharacterChooserOpen] = useState(false);
  const {
    gridWidth,
    gridHeight,
    isRowMovable,
    isColMovable,
    placeable,
    gridData,
    rotatePlaceable,
    moveColUp,
    moveColDown,
    moveRowLeft,
    moveRowRight,
  } = useGrid();

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
            gridTemplate: `1fr repeat(${gridHeight}, 2fr) 1fr / 1fr repeat(${gridWidth}, 2fr) 1fr`,
          }}
        >
          <>
            <div />
            {[...Array(gridWidth).keys()].map((x) =>
              isColMovable(x) ? (
                <button key={x} onClick={() => moveColDown(x)}>
                  v
                </button>
              ) : (
                <div key={x} />
              ),
            )}
            <div />
          </>
          {[...Array(gridHeight).keys()].map((y) => (
            <Fragment key={y}>
              {isRowMovable(y) ? (
                <button onClick={() => moveRowRight(y)}>&gt;</button>
              ) : (
                <div />
              )}
              {[...Array(gridWidth).keys()].map((x) => (
                <Fragment key={`${x}-${y}`}>
                  <div style={{ position: 'relative' }}>
                    {x === 0 && y === 0 ? (
                      <button class="placeable" onClick={rotatePlaceable}>
                        <GridTile item={placeable} />
                      </button>
                    ) : null}
                    <GridTile item={gridData[y][x]} />
                  </div>
                </Fragment>
              ))}
              {isRowMovable(y) ? (
                <button onClick={() => moveRowLeft(y)}>&lt;</button>
              ) : (
                <div />
              )}
            </Fragment>
          ))}
          <>
            <div />
            {[...Array(gridWidth).keys()].map((x) =>
              isColMovable(x) ? (
                <button key={x} onClick={() => moveColUp(x)}>
                  ∧
                </button>
              ) : (
                <div key={x} />
              ),
            )}
            <div />
          </>
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
