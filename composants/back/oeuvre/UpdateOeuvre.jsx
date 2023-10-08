import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableHighlight} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import {schemaOeuvre} from "../../../verif/oeuvre"
import db from "../../../firebaseConfig"
import {getDoc, updateDoc, doc, Timestamp} from "firebase/firestore"
import DateTimePicker from '@react-native-community/datetimepicker'
import {useIsFocused} from "@react-navigation/native";
import {ProfilContext} from "../../../context/profilContext";

const UpdateOeuvre = ({route, navigation}) => {

    const isFocused = useIsFocused()

    const {profil} = useContext(ProfilContext)

    const [id, setId] = useState("");
    const [image, setImage] = useState("")
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [auteur, setAuteur] = useState("")
    const [dt_creation, setDtCreation] = useState(new Date())
    const [erreurs, setErreurs] = useState([]);
    const [showDtPicker, setShowDtPicker] = useState(false)

    useEffect(function () {
        const id = route.params.id;
        setId(id);
        getDoc(doc(db, "oeuvre", id)).then(function (snapShot) {
            const {image, nom, description, auteur, dt_creation} = snapShot.data()
            setDtCreation(new Timestamp(dt_creation.seconds, dt_creation.nanoseconds).toDate());
            setNom(nom);
            setImage(image);
            setDescription(description);
            setAuteur(auteur);
        })
    }, [isFocused])

    const handleSubmit = async () => {
        const oeuvre = {image, nom, description, auteur, dt_creation}
        const {error} = schemaOeuvre.validate(oeuvre, {abortEarly: false});
        setErreurs([]);
        if (!error) {
            await updateDoc(doc(db, "oeuvre", id), oeuvre)
            navigation.push('gestion-oeuvre');
        } else {
            const tableauErreurs = error.details.map(function (item) {
                return item.message
            });
            setErreurs(tableauErreurs);
        }
    }

    const onChange = (event, selectedValue) => {
        setShowDtPicker(false);
        const currentDate = selectedValue || new Date();
        setDtCreation(currentDate);
        setErreurs([]);
    }

    return (
        <View style={{marginTop: 30}}>
            <TextInput placeholder="image" onChangeText={function (text) {
                setImage(text);
                setErreurs([]);
            }} value={image} style={styles.input}/>
            <TextInput placeholder="nom" onChangeText={function (text) {
                setNom(text);
                setErreurs([]);
            }} value={nom} style={styles.input}/>
            <TextInput placeholder="description" onChangeText={function (text) {
                setDescription(text);
                setErreurs([]);
            }} value={description} style={styles.input}/>
            {profil.role == "admin" && <TextInput placeholder="auteur" onChangeText={function (text) {
                setAuteur(text);
                setErreurs([]);
            }} value={auteur} style={styles.input}/>}
            <View style={{flexDirection: "row"}}>
                <TextInput placeholder="date de création" editable={false} value={dt_creation.toDateString()}
                           style={styles.inputDate}/>
                <TouchableHighlight
                    onPress={function () {
                        setShowDtPicker(true)
                    }}
                    style={styles.btn}>
                    <Text style={styles.text}>
                        Choisir la date
                    </Text>
                </TouchableHighlight>
            </View>
            {showDtPicker && <DateTimePicker
                value={dt_creation}
                onChange={onChange}
                mode={'date'}
            />}
            <View style={{margin:20, marginTop:30, borderColor: 'black', borderWidth:2}}>
            <Button title="modifier" onPress={handleSubmit} color="orange"/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center"}}>
            <FlatList
                data={erreurs}
                renderItem={function ({item}) {
                    return <Text style={{color: 'red'}}>{item}</Text>
                }}
            />
            </View>
            <View style={{flex:1,borderColor: 'black', borderWidth:4, marginTop:20}}></View>
            <View style={{margin:20, marginTop:30, borderColor: 'black', borderWidth:2}}>
                <Button onPress={function () {
                    navigation.goBack()
                }} title="retour à l'accueil" color="purple"/>
            </View>
        </View>
    );
}

export default UpdateOeuvre;

const styles = StyleSheet.create({
    input: {
        borderColor: "black", padding: 10, borderWidth: 2, marginVertical: 10
    },
    inputDate: {
        borderColor: "black", padding: 10, borderWidth: 2, marginVertical: 10, flex: 1, marginRight: 10
    },
    btn: {
        backgroundColor: 'blue', height: 30, marginRight: 10, alignContent: 'center', marginTop: 17, borderRadius: 5
    },
    text: {
        color: 'white', marginLeft: 10, marginRight: 10, marginTop: 5
    }
})