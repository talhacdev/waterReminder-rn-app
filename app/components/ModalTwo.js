import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';
import ResponsiveText from '../components/ResponsiveText';
import BottomButton from './BottomButton';

function ModalTwo({advised, onPressLeftButton, onPressRightButton}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <ResponsiveText>We suggest you to drink water</ResponsiveText>
      </View>
      <View style={styles.midContainer}>
        <ResponsiveText style={styles.goalInteger}>{advised}</ResponsiveText>
        <View style={styles.glassTextContainer}>
          <ResponsiveText>Glass</ResponsiveText>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.leftButtonContainer}
          onPress={onPressLeftButton}>
          <ResponsiveText style={styles.leftButtonText}>Cancel</ResponsiveText>
        </TouchableOpacity>
        <View style={styles.rightBottomButtonContainer}>
          <BottomButton
            title={'Apply'}
            noRightIcon
            onPress={onPressRightButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: wp(85),
    height: hp(50),
    borderRadius: wp(3),
    paddingTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingVertical: wp(2),
    marginTop: wp(5),
  },
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalInteger: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.PoppinsMedium,
    fontSize: wp(5),
    lineHeight: wp(25),
  },
  glassTextContainer: {
    height: hp(3),
    marginTop: hp(-2),
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButtonContainer: {
    alignItems: 'center',
    paddingVertical: wp(3),
    flex: 0.5,
    borderRadius: wp(8),
    margin: wp(3),
  },
  leftButtonText: {
    color: colors.placeholderText,
  },
  rightButtonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: wp(3),
    flex: 0.5,
    borderRadius: wp(8),
    margin: wp(7),
  },
  rightButtonText: {
    fontFamily: fonts.PoppinsBold,
    color: colors.buttonText,
  },
  rightBottomButtonContainer: {
    alignItems: 'center',
    flex: 0.5,
    margin: wp(7),
  },
});

export default ModalTwo;
