import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import {Actions} from 'react-native-router-flux'

import styles from './styles'
import DrawerHeader from "./DrawerHeader";
import {connect} from "react-redux";
import DrawerItem from "./DrawerItem";
import strings from "../../Constants/strings";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Metrics from "../../Themes/Metrics";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
class DrawerComponent extends Component {
    render(){
        const { user } = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <DrawerHeader user={user} />
                <DrawerItem title={strings.profile}
                            IconClass={EvilIcons}
                            onPress={Actions.userProfile}
                            iconSize={Metrics.icons.mediumI}
                            iconName={'user'} />
                <DrawerItem title={strings.reportBug}
                            IconClass={MaterialIcons}
                            iconName={'bug-report'} />
                <DrawerItem title={strings.settings} onPress={Actions.settings} />
                <DrawerItem title={strings.logout}
                            IconClass={MaterialCommunityIcons}
                            iconName={'logout'} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({user: { user } = {}}) => {
    return {
        user
    }
}

export default connect(mapStateToProps, null)(DrawerComponent)
