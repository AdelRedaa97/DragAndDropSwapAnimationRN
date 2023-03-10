import { GestureResponderEvent } from 'react-native/types';

export interface IHeaderProps {
  style?: object[];
  onPressAddItem?: (event: GestureResponderEvent) => void;
}
