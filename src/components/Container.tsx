import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { IContainerProps } from '../definitions/components/container';
import { styles } from '../styles';

const Container = ({ children, style }: IContainerProps): JSX.Element => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar backgroundColor={styles.statusBar.color} barStyle={styles.statusBar.barStyle} />
      {children}
    </SafeAreaView>
  );
};

export default Container;
