import React, {useState, useEffect} from 'react';
import {View, Image, Alert, BackHandler, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import colors from '../config/colors';
import images from '../config/images';
import Container from '../components/Container';
import routes from '../navigation/routes';
import VisualizerHome from '../components/VisualizerHome';
import HeaderSwitch from '../components/HeaderSwitch';
import PlusComponent from '../components/PlusComponent';

import {connect} from 'react-redux';
import {UpdateGoal} from '../redux/actions/AuthActions';

import {GetChannels, DeleteChannel} from '../services/LocalPushController';

function HomeScreen(props) {
  const [total, setTotal] = useState();
  const [drunk, setDrunk] = useState();
  const [percentage, setPercentage] = useState();
  const [left, setLeft] = useState();
  const [timeslot, setTimeslot] = useState([]);

  useEffect(() => {
    let data = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');
    if (data.hasOwnProperty(date)) {
      console.log('Homescreen: ', data[date].goal);
      setTotal(data[date].goal);
      setDrunk(data[date].timeDrunk.length);
      setPercentage(
        Math.round((data[date].timeDrunk.length / data[date].goal) * 100),
      );
      setLeft(data[date].goal - data[date].timeDrunk.length);
    }

    BackHandler.addEventListener('hardwareBackPress', backAction);
    if ((data[date]?.timeDrunk?.length !== 0, data[date]?.goal !== 0)) {
      if (data[date]?.timeDrunk?.length == data[date]?.goal) {
        console.log('remove all channels now');
        GetChannels();
        DeleteChannel();
      }
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [props.reminderValue]);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          BackHandler.removeEventListener('hardwareBackPress', backAction),
            BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  const OnPressPlus = () => {
    let drunkNew = drunk;
    setDrunk(++drunkNew);
    let leftNew = left;
    setLeft(--leftNew);
    let percentageNew = Math.round((drunkNew / total) * 100);
    setPercentage(percentageNew);

    let stamp = moment().format('DD-MM-YYYY hh:mm:ss A');
    var originalDate = moment(stamp, 'DD-MM-YYYY hh:mm:ss A');
    let obj = {
      id: Math.random(),
      moment: moment(),
      entireStamp: stamp,
      dateValue: originalDate.format('YYYY-MM-DD'),
      timeValue: originalDate.format('HH:mm A'),
    };
    let reduxData = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');
    if (reduxData.hasOwnProperty(date)) {
      let array = [...reduxData[date].timeDrunk];
      array.push(obj);
      setTimeslot(array);
      reduxData[date].timeDrunk = array;
      props.updateGoal(reduxData);
    }
  };

  return (
    <Container style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: hp(0),
          width: wp(100),
          backgroundColor: '#0088D4',
          height:
            percentage >= 90
              ? hp(80)
              : percentage >= 80
              ? hp(70)
              : percentage >= 70
              ? hp(65)
              : percentage >= 60
              ? hp(60)
              : percentage >= 50
              ? hp(50)
              : percentage >= 40
              ? hp(40)
              : percentage >= 30
              ? hp(35)
              : percentage >= 20
              ? hp(30)
              : percentage >= 10
              ? hp(20)
              : percentage >= 0
              ? hp(10)
              : null,
        }}>
        <Image
          source={require('../assets/cropwave.gif')}
          style={{
            position: 'absolute',
            bottom:
              percentage == 100
                ? hp(75)
                : percentage >= 90
                ? hp(72)
                : percentage >= 80
                ? hp(64)
                : percentage >= 70
                ? hp(56)
                : percentage >= 60
                ? hp(48)
                : percentage >= 50
                ? hp(40)
                : percentage >= 40
                ? hp(32)
                : percentage >= 30
                ? hp(24)
                : percentage >= 20
                ? hp(16)
                : percentage >= 10
                ? hp(8)
                : percentage >= 0
                ? hp(0)
                : null,
            width: wp(100),
            height: hp(25),
          }}
        />
      </View>
      <View style={styles.headerSwitchContainer}>
        <HeaderSwitch
          menu
          onPressMenu={() => props.navigation.toggleDrawer()}
          onPressStatistics={() => props.navigation.navigate(routes.STATISTICS)}
        />
      </View>
      <View style={styles.visualizerHomeContainer}>
        <VisualizerHome
          percentage={percentage}
          leftTitle={drunk}
          rightTitle={total}
          bottomTitle={Math.abs(left)}
        />
      </View>
      <View
        style={{
          marginTop: wp(6),
          marginBottom: wp(1),
        }}>
        <Image
          source={images.anatomy}
          style={{width: wp(100), height: wp(75), resizeMode: 'contain'}}
        />
      </View>
      <View style={styles.plusComponentContainer}>
        <PlusComponent
          disable={false}
          percentage={percentage}
          onPressPlus={() => OnPressPlus()}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  headerSwitchContainer: {marginTop: hp(1), marginBottom: wp(12)},
  visualizerHomeContainer: {marginBottom: wp(5)},
  plusComponentContainer: {marginBottom: wp(5)},
});

function mapStateToProps(state) {
  return {
    reminderValue: state.auth.reminder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoal: payload => dispatch(UpdateGoal(payload)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
