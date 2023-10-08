import {Timestamp, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {useEffect, useState, useContext} from "react";
import db from '../../../firebaseConfig';
import {Button, FlatList, Image, Text, View, StyleSheet} from "react-native";
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
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
            <Button onPress={() => {
                navigation.navigate("gestion")
            }} title="retour au menu des gestion" color="purple"/>
            </View>
            <View style={{flex:1,borderColor: 'black', borderWidth:4, marginTop:5, marginBottom: 5}}></View>
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
                <Button onPress={() => {
                navigation.navigate("create-oeuvre")
            }} title="ajouter une oeuvre"/>
            </View>
            {profil.role == 'admin' ? <Text style={style.title}>Toutes les oeuvres : </Text> : <Text style={style.title}>Vos oeuvres : </Text>}
            <FlatList
                style={{marginBottom: 260}}
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
                            <View style={{marginLeft: 50, marginTop: 10, marginBottom: 10}}>
                                <Image source={{uri: item.image, width: 150, height: 100}}/>
                            </View>
                            <View style={{marginStart: 5, flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: 'red', marginTop: 4}}> ID : </Text>
                                <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 18}}>{item.id}</Text>
                            </View>
                            <View style={{marginStart: 5, flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: 'red', marginTop: 4}}> NOM : </Text>
                                <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 18}}>{item.nom}</Text>
                            </View>
                        </View>
                    </View>
                }}
            />
        </View>
    );
}

export default GestionOeuvre;

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 20, marginBottom: 15, marginTop: 20, marginLeft: 5
    },
})