import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Slider from 'react-native-slider';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';

function GoalSlider({value, setValue}) {
  return (
    <View style={styles.sliderContainer}>
      <View
        style={{
          width: wp(8),
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:
            value == 4
              ? value * wp(0)
              : value == 5
              ? value * wp(1.65)
              : value == 6
              ? value * wp(2.75)
              : value == 7
              ? value * wp(3.5)
              : value == 8
              ? value * wp(4.11)
              : value == 9
              ? value * wp(4.5)
              : value == 10
              ? value * wp(4.89)
              : value == 11
              ? value * wp(5.23)
              : value == 12
              ? value * wp(5.5)
              : value == 13
              ? value * wp(5.69)
              : value == 14
              ? value * wp(5.85)
              : null,
          marginVertical: wp(5),
        }}>
        <Image source={images.glass} style={styles.glassImage} />
        <ResponsiveText style={styles.valueText}>{value}</ResponsiveText>
      </View>
      <Slider
        value={value}
        minimumValue={4}
        maximumValue={14}
        step={1}
        minimumTrackTintColor={colors.slider}
        maximumTrackTintColor={colors.slider}
        thumbTintColor={colors.sliderThumb}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        onValueChange={setValue}
      />
      <View
        style={{
          width: wp(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:
            value == 14
              ? value * wp(5.8)
              : value == 13
              ? value * wp(5.6)
              : value == 12
              ? value * wp(5.4)
              : value == 11
              ? value * wp(5.2)
              : value == 10
              ? value * wp(4.8)
              : value == 9
              ? value * wp(4.4)
              : value == 8
              ? value * wp(4)
              : value == 7
              ? value * wp(3.4)
              : value == 6
              ? value * wp(2.6)
              : value == 5
              ? value * wp(1.5)
              : value == 4
              ? value * wp(-0.2)
              : null,
          marginVertical: wp(5),
        }}>
        {value < 8 ? (
          <View style={styles.bottomButtonContainer}>
            <ResponsiveText style={styles.bottomText}>Good</ResponsiveText>
          </View>
        ) : value >= 8 && value <= 10 ? (
          <View style={styles.bottomButtonContainer}>
            <ResponsiveText style={styles.bottomText}>Perfect</ResponsiveText>
          </View>
        ) : value >= 11 && value <= 14 ? (
          <View style={styles.bottomButtonContainer}>
            <ResponsiveText style={styles.bottomText}>Extreme</ResponsiveText>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: wp(90),
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  glassImage: {
    width: wp(7),
    height: wp(14),
    resizeMode: 'contain',
  },
  valueText: {fontFamily: fonts.PoppinsBold, fontSize: wp(1.2)},
  thumb: {
    borderWidth: wp(0.5),
    borderColor: colors.primary,
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
  },
  track: {height: wp(0.5)},
  bottomButtonContainer: {
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: wp(0.85),
    color: colors.sliderBottomText,
  },
});

export default GoalSlider;
