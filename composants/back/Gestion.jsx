import {Button, View} from "react-native";
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
        <View>
            <Button title="gestion des oeuvres" onPress={handleClickOeuvres}/>
            {profil.role == "admin" && <Button title="gestion des users" onPress={handleClickUsers}/>}
            <Button title="deconnexion" onPress={handleClickLogout}/>
        </View>
    );
}

export default Gestion;