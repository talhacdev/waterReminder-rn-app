import React from 'react';
import {View, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import colors from '../config/colors';
import fonts from '../config/fonts';
import ResponsiveText from '../components/ResponsiveText';

function VisualizerHome({leftTitle, rightTitle, bottomTitle, percentage}) {
  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <ResponsiveText style={styles.leftTitleText}>
          {leftTitle ? leftTitle : 0}
        </ResponsiveText>
        <View style={styles.middleTextContainer}>
          <ResponsiveText
            style={{
              color: percentage >= 90 ? colors.buttonText : colors.quadText,
              fontSize: wp(0.75),
              lineHeight: wp(3),
            }}>
            OUT{'\n' + ' '}OF
          </ResponsiveText>
        </View>
        <ResponsiveText
          style={{
            fontFamily: fonts.PoppinsMedium,
            lineHeight: wp(20),
            fontSize: wp(4.5),
            color: percentage >= 90 ? colors.buttonText : colors.tertiaryText,
          }}>
          {rightTitle ? rightTitle : 0}
        </ResponsiveText>
      </View>
      {percentage < 100 ? (
        <View>
          <ResponsiveText
            style={{
              color:
                percentage >= 85 ? colors.buttonText : colors.placeholderText,
            }}>
            JUST {bottomTitle ? bottomTitle : 0} GLASSES TO GO
          </ResponsiveText>
        </View>
      ) : (
        <View>
          <ResponsiveText
            style={{
              color:
                percentage >= 75 ? colors.buttonText : colors.placeholderText,
            }}>
            Good Job!
          </ResponsiveText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftTitleText: {
    fontFamily: fonts.PoppinsMedium,
    lineHeight: wp(20),
    fontSize: wp(4.5),
    paddingRight: wp(1),
  },
  middleTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(4),
  },
});

export default VisualizerHome;
