import { useState } from 'preact/hooks';

export type GridItem = {
  number: number;
  target?: string;
};

const gridWidth = 7;
const gridHeight = 7;
const initialGridData: GridItem[][] = [
  [
    { number: 3 },
    { number: 3 },
    { number: 2, target: '💌' },
    { number: 10 },
    { number: 2, target: '🏆' },
    { number: 10 },
    { number: 6 },
  ],
  [
    { number: 5 },
    { number: 12 },
    { number: 1, target: '🐉' },
    { number: 5 },
    { number: 10 },
    { number: 2, target: '🧙‍♂️' },
    { number: 5 },
  ],
  [
    { number: 1, target: '🗺' },
    { number: 9 },
    { number: 1, target: '👑' },
    { number: 9 },
    { number: 2, target: '🏺' },
    { number: 5 },
    { number: 4, target: '🦴' },
  ],
  [
    { number: 5 },
    { number: 10 },
    { number: 9 },
    { number: 4, target: '🧜‍♀️' },
    { number: 8, target: '🧞' },
    { number: 12 },
    { number: 5 },
  ],
  [
    { number: 1, target: '💍' },
    { number: 9, target: '🕷' },
    { number: 8, target: '🧳' },
    { number: 12 },
    { number: 4, target: '💎' },
    { number: 5 },
    { number: 4, target: '🗡' },
  ],
  [
    { number: 9, target: '🪰' },
    { number: 9 },
    { number: 6, target: '🦖' },
    { number: 1, target: '🦇' },
    { number: 12, target: '🐁' },
    { number: 5 },
    { number: 12, target: '🦉' },
  ],
  [
    { number: 9 },
    { number: 8, target: '🧌' },
    { number: 8, target: '🕯' },
    { number: 12 },
    { number: 8, target: '🦝' },
    { number: 10 },
    { number: 12 },
  ],
];
const initialPlaceable: GridItem = { number: 6, target: '🪲' };

const isRowMovable = (y: number): boolean => y % 2 === 1;
const isColMovable = (x: number): boolean => x % 2 === 1;

export const useGrid = () => {
  const [placeable, setPlaceable] = useState(initialPlaceable);
  const [gridData, setGridData] = useState(initialGridData);

  const rotatePlaceable = (): void => {
    setPlaceable(({ number, target }) => ({
      number: (number >> 1) | ((number & 1) << 3),
      target,
    }));
  };

  const moveColUp = (x: number): void => {
    const newPlaceable = gridData[0][x];
    setGridData(
      gridData.map((row, currentY) =>
        row.map((element, currentX) =>
          currentX === x
            ? currentY + 1 >= gridData.length
              ? placeable
              : gridData[currentY + 1][currentX]
            : element,
        ),
      ),
    );
    setPlaceable(newPlaceable);
  };

  const moveColDown = (x: number): void => {
    const newPlaceableRow = gridData.at(-1);
    if (newPlaceableRow === undefined)
      throw new Error('Trying to take from an empty grid');
    const newPlaceable = newPlaceableRow[x];
    setGridData(
      gridData.map((row, currentY) =>
        row.map((element, currentX) =>
          currentX === x
            ? currentY === 0
              ? placeable
              : gridData[currentY - 1][currentX]
            : element,
        ),
      ),
    );
    setPlaceable(newPlaceable);
  };

  const moveRowLeft = (y: number): void => {
    const newPlaceable = gridData[y][0];
    setGridData(
      gridData.map((row, currentY) =>
        currentY === y ? [...row.slice(1), placeable] : row,
      ),
    );
    setPlaceable(newPlaceable);
  };

  const moveRowRight = (y: number): void => {
    const newPlaceable = gridData[y].at(-1);
    if (newPlaceable === undefined)
      throw new Error('Trying to take from an empty row');
    setGridData(
      gridData.map((row, currentY) =>
        currentY === y ? [placeable, ...row.slice(0, -1)] : row,
      ),
    );
    setPlaceable(newPlaceable);
  };

  return {
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
  } as const;
};
