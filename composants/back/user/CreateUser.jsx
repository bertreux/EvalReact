import {StyleSheet, Text, View, Button, TextInput, FlatList, Switch} from 'react-native'
import React, {useState} from 'react'
import {schemaUserCrud} from "../../../verif/user"
import db from "../../../firebaseConfig"
import {collection, addDoc, getDocs, query, where} from "firebase/firestore"

const CreateUser = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(false);
    const [erreurs, setErreurs] = useState([]);
    const handleSubmit = async () => {
        const user = {email, password, role}
        const {error} = schemaUserCrud.validate(user, {abortEarly: false});
        setErreurs([]);
        if (!error) {
            const q = query(collection(db, "user"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q)
            const test = [];
            querySnapshot.forEach((doc) => {
                test.push(doc.id)
            })
            if (test.length > 0) {
                setErreurs(["attention email est déjà utilisé"])
                return;
            }
            if (user.role === true) {
                user.role = "admin"
            } else {
                user.role = "redacteur"
            }
            await addDoc(collection(db, "user"), user);
            setEmail("")
            setPassword("")
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
        <View>
            <Text>Créer un nouveau profil user</Text>
            <TextInput placeholder="email" onChangeText={function (text) {
                setEmail(text);
                setErreurs([]);
            }} value={email} style={styles.input}/>
            <TextInput placeholder="password" onChangeText={function (text) {
                setPassword(text);
                setErreurs([]);
            }} value={password} style={styles.input}/>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text>Etes-vous un admin ? </Text>
                <Switch
                    style={{marginLeft: 20, top: -13}}
                    onValueChange={toggleSwitch}
                    value={role}
                />
            </View>
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

export default CreateUser;

const styles = StyleSheet.create({
    input: {
        borderColor: "black", padding: 10, borderWidth: 2, marginVertical: 10
    }
})
