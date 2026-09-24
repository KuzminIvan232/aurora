import { Text, View, ScrollView } from 'react-native';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@hooks/useTheme';
import { makeStyles } from './styles';
import ThemeSwitch from '@components/ThemeSwitch';
import LangSwitch from '@components/LangSwitch';

const PLURAL_DEMO_COUNTS = [1, 2, 5, 11, 21, 22, 105];

function SettingsScreen() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const { t } = useTranslation();

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
