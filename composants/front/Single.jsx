import {Image, Text, View} from "react-native";
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
        <View style={{borderWidth: 1, borderBlockColor: "black", padding: 5, alignItems: "center"}}>
            <Text>{oeuvre.nom}</Text>
            <Image source={{uri: oeuvre.image, width: 150, height: 100}}/>
            <Text>{oeuvre.description}</Text>
            <Text>{oeuvre.auteur}</Text>
            {Object.keys(dt_creation).length === 0 ? <Text>Date non connue</Text> :
                <Text>Créée le {dt_creation.toDate().toLocaleDateString("fr-FR")}</Text>}
        </View>
    );
}

export default Single;