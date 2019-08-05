import React, {Component} from 'react';
import Modal from 'react-native-modal';

import styles from './styles';
import PropTypes from 'prop-types';

export default class ModalComponent extends Component {

    static propTypes = {
        isModalVisible: PropTypes.bool,
        closeModal: PropTypes.func,
        onBackdropPress: PropTypes.func,
        modalStyles: PropTypes.object,
        animationIn: PropTypes.string,
        animationOut: PropTypes.string
    };

    static defaultProps = {
        onBackdropPress: ()=>{},
        animationIn: 'slideInUp',
        animationOut: 'slideOutDown'
    };

    render() {
        const { modalStyles, isModalVisible, closeModal, onBackdropPress, animationIn, animationOut } = this.props;
        return (
            <Modal
                style={[styles.modal, modalStyles]}
                animationInTiming={600}
                animationOutTiming={600}
                animationIn={animationIn}
                animationOut={animationOut}
                isVisible={isModalVisible}
                onBackButtonPress={closeModal}
                onBackdropPress={onBackdropPress}
            >
                {this.props.children}
            </Modal>
        );
    }

}
