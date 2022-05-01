import React from 'react';
import {SafeAreaView, Image, Dimensions, StatusBar, View} from 'react-native';

function Container(props) {
  const {backgroundImageStyle} = props;
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      {props.backgroundImage && (
        <Image
          source={props.backgroundImage}
          style={[styles.backgroundImage, backgroundImageStyle]}
        />
      )}
      {props.overlay && <View style={styles.overlayStyle} />}
      {props.children}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

export default Container;
