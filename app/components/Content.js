import React from 'react';
import {ScrollView, View, KeyboardAvoidingView, StyleSheet} from 'react-native';

import colors from '../config/colors';

function Content(props) {
  const style = props.style ? props.style : [];
  if (props.keyboardAvoidingView) {
    return (
      <KeyboardAvoidingView
        style={[styles.container, style]}
        refreshControl={props.refreshControl}
        showsVerticalScrollIndicator={false}>
        <View
          behavior={'position'}
          enabled={true}
          style={[styles.container, style]}>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={[styles.container, style]}
      refreshControl={props.refreshControl}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, style]}>{props.children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default Content;
