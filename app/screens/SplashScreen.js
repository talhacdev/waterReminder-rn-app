import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';
import colors from '../config/colors';
import Container from '../components/Container';
import images from '../config/images';
import ResponsiveText from '../components/ResponsiveText';
import fonts from '../config/fonts';

import {connect} from 'react-redux';
import {PushDate} from '../redux/actions/AuthActions';

function SplashScreen(props) {
  useEffect(() => {
    if (Object.keys(props.reminderValue).length >= 1) {
      console.log('props.reminderValue: ', props.reminderValue);
      let data = props.reminderValue;
      let date = moment().format('DD-MM-YYYY');
      if (data.hasOwnProperty(date)) {
        console.log('Today already exists');
      } else {
        const reminder = {...props.reminderValue};
        reminder[moment().format('DD-MM-YYYY')] = {
          timeDrunk: [],
          goal: props.goalValue,
        };
        props.pushDate(reminder);
      }
    } else {
      console.log('first time use-case');
      const reminder = {};
      reminder[moment().format('DD-MM-YYYY')] = {
        timeDrunk: [],
        goal: props.goalValue,
      };
      props.pushDate(reminder);
    }
  }, []);

  const animationEnd = () => {
    let data = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');
    setTimeout(function () {
      navigation.navigate(
        data[date]?.goal == 0 ? routes.DRINK_UNIT : routes.DRAWER,
      );
    }, 1000);
  };

  const zoomOut = {
    0: {
      scale: 45,
    },
    0.1: {
      scale: 40,
    },
    0.2: {
      scale: 35,
    },
    0.3: {
      scale: 30,
    },
    0.4: {
      scale: 25,
    },
    0.5: {
      scale: 20,
    },
    0.6: {
      scale: 15,
    },
    0.7: {
      scale: 10,
    },
    0.8: {
      scale: 5,
    },
    0.9: {
      scale: 2.5,
    },
    1: {
      scale: 1,
    },
  };

  return (
    <Container style={styles.container}>
      <StatusBar hidden={false} translucent backgroundColor="transparent" />
      <Animatable.View
        onAnimationEnd={animationEnd()}
        animation={zoomOut}
        easing="ease-in-back"
        duration={750}
        style={{
          alignItems: 'center',
        }}>
        <View onPress={() => navigation.navigate(routes.DRINK_UNIT)}>
          <Image style={styles.imageLogo} source={images.splashLogo} />
        </View>
        <View style={styles.logoTextContainer}>
          <ResponsiveText style={styles.logoText}>
            WATER REMINDER
          </ResponsiveText>
        </View>
      </Animatable.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.splashBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {width: wp(42), height: wp(42), resizeMode: 'contain'},
  logoTextContainer: {marginTop: hp(1)},
  logoText: {fontFamily: fonts.PoppinsBold, color: colors.splashText},
});

function mapStateToProps(state) {
  return {
    reminderValue: state.auth.reminder,
    goalValue: state.auth.goal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushDate: payload => dispatch(PushDate(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
