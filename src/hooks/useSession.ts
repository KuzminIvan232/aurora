import { restoreSession, clearSession, Session } from '@services/session';
import { useEffect, useState } from 'react';
import { replace } from '@navigation/navigationUtils';
import BootSplash from 'react-native-bootsplash';
import { showMessage } from 'react-native-flash-message';
import { loadThemeMode } from '@services/themeStorage';
import { setThemeMode } from '@store/theme/actions';

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function initSession() {
            setThemeMode(await loadThemeMode());

            try {
                const restored = await restoreSession();
                setSession(restored);
                replace('PrivateStack');
            } catch {
                await clearSession();
                setSession(null);
                replace('PublicStack')
                showMessage({
                    message: 'Access Error',
                    description: 'Session expired, login again',
                    type: 'warning',
                });
            } finally {
                setIsLoading(false);
                await BootSplash.hide({ fade: true });
            }
        }

        initSession();
    }, [])

    return { session, isLoading };
}