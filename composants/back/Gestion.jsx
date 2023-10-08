import {Button, ScrollView, Text, View} from "react-native";
import {ProfilContext} from "../../context/profilContext"
import {useContext} from "react";

const Gestion = ({navigation}) => {

    const {profil, logout} = useContext(ProfilContext)

    const handleClickOeuvres = () => {
        navigation.navigate('gestion-oeuvre')
    }

    const handleClickUsers = () => {
        navigation.navigate('gestion-user')
    }

    const handleClickLogout = () => {
        logout()
        navigation.navigate('accueil')
    }

    return (
        <ScrollView>
            <Text style={{marginTop: 60, fontSize: 15, marginLeft: 5}}>Menu disponible(s) pour votre role : </Text>
            <View style={{margin:20, marginTop:20, borderColor: 'black', borderWidth:2}}>
                <Button title="gestion des oeuvres" onPress={handleClickOeuvres}/>
            </View>
            {profil.role == "admin" && <View style={{margin:20, borderColor: 'black', borderWidth:2}}><Button title="gestion des users" onPress={handleClickUsers}/></View>}
            <View style={{flex:1,borderColor: 'black', borderWidth:4, marginTop:60}}></View>
            <View style={{margin:10, marginTop: 60}}>
                <Text>Vous êtes connecté en tant que : </Text>
                <Text style={{fontWeight:'bold', fontSize:20, marginBottom:10}}>{profil.email}</Text>
                <View style={{borderColor: 'black', borderWidth:2}}>
                    <Button title="deconnexion" onPress={handleClickLogout} color="purple"/>
                </View>
            </View>
            
            
            
        </ScrollView>
    );
}

export default Gestion;