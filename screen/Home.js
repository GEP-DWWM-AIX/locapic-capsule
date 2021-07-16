import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = (props) => {
    const [pseudo, setPseudo] = useState('')

    useEffect(() => {
        const getMyPseudo = async () => {
            await AsyncStorage.getItem('pseudo', (error, data) => {
                if(!error){
                    console.log('data from localStorage: ', data)
                    props.getPseudo(data)
                }    
            })
        }
        getMyPseudo()
    }, [])

    const handleClick = (userName) => {
        //console.log(userName)
        //props.getPseudo(userName)
        AsyncStorage.getItem('pseudo', userName)
        props.navigation.navigate('bottomTabNav')
    }

    return (
        <ImageBackground style={styles.container}>
            <Input
                inputStyle={{ width: '70%' }}
                color="gray"
                placeholder="Ex: Tony Stark"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(value) => setPseudo(value)}
                value={pseudo}
            />
            <Button
                icon={
                    <Icon
                        name="arrow-right"
                        size={30}
                        color="white"
                    />
                }
                title="Go to Map"
                onPress={() => handleClick(pseudo)}
            />
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

function mapDispatchToProps(dispatch) {
    return {
        getPseudo: function (userPseudo) {
            dispatch({ type: 'savePseudo', pseudo: userPseudo })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Home)
