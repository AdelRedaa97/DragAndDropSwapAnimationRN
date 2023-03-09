import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { IDeleteZoneProps } from '../definitions/components/deleteZone';
import { styles } from '../styles';
const { width, height } = Dimensions.get('window');

const DeleteZone = ({ movingDraggable, releaseDraggable, deleteItem }: IDeleteZoneProps): JSX.Element => {
  const animatedView = useRef<View | null>(null);
  const [isMovedOver, setIsMovedOver] = useState(false);

  useEffect(() => {
    animatedView?.current?.measure((x, y, width, height, pageX, pageY) => {
      if (
        movingDraggable &&
        movingDraggable.pageX > pageX &&
        movingDraggable.pageX < pageX + width &&
        movingDraggable.pageY > pageY &&
        movingDraggable.pageY < pageY + height
      ) {
        // console.log("he is over me ", index)
        setIsMovedOver(true);
      } else {
        setIsMovedOver(false);
      }
    });
  }, [movingDraggable]);

  useEffect(() => {
    animatedView?.current?.measure((x, y, width, height, pageX, pageY) => {
      if (
        releaseDraggable &&
        releaseDraggable.pageX > pageX &&
        releaseDraggable.pageX < pageX + width &&
        releaseDraggable.pageY > pageY &&
        releaseDraggable.pageY < pageY + height
      ) {
        // console.log("he is dragged over me ", index, releaseDraggable.index)
        deleteItem(releaseDraggable.index);
      } else {
        // do nothing
      }
    });
  }, [releaseDraggable]);

  return (
    <View ref={animatedView} style={{ ...styles.deleteZone, ...(isMovedOver && styles.deleteZoneMoveOver) }}>
      <Image source={require('./../assets/delete.png')} style={{ ...styles.deleteZoneIcon }} />
    </View>
  );
};

export default DeleteZone;
