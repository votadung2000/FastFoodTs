import { StyleSheet } from 'react-native';
import { Notifier, NotifierComponents } from 'react-native-notifier';

import { colors, fontSize } from '@constants';
import { wScale } from '@resolutions';

interface NotiferProps {
  alertType?: 'error' | 'success' | 'warn' | 'info';
  title?: string;
  des?: string;
}

const Notifer = ({ alertType, title, des, ...rest }: NotiferProps) => {
  const getInfo = () => {
    if (alertType === 'error') {
      return {
        style: styles.titleError,
        image: require('../../assets/images/notifer_error.png'),
      };
    }
    if (alertType === 'success') {
      return {
        style: styles.titleSuccess,
        image: require('../../assets/images/notifer_success.png'),
      };
    }
    if (alertType === 'warn') {
      return {
        style: styles.titleWarn,
        image: require('../../assets/images/notifer_warn.png'),
      };
    }
    if (alertType === 'info') {
      return {
        style: styles.titleInfo,
        image: require('../../assets/images/notifer_info.png'),
      };
    }
  };

  if (alertType) {
    if (title && des) {
      return Notifier.showNotification({
        title: title,
        description: des,
        Component: NotifierComponents.Notification,
        componentProps: {
          titleStyle: getInfo()?.style,
          descriptionStyle: styles.desStyle,
          imageSource: getInfo()?.image,
          imageStyle: styles.imageStyle,
        },
        ...rest
      });
    } else {
      return Notifier.showNotification({
        title: title,
        Component: NotifierComponents.Notification,
        componentProps: {
          titleStyle: getInfo()?.style,
          descriptionStyle: styles.desStyle,
          imageSource: getInfo()?.image,
          imageStyle: styles.imageStyle,
        },
        ...rest
      });
    }
  }
};

const styles = StyleSheet.create({
  ccSt: {
    position: 'absolute',
    top: 20,
    borderRadius: 4,
  },
  titleStyle: {
    color: colors.white,
    fontFamily: 'Inter-Regular',
  },
  imageStyle: {
    width: wScale(24),
    height: wScale(24),
  },
  titleError: {
    fontSize: fontSize.fontSize16,
    color: colors.redSystem,
    fontFamily: 'Inter-Regular',
  },
  titleSuccess: {
    fontSize: fontSize.fontSize16,
    color: colors.green,
    fontFamily: 'Inter-Regular',
  },
  titleWarn: {
    fontSize: fontSize.fontSize16,
    color: colors.yellow,
    fontFamily: 'Inter-Regular',
  },
  titleInfo: {
    fontSize: fontSize.fontSize16,
    color: colors.blue,
    fontFamily: 'Inter-Regular',
  },
  desStyle: {
    fontSize: fontSize.fontSize16,
    color: colors.black,
    fontFamily: 'Inter-Regular',
  },
});

export default Notifer;
