import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import AddContact from "../AddContact";
import CreateNewContact from "../CreateNewContact";

export default class AddContacts extends Component {
    static propTypes = {
        selectedContacts: PropTypes.array
    }

    static defaultProps = {
        selectedContacts: []
    }

    renderContactItem = ({item, index}) => {
        return <AddContact item={item} onDelete={() => this.onDeleteContact(item)}
                           onEdit={() => this.onEditContact(item)}/>
    }

    onEditContact = (item) => {
        const { onEditContact } = this.props
        onEditContact(item)
    }

    onDeleteContact = (item) => {
        const { onDeleteContact } = this.props
        onDeleteContact(item)
    }

    render () {
        const { selectedContacts, onSelectContact, contact, onAddContact } = this.props

        return <View style={styles.mainContainer}>
            <CreateNewContact onSelectContact={onSelectContact}
                              onAddContact={onAddContact}
                              contact={contact}/>
            <FlatList data={selectedContacts}
                      style={styles.selectedContactsContainer}
                      keyExtractor={(item, indx) => String(
                          item.recordID || item.phone || indx
                      )}
                      renderItem={this.renderContactItem}
                      extraData={{selectedContacts, props: this.props}} />
        </View>
    }
}
