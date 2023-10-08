import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import db from '../../../firebaseConfig';
import {Button, FlatList, Text, View, StyleSheet} from "react-native";
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
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
                <Button onPress={() => {
                navigation.navigate("gestion")
            }} title="retour au menu des gestion" color="purple"/>
            </View>
            <View style={{flex:1,borderColor: 'black', borderWidth:4, marginTop:5, marginBottom: 5}}></View>
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
            <Button onPress={() => {
                navigation.navigate("create-user")
            }} title="ajouter un user"/>
            </View>
            <Text style={style.title}>Tous les users : </Text>
            <FlatList
                style={{marginBottom: 350}}
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
                        }} color="orange" title=" m "/>
                        <Button onPress={function () {
                            supprimer(item.id)
                        }} color="red" title=" s "/>
                        <View style={{marginLeft: 10}}>
                        <View style={style.crudCell}>
                            <Text style={style.crudTitle}>ID : </Text>
                            <Text style={style.crudValue}>{item.id}</Text>
                        </View>
                        <View style={style.crudCell}>
                            <Text style={style.crudTitle}>EMAIL : </Text>
                            <Text style={style.crudValue}>{item.email}</Text>
                        </View>
                        <View style={style.crudCell}>
                            <Text style={style.crudTitle}>PASSWORD : </Text>
                            <Text style={style.crudValue}>{item.password}</Text>
                        </View>
                        <View style={style.crudCell}>
                            <Text style={style.crudTitle}>ROLE : </Text>
                            <Text style={style.crudValue}>{item.role}</Text>
                        </View>  
                        </View>
                    </View>
                }}
            />
        </View>
    );
}

export default GestionUser;

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold', fontSize: 20, marginBottom: 15, marginTop: 20, marginLeft: 5
    },
    crudTitle:{
        fontWeight: 'bold', color: 'red', marginTop: 4
    },
    crudValue:{
        fontWeight: 'bold', color: 'blue', fontSize: 18
    },
    crudCell: {
        marginStart: 5, flexDirection: 'row'
    }
})