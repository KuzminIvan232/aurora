import { Linking } from 'react-native';
import type { LinkingOptions } from '@react-navigation/native';
import type { AppStackParamList } from '@interfaces/navigation';
import { restoreSession } from '@services/session';
import { isPrivateRoute } from './utils';
import { config } from './config';

export const linking: LinkingOptions<AppStackParamList> = {
    prefixes: ['aurora://app', 'https://aurora.dev'],
    config,
    async getInitialURL() {
        const url = await Linking.getInitialURL();

        if (isPrivateRoute(url)) {
            try {
                await restoreSession();
            } catch {
                return null;
            }
        }

        return url;
    },
    subscribe(listener) {
        const sub = Linking.addEventListener('url', async ({ url }) => {
            if (isPrivateRoute(url)) {
                try {
                    await restoreSession();
                } catch {
                    return;
                }
            }
            listener(url);
        });

        return () => sub.remove();
    },
};