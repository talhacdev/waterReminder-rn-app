import React, {useState, useEffect} from 'react';
import {View, Alert, BackHandler, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {StatusBar} from 'react-native';
import moment from 'moment';

import HeaderSubText from '../components/HeaderSubText';
import GoalSlider from '../components/GoalSlider';
import HyperlinkText from '../components/HyperlinkText';
import BottomButton from '../components/BottomButton';
import ModalTwo from '../components/ModalTwo';
import ModalOne from '../components/ModalOne';
import Container from '../components/Container';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {UpdateGoal, PushDate, DailyGoal} from '../redux/actions/AuthActions';

function DrinkUnit(props) {
  const [value, setValue] = useState(8);
  const [isModalOneVisible, setModalOneVisible] = useState(false);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const [isMaleSelected, setMaleSelected] = useState(true);
  const [isFemaleSelected, setFemaleSelected] = useState(false);

  const [weight, setWeight] = useState();
  const [dropDown, setDropdown] = useState(false);
  const [selected, setSelected] = useState('Kg');

  const [advised, setAdvised] = useState();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

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

  const ToggleModalOne = () => {
    setModalOneVisible(!isModalOneVisible);
  };

  const ToggleModalTwo = () => {
    if (weight && weight >= 40 && weight <= 500) {
      setModalOneVisible(!isModalOneVisible);
      let calculation = 0;
      if (selected == 'Lb') {
        calculation = weight / 2;
      } else {
        let weightInPounds = weight * 2.2046;
        calculation = weightInPounds / 2;
      }
      if (calculation <= 100) {
        if (isFemaleSelected) {
          setAdvised(7);
        } else {
          setAdvised(8);
        }
        setModalTwoVisible(!isModalTwoVisible);
      } else if (calculation > 100 && calculation <= 200) {
        if (isFemaleSelected) {
          setAdvised(12);
        } else {
          setAdvised(14);
        }
        setModalTwoVisible(!isModalTwoVisible);
      } else {
        setAdvised(14);
        setModalTwoVisible(!isModalTwoVisible);
      }
    }
  };

  const CloseModal = () => {
    setModalOneVisible(false);
    setModalTwoVisible(false);
  };

  const UpdateSelectionLeft = () => {
    setFemaleSelected(false);
    setMaleSelected(true);
  };

  const UpdateSelectionRight = () => {
    setMaleSelected(false);
    setFemaleSelected(true);
  };

  const onPressApply = () => {
    if (Object.keys(props.reminderValue).length == 0) {
      console.log('first time use-case');
      const reminder = {};
      reminder[moment().format('DD-MM-YYYY')] = {
        timeDrunk: [],
        goal: advised,
      };
      props.pushDate(reminder);
    }

    let data = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');
    if (data.hasOwnProperty(date)) {
      data[date].goal = advised;
      props.dailyGoal(advised);
      props.updateGoal(data);
      props.navigation.navigate('DrawerNavigator');
    }
  };

  const OnPressBottomButton = () => {
    if (Object.keys(props.reminderValue).length == 0) {
      console.log('first time use-case');
      const reminder = {};
      reminder[moment().format('DD-MM-YYYY')] = {
        timeDrunk: [],
        goal: value,
      };
      props.pushDate(reminder);
    }
    console.log('This is the iother case');
    let data = props.reminderValue;
    console.log('data: ', data);
    let date = moment().format('DD-MM-YYYY');
    if (data.hasOwnProperty(date)) {
      data[date].goal = value;
      props.dailyGoal(value);
      props.updateGoal(data);
      props.navigation.navigate('DrawerNavigator');
    }
  };

  const onPressKg = () => {
    setDropdown(false), setSelected('Kg');
  };

  const onPressPounds = () => {
    setDropdown(false), setSelected('Lb');
  };

  return (
    <Container style={styles.container}>
      <StatusBar hidden={false} translucent backgroundColor="transparent" />
      <Modal
        style={styles.modal}
        hasBackdrop={true}
        backdropColor={colors.dullBackground}
        onBackButtonPress={CloseModal}
        onBackdropPress={CloseModal}
        isVisible={isModalOneVisible}>
        <View>
          <ModalOne
            onPressCross={CloseModal}
            weight={weight}
            onChangeWeight={val => setWeight(val)}
            dropDown={dropDown}
            dropdownToggle={() => setDropdown(!dropDown)}
            selected={selected}
            OnPressKgSelected={() => onPressKg()}
            OnPressPoundsSelected={() => onPressPounds()}
            isMaleSelected={isMaleSelected}
            isFemaleSelected={isFemaleSelected}
            onPressMiddleLeftButton={() => UpdateSelectionLeft()}
            onPressMiddleRightButton={() => UpdateSelectionRight()}
            onPressBottomLeftButton={() => ToggleModalOne()}
            onPressBottomRightButton={() => ToggleModalTwo()}
          />
        </View>
      </Modal>
      <Modal
        style={styles.modal}
        hasBackdrop={true}
        backdropColor={colors.dullBackground}
        onBackButtonPress={CloseModal}
        onBackdropPress={CloseModal}
        isVisible={isModalTwoVisible}>
        <View>
          <ModalTwo
            advised={advised}
            onPressLeftButton={() => CloseModal()}
            onPressRightButton={() => onPressApply()}
          />
        </View>
      </Modal>
      <View>
        <HeaderSubText
          ImageCheck
          titleText={'Your daily'}
          titleTextRight={'Goal'}
          subTextTop={'Health authorities recommend 8 glasses'}
          subTextBottom={'of water per day.'}
        />
      </View>
      <View style={styles.goalSliderC}>
        <GoalSlider value={value} setValue={value => setValue(value)} />
      </View>
      <View style={styles.hyperlinkTextC}>
        <HyperlinkText
          title={'Can we suggest you'}
          onPress={() => ToggleModalOne()}
        />
      </View>

      <View style={styles.bottomButtonC}>
        <BottomButton onPress={() => OnPressBottomButton()} title={'NEXT'} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  goalSliderC: {
    flex: 1,
    paddingTop: wp(20),
  },
  hyperlinkTextC: {paddingVertical: wp(5)},
  bottomButtonC: {paddingVertical: wp(10)},
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    reminderValue: state.auth.reminder,
    goalValue: state.auth.goal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGoal: payload => dispatch(UpdateGoal(payload)),
    pushDate: payload => dispatch(PushDate(payload)),
    dailyGoal: payload => dispatch(DailyGoal(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrinkUnit);
