import {StyleSheet, Text, View, Button, TextInput, FlatList, TouchableHighlight} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {schemaOeuvre} from "../../../verif/oeuvre"
import db from "../../../firebaseConfig"
import DateTimePicker from '@react-native-community/datetimepicker'
import {addDoc, collection} from 'firebase/firestore'
import {ProfilContext} from "../../../context/profilContext";
import {useIsFocused} from "@react-navigation/native";

const CreateOeuvre = ({navigation}) => {

    const isFocused = useIsFocused()

    const {profil} = useContext(ProfilContext)

    const [image, setImage] = useState("")
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [auteur, setAuteur] = useState("")
    const [dt_creation, setDtCreation] = useState(new Date())
    const [erreurs, setErreurs] = useState([]);
    const [showDtPicker, setShowDtPicker] = useState(false)

    useEffect(function () {
        if (profil.role == "redacteur") {
            setAuteur(profil.email)
        }
    }, [isFocused])

    const handleSubmit = async () => {
        const oeuvre = {image, nom, description, auteur, dt_creation}
        const {error} = schemaOeuvre.validate(oeuvre, {abortEarly: false});
        setErreurs([]);
        if (!error) {
            await addDoc(collection(db, "oeuvre"), oeuvre);
            setImage("")
            setNom("")
            setDescription("")
            setAuteur("")
            setDtCreation(new Date())
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
        <View>
            <Text>Créer une nouvelle oeuvre</Text>
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
            <Button title="créer" onPress={handleSubmit}/>
            <FlatList
                data={erreurs}
                renderItem={function ({item}) {
                    return <Text style={{color: 'red'}}>{item}</Text>
                }}
            />
            <View style={{marginTop: 10}}>
                <Button onPress={function () {
                    navigation.goBack()
                }} title="retour à l'accueil" color="purple"/>
            </View>
        </View>
    );
}

export default CreateOeuvre;

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
