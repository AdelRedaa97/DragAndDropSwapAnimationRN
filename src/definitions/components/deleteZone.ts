import { IDraggablePosition } from './draggable';

export interface IDeleteZoneProps {
  movingDraggable: IDraggablePosition;
  releaseDraggable: IDraggablePosition;
  deleteItem: (index: number) => void;
}
