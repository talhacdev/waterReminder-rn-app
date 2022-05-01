import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import routes from '../navigation/routes';
import fonts from '../config/fonts';
import images from '../config/images';
import ResponsiveText from '../components/ResponsiveText';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {ResetApp, PushDate} from '../redux/actions/AuthActions';

function DrawerContent(props) {
  const onResetAppButtonPress = () => {
    props.resetApp();

    setTimeout(() => {
      props.navigation.navigate(routes.DRINK_UNIT);
      props.navigation.toggleDrawer();
    }, 1200);
  };

  const onPressRateTheApp = () => {
    Linking.openURL('https://play.google.com/store/apps/developer?id=LogicFab');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerHeaderContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.toggleDrawer()}
              style={styles.imageArrowBackContainer}>
              <Image source={images.arrowBack} style={styles.imageArrowBack} />
            </TouchableOpacity>
            <View>
              <ResponsiveText style={styles.headerText}>MENU</ResponsiveText>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(routes.REMINDER);
            }}
            style={styles.drawerItemContainer}>
            <View style={styles.imageContainer}>
              <Image source={images.bell} style={styles.imageBell} />
            </View>
            <View style={styles.drawerItemTextContainer}>
              <ResponsiveText style={styles.drawerItemText}>
                Reminder
              </ResponsiveText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer(),
                props.navigation.navigate(routes.DRINK_UNIT);
            }}
            style={styles.drawerItemContainer}>
            <View style={styles.imageContainer}>
              <Image source={images.flag} style={styles.imageFlag} />
            </View>
            <View style={styles.drawerItemTextContainer}>
              <ResponsiveText style={styles.drawerItemText}>
                Daily Goal Update
              </ResponsiveText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate(routes.STATISTICS)}
            style={styles.drawerItemContainer}>
            <View style={styles.imageContainer}>
              <Image source={images.stats} style={styles.imageStats} />
            </View>
            <View style={styles.drawerItemTextContainer}>
              <ResponsiveText style={styles.drawerItemText}>
                Statistics
              </ResponsiveText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onResetAppButtonPress()}
            style={styles.drawerItemContainer}>
            <View style={styles.imageContainer}>
              <Image source={images.reset} style={styles.imageReset} />
            </View>
            <View style={styles.drawerItemTextContainer}>
              <ResponsiveText style={styles.drawerItemText}>
                Reset app
              </ResponsiveText>
            </View>
          </TouchableOpacity>
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableOpacity
          onPress={() => {
            onPressRateTheApp();
          }}
          style={styles.drawerItemContainer}>
          <View style={styles.imageContainer}>
            <Image source={images.rate} style={styles.imageRate} />
          </View>
          <View style={styles.drawerItemTextContainer}>
            <ResponsiveText style={styles.drawerItemText}>
              Rate the app
            </ResponsiveText>
          </View>
        </TouchableOpacity>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  imageArrowBackContainer: {
    backgroundColor: colors.placeholder,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageArrowBack: {width: wp(4), height: wp(4)},
  headerText: {fontFamily: fonts.PoppinsMedium, fontSize: wp(1.2)},
  drawerSection: {
    marginTop: wp(15),
  },
  drawerItemContainer: {
    flexDirection: 'row',
    paddingLeft: wp(5),
    alignItems: 'center',
    marginVertical: wp(3),
  },
  imageContainer: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerItemTextContainer: {marginHorizontal: wp(5)},
  drawerItemText: {fontFamily: fonts.PoppinsMedium},
  imageHome: {width: wp(4), height: wp(4)},
  imageBell: {width: wp(4), height: wp(5)},
  imageFlag: {width: wp(4), height: wp(4)},
  imageStats: {width: wp(4), height: wp(4)},
  imageReset: {width: wp(4.5), height: wp(4)},
  imageRate: {width: wp(4.2), height: wp(4)},
  bottomDrawerSection: {
    borderTopColor: colors.placeholder,
    borderTopWidth: wp(0.5),
  },
});

function mapDispatchToProps(dispatch) {
  return {
    resetApp: payload => dispatch(ResetApp(payload)),
    pushDate: payload => dispatch(PushDate(payload)),
  };
}

export default connect(null, mapDispatchToProps)(DrawerContent);
