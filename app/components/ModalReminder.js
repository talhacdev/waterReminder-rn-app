import React from 'react';
import {
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';
import fonts from '../config/fonts';

function ModalReminder({
  Noon,
  onPressNoon,
  onPressBottomLeftButton,
  onPressBottomRightButton,
  onChangeTextStartTimeStartTime,
  onChangeTextStartTimeMinute,
  onChangeTextAlertTimeHour,
  onChangeTextAlertTimeMinute,
  startTimeHour,
  startTimeMinute,
  alertTimeHour,
  alertTimeMinute,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <ResponsiveText style={styles.headerText}>
          Set reminder interval
        </ResponsiveText>
      </View>
      <View>
        <View style={styles.sectionDivider}>
          <ResponsiveText>Start time</ResponsiveText>
          <View style={styles.contentContainer}>
            <View style={styles.sectionContainer}>
              <ResponsiveText style={styles.subHeaderText}>Hour</ResponsiveText>
              <TextInput
                value={startTimeHour}
                placeholder={'00'}
                width={wp(20)}
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.textInputleft}
                onChangeText={onChangeTextStartTimeStartTime}
              />
            </View>
            <View style={styles.sectionContainer}>
              <ResponsiveText style={styles.subHeaderText}>
                Minute
              </ResponsiveText>
              <TextInput
                value={startTimeMinute}
                placeholder={'00'}
                width={wp(23)}
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.textInput}
                onChangeText={onChangeTextStartTimeMinute}
              />
            </View>
            <TouchableOpacity onPress={onPressNoon} style={styles.AMContainer}>
              <ResponsiveText style={styles.AMText}>
                {Noon ? 'PM' : 'AM'}
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionDivider}>
          <ResponsiveText>Alert time</ResponsiveText>
          <View style={styles.bottomContentContainer}>
            <View style={styles.sectionContainer}>
              <ResponsiveText style={styles.subHeaderText}>Hour</ResponsiveText>
              <TextInput
                value={alertTimeHour}
                placeholder={'01'}
                width={wp(20)}
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.textInputleft}
                onChangeText={onChangeTextAlertTimeHour}
              />
            </View>
            <View style={styles.sectionContainer}>
              <ResponsiveText style={styles.subHeaderText}>
                Minute
              </ResponsiveText>
              <TextInput
                value={alertTimeMinute}
                placeholder={'00'}
                width={wp(23)}
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.textInput}
                onChangeText={onChangeTextAlertTimeMinute}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <View style={styles.leftButtonContainer}>
          <TouchableOpacity onPress={onPressBottomLeftButton}>
            <View style={styles.buttonContentContainer}>
              <ResponsiveText style={styles.leftButtonText}>
                Cancel
              </ResponsiveText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonContainer}>
          <TouchableNativeFeedback onPress={onPressBottomRightButton}>
            <View style={styles.buttonContentContainer}>
              <ResponsiveText style={styles.rightButtonText}>
                Save
              </ResponsiveText>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    height: hp(56),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
  },
  headerTextContainer: {
    marginTop: wp(6),
    alignItems: 'center',
    marginBottom: wp(8),
  },
  headerText: {fontFamily: fonts.PoppinsMedium},
  sectionDivider: {
    marginVertical: wp(1),
    width: wp(65),
  },
  contentContainer: {
    marginVertical: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionContainer: {
    width: wp(18),
    marginLeft: wp(1),
    marginRight: wp(2),
  },
  subHeaderText: {
    fontSize: wp(0.8),
    color: colors.placeholderText,
  },
  textInputleft: {
    // height: hp(7),
    marginTop: wp(1),
    // fontSize: wp(5),
    fontSize: wp(4.3),
    color: colors.primary,
    fontFamily: fonts.PoppinsRegular,
    paddingLeft: 26,
    borderWidth: wp(0.5),
    borderColor: colors.placeholder,
    borderRadius: wp(2),
  },
  textInput: {
    // height: hp(7),
    marginTop: wp(1),
    // fontSize: wp(5),
    fontSize: wp(4.3),
    color: colors.primary,
    fontFamily: fonts.PoppinsRegular,
    paddingLeft: 30,
    borderWidth: wp(0.5),
    borderColor: colors.placeholder,
    borderRadius: wp(2),
  },
  AMContainer: {
    backgroundColor: colors.AMContainer,
    marginTop: hp(2.5),
    marginHorizontal: wp(6),
    // padding: wp(4),
    padding: wp(3),
    borderRadius: wp(2),
  },
  AMText: {
    fontSize: wp(1.2),
    fontFamily: fonts.PoppinsMedium,
    color: colors.primary,
  },
  bottomContentContainer: {
    marginVertical: wp(2),
    flexDirection: 'row',
  },
  bottomButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtonContainer: {
    alignItems: 'center',
    flex: 0.5,
    borderRadius: wp(8),
    margin: wp(3),
    overflow: 'hidden',
  },
  leftButtonText: {
    color: colors.placeholderText,
  },
  rightButtonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    flex: 0.5,
    borderRadius: wp(8),
    margin: wp(7),
    shadowColor: colors.primary,
    elevation: hp(1),
    overflow: 'hidden',
  },
  rightButtonText: {
    fontFamily: fonts.PoppinsBold,
    color: colors.buttonText,
  },
  buttonContentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalReminder;
