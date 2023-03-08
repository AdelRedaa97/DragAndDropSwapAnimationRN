import { ViewStyle } from 'react-native/types';

export interface IDraggableProps {
  index: number;
  position?: IDraggablePositionStyle;
  movingDraggable: IDraggablePosition;
  onMovingDraggable: (movingDraggablePosition: IDraggablePosition) => void;
  releaseDraggable: IDraggablePosition;
  onReleaseDraggable: (releaseDraggableP: IDraggablePosition) => void;
  swap: (index1: number, index2: number) => void;
  renderChild: (isMovedOver: boolean) => React.ReactNode;
}

export type IDraggablePosition = {
  index: number;
  pageX: number;
  pageY: number;
} | null;

export type IDraggablePositionStyle = ViewStyle | null | undefined;
