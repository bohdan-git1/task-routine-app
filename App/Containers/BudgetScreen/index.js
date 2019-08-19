import styles from './styles'
import React, {Component} from 'react'
import VectorIcon from "../../Components/VectorIcon";
import BudgetItem from "../../Components/BudgetItem";
import {FlatList, ImageBackground, SafeAreaView, Text, View} from 'react-native'
import Images from "../../Themes/Images";
import BudgetHeadingItem from "../../Components/BudgetHeadingItem";
import {Budgets} from "../../DummyData";
import {connect} from "react-redux";
import FamilyMember from "../../Components/FamilyMember";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

class BudgetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(),
            showDatePicker: false
        }
    }

    renderItem = ({item}) => {
        return <BudgetItem item={item}/>
    }

    renderFamilyMember = ({item, index}) => {
        return (
            <FamilyMember item={item}/>
        )
    }

    renderListHeader = () => {
        const {family = {}} = this.props
        const {name, users = []} = family
        const {date} = this.state
        return (
            <View>
                <ImageBackground style={styles.topHeaderImage}
                                 source={Images.bg}>
                    <View style={styles.familyTitleContainer}>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.familyName}>{name}</Text>
                        </View>
                    </View>
                    <View style={styles.familyMembersContainer}>
                        <FlatList data={users}
                                  renderItem={this.renderFamilyMember} horizontal
                                  extraData={this.props.family}/>
                    </View>
                    <Text onPress={() => this.setState({showDatePicker: true})} style={styles.date}>
                        {moment(date).format('MMM DD, YYYY')}
                    </Text>
                </ImageBackground>
                <BudgetHeadingItem item={{type: 'TOTAL REMAINING', budget: '$3780.00'}} image={Images.budgetToSpent}/>
                <View style={styles.expensesRow}>
                    <BudgetHeadingItem item={{type: 'TOTAL SPENT', budget: '$570.00'}} image={Images.budgetSpent}/>
                    <BudgetHeadingItem item={{type: 'TOTAL BUDGET', budget: '$4350.00'}} image={Images.budgetTotal}/>
                </View>
                <View style={styles.categoryBar}>
                    <Text style={styles.categoryText}>Category</Text>
                    <VectorIcon name='pluscircleo' type='AntDesign' style={styles.plusIcon}/>
                </View>
            </View>
        )
    }

    render() {
        const {showDatePicker} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <FlatList
                    numColumns={2}
                    data={Budgets}
                    extraData={Budgets}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderListHeader}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.contentContainerStyle}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
                <DateTimePicker
                    mode='date'
                    is24Hour={false}
                    minimumDate={new Date()}
                    isVisible={showDatePicker}
                    onConfirm={ (date) => this.setState({date, showDatePicker: false})}
                    onCancel={() => this.setState({showDatePicker: false})}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({family: {family}}) => {
    return {
        family
    }
}


export default connect(mapStateToProps, null)(BudgetScreen)

