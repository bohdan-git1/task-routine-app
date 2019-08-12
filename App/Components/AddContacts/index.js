import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import AddContact from "../AddContact";
import CreateNewContact from "../CreateNewContact";
import {ContactsSectionList} from "../SelectableContactsSectionList";
export default class AddContacts extends Component {
    static propTypes = {
        selectedContacts: PropTypes.array,

    }

    static defaultProps = {
        selectedContacts: []
    }

    renderContactItem = ({item, index}) => {
        return <AddContact item={item}/>
    }


    render () {
        const { selectedContacts, onSelectContact, contact } = this.props

        return <View style={styles.mainContainer}>
            <CreateNewContact onSelectContact={onSelectContact} contact={contact}/>
            <FlatList data={selectedContacts}
                      keyExtractor={(item, indx) => String(item.id || indx)}
                      renderItem={this.renderContactItem}
                      extraData={selectedContacts} />
        </View>
    }
}
