import { useMemo } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeStyles } from './styles';
import { replace } from '@navigation/navigationUtils';
import { saveSession } from "@services/session";
import { observer } from 'mobx-react-lite';
import { useTheme } from "@hooks/useTheme";
import { useTranslation } from 'react-i18next';

function LoginScreen() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();

    const handleLogin = async () => {
        await saveSession({
            accessToken: 'fake-token',
            refreshToken: 'fake-refresh',
            expiresAt: Date.now() + 500_000,
        });
        replace('PrivateStack');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text>{t('common.login')}</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default observer(LoginScreen);
