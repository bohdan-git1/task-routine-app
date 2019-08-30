import styles from './styles'
import React, {Component} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import TaskItem from "../../Components/TaskItem";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";
import {Actions} from "react-native-router-flux";
import DraggableFlatList from 'react-native-draggable-flatlist'

export default class SelectTaskOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
        }
    }

    renderTaskItem = ({item, index, move, moveEnd, isActive}) => {
        return <TaskItem index={index} item={item} move={move} moveEnd={moveEnd}/>
    }

    render() {
        const {tasks} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <DraggableFlatList
                    data={tasks}
                    renderItem={this.renderTaskItem}
                    keyExtractor={item => String(item.id)}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.setState({ tasks: data })}
                />
                <View style={styles.createRouteButtonContainer}>
                    <RoundedButton onPress={Actions.createRoute} text={strings.createRoute} />
                </View>
            </SafeAreaView>
        )
    }
}
