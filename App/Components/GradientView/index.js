import React, {Component} from 'react'
import {SafeAreaView} from 'react-native'
// Styles
import styles from './styles'
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../../Themes";
import PropTypes from "prop-types";

export default class GradientView extends Component {
    static propTypes = {
        gradientStyles: PropTypes.object,
    }
    static defaultProps = {
        gradientStyles: {},
    }

    render() {
        const {gradientStyles} = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <LinearGradient start={{x: 0, y: 0.3}} end={{x: 0, y: 0.8}}
                                colors={[Colors.primaryColor, Colors.primaryColorI]} style={[styles.gradientContainer, gradientStyles]}>
                    {this.props.children}
                </LinearGradient>
            </SafeAreaView>
        )
    }
}
