import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Animated, PanResponder, View } from 'react-native';
import { IDraggableProps } from '../definitions/components/draggable';

const Draggable = ({
  index,
  position,
  movingDraggable,
  onMovingDraggable,
  releaseDraggable,
  onReleaseDraggable,
  swap,
  renderChild,
}: IDraggableProps): JSX.Element => {
  const animatedView = useRef<View>();
  const [zIndex, setZIndex] = useState(0);
  const [isMovedOver, setIsMovedOver] = useState(false);

  useEffect(() => {
    animatedView?.current?.measure((x, y, width, height, pageX, pageY) => {
      if (
        movingDraggable &&
        movingDraggable.index != index &&
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
        releaseDraggable.index != index &&
        releaseDraggable.pageX > pageX &&
        releaseDraggable.pageX < pageX + width &&
        releaseDraggable.pageY > pageY &&
        releaseDraggable.pageY < pageY + height
      ) {
        // console.log("he is dragged over me ", index, releaseDraggable.index)
        swap(index, releaseDraggable.index);
      } else {
        // do nothing
      }
    });
  }, [releaseDraggable]);

  const pan = useRef<any>(new Animated.ValueXY());
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
          /* some action */
          setZIndex(1);
          /* * * * * * * */
          pan.current.setOffset({
            x: pan.current.x._value,
            y: pan.current.y._value,
          });
          pan.current.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event([null, { dx: pan.current.x, dy: pan.current.y }], {
          useNativeDriver: false,
          listener: (evt: any) => {
            const { pageX, pageY } = evt.nativeEvent;
            // console.log("Moving ", index, " - ", pageX, pageY)
            onMovingDraggable({ index, pageX, pageY });
          },
        }),
        onPanResponderRelease: (evt, gestureState) => {
          /* some action */
          setZIndex(0);
          const { pageX, pageY } = evt.nativeEvent;
          // console.log("Released ", index, " - ", pageX, pageY)
          onReleaseDraggable({ index, pageX, pageY });
          /* * * * * * * */
          if (true) {
            Animated.spring(pan.current, {
              toValue: {
                x: 0 - pan.current.x._offset,
                y: 0 - pan.current.y._offset,
              },
              useNativeDriver: false,
            }).start(() => {
              pan.current.setValue({ x: 0, y: 0 });
              pan.current.setOffset({ x: 0, y: 0 });
            });
          } else {
            pan.current.flattenOffset();
          }
        },
      }),
    [],
  );

  const panStyle = { transform: pan.current.getTranslateTransform() };
  return (
    <Animated.View
      {...panResponder.panHandlers}
      ref={animatedView}
      style={{ ...panStyle, ...position, ...{ zIndex: zIndex } }}>
      {renderChild(isMovedOver)}
    </Animated.View>
  );
};

export default Draggable;
