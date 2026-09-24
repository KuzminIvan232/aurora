import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
        },
        title: {
            color: colors.primary,
            marginBottom: 24,
            fontFamily: 'Manrope-bold',
            fontSize: 48,
        },
    });
};
