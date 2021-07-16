import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { ListItem, Avatar, Input, Icon } from 'react-native-elements'
import socketIOClient from "socket.io-client";
import {connect} from 'react-redux';

const socket = socketIOClient("http://172.16.0.14:3000")

const Chat = (props) => {
    const [message, setMessage] = useState('')
    const [listMessage, setListMessage] = useState([])
    useEffect(() => {
        console.log(props.pseudo)
        socket.on('sendMessageFromBack', (newMessage) => {
            let dataFromServer = {
                pseudo: props.pseudo,
                msg: newMessage
            }
            setListMessage([...listMessage, dataFromServer])
        })
    }, [listMessage])
    //console.log(listMessage)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 50 }}>
            {
                listMessage.map((message, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{ uri: message.avatar_url }} />
                        <ListItem.Content>
                            <ListItem.Title>{message.pseudo}</ListItem.Title>
                            <ListItem.Subtitle>{message.msg}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
            </ScrollView >
            <View>
                <Input
                    placeholder="Ex: Salut les gens"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Button
                    icon={
                        <Icon
                            name="arrow-right"
                            size={15}
                            color="white"
                        />
                    }
                    title="Send"
                    onPress={() => socket.emit("sendMessage", message)}
                />
            </View>
            
        </View>
    );
};

function mapStateToProps(state) {
    return { pseudo: state.pseudo }
}

export default connect(
    mapStateToProps,
    null
)(Chat);