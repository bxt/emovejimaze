import './gridTile.css';

export function GridTile({ number }: { number: number }) {
  return (
    <svg class="gridTile" data-number={number} viewBox="0 0 3 3">
      <rect x="0" y="0" width={1} height={1} class="gridTileWall" />
      <rect x="2" y="0" width={1} height={1} class="gridTileWall" />
      <rect x="0" y="2" width={1} height={1} class="gridTileWall" />
      <rect x="2" y="2" width={1} height={1} class="gridTileWall" />
      <rect x="1" y="1" width={1} height={1} class="gridTileFloor" />
      <rect
        x="0"
        y="1"
        width={1}
        height={1}
        class={(number & 1) > 0 ? 'gridTileWall' : 'gridTileFloor'}
      />
      <rect
        x="1"
        y="0"
        width={1}
        height={1}
        class={(number & 2) > 0 ? 'gridTileWall' : 'gridTileFloor'}
      />
      <rect
        x="2"
        y="1"
        width={1}
        height={1}
        class={(number & 4) > 0 ? 'gridTileWall' : 'gridTileFloor'}
      />
      <rect
        x="1"
        y="2"
        width={1}
        height={1}
        class={(number & 8) > 0 ? 'gridTileWall' : 'gridTileFloor'}
      />
    </svg>
  );
}
