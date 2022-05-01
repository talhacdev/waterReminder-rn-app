import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../config/colors';
import ResponsiveText from '../components/ResponsiveText';
import images from '../config/images';

function StatisticsComponent({timeslot, backgroundColor}) {
  return (
    <View style={styles.container}>
      <View style={styles.internalViewContainer}>
        <View style={styles.circle} />
        <View style={styles.bar} />
      </View>
      <View style={styles.viewContainer}>
        <View
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.componentBackground1,
            width: wp(80),
            paddingVertical: wp(3),
            borderRadius: wp(3),
          }}>
          <View style={styles.rowContainer}>
            <View style={styles.marginContainer}>
              <Image source={images.clock} style={styles.imageClock} />
            </View>
            <View>
              <ResponsiveText>
                {timeslot ? timeslot : 'timeslot'}
              </ResponsiveText>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.marginContainer}>
              <Image source={images.glass} style={styles.imageGlass} />
            </View>
            <View>
              <ResponsiveText style={styles.glassText}>Glass</ResponsiveText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(6),
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  internalViewContainer: {
    paddingRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: colors.statCSides,
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
  },
  bar: {
    height: '85%',
    width: wp(0.5),
    backgroundColor: colors.statCSides,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  marginContainer: {marginHorizontal: wp(3)},
  imageClock: {width: wp(4), height: wp(4), resizeMode: 'contain'},
  imageGlass: {width: wp(4), height: wp(4), resizeMode: 'contain'},
  glassText: {color: colors.primary},
});

export default StatisticsComponent;
