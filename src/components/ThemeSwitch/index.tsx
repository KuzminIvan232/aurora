import { Pressable, Text, View } from 'react-native';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from './styles';
import { useTheme } from '@hooks/useTheme';
import { themeStore, ThemeMode } from '@store/theme/state';
import { setThemeMode } from '@store/theme/actions';

const OPTIONS: { mode: ThemeMode; label: string }[] = [
    { mode: 'light', label: 'Світла' },
    { mode: 'dark', label: 'Темна' },
    { mode: 'system', label: 'Системна' },
];

function ThemeSwitch() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);

    return (
        <View style={styles.track}>
            {OPTIONS.map((option) => {
                const isActive = option.mode === themeStore.mode;

                return (
                    <Pressable
                        key={option.mode}
                        style={[styles.option, isActive && styles.optionActive]}
                        onPress={() => setThemeMode(option.mode)}
                    >
                        <Text style={isActive ? styles.labelActive : styles.label}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default observer(ThemeSwitch);
