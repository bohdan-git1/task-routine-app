import styles from './styles'
import React, {Component} from 'react'
import {SafeAreaView, View} from 'react-native'
import TaskItem from "../../Components/TaskItem";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";
import DraggableFlatList from 'react-native-draggable-flatlist'
import RouteActions from "../../Redux/RouteRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";

class SelectTaskOrder extends Component {
    constructor(props){
        super(props)
        const {route: {selectedTasks = []} = {}} = this.props
        this.state = {
            tasks: selectedTasks
        }
    }

    renderTaskItem = ({item, index, move, moveEnd, isActive}) => {
        return <TaskItem index={index} item={item} move={move} moveEnd={moveEnd}/>
    }

    createRoute = () => {
        let {tasks} = this.state
        let {createRoute} = this.props
        tasks = tasks.map((item, index) => {
            return {id: item.id, order: index}
        })
        const {route: {date, name, stepCoordinates}} =this.props || {}
        createRoute({date, name, stepCoordinates, noOfTask: tasks.length, tasks})
    }

    render() {
        const {tasks} = this.state
        const {fetching} = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <DraggableFlatList
                    data={tasks}
                    scrollPercent={5}
                    renderItem={this.renderTaskItem}
                    keyExtractor={item => String(item.id)}
                    onMoveEnd={({ data }) => this.setState({ tasks: data })}
                />
                <View style={styles.createRouteButtonContainer}>
                    <RoundedButton onPress={this.createRoute} text={strings.createRoute} />
                </View>
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({route: {fetching}}) => {
    return {fetching}
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRoute: (route) => dispatch(RouteActions.createRoute(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTaskOrder)
