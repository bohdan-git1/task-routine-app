import styles from './styles'
import React, {Component} from 'react'
import VectorIcon from "../../Components/VectorIcon";
import BudgetItem from "../../Components/BudgetItem";
import {FlatList, ImageBackground, SafeAreaView, Text, View} from 'react-native'
import Images from "../../Themes/Images";
import BudgetHeadingItem from "../../Components/BudgetHeadingItem";
import {connect} from "react-redux";
import FamilyMember from "../../Components/FamilyMember";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import BudgetActions from "../../Redux/BudgetRedux";
import CategoryDialog from "../../Components/CategoryDialog";
import {ProgressDialog} from "../../Components/ProgressDialog";

class BudgetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(),
            showDatePicker: false,
            showCategoryDialog: false
        }
    }
    componentDidMount() {
        this.props.getAllCategories()
    }

    renderItem = ({item}) => {
        return <BudgetItem item={item}/>
    }

    renderFamilyMember = ({item, index}) => {
        return (
            <FamilyMember item={item}/>
        )
    }

    showActivityDialog = () => {
        const {showCategoryDialog} = this.state
        this.setState({showCategoryDialog: !showCategoryDialog})
    }

    renderListHeader = () => {
        const {family = {}, categories} = this.props
        let {name, users = []} = family
        users = users.filter(family => family.status === 'active')
        const {date} = this.state
        let totalBudget = 0
        let totalBudgetSpent = 0
       categories.forEach(({budget, totalSpent}) => {
           totalBudget = totalBudget + budget
           totalBudgetSpent = totalBudgetSpent + totalSpent
        })
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
                </ImageBackground>
                <BudgetHeadingItem item={{type: 'TOTAL REMAINING', budget: totalBudget - totalBudgetSpent}} image={Images.budgetToSpent}/>
                <View style={styles.expensesRow}>
                    <BudgetHeadingItem item={{type: 'TOTAL SPENT', budget: totalBudgetSpent}} image={Images.budgetSpent}/>
                    <BudgetHeadingItem item={{type: 'TOTAL BUDGET', budget: totalBudget}} image={Images.budgetTotal}/>
                </View>
                <View style={styles.categoryBar}>
                    <Text style={styles.categoryText}>Category</Text>
                    <VectorIcon name='pluscircleo' type='AntDesign' style={styles.plusIcon} onPress={this.showActivityDialog}/>
                </View>
            </View>
        )
    }

    render() {
        const {fetching, categories} = this.props
        const {showDatePicker, showCategoryDialog} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <FlatList
                    numColumns={2}
                    data={categories}
                    extraData={categories}
                    renderItem={this.renderItem}
                    keyExtractor={item => String(item.id)}
                    ListHeaderComponent={this.renderListHeader}
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
                {showCategoryDialog && <CategoryDialog closeDialog={this.showActivityDialog}/> }
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({budget: {fetching, categories}, family: {family}}) => {
    return {
        fetching, categories, family
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: (params) => dispatch(BudgetActions.getAllCategories(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen)

