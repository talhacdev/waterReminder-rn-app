import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fonts from '../config/fonts';
import colors from '../config/colors';
import images from '../config/images';
import ResponsiveText from '../components/ResponsiveText';
import BottomButton from './BottomButton';

function ModalOne({
  onPressCross,
  onPressBottomLeftButton,
  onPressBottomRightButton,
  onPressMiddleLeftButton,
  onPressMiddleRightButton,
  isMaleSelected,
  isFemaleSelected,
  dropDown,
  dropdownToggle,
  selected,
  OnPressKgSelected,
  OnPressPoundsSelected,
  weight,
  onChangeWeight,
}) {
  return (
    <View style={styles.internalContainer}>
      {dropDown ? (
        <View
          style={{
            zIndex: 9000,
            backgroundColor: colors.background,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            left: wp(50),
            top: wp(42),
            marginTop: wp(12),
            borderBottomEndRadius: wp(2),
            borderBottomLeftRadius: wp(2),
            elevation: wp(1),
          }}>
          <TouchableOpacity
            onPress={OnPressKgSelected}
            style={{
              justifyContent: 'center',
              height: hp(7),
              paddingLeft: wp(5),
              width: wp(30),
            }}>
            <ResponsiveText
              style={{
                fontFamily: fonts.PoppinsMedium,
                color: selected == 'Kg' ? colors.disabled : 'black',
              }}>
              Kg
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={OnPressPoundsSelected}
            style={{
              borderTopWidth: wp(0.5),
              borderColor: colors.placeholder,
              justifyContent: 'center',
              height: hp(7),
              paddingLeft: wp(5),
              width: wp(30),
            }}>
            <ResponsiveText
              style={{
                fontFamily: fonts.PoppinsMedium,
                color: selected == 'Lb' ? colors.disabled : 'black',
              }}>
              Lb
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      ) : null}
      <TouchableOpacity onPress={onPressCross} style={styles.redCrossContainer}>
        <Image source={images.cross} style={styles.imageCross} />
      </TouchableOpacity>

      <View style={styles.headerTextContainer}>
        <ResponsiveText>Can you please help us with some</ResponsiveText>
        <ResponsiveText>information to customise experience</ResponsiveText>
        <ResponsiveText>for you?</ResponsiveText>
      </View>
      <View style={styles.subHeaderTopContainer}>
        <ResponsiveText style={styles.subHeaderTopText}>
          What is your weight?
        </ResponsiveText>

        <View>
          <View style={styles.internalInputDropdownContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                value={weight}
                onChangeText={val => onChangeWeight(val)}
                placeholder={selected.toLowerCase() == 'kg' ? '70' : '155'}
                keyboardType={'numeric'}
                style={styles.inputText}
                maxLength={3}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <ResponsiveText style={styles.dropdownText}>
                {selected}
              </ResponsiveText>
              <TouchableOpacity
                onPress={dropdownToggle}
                style={styles.dropdownImageContainer}>
                <Image
                  source={images.chevronDown}
                  style={styles.dropdownImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.genderContainer}>
        <ResponsiveText style={styles.genderText}>Gender</ResponsiveText>
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            onPress={onPressMiddleLeftButton}
            style={styles.leftSelectionContainer}>
            <View
              style={{
                backgroundColor: isMaleSelected
                  ? colors.primary
                  : colors.placeholderText,
                padding: wp(3),
                borderRadius: wp(6),
              }}>
              <Image source={images.maleAvatar} style={styles.maleImage} />
            </View>

            <ResponsiveText
              style={{
                color: isMaleSelected ? colors.primary : colors.placeholderText,
                paddingHorizontal: wp(2),
              }}>
              Male
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressMiddleRightButton}
            style={styles.rightSelectionContainer}>
            <View
              style={{
                padding: wp(3),
                borderRadius: wp(6),
                backgroundColor: isFemaleSelected
                  ? colors.primary
                  : colors.placeholderText,
              }}>
              <Image source={images.womenAvatar} style={styles.womenImage} />
            </View>
            <ResponsiveText
              style={{
                color: isFemaleSelected
                  ? colors.primary
                  : colors.placeholderText,
                paddingHorizontal: wp(2),
              }}>
              Female
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.leftButtonContainer}
          onPress={onPressBottomLeftButton}>
          <ResponsiveText style={styles.leftButtonText}>Cancel</ResponsiveText>
        </TouchableOpacity>
        <View style={styles.rightBottomButtonContainer}>
          <BottomButton
            buttonWidth={wp(34)}
            title={'Calculate'}
            noRightIcon
            onPress={onPressBottomRightButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  internalContainer: {
    backgroundColor: colors.background,
    width: wp(85),
    //  height: hp(65)
    height: hp(60),
    borderRadius: wp(3),
    paddingTop: wp(5),
    paddingHorizontal: wp(5),
  },
  redCrossContainer: {
    backgroundColor: colors.crossBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: wp(-5),
    top: wp(-4),
    width: wp(10),
    height: wp(10),
    padding: wp(2.5),
    borderRadius: wp(5),
  },
  imageCross: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
  },
  headerTextContainer: {
    // marginTop: wp(4),
    marginTop: wp(2),
    marginBottom: wp(8),
  },
  subHeaderTopContainer: {
    justifyContent: 'center',
    marginBottom: wp(8),
  },
  subHeaderTopText: {fontFamily: fonts.PoppinsMedium, marginBottom: wp(3)},
  internalInputDropdownContainer: {
    flexDirection: 'row',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: colors.placeholderText,
  },
  inputContainer: {
    flex: 0.7,
  },
  inputText: {
    paddingHorizontal: wp(3),
    color: 'black',
  },
  dropdownContainer: {
    flex: 0.3,
    borderLeftWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderLeftColor: colors.placeholderText,
    paddingHorizontal: wp(5),
    backgroundColor: colors.placeholder,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  dropdownText: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.primary,
    fontSize: wp(0.9),
  },
  dropdownImage: {
    width: wp(3),
    height: wp(5),
    resizeMode: 'contain',
  },
  genderContainer: {
    marginBottom: wp(4),
  },
  genderText: {
    fontFamily: fonts.PoppinsMedium,
    marginBottom: wp(6),
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  maleImage: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  rightSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(7),
  },
  womenImage: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  bottomButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButtonContainer: {
    alignItems: 'center',
    paddingVertical: wp(3),
    flex: 0.5,
    borderRadius: wp(8),
    marginRight: wp(3),
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

export default ModalOne;
