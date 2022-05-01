import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

// import colors from '../config/colors';
import fonts from '../config/fonts';

function ResponsiveText(props) {
  const {style, children, numberOfLines} = props;
  let fontSize = wp('4%');
  let lineHeight = wp('5.5%');

  if (style && style.fontSize) {
    fontSize = wp(style.fontSize);
  }
  if (style && style.fontSize) {
    lineHeight = wp(style.fontSize) + wp('1%');
  }
  if (style && style.lineHeight) {
    lineHeight = style.lineHeight;
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        ...styles.text,
        ...props.style,
        ...{fontSize, lineHeight},
      }}
      onPress={props.onPress}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    // color: colors.PrimaryText,
    fontFamily: fonts.PoppinsRegular,
  },
});

export default ResponsiveText;
