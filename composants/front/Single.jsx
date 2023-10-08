import {Image, Text, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {useState, useEffect} from "react";
import db from '../../firebaseConfig';
import {doc, getDoc, Timestamp} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";

const Single = ({route}) => {

    const isFocused = useIsFocused()

    const [oeuvre, setOeuvre] = useState([])
    const [dt_creation, setDtCreation] = useState({})

    useEffect(() => {
        getDoc(doc(db, 'oeuvre', route.params.idOeuvre)).then(function (SnapShot) {
            setOeuvre({...SnapShot.data(), id: SnapShot.id})
            setDtCreation(new Timestamp(SnapShot.data().dt_creation.seconds, SnapShot.data().dt_creation.nanoseconds))
        })
    }, [isFocused]);

    return (
        <ScrollView>
            <View style={{padding: 5, alignItems: "center"}}>
                <Text style={style.title}>{oeuvre.nom}</Text>
                <View style={style.imageContainer}>
                    <Image source={{uri: oeuvre.image}} style={style.image} />
                </View>
                <Text style={style.description}>{oeuvre.description}</Text>
                <Text>Cette oeuvre a été publiée par {oeuvre.auteur}</Text>
                {Object.keys(dt_creation).length === 0 ? <Text>Date non connue</Text> :
                    <Text>Publiée le {dt_creation.toDate().toLocaleDateString("fr-FR")}</Text>}
            </View>
        </ScrollView>
    );
}

export default Single;

const windowWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 30, marginBottom: 40, marginTop: 20
    },
    description: {marginTop: 50, fontWeight: '500', fontSize: 15, marginBottom: 30},
    imageContainer: {
    height: 400,
    width: windowWidth - 20,
    },
    image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    },
})