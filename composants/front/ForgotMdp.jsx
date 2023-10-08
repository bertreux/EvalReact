import {View, Button, TextInput, StyleSheet, FlatList, Text} from "react-native";
import {useState} from "react";
import db from '../../firebaseConfig';
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {schemaUser} from "../../verif/user";

const ForgotMdp = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreurs, setErreurs] = useState([]);

    const handleSubmit = async () => {
        const user = {email, password}
        const {error} = schemaUser.validate(user, {abortEarly: false})
        if (!error) {
            const q = query(collection(db, "user"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q)
            const userList = [];
            querySnapshot.forEach((doc) => {
                userList.push(doc.id)
            })
            if (userList.length > 0) {
                userList.map(function (item, key) {
                    const oeuvreRef = doc(db, "user", item);
                    updateDoc(oeuvreRef, {
                        password: user.password
                    });
                })
                setEmail("")
                setPassword("")
                navigation.navigate('login')
                return;
            } else {
                setErreurs(["Email inconnu"])
            }
        } else {
            const tableauErreurs = error.details.map(function (item) {
                return item.message
            });
            setErreurs(tableauErreurs);
        }
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200}}>
            <TextInput placeholder="email" style={style.input} value={email} onChangeText={function (text) {
                setEmail(text);
                setErreurs([]);
            }}/>
            <TextInput placeholder="new password" style={style.input} value={password} onChangeText={function (text) {
                setPassword(text);
                setErreurs([]);
            }}/>
            <View style={{marginTop:20,marginBottom:20}}>
                <Button onPress={handleSubmit} title="change password"/>
            </View>
            <FlatList
                data={erreurs}
                renderItem={function ({item}) {
                    return <Text style={{color: 'red'}}>{item}</Text>
                }}
            />
        </View>
    );
}

export default ForgotMdp;

const style = StyleSheet.create({
    input: {
        borderWidth: 2, borderColor: 'black',
        paddingVertical: 5, paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10, width: 250, backgroundColor: 'white'
    },
})