import { useMemo } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeStyles } from './styles';

import { ActivityIndicator } from "react-native";
import { useSession } from "@hooks/useSession";
import { useTheme } from "@hooks/useTheme";
import { observer } from 'mobx-react-lite';

function AppInitScreen() {
    useSession();
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Aurora</Text>
            <ActivityIndicator size="large" color={colors.muted} />
        </SafeAreaView>
    )
}

export default observer(AppInitScreen);
