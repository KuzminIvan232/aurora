import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        button: {
            backgroundColor: colors.section,
            padding: 12,
            borderRadius: 12,
        },
        title: {
            color: colors.primary,
            marginBottom: 24,
            fontFamily: 'Manrope-bold',
            fontSize: 48,
        },
    });
};
