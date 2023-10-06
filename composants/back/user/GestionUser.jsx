import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import db from '../../../firebaseConfig';
import {Button, FlatList, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";

const GestionUser = ({navigation}) => {

    const isFocused = useIsFocused()

    const [user, setUser] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        getDocs(collection(db, "user"))
            .then(function (snapShot) {
                const data = [];
                snapShot.docs.map(function (doc) {
                    data.push({...doc.data(), id: doc.id})
                })
                setUser(data);
            })
    }, [updateList, isFocused]);

    const supprimer = (id) => {
        deleteDoc(doc(db, "user", id)).then(function () {
            setUpdateList(!updateList);
        });
    }

    return (
        <View>
            <Button onPress={() => {
                navigation.navigate("gestion")
            }} title="retour au menu des gestion"/>
            <Button onPress={() => {
                navigation.navigate("create-user")
            }} title="ajouter un user"/>
            <FlatList
                data={user}
                renderItem={function ({item}) {
                    return <View style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        borderBlockColor: "black",
                        padding: 5,
                        alignItems: "center"
                    }}>
                        <Button onPress={function () {
                            navigation.navigate("update-user", {id: item.id})
                        }} color="orange" title="m"/>
                        <Button onPress={function () {
                            supprimer(item.id)
                        }} color="red" title="s"/>
                        <View style={{marginLeft: 10}}>
                            <Text style={{marginStart: 5}}>ID : {item.id}</Text>
                            <Text style={{marginStart: 5}}>EMAIL : {item.email}</Text>
                            <Text style={{marginStart: 5}}>PASSWORD : {item.password}</Text>
                            <Text style={{marginStart: 5}}>ROLE : {item.role}</Text>
                        </View>
                    </View>
                }}
            />
        </View>
    );
}

export default GestionUser;