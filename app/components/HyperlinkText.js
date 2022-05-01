import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';

function HyperlinkText({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} styles={styles.hyperlinkTextContainer}>
      <ResponsiveText style={styles.hyperlinkText}>{title}</ResponsiveText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hyperlinkTextContainer: {
    paddingVertical: wp(1),
  },
  hyperlinkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: wp(0.9),
  },
});

export default HyperlinkText;
