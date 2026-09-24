import type { LinkingOptions } from '@react-navigation/native';
import type { AppStackParamList } from '@interfaces/navigation';

export const config: LinkingOptions<AppStackParamList>['config'] = {
    screens: {
        PublicStack: {
            initialRouteName: 'Welcome',
            screens: {
                Login: 'login',
                Welcome: '*',
            },
        },
        PrivateStack: {
            initialRouteName: 'Dashboard',
            screens: {
                Dashboard: 'dashboard',
                Profile: 'profile/:userId',
            },
        },
    },
};