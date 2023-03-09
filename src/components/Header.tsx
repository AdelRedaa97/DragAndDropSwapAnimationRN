import React from 'react';
import { View, Text, Pressable, GestureResponderEvent } from 'react-native';
import { styles } from '../styles';

interface IHeaderProps {
  style?: object[];
  onPressAddItem?: (event: GestureResponderEvent) => void;
}

const Header = ({ style, onPressAddItem = () => {} }: IHeaderProps): JSX.Element => {
  return (
    <View style={[styles.headerStyle, style]}>
      <Pressable onPress={onPressAddItem} style={styles.headerAddIconBtn}>
        <Text allowFontScaling={false} style={styles.headerAddIconTxt}>
          {'+'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;
