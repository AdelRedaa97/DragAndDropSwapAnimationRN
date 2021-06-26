import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");

export default DeleteZone = ({
  movingDraggable,
  releaseDraggable,
  deleteItem,
}) => {
  const animatedView = useRef();
  const [isMovedOver, setIsMovedOver] = useState(false);

  useEffect(() => {
    animatedView.current.measure((x, y, width, height, pageX, pageY) => {
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
    animatedView.current.measure((x, y, width, height, pageX, pageY) => {
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
    <View
      ref={animatedView}
      style={[
        isMovedOver ? styles.deleteZoneMoveOver : styles.deleteZoneDefault,
        styles.deleteZone,
      ]}
    >
      <Feather name={"trash"} color={"#FFF"} size={46} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  deleteZone: {
    flexDirection: "row",
    width: "100%",
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  deleteZoneMoveOver: {
    backgroundColor: "#CC0C0C",
  },
  deleteZoneDefault: {
    borderTopWidth: 1,
    borderColor: "#FFF",
  },
});
