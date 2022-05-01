import React from 'react';
import {Image, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';
import fonts from '../config/fonts';
import images from '../config/images';
import ResponsiveText from '../components/ResponsiveText';

function BottomButton({title, onPress, buttonWidth, noRightIcon}) {
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        width: buttonWidth ? buttonWidth : wp(30),
        height: wp(12),
        borderRadius: wp(6),
        shadowColor: colors.primary,
        elevation: hp(1),
        overflow: 'hidden',
      }}>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: noRightIcon ? 'center' : 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(5),
          }}>
          <ResponsiveText numberOfLines={1} style={styles.buttonText}>
            {title}
          </ResponsiveText>
          {noRightIcon ? null : (
            <Image source={images.arrowRight} style={styles.imageArrowRight} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  // buttonContainer: {
  //   backgroundColor: colors.primary,
  //   width: wp(35),
  //   height: wp(12),
  //   borderRadius: wp(6),
  //   shadowColor: colors.primary,
  //   elevation: hp(1),
  //   overflow: 'hidden',
  // },
  buttonText: {
    fontFamily: fonts.PoppinsBold,
    color: colors.buttonText,
  },
  imageArrowRight: {
    width: wp(3.5),
    height: wp(5),
    resizeMode: 'contain',
  },
});

export default BottomButton;
