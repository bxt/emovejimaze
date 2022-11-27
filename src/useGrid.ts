import { useMemo, useState } from 'preact/hooks';

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

type Moving = 'player' | 'grid';

const isRowMovable = (y: number): boolean => y % 2 === 1;
const isColMovable = (x: number): boolean => x % 2 === 1;

const offsets = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
];

const isInsideGrid = ({ x, y }: { x: number; y: number }) =>
  x >= 0 && y >= 0 && x < gridWidth && y < gridHeight;

export const useGrid = () => {
  const [placeable, setPlaceable] = useState(initialPlaceable);
  const [gridData, setGridData] = useState(initialGridData);
  const [player, setPlayer] = useState({ x: 0, y: 0, target: '🏺', score: 0 });
  const [moving, setMoving] = useState<Moving>('grid');

  const pickTarget = () => {
    const allTargets = gridData
      .flatMap((row) => row.map((e) => e.target))
      .filter((x): x is string => !!x);
    const availableTargets = allTargets.filter(
      (target) => target !== player.target,
    );
    return availableTargets[
      Math.floor(Math.random() * availableTargets.length)
    ];
  };

  const playerReachableFields = useMemo(() => {
    const reachable = new Set<string>();
    const toCheck = [{ x: player.x, y: player.y }];

    while (toCheck.length > 0) {
      const check = toCheck.pop();
      if (check === undefined) throw new Error('Popping from an empty stack!?');

      const checkString = `${check.x}-${check.y}`;
      if (!reachable.has(checkString)) {
        reachable.add(checkString);

        const number = gridData[check.y][check.x].number;

        offsets.forEach(({ x, y }, i) => {
          const neighbor = { x: check.x + x, y: check.y + y };

          if (((number >> i) & 1) === 0 && isInsideGrid(neighbor)) {
            const neighborNumber = gridData[neighbor.y][neighbor.x].number;
            if (((neighborNumber >> (i + 2) % 4) & 1) === 0) {
              toCheck.push(neighbor);
            }
          }
        });
      }
    }

    return reachable;
  }, [player, gridData]);

  const isRowMovableLeft = (y: number): boolean =>
    moving === 'grid' && isRowMovable(y);
  const isRowMovableRight = (y: number): boolean =>
    moving === 'grid' && isRowMovable(y);
  const isColMovableUp = (x: number): boolean =>
    moving === 'grid' && isColMovable(x);
  const isColMovableDown = (x: number): boolean =>
    moving === 'grid' && isColMovable(x);

  const isPlaceableRotatable = (): boolean => moving === 'grid';

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

    if (player.x === x) {
      setPlayer((player) => ({
        ...player,
        y: (player.y - 1 + gridHeight) % gridHeight,
      }));
    }

    setMoving('player');
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

    if (player.x === x) {
      setPlayer((player) => ({
        ...player,
        y: (player.y + 1) % gridHeight,
      }));
    }

    setMoving('player');
  };

  const moveRowLeft = (y: number): void => {
    const newPlaceable = gridData[y][0];
    setGridData(
      gridData.map((row, currentY) =>
        currentY === y ? [...row.slice(1), placeable] : row,
      ),
    );
    setPlaceable(newPlaceable);

    if (player.y === y) {
      setPlayer((player) => ({
        ...player,
        x: (player.x - 1 + gridWidth) % gridWidth,
      }));
    }

    setMoving('player');
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

    if (player.y === y) {
      setPlayer((player) => ({
        ...player,
        x: (player.x + 1) % gridWidth,
      }));
    }

    setMoving('player');
  };

  const isPlayerMovableTo = ({ x, y }: { x: number; y: number }): boolean =>
    moving === 'player' && playerReachableFields.has(`${x}-${y}`);

  const movePlayerTo = ({ x, y }: { x: number; y: number }): void => {
    setPlayer((player) => ({ ...player, x, y }));

    if (player.target === gridData[y][x].target) {
      setPlayer((player) => ({
        ...player,
        score: player.score + 1,
        target: pickTarget(),
      }));
    }

    setMoving('grid');
  };

  return {
    gridWidth,
    gridHeight,
    isRowMovable,
    isColMovable,
    placeable,
    gridData,
    rotatePlaceable,
    isPlaceableRotatable,
    moveColUp,
    moveColDown,
    moveRowLeft,
    moveRowRight,
    isRowMovableLeft,
    isRowMovableRight,
    isColMovableUp,
    isColMovableDown,
    player,
    isPlayerMovableTo,
    movePlayerTo,
  } as const;
};
