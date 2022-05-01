import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import * as Progress from 'react-native-progress';

import ProgressCircle from 'react-native-progress-circle';

import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';
import fonts from '../config/fonts';

function StatisticsVisualizer({
  leftText,
  rightText,
  bottomText,
  progressValue,
}) {
  return (
    // <Progress.Circle
    //   size={wp(55)}
    //   progress={progressValue}
    //   color={colors.primary}
    //   unfilledColor={colors.progressUnfilled}
    //   borderWidth={0}
    //   thickness={wp(3)}
    //   indeterminateAnimationDuration={2000}
    //   strokeCap={'round'}>
    //   <View
    //     style={{
    //       height: wp(30),
    //       width: wp(45),
    //       position: 'absolute',
    //       top: hp(6),
    //       left: wp(5),
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}>
    //     <View style={styles.topRowContainer}>
    //       <ResponsiveText style={styles.leftText}>
    //         {leftText ? leftText : '0'}
    //       </ResponsiveText>
    //       <ResponsiveText style={styles.middleText}>/</ResponsiveText>
    //       <ResponsiveText style={styles.rightText}>
    //         {rightText ? rightText : '0'}
    //       </ResponsiveText>
    //     </View>
    //     <View>
    //       {progressValue < 1 ? (
    //         <ResponsiveText style={styles.bottomText}>
    //           Remaining: {bottomText ? bottomText : '0'} glass
    //         </ResponsiveText>
    //       ) : (
    //         <ResponsiveText style={styles.bottomText}>Good Job!</ResponsiveText>
    //       )}
    //     </View>
    //   </View>
    //   <ProgressCircle
    //     percent={30}
    //     radius={50}
    //     borderWidth={8}
    //     color="#3399FF"
    //     shadowColor="#999"
    //     bgColor="#fff">
    //     <Text style={{fontSize: 18}}>{'30%'}</Text>
    //   </ProgressCircle>
    // </Progress.Circle>

    <ProgressCircle
      percent={progressValue * 100}
      radius={wp(28)}
      borderWidth={wp(3)}
      color={colors.progressUnfilled}
      shadowColor={colors.progressUnfilled}
      bgColor="#fff"
      color={colors.primary}>
      <View
        style={{
          height: wp(30),
          width: wp(45),
          position: 'absolute',
          top: hp(5),
          left: wp(3),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.topRowContainer}>
          <ResponsiveText style={styles.leftText}>
            {leftText ? leftText : '0'}
          </ResponsiveText>
          <ResponsiveText style={styles.middleText}>/</ResponsiveText>
          <ResponsiveText style={styles.rightText}>
            {rightText ? rightText : '0'}
          </ResponsiveText>
        </View>
        <View>
          {progressValue < 1 ? (
            <ResponsiveText style={styles.bottomText}>
              Remaining: {bottomText ? bottomText : '0'} glass
            </ResponsiveText>
          ) : (
            <ResponsiveText style={styles.bottomText}>Good Job!</ResponsiveText>
          )}
        </View>
      </View>
    </ProgressCircle>
  );
}

const styles = StyleSheet.create({
  topRowContainer: {
    flexDirection: 'row',
  },
  leftText: {
    fontSize: wp(5),
    fontFamily: fonts.PoppinsMedium,
    lineHeight: wp(25),
  },
  middleText: {
    fontSize: wp(3),
    fontFamily: fonts.PoppinsLight,
    lineHeight: wp(25),
  },
  rightText: {
    fontSize: wp(5),
    fontFamily: fonts.PoppinsMedium,
    color: colors.placeholderText,
    lineHeight: wp(25),
  },
  bottomText: {
    marginTop: wp(-3),
    fontSize: wp(0.8),
  },
});

export default StatisticsVisualizer;
