import {View, Button, TextInput, StyleSheet, TouchableHighlight, Text, FlatList} from "react-native";
import {useContext, useEffect, useState} from "react";
import db from '../../firebaseConfig';
import {collection, getDocs, query, where} from "firebase/firestore";
import {schemaUser} from "../../verif/user";
import {ProfilContext} from "../../context/profilContext";
import {useIsFocused} from "@react-navigation/native";

const Login = ({navigation}) => {

    const isFocused = useIsFocused();
    const {login, profil} = useContext(ProfilContext)
    const [email, setEmail] = useState("redac@yahoo.fr");
    const [password, setPassword] = useState("azerty1234");
    const [erreurs, setErreurs] = useState([]);

    useEffect(function () {
        if (profil.isLogged == true) {
            navigation.navigate('gestion')
        }
    }, [isFocused])

    const handleSubmit = async () => {
        const user = {email, password}
        const {error} = schemaUser.validate(user, {abortEarly: false})
        if (!error) {
            const q = query(collection(db, "user"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q)
            const userList = [];
            querySnapshot.forEach((doc) => {
                userList.push(doc.data())
            })
            if (userList.length > 0) {
                userList.map(function (item, key) {
                    if (user.password == item.password) {
                        login(item)
                        navigation.navigate('gestion')
                        setEmail("")
                        setPassword("")
                        return;
                    }else{
                        setErreurs(["Email ou mot de passe non valide"])
                        return ;
                    }
                })
                
            } else {
                setErreurs(["Email ou mot de passe non valide"])
            }
        } else {
            const tableauErreurs = error.details.map(function (item) {
                return item.message
            });
            setErreurs(tableauErreurs);
        }
    }

    const handleClickForgot = () => {
        navigation.navigate('forgotMdp')
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200}}>
            <TextInput placeholder="email" style={style.input} value={email} onChangeText={function (text) {
                setEmail(text);
                setErreurs([]);
            }}/>
            <TextInput placeholder="password" style={style.input} value={password} onChangeText={function (text) {
                setPassword(text);
                setErreurs([]);
            }}/>
            <TouchableHighlight
                onPress={handleClickForgot}
                style={style.btn}>
                <Text style={style.text}>
                    Mot de passe oublié
                </Text>
            </TouchableHighlight>
            <Button onPress={handleSubmit} title="login"/>
            <FlatList
                data={erreurs}
                renderItem={function ({item}) {
                    return <Text style={{color: 'red'}}>{item}</Text>
                }}
            />
        </View>
    );
}

export default Login;

const style = StyleSheet.create({
    input: {
        borderWidth: 2, borderColor: 'black',
        paddingVertical: 5, paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10, width: 250, backgroundColor: 'white',
    },
    btn: {marginBottom: 20, justifyContent:'center'},
    text: {fontWeight: 'bold'},
})