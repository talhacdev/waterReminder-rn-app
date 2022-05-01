import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import moment from 'moment';

import HeaderSubText from '../components/HeaderSubText';
import navigation from '../navigation/rootNavigation';
import HeaderSwitch from '../components/HeaderSwitch';
import Container from '../components/Container';
import ModalReminder from '../components/ModalReminder';
import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';
import images from '../config/images';
import fonts from '../config/fonts';

import {connect} from 'react-redux';

import {
  CreateChannel,
  DeleteChannel,
  LocalNotification,
} from '../services/LocalPushController';
import {SetAlert} from '../redux/actions/AuthActions';

function ReminderScreen(props) {
  const [toggleSwitch, setToggleSwitch] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNoon, setNoon] = useState(false);

  const [startTimeStartTime, setStartTimeStartTime] = useState();
  const [startTimeMinute, setStartTimeMinute] = useState();
  const [alertTimeHour, setAlertTimeHour] = useState('01');
  const [alertTimeMinute, setAlertTimeMinute] = useState('00');

  const [msToTime, setMsToTime] = useState();

  useEffect(() => {
    let data = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');

    if (!toggleSwitch) {
      DeleteChannel();
    } else if (data[date].timeDrunk.length !== data[date].goal) {
      CreateChannel();
    }

    let alerts = props.alertValue;
    if (alerts) {
      console.log('Alert: ', alerts);
      setStartTimeStartTime(alerts.startTimeStartTime);
      setStartTimeMinute(alerts.startTimeMinute);
      setAlertTimeHour(alerts.alertTimeHour);
      setAlertTimeMinute(alerts.alertTimeMinute);
      setNoon(alerts.isNoon);
      setMsToTime(alerts.text);
    } else {
      console.log('no Alert: ', alerts);
    }
  }, [toggleSwitch]);

  const OpenModal = () => {
    setModalVisible(!isModalVisible);
  };

  const CloseModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressModalBottomRightButton = () => {
    if (
      (startTimeStartTime,
      startTimeMinute,
      alertTimeHour,
      alertTimeMinute && startTimeStartTime <= 12 && startTimeMinute <= 59)
    ) {
      CloseModal();
      setStartTimeStartTime(startTimeStartTime);
      setStartTimeMinute(startTimeMinute);
      setAlertTimeHour(alertTimeHour);
      setAlertTimeMinute(alertTimeMinute);

      function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + ' Seconds';
        else if (minutes < 60) return minutes + ' Minutes';
        else if (hours < 24) return hours + ' Hours';
        else return days + ' Days';
      }

      let string1 = moment().format('MM/DD/YYYY');
      let string2 = `${startTimeStartTime}:${startTimeMinute} ${
        isNoon ? 'PM' : 'AM'
      }`;
      let concatenatedString = `${string1} ${string2}`;

      let startTimeProvidedInMilliseconds = moment(
        concatenatedString,
        'MM/DD/YYYY hh:mm A',
      );

      var seconds =
        alertTimeHour * 60 * 60 * 1000 + alertTimeMinute * 60 * 1000;
      setMsToTime(msToTime(seconds));

      let finalStartTime = moment(
        concatenatedString,
        'MM/DD/YYYY hh:mm A',
      ).valueOf();

      let text = msToTime(seconds);
      let obj = {
        startTimeStartTime,
        startTimeMinute,
        isNoon,
        alertTimeHour,
        alertTimeMinute,
        text,
      };
      props.setAlert(obj);

      if (moment().valueOf() >= startTimeProvidedInMilliseconds.valueOf()) {
        LocalNotification(finalStartTime, seconds, true);
      }

      if (startTimeProvidedInMilliseconds.valueOf() > moment().valueOf()) {
        LocalNotification(finalStartTime, seconds, false);
      }
    }
  };

  return (
    <Container style={styles.container}>
      <Modal
        style={styles.modal}
        hasBackdrop={true}
        backdropColor={colors.dullBackground}
        onBackButtonPress={CloseModal}
        onBackdropPress={CloseModal}
        isVisible={isModalVisible}>
        <View>
          <ModalReminder
            startTimeHour={startTimeStartTime}
            startTimeMinute={startTimeMinute}
            alertTimeHour={alertTimeHour}
            alertTimeMinute={alertTimeMinute}
            Noon={isNoon}
            onPressNoon={() => setNoon(!isNoon)}
            onPressBottomLeftButton={() => CloseModal()}
            onPressBottomRightButton={onPressModalBottomRightButton}
            onChangeTextStartTimeStartTime={val => setStartTimeStartTime(val)}
            onChangeTextStartTimeMinute={val => setStartTimeMinute(val)}
            onChangeTextAlertTimeHour={val => setAlertTimeHour(val)}
            onChangeTextAlertTimeMinute={val => setAlertTimeMinute(val)}
          />
        </View>
      </Modal>

      <View style={styles.headerContainer}>
        <HeaderSwitch
          switchCheck
          onPressArrowBack={() => navigation.navigate('Home')}
          toggleSwitch={toggleSwitch}
          onToggle={() => setToggleSwitch(!toggleSwitch)}
        />
      </View>

      <View style={styles.visualizerContainer}>
        <View style={styles.externalContentContainer}>
          <View style={styles.contentContainer}>
            <HeaderSubText
              subTextTop={'Set your alarms time so that remind'}
              subTextBottom={'you to hydrate yourself.'}
            />
          </View>
          <TouchableOpacity
            disabled={!toggleSwitch ? true : false}
            onPress={() => OpenModal()}
            style={styles.toggleTextContainer}>
            <Image source={images.clockBlue} style={styles.imageClockBlue} />
            <ResponsiveText style={styles.hyperText}>
              {msToTime ? 'Every ' + msToTime : 'Every 60 minutes'}
            </ResponsiveText>
            <Image source={images.edit} style={styles.imageEdit} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageAlarmContainer}>
        <Image source={images.alarmIcon} style={styles.imageAlarmIcon} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    marginVertical: hp(1),
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualizerContainer: {
    width: wp(100),
    paddingHorizontal: wp(6),
    backgroundColor: colors.VisualizerContainer,
    borderBottomLeftRadius: wp(6),
    borderBottomEndRadius: wp(6),
  },
  externalContentContainer: {
    backgroundColor: colors.VisualizerContainer,
    marginTop: wp(15),
    paddingTop: wp(5),
    paddingBottom: wp(12),
    paddingHorizontal: wp(6),
    borderRadius: wp(6),
    elevation: 2,
  },
  contentContainer: {
    marginTop: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleTextContainer: {
    backgroundColor: colors.reminderInternal,
    paddingVertical: wp(5),
    paddingHorizontal: wp(6),
    borderRadius: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(15),
  },
  imageClockBlue: {width: wp(5), height: wp(5), resizeMode: 'contain'},
  hyperText: {color: colors.primary, fontFamily: fonts.PoppinsMedium},
  imageEdit: {width: wp(5), height: wp(5), resizeMode: 'contain'},
  imageAlarmContainer: {
    flex: 1,
    marginTop: hp(5),
  },
  imageAlarmIcon: {width: wp(62), height: wp(62), resizeMode: 'contain'},
});

function mapStateToProps(state) {
  return {
    reminderValue: state.auth.reminder,
    alertValue: state.auth.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAlert: payload => dispatch(SetAlert(payload)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderScreen);
