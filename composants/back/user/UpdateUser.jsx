import {StyleSheet, Text, View, Button, TextInput, FlatList, Switch} from 'react-native'
import React, {useState, useEffect} from 'react'
import {schemaUserCrud} from "../../../verif/user"
import db from "../../../firebaseConfig"
import {getDoc, updateDoc, doc} from "firebase/firestore"
import {useIsFocused} from "@react-navigation/native";

const UpdateUser = ({navigation, route}) => {

    const isFocused = useIsFocused()

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(false);
    const [erreurs, setErreurs] = useState([]);


    useEffect(function () {
        const id = route.params.id;
        setId(id);
        getDoc(doc(db, "user", id)).then(function (snapShot) {
            const {email, password, role} = snapShot.data()
            setEmail(email);
            setPassword(password);
            if (role === "admin") {
                setRole(true);
            } else {
                setRole(false)
            }
        })
    }, [isFocused])


    const handleSubmit = async () => {

        const user = {email, password, role}
        const {error} = schemaUserCrud.validate(user, {abortEarly: false});
        setErreurs([]);
        if (!error) {
            if (user.role === true) {
                user.role = "admin"
            } else {
                user.role = "redacteur"
            }
            await updateDoc(doc(db, "user", id), user)
            navigation.push('gestion-user');
        } else {
            const tableauErreurs = error.details.map(function (item) {
                return item.message
            });
            setErreurs(tableauErreurs);
        }

    }

    const toggleSwitch = (value) => {
        setRole(value);
        setErreurs([]);
    };

    return (
        <View style={{marginTop: 30}}>
            <TextInput placeholder="email" onChangeText={function (text) {
                setEmail(text);
                setErreurs([]);
            }} value={email} style={styles.input}/>
            <TextInput placeholder="password" onChangeText={function (text) {
                setPassword(text);
                setErreurs([]);
            }} value={password} style={styles.input}/>
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
                <Text>Etes-vous un admin ? </Text>
                <Switch
                    style={{marginLeft: 20, top: -13}}
                    onValueChange={toggleSwitch}
                    value={role}
                />
            </View>
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
                <Button title="modifier" onPress={handleSubmit} color="orange"/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <FlatList
                data={erreurs}
                renderItem={function ({item}) {
                    return <Text style={{color: 'red'}}>{item}</Text>
                }}
                value={role}
            />
            </View>
            
            <View style={{flex:1,borderColor: 'black', borderWidth:4, marginTop:20}}></View>
            <View style={{margin:20, marginTop:30, borderColor: 'black', borderWidth:2}}>
                <Button onPress={function () {
                    navigation.goBack()
                }} title="retour à l'accueil" color="purple"/>
            </View>
        </View>
    )
}

export default UpdateUser;

const styles = StyleSheet.create({
    input: {
        borderColor: "black", padding: 10, borderWidth: 2, marginVertical: 10
    }
})