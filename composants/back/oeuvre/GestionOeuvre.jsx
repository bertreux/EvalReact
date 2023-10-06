import {Timestamp, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {useEffect, useState, useContext} from "react";
import db from '../../../firebaseConfig';
import {Button, FlatList, Image, Text, View} from "react-native";
import {ProfilContext} from "../../../context/profilContext"
import {useIsFocused} from "@react-navigation/native";

const GestionOeuvre = ({navigation}) => {

    const isFocused = useIsFocused()

    const {profil} = useContext(ProfilContext)
    const [oeuvre, setOeuvre] = useState([]);
    const [updateList, setUpdateList] = useState(false);


    useEffect(() => {
        if (profil.role == "redacteur") {
            getDocs(query(collection(db, "oeuvre"), where("auteur", "==", profil.email)))
                .then(function (querySnapshot) {
                    const data = [];
                    querySnapshot.docs.map(function (doc) {
                        data.push({...doc.data(), id: doc.id})
                    })
                    setOeuvre(data);
                })
        } else {
            getDocs(collection(db, "oeuvre"))
                .then(function (snapShot) {
                    const data = [];
                    snapShot.docs.map(function (doc) {
                        data.push({...doc.data(), id: doc.id})
                    })
                    setOeuvre(data);
                })
        }
    }, [updateList, isFocused]);

    const supprimer = (id) => {
        deleteDoc(doc(db, "oeuvre", id)).then(function () {
            setUpdateList(!updateList);
        });
    }

    return (
        <View>
            <Button onPress={() => {
                navigation.navigate("gestion")
            }} title="retour au menu des gestion"/>
            <Button onPress={() => {
                navigation.navigate("create-oeuvre")
            }} title="ajouter une oeuvre"/>
            <FlatList
                data={oeuvre}
                renderItem={function ({item}) {
                    return <View style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderBlockColor: "black",
                        padding: 5,
                        alignItems: "center"
                    }}>
                        <Button onPress={function () {
                            navigation.navigate("update-oeuvre", {id: item.id})
                        }} color="orange" title=" m "/>
                        <Button onPress={function () {
                            supprimer(item.id)
                        }} color="red" title=" s "/>
                        <View style={{marginLeft: 10}}>
                            <Image source={{uri: item.image, width: 150, height: 100}}/>
                            <Text style={{marginStart: 5}}> ID : {item.id}</Text>
                            <Text style={{marginStart: 5}}> NOM : {item.nom}</Text>
                        </View>
                    </View>
                }}
            />
        </View>
    );
}

export default GestionOeuvre;