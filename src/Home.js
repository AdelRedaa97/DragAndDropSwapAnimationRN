import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Feather from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");

import Draggable from "./Draggable";
import DeleteZone from "./DeleteZone";

const circleSize = width - 36;
const itemSize = width / 5;
const radius = circleSize / 2 - itemSize / 2;
const center = radius;

const App = ({ navigation, route }) => {
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setMovingDraggable(null);
    setReleaseDraggable(null);
    return () => {};
  }, [items]);

  const pickImageFromPhone = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // setProcessing(false)
        console.log("User cancelled image picker");
      } else if (response.error) {
        // setProcessing(false)
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // setProcessing(false)
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = {
          uri:
            Platform.OS === "android"
              ? response.uri
              : response.uri.replace("file://", ""),
          fileName: response.fileName,
        };
        var arr = [...items];
        arr.push(source.uri);
        setItems(arr);
      }
    });
  };

  const degToRad = (deg) => {
    return (deg * Math.PI) / 180;
  };

  const setup = (index) => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radius * Math.cos(angleRad) + center;
    const y = radius * Math.sin(angleRad) + center;
    return { x, y };
  };

  const onMovingDraggable = (movingDraggable) => {
    setMovingDraggable(movingDraggable);
  };

  const onReleaseDraggable = (releaseDraggable) => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggable);
  };

  const swap = (index1, index2) => {
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    setItems(arr);
  };

  const deleteItem = (index) => {
    var arr = [...items];
    arr.splice(index, 1);
    setItems(arr);
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            pickImageFromPhone();
          }}
        >
          <Feather name="plus" color={"#20232A"} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderLessthan10 = () => {
    return (
      <View style={styles.lessThan10Container}>
        <DeleteZone
          movingDraggable={movingDraggable}
          releaseDraggable={releaseDraggable}
          deleteItem={deleteItem}
        />
        <View style={styles.circleViewContainer}>
          <View style={[styles.shadow, styles.centerCircle]}>
            <Text allowFontScaling={false} style={styles.centerCircleTxt}>
              {"My\nFriends"}
            </Text>
          </View>
          {items.map((item, index) => {
            const { x, y } = setup(index);
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
                  position: "absolute",
                  left: x,
                  top: y,
                }}
                renderChild={(isMovedOver) => {
                  return (
                    <View
                      style={[
                        isMovedOver && styles.lessThan10ItemMovedOver,
                        styles.lessThan10Item,
                      ]}
                    >
                      <Image source={{ uri: item }} style={styles.img} />
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

  const render10AndMore = () => {
    return (
      <View style={styles.moreThan10Container}>
        <DeleteZone
          movingDraggable={movingDraggable}
          releaseDraggable={releaseDraggable}
          deleteItem={deleteItem}
        />
        <View style={[styles.shadow, styles.myFriendsRecView]}>
          <Text allowFontScaling={false} style={styles.myFriendsRecViewTxt}>
            {"My\nFriends"}
          </Text>
        </View>
        <View style={styles.squaresViewContainer}>
          {items.map((item, index) => {
            const { x, y } = setup(index);
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                // position={{
                //    position: 'absolute',
                //    left: x,
                //    top: y,
                // }}
                renderChild={(isMovedOver) => {
                  return (
                    <View
                      style={[
                        isMovedOver && styles.moreThan10ItemMovedOver,
                        styles.moreThan10Item,
                      ]}
                    >
                      <Image source={{ uri: item }} style={styles.img} />
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
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={"#20232A"} barStyle="light-content" />
      <View style={styles.viewContainer}>
        {renderHeader()}
        <ScrollView
          scrollEnabled={!movingDraggable}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollView}
        >
          {items.length < 10 ? renderLessthan10() : render10AndMore()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

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
  safeAreaView: {
    flex: 1,
    backgroundColor: "#20232A",
  },
  viewContainer: {
    flex: 1,
    width,
    backgroundColor: "#20232A",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 18,
  },
  header: {
    width,
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff4c6f",
    alignItems: "center",
    justifyContent: "center",
  },
  lessThan10Container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  circleViewContainer: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  centerCircle: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 1.5,
    backgroundColor: "#ff4c6f",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  centerCircleTxt: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  lessThan10Item: {
    width: itemSize,
    height: itemSize,
    borderRadius: itemSize / 2,
    overflow: "hidden",
  },
  lessThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: "#FEDC33",
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  moreThan10Container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  myFriendsRecView: {
    width: "90%",
    height: width / 3,
    borderRadius: 12,
    backgroundColor: "#ff4c6f",
    justifyContent: "center",
    alignItems: "center",
  },
  myFriendsRecViewTxt: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  squaresViewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 16,
  },
  moreThan10Item: {
    width: itemSize,
    height: itemSize,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
  },
  moreThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: "#FEDC33",
  },
});
