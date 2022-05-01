import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import colors from '../config/colors';
import images from '../config/images';
import fonts from '../config/fonts';
import ResponsiveText from '../components/ResponsiveText';

function PlusComponent({disable, percentage, onPressPlus}) {
  return (
    <View style={styles.container}>
      <ResponsiveText style={styles.percentageTextContainer}>
        {percentage ? percentage : 0}
        <ResponsiveText style={styles.percentageText}> %</ResponsiveText>
      </ResponsiveText>
      <TouchableOpacity
        disabled={disable}
        style={styles.imagePlusContainer}
        onPress={onPressPlus}>
        <Image source={images.plus} style={styles.imagePlus} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageTextContainer: {
    marginBottom: wp(2),
    fontFamily: fonts.PoppinsBold,
    fontSize: wp(2.5),
    color: colors.buttonText,
  },
  percentageText: {
    lineHeight: wp(20),
    fontFamily: fonts.PoppinsLight,
    fontSize: wp(2),
    color: colors.buttonText,
  },
  imagePlusContainer: {elevation: wp(1)},
  imagePlus: {width: wp(18), height: wp(18), resizeMode: 'contain'},
});

export default PlusComponent;
