import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
  request,
  PermissionStatus,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Popup from './Popup';

interface LocationProps {
  handleCancelLocation?: () => void;
}

interface PopupState {
  isVisible: boolean;
  title?: string;
  content?: string;
  cancel?: string;
  accept?: string;
  handleCancel?: () => void;
  handleAccept?: () => void;
}

const Location = ({ handleCancelLocation }: LocationProps) => {
  // const {
  //   locationStore: { handleUpdateLocation },
  // } = useStore();

  const [popup, setPopup] = useState<PopupState>({ isVisible: false });

  useEffect(() => {
    checkLocation();
  }, []);

  const handleOpenSetting = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Confirm permission to use the location',
      cancel: 'Cancel',
      handleCancel: () => {
        setPopup({ isVisible: false });
        if (handleCancelLocation) {
          handleCancelLocation();
        }
      },
      accept: 'Confirm',
      handleAccept: () => {
        openSettings();
      },
    });
  };

  const validStatuses: PermissionStatus[] = [
    RESULTS.UNAVAILABLE,
    RESULTS.DENIED,
    RESULTS.LIMITED,
  ];

  const checkPermissionStatus = (status: PermissionStatus) => {
    return validStatuses?.includes(status);
  };

  const handleRecheckPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await request(permission);

    if (status === RESULTS.GRANTED) {
      handleGetGeolocation();
    } else {
      handleOpenSetting();
    }
  };

  const checkLocation = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      handleGetGeolocation();
    } else if (checkPermissionStatus(status)) {
      handleRecheckPermission();
    } else {
      handleOpenSetting();
    }
  };

  const handleGetGeolocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let body = {
          lat: position?.coords?.latitude,
          lon: position?.coords?.longitude,
        };

        // handleUpdateLocation(body);
      },
      error => { },
      {
        timeout: 2000,
        maximumAge: 10000,
        enableHighAccuracy: false,
      },
    );
  };

  return <Popup {...popup} />;
};

export default Location;
