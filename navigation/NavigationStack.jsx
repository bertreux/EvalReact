import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotMdp from '../composants/front/ForgotMdp';
import Accueil from '../composants/front/Accueil';
import Single from '../composants/front/Single';
import CreateOeuvre from '../composants/back/oeuvre/CreateOeuvre';
import UpdateOeuvre from '../composants/back/oeuvre/UpdateOeuvre';
import CreateUser from '../composants/back/user/CreateUser';
import UpdateUser from '../composants/back/user/UpdateUser';
import GestionOeuvre from '../composants/back/oeuvre/GestionOeuvre';
import GestionUser from '../composants/back/user/GestionUser';
import Gestion from '../composants/back/Gestion';

const Stack = createNativeStackNavigator()
const NavigationStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen component={Accueil} name="accueil" options={{title: "Accueil"}}/>
            <Stack.Screen component={ForgotMdp} name="forgotMdp" options={{title: "mot de passe oublié"}}/>
            <Stack.Screen component={Single} name="single" options={{title: "Détail oeuvre"}}/>
            <Stack.Screen component={GestionOeuvre} name="gestion-oeuvre" options={{title: "Gestion des oeuvres"}}/>
            <Stack.Screen component={GestionUser} name="gestion-user" options={{title: "Gestion des users"}}/>
            <Stack.Screen component={Gestion} name="gestion" options={{title: "Menu des gestions"}}/>
            <Stack.Screen component={CreateOeuvre} name="create-oeuvre" options={{title: "Créer une oeuvre"}}/>
            <Stack.Screen component={UpdateOeuvre} name="update-oeuvre" options={{title: "Modifier une oeuvre"}}/>
            <Stack.Screen component={CreateUser} name="create-user" options={{title: "Créer un user"}}/>
            <Stack.Screen component={UpdateUser} name="update-user" options={{title: "Modifier un user"}}/>
        </Stack.Navigator>
    );
}
export default NavigationStack;