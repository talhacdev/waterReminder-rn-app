import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import images from '../config/images';
import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';

function HeaderSubText({
  ImageCheck,
  titleText,
  titleTextRight,
  subTextTop,
  subTextBottom,
}) {
  return (
    <View style={styles.headerContainer}>
      {ImageCheck ? (
        <Image source={images.cloudMasked} style={styles.cloudMasked} />
      ) : null}
      {titleText ? (
        <ResponsiveText style={styles.titleText}>
          {titleText} <Text style={styles.goalText}>{titleTextRight}</Text>
        </ResponsiveText>
      ) : null}
      {subTextTop ? (
        <ResponsiveText style={styles.subText}>{subTextTop}</ResponsiveText>
      ) : null}
      {subTextBottom ? (
        <ResponsiveText style={styles.subText}>{subTextBottom}</ResponsiveText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  cloudMasked: {
    width: wp(100),
    height: hp(20),
  },
  titleText: {
    fontFamily: fonts.PoppinsLight,
    marginTop: wp(-2),
    fontSize: wp(1.8),
    marginBottom: wp(3),
  },
  goalText: {
    fontFamily: fonts.PoppinsBold,
  },
  subText: {
    fontFamily: fonts.PoppinsRegular,
    color: colors.subText,
    marginTop: 1,
  },
});

export default HeaderSubText;
