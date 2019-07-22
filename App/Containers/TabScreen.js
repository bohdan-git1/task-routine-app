import React, {Component} from 'react'
import {ScrollView, StatusBar, Text, TouchableOpacity, View} from 'react-native'
// Styles
import styles from './Styles/TabScreenStyles'
import {Colors} from "../Themes";
import UserActions from "../Redux/UserRedux";
import {connect} from "react-redux";

class TabScreen extends Component {

    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    render() {
        const {title = 'Tab 1'} = this.props
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{title} Screen</Text>
                </ScrollView>
                <TouchableOpacity onPress={this.props.logout}>
                    <Text style={{padding: 25, textAlign: 'center'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(TabScreen)

