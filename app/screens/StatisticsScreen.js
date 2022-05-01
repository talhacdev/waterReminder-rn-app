import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';

import Content from '../components/Content';
import navigation from '../navigation/rootNavigation';
import HeaderSwitch from '../components/HeaderSwitch';
import Container from '../components/Container';
import colors from '../config/colors';
import StatisticsComponent from '../components/StatisticsComponent';
import StatisticsVisualizer from '../components/StatisticsVisualizer';
import ResponsiveText from '../components/ResponsiveText';
import fonts from '../config/fonts';

import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {UpdateGoal} from '../redux/actions/AuthActions';

const COLORS = [
  colors.componentBackground1,
  colors.componentBackground2,
  colors.componentBackground3,
  colors.componentBackground4,
];

function StatisticsScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  const [markedDates, setMarkedDates] = useState();
  const [history, setHistory] = useState([]);
  const [calendarDate, setCalendarDate] = useState();
  const [progress, setProgress] = useState();
  const activeRow1 = useRef(null);

  useEffect(() => {
    console.log('USE EFFECT');
    console.log('progress: ', progress);
    console.log('calendarDate: ', calendarDate);
    console.log('selected: ', selected);
    let data = props.reminderValue;
    let date = moment().format('DD-MM-YYYY');
    setProgress(
      !progress
        ? data[date]?.timeDrunk.length / data[date]?.goal
        : props.reminderValue[
            moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
          ]?.timeDrunk?.length /
            props.reminderValue[
              moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
            ]?.goal,
    );

    let originalDate = moment(moment(), 'YYYY-MM-DD');
    let dateNew = originalDate.format('DD MMM, YYYY');
    setCalendarDate(!calendarDate ? dateNew : calendarDate);

    console.log('moment currentdate: ', new Date(Date.now() - 86400000));
    setSelected(!selected ? moment().format('YYYY-MM-DD') : selected);

    let selectedDate = moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY');

    setHistory(props.reminderValue[selectedDate]?.timeDrunk);

    console.log('HISTORY: ', history);
    // put selected in useEffect array for automatic reloading
  }, [props.reminderValue, selected]);

  const onPressDelete = item => {
    let data = props.reminderValue;
    let date = moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY');

    data[date].timeDrunk = data[date].timeDrunk?.filter(
      i => i.id !== item.item.id,
    );
    props.updateGoal(data);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getSelectedDayEvents = date => {
    toggleModal();
    let markedDates = {};
    markedDates[date] = {
      customStyles: {
        container: {
          backgroundColor: colors.primary,
          elevation: 2,
          borderRadius: wp(1.5),
        },
        text: {
          color: colors.background,
        },
      },
    };

    setSelected(date);
    setMarkedDates(markedDates);

    let originalDate = moment(date, 'YYYY-MM-DD');
    let dateNew = originalDate.format('DD MMM, YYYY');

    setCalendarDate(dateNew);
  };

  return (
    <Container style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSwitch
          onPressArrowBack={() => navigation.navigate('Home')}
          calendarCheck
          calendarOnPress={() => toggleModal()}
          date={calendarDate}
        />
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View>
          <Modal
            style={styles.modal}
            hasBackdrop={true}
            onBackButtonPress={toggleModal}
            onBackdropPress={toggleModal}
            isVisible={isModalVisible}>
            <View style={styles.containerCalendar}>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={day => getSelectedDayEvents(day.dateString)}
                  style={styles.calendar}
                  theme={{
                    textDayHeaderFontFamily: fonts.PoppinsRegular,
                    textMonthFontFamily: fonts.PoppinsRegular,
                    textDayFontFamily: fonts.PoppinsRegular,
                    textSectionTitleColor: colors.background,
                    arrowColor: colors.background,
                    monthTextColor: colors.background,
                    indicatorColor: 'blue',
                    'stylesheet.calendar.header': {
                      backgroundColor: 'black',
                    },
                  }}
                  maxDate={Date.now() - 86400000}
                  markingType={'custom'}
                  markedDates={markedDates}
                />
                <View style={styles.bottomBarContainer}>
                  {/* <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.bottomBarCancelContainer}>
                    <ResponsiveText style={styles.cancel}></ResponsiveText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={styles.bottomBarOkContainer}>
                    <ResponsiveText style={styles.ok}></ResponsiveText>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.statisticsVisualizerContainer}>
          <StatisticsVisualizer
            progressValue={progress}
            leftText={
              props.reminderValue[
                moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
              ]?.timeDrunk.length
            }
            rightText={
              props.reminderValue[
                moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
              ]?.goal
            }
            bottomText={
              props.reminderValue[
                moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
              ]?.goal -
              props.reminderValue[
                moment(selected, 'YYYY-MM-DD').format('DD-MM-YYYY')
              ]?.timeDrunk.length
            }
          />
        </View>
        <Content style={styles.content}>
          <SwipeListView
            inverted
            data={history}
            renderItem={item => (
              <Pressable onPressIn={() => console.log(item)}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <StatisticsComponent
                      backgroundColor={
                        COLORS[Math.floor(Math.random() * COLORS.length)]
                      }
                      timeslot={item.item.timeValue}
                    />
                  </View>
                </View>
              </Pressable>
            )}
            renderHiddenItem={item => (
              <View>
                <Pressable
                  onPress={() => {
                    onPressDelete(item);
                  }}
                  style={{
                    width: wp(90),
                    height: wp(25),
                    alignSelf: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20%',
                      height: '75%',
                    }}>
                    <ResponsiveText style={styles.deleteText}>
                      DELETE
                    </ResponsiveText>
                  </View>
                </Pressable>
              </View>
            )}
            keyExtractor={item => item.id}
            leftOpenValue={0}
            rightOpenValue={-wp(18)}
            stopLeftSwipe={0}
            closeOnRowPress={true}
            closeOnRowBeginSwipe={true}
            closeOnRowOpen={true}
            onRowOpen={(rowKey, rowMap) => {
              activeRow1.current = rowMap[rowKey];
            }}
          />
        </Content>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  statisticsVisualizerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.VisualizerContainer,
    width: wp(100),
    marginBottom: wp(4),
    paddingVertical: wp(10),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCalendar: {
    backgroundColor: colors.background,
    borderRadius: wp(3),
  },
  calendarContainer: {
    backgroundColor: colors.background,
    borderRadius: wp(3),
    elevation: wp(2),
  },
  calendar: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: colors.primary,
    width: wp(85),
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
  },
  bottomBarContainer: {
    flexDirection: 'row',
    // marginTop: wp(4),
    // marginBottom: wp(6),
    marginVertical: wp(2),
    // marginHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomBarCancelContainer: {
    marginRight: wp(8),
  },
  bottomBarOkContainer: {
    marginRight: wp(1),
  },
  cancel: {
    fontSize: wp(0.9),
    color: colors.placeholderText,
    fontFamily: fonts.PoppinsMedium,
  },
  ok: {
    fontSize: wp(0.9),
    color: colors.primary,
    fontFamily: fonts.PoppinsMedium,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    marginVertical: hp(1),
  },
  deleteText: {
    color: 'red',
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);
