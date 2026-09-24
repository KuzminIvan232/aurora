import { Text, View, ScrollView, Switch } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { useTheme } from '@hooks/useTheme';
import { makeStyles } from './styles';
import ThemeSwitch from '@components/ThemeSwitch';
import LangSwitch from '@components/LangSwitch';
import { enableBiometrics, disableBiometrics, BiometricError } from '@services/biometrics';
import { loadBiometricsEnabled, saveBiometricsEnabled } from '@services/biometricStorage';

const PLURAL_DEMO_COUNTS = [1, 2, 5, 11, 21, 22, 105];

function SettingsScreen() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();
    const [biometricsEnabled, setBiometricsEnabled] = useState(false);
    const [isBiometricsBusy, setIsBiometricsBusy] = useState(false);

    useEffect(() => {
        loadBiometricsEnabled().then(setBiometricsEnabled);
    }, []);

    const handleToggleBiometrics = async (value: boolean) => {
        setIsBiometricsBusy(true);

        try {
            if (value) {
                const publicKey = await enableBiometrics();
                await saveBiometricsEnabled(true, publicKey);
            } else {
                await disableBiometrics();
                await saveBiometricsEnabled(false);
            }
            setBiometricsEnabled(value);
        } catch (error) {
            showMessage({
                message: 'Biometrics',
                description: error instanceof BiometricError
                    ? error.message
                    : 'Unable to change biometric settings',
                type: 'warning',
            });
        } finally {
            setIsBiometricsBusy(false);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{t('common.settings')}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theme</Text>
                    <ThemeSwitch />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Language</Text>
                    <LangSwitch />
                </View>

                <View style={styles.section}>
                    <View style={styles.biometricRow}>
                        <Text style={styles.sectionTitle}>Biometric Access</Text>
                        <Switch
                            value={biometricsEnabled}
                            onValueChange={handleToggleBiometrics}
                            disabled={isBiometricsBusy}
                            trackColor={{ false: colors.section, true: colors.accent }}
                            thumbColor={colors.background}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Перевірка множини</Text>
                    {PLURAL_DEMO_COUNTS.map((count) => (
                        <Text key={count} style={styles.row}>
                            {t('courses', { count })}
                        </Text>
                    ))}
                </View>

                <Text style={styles.greeting}>{t('greeting', { name: 'Іван' })}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default observer(SettingsScreen);
