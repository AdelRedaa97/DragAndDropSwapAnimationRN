import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { IHeaderProps } from '../definitions/components/header';
import { styles } from '../styles';

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
