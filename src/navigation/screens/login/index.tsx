import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeStyles } from './styles';
import { replace } from '@navigation/navigationUtils';
import { saveSession } from "@services/session";
import { observer } from 'mobx-react-lite';
import { useTheme } from "@hooks/useTheme";

function LoginScreen() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

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
                <Text>Login</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default observer(LoginScreen);
