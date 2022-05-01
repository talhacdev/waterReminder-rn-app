import React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';

import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';
import images from '../config/images';

function HeaderSwitch({
  date,
  onPressArrowBack,
  switchCheck,
  calendarCheck,
  toggleSwitch,
  onToggle,
  calendarOnPress,
  menu,
  onPressMenu,
  onPressStatistics,
}) {
  return (
    <View style={styles.headerContainer}>
      {!menu ? (
        <TouchableOpacity
          style={styles.imageHeaderContainer}
          onPress={onPressArrowBack}>
          <Image source={images.arrowBack} style={styles.imageArrowBack} />
        </TouchableOpacity>
      ) : null}
      {switchCheck ? (
        <ToggleSwitch
          isOn={toggleSwitch}
          onColor={colors.switchOn}
          thumbOnStyle={styles.thumbOnStyle}
          thumbOffStyle={styles.thumbOffStyle}
          size="small"
          onToggle={onToggle}
        />
      ) : null}
      {calendarCheck ? (
        <TouchableOpacity
          onPress={calendarOnPress}
          style={styles.calendarContainer}>
          <View style={styles.imageCalendarContainer}>
            <Image source={images.calendar} style={styles.imageCalendar} />
          </View>
          <View>
            <ResponsiveText style={styles.calendarText}>
              {date ? date : '09 Sep, 2021'}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
      ) : null}
      {menu ? (
        <View style={styles.headerContainerMenu}>
          <TouchableOpacity
            onPress={onPressMenu}
            style={styles.imageMenuContainer}>
            <Image source={images.menu} style={styles.imageMenu} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressStatistics}
            style={styles.statisticsContainer}>
            <ResponsiveText style={styles.statisticsText}>
              Statistics
            </ResponsiveText>
            <Image source={images.arrowsRight} style={styles.imageArrowRight} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: hp(1),
    flexDirection: 'row',
    width: wp(100),
    justifyContent: 'space-between',
    marginTop: wp(10),
    paddingHorizontal: wp(5),
  },
  imageHeaderContainer: {
    backgroundColor: colors.placeholder,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageArrowBack: {width: wp(5), height: wp(5), resizeMode: 'contain'},
  thumbOnStyle: {
    backgroundColor: colors.primary,
  },
  thumbOffStyle: {
    backgroundColor: colors.placeholder,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCalendarContainer: {marginHorizontal: wp(2)},
  imageCalendar: {width: wp(4), height: wp(4)},
  calendarText: {fontSize: wp(0.9)},
  headerContainerMenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  imageMenuContainer: {
    backgroundColor: colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
    borderRadius: wp(5),
  },
  imageMenu: {width: wp(4.5), height: wp(5), resizeMode: 'contain'},
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.placeholder,
    padding: wp(2),
    borderRadius: wp(2),
  },
  statisticsText: {fontSize: wp(0.8)},
  imageArrowRight: {width: wp(7), height: wp(5), resizeMode: 'contain'},
});

export default HeaderSwitch;
