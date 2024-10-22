import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import RNModal from 'react-native-modal';

interface ModalFCProps {
  isVisible?: boolean;
  children?: React.ReactNode;
  stModal?: StyleProp<ViewStyle>;
  onModalHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
}

const Modal = ({
  isVisible,
  stModal,
  children,
  onModalHide,
  onBackButtonPress,
  onBackdropPress,
}: ModalFCProps) => {
  return (
    <RNModal
      useNativeDriver
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onModalHide={onModalHide}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      style={[styles.modal, stModal]}>
      {children}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
});

export default Modal;
