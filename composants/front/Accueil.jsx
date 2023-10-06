import {View, Text, FlatList, Image, Button} from "react-native";
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
            <FlatList
                data={oeuvre}
                renderItem={function ({item, key}) {
                    return <View key={key}
                                 style={{borderWidth: 1, borderBlockColor: "black", padding: 5, alignItems: "center"}}>
                        <Text>{item.nom}</Text>
                        <Image source={{uri: item.image, width: 150, height: 100}}/>
                        <Button onPress={() => handleClick(item.id)} color="orange" title="Voir les détails"/>
                    </View>
                }}/>
        </View>
    );
}

export default Accueil;

