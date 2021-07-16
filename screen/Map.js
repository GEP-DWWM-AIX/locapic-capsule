import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Text, View, StyleSheet, Button, Icon } from 'react-native';
import { Overlay, Input } from 'react-native-elements';


const Map = () => {
    const [currentLatitude, setCurrentLatitude] = useState(0)
    const [currentLongitude, setCurrentLongitude] = useState(0)
    const [addPOI, setAddPOI] = useState(false)
    const [listPOI, setListPOI] = useState([])
    const [visible, setVisible] = useState(false);
    const [titleMarker, setTitleMarker] = useState('')
    const [descMarker, setDescMarker] = useState('')
    useEffect(() => {
        const askPermission = async () => {
            const {status} = await Permissions.askAsync(Permissions.LOCATION)
            if(status === 'granted'){
                Location.watchPositionAsync({ distanceInterval: 2 },
                    (location) => {
                        setCurrentLatitude(location.coords.latitude);
                        setCurrentLongitude(location.coords.longitude);
                        //console.log(location)
                    }
                );
            }
        }
        askPermission()
    }, [currentLatitude, currentLongitude])

    const enableDisablePress = () => {
        setAddPOI(true)
    }

    const getCoord = (e) => {
        setAddPOI(false)
        if(addPOI){
            setVisible(true)
            setListPOI([...listPOI, { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, title: titleMarker, desc: descMarker }])
        }
        if(!setAddPOI){
            setVisible(true)
        }
    }


    const handleForm = () => {
        setVisible(false)
        //console.log(listPOI)
    }

    return (
        <View style={{ flex: 1 }}>
            
            <Overlay isVisible={visible} fullScreen={true}>
                <Input 
                    placeholder="Ex: coiffeur"
                    onChangeText={(value) => setTitleMarker(value)}
                    value={titleMarker}
                />
                <Input
                    placeholder="Ex: Il déchire"
                    onChangeText={(value) => setDescMarker(value)}
                    value={descMarker}
                />
                <Button 
                    title="Send"
                    onPress={() => handleForm() }
                    />
            </Overlay>
            <MapView style={{ flex: 1 }}
                onPress={(event) => getCoord(event)}
                initialRegion={{
                    latitude: 43.2983089,
                    longitude: 5.3726036,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType="satellite"
                showsTraffic={true}
            >
                <Marker
                    title="Salut les gens"
                    description="On va bien se marrer !"
                    coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                />
                {
                    listPOI.map((marker) => (
                        <Marker
                            title={marker.title}
                            pinColor={'blue'}
                            description={marker.desc}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        />
                    ))
                }
            </MapView>
            <Button
                title="Add POI"
                color="#eb4d4b"
                type="solid"
                onPress={ () => enableDisablePress() }
            />
        </View>
        
    );
};

export default Map;