import {View, Text, FlatList, Image, Button, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import db from '../../firebaseConfig';
import {collection, getDocs} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";

const Accueil = ({navigation}) => {

    const isFocused = useIsFocused()

    const [oeuvre, setOeuvre] = useState([])

    useEffect(() => {
        getDocs(collection(db, "oeuvre"))
            .then(function (snapShot) {
                const data = [];
                snapShot.docs.map(function (doc) {
                    data.push({...doc.data(), id: doc.id})
                })
                setOeuvre(data);
            })
    }, [isFocused]);

    const handleClick = (id) => {
        navigation.navigate('single', {idOeuvre: id})
    }

    return (
        <View>
            <Text style={style.title}>Ensemble des oeuvres du musée : </Text>
            <FlatList
                style={{marginBottom: 100}}
                data={oeuvre}
                renderItem={function ({item, key}) {
                    return <View key={key}
                                 style={{borderWidth: 1, borderBlockColor: "black", padding: 5, alignItems: "center"}}>
                        <Text style={style.oeuvreName}>{item.nom}</Text>
                        <Image source={{uri: item.image, width: 250, height: 150}}/>
                        <View style={{marginTop: 20, marginBottom: 20}}>
                            <Button onPress={() => handleClick(item.id)} color="orange" title="Voir les détails"/>
                        </View>
                    </View>
                }}/>
        </View>
    );
}

export default Accueil;

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 20, marginBottom: 20, marginTop: 20
    },
    oeuvreName: {marginBottom: 10, fontWeight: 'bold', fontSize: 20},
})