import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
const { width } = Dimensions.get('window');

import Draggable from './components/Draggable';
import DeleteZone from './components/DeleteZone';
import Container from './components/Container';
import Header from './components/Header';
import { styles } from './styles';
import { openPicker } from './libs/imageCropPicker';
import { IDraggablePosition } from './definitions/components/draggable';

export const circularListContainerDimentions = width - 36;
export const itemSize = width / 5;
const radiusLength = circularListContainerDimentions / 2 - itemSize / 2;
const center = radiusLength;

const App = () => {
  const [movingDraggable, setMovingDraggable] = useState<IDraggablePosition>(null);
  const [releaseDraggable, setReleaseDraggable] = useState<IDraggablePosition>(null);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setMovingDraggable(null);
    setReleaseDraggable(null);
    return () => {};
  }, [JSON.stringify(items)]);

  const pickImage = () => {
    openPicker({ cropping: false }, response => {
      var arr: string[] = [...items];
      arr.push(response.path);
      setItems(arr);
    });
  };

  const degToRad = (deg: number) => {
    return (deg * Math.PI) / 180;
  };

  const getItemPosition = (index: number) => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radiusLength * Math.cos(angleRad) + center;
    const y = radiusLength * Math.sin(angleRad) + center;
    return { x, y };
  };

  const onMovingDraggable = (movingDraggableP: IDraggablePosition) => {
    setMovingDraggable(movingDraggableP);
  };

  const onReleaseDraggable = (releaseDraggableP: IDraggablePosition) => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggableP);
  };

  const swap = (index1: number, index2: number) => {
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    setItems(arr);
  };

  const deleteItem = (index: number) => {
    var arr = [...items];
    arr.splice(index, 1);
    setItems(arr);
  };

  const circularList = () => {
    return (
      <View style={styles.circleRootContainer}>
        <DeleteZone movingDraggable={movingDraggable} releaseDraggable={releaseDraggable} deleteItem={deleteItem} />
        <View style={styles.circularListContainer}>
          {/** My Friends Centered Circle */}
          <View style={{ ...styles.circularListMyFriendsView, ...styles.shadow }}>
            <Text allowFontScaling={false} style={styles.myFriendsTxt}>
              {'My\nFriends'}
            </Text>
          </View>
          {/** ************************ **/}
          {items.map((item, index) => {
            const { x, y } = getItemPosition(index);
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                position={{
                  position: 'absolute',
                  left: x,
                  top: y,
                }}
                renderChild={isMovedOver => {
                  return (
                    <View
                      style={{
                        ...styles.circularListItem,
                        ...(isMovedOver && styles.circularListItemMovedOver),
                        ...styles.shadow,
                      }}>
                      <Image source={{ uri: item }} style={styles.imageCover} />
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const gridList = () => {
    return (
      <View style={styles.gridRootContainer}>
        <DeleteZone movingDraggable={movingDraggable} releaseDraggable={releaseDraggable} deleteItem={deleteItem} />
        {/** My Friends View */}
        <View style={{ ...styles.gridMyFriendsView, ...styles.shadow }}>
          <Text allowFontScaling={false} style={styles.myFriendsTxt}>
            {'My\nFriends'}
          </Text>
        </View>
        {/** ************************ **/}
        <View style={styles.gridListContainer}>
          {items.map((item, index) => {
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                renderChild={isMovedOver => {
                  return (
                    <View
                      style={{
                        ...styles.gridListItem,
                        ...(isMovedOver && styles.gridListItemMovedOver),
                        ...styles.shadow,
                      }}>
                      <Image source={{ uri: item }} style={styles.imageCover} />
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Container>
      <Header onPressAddItem={pickImage} />
      <ScrollView
        scrollEnabled={!movingDraggable}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.homeScrollView}>
        {items.length < 10 ? circularList() : gridList()}
      </ScrollView>
    </Container>
  );
};

export default App;
