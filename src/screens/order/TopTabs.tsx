import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Button, Text } from '@components';
import { hScale, scale, wScale } from '@resolutions';
import { DATA_TAB_ORDER, TabOrderProps, colors, radius } from '@constants';
import { handleTabSwitch, orderSelector } from '@reducers';
import { useAppDispatch } from '@store';

interface TopTabsProps {
  isVertical?: boolean;
  handleActionSwitch?: () => void;
}

const { width } = Dimensions.get('window');

const widthSwitch = width - scale(50);
const widthOutside = wScale(160) + scale(8) + scale(2);
const outputRange = widthSwitch - widthOutside;

const TopTabs = ({ isVertical = false, handleActionSwitch }: TopTabsProps) => {
  const dispatch = useAppDispatch();
  const { tab } = useSelector(orderSelector);

  let transformX = useRef(new Animated.Value(0)).current;

  const [active, setActive] = useState(true);

  useEffect(() => {
    setActive(isVertical);
  }, [isVertical]);

  useEffect(() => {
    if (active) {
      animatedTiming(1);
    } else {
      animatedTiming(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const animatedTiming = (value: number) => {
    Animated.timing(transformX, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotationX = transformX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, outputRange],
  });

  const clickAction = (ele: TabOrderProps) => {
    if (tab.id !== ele?.id) {
      if (handleActionSwitch) {
        handleActionSwitch();
      }
      setActive(status => !status);
      dispatch(handleTabSwitch(ele));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.vwTab}>
          {DATA_TAB_ORDER.map((ele: TabOrderProps, index) => {
            const isSelect = ele?.id === tab.id;
            return (
              <Button
                key={index?.toString()}
                style={styles.btnTab}
                onPress={() => clickAction(ele)}
              >
                <Text
                  bold
                  style={[styles.txtTab, isSelect && styles.isSelectTxtTab]}>
                  {ele?.name}
                </Text>
              </Button>
            );
          })}
        </View>
        <Animated.View
          style={[
            styles.vwAnimated,
            {
              transform: [
                {
                  translateX: rotationX,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(25),
    marginTop: scale(25),
  },
  content: {
    width: '100%',
    height: hScale(55),
    borderWidth: scale(1),
    borderRadius: radius.radius25,
    borderColor: colors.gray_EEEEEE,
    justifyContent: 'center',
  },
  vwTab: {
    width: '100%',
    height: hScale(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(4),
  },
  btnTab: {
    width: wScale(160),
    height: hScale(46),
    borderRadius: radius.radius23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTab: {
    color: colors.orange_FE724C,
  },
  isSelectTxtTab: {
    color: colors.white,
  },
  vwAnimated: {
    position: 'absolute',
    width: wScale(160),
    height: hScale(46),
    marginHorizontal: scale(4),
    borderRadius: radius.radius23,
    backgroundColor: colors.orange_FE724C,
    zIndex: -9999,
  },
});

export default TopTabs;
