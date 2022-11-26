import { useState } from 'preact/hooks';

const gridWidth = 7;
const gridHeight = 7;
const initialGridData = [
  [3, 3, 2, 10, 2, 10, 6],
  [5, 12, 1, 5, 10, 2, 5],
  [1, 9, 1, 9, 2, 5, 4],
  [5, 10, 9, 4, 8, 12, 5],
  [1, 9, 8, 12, 4, 5, 4],
  [9, 9, 6, 1, 12, 5, 12],
  [9, 8, 8, 12, 8, 10, 12],
];
const initialPlaceable = 6;

const isRowMovable = (y: number): boolean => y % 2 === 1;
const isColMovable = (x: number): boolean => x % 2 === 1;

export const useGrid = () => {
  const [placeable, setPlaceable] = useState(initialPlaceable);
  const [gridData, setGridData] = useState(initialGridData);

  const rotatePlaceable = (): void => {
    setPlaceable((placeable) => (placeable >> 1) | ((placeable & 1) << 3));
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
