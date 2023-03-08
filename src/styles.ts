import { StatusBarStyle, StyleSheet, Dimensions } from 'react-native';
import { circularListContainerDimentions, itemSize } from './Home';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#20232A',
  },
  statusBar: {
    color: '#20232A',
    barStyle: <StatusBarStyle>'light-content',
  },
  headerStyle: {
    width: width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
  },
  headerAddIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF4C6F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAddIconTxt: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  homeScrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 18,
  },
  circleRootContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.2,
  },
  circularListContainer: {
    width: circularListContainerDimentions,
    height: circularListContainerDimentions,
    borderRadius: circularListContainerDimentions / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularListMyFriendsView: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 1.5,
    backgroundColor: '#FF4C6F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  myFriendsTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  circularListItem: {
    backgroundColor: '#FFFFFF',
    width: itemSize,
    height: itemSize,
    borderRadius: itemSize / 2,
    overflow: 'hidden',
  },
  circularListItemMovedOver: {
    borderWidth: 6,
    borderColor: '#FEDC33',
  },
  imageCover: {
    flex: 1,
    resizeMode: 'cover',
  },
  gridRootContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: height * 0.2,
  },
  gridMyFriendsView: {
    width: '90%',
    height: width / 3,
    borderRadius: 12,
    backgroundColor: '#FF4C6F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridListContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 16,
  },
  gridListItem: {
    backgroundColor: '#FFFFFF',
    width: itemSize,
    height: itemSize,
    borderRadius: 8,
    margin: 6,
    overflow: 'hidden',
  },
  gridListItemMovedOver: {
    borderWidth: 6,
    borderColor: '#FEDC33',
  },
  deleteZone: {
    flexDirection: 'row',
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#FFFFFF',
  },
  deleteZoneMoveOver: {
    backgroundColor: '#CC0C0C',
  },
  deleteZoneIcon: {
    height: height * 0.06,
    width: height * 0.06,
    resizeMode: 'contain',
  },
});
