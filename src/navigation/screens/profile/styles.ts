import { StyleSheet } from 'react-native';
import { Colors } from '@utils/colors';

export const makeStyles = (colors: Colors) => {
    return StyleSheet.create({
        root: {
            flex: 1,
        },
        container: {
            padding: 24,
            paddingBottom: 40,
        },
        button: {
            backgroundColor: colors.section,
            padding: 12,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 24,
        },
        buttonLabel: {
            fontFamily: 'Manrope-Medium',
            fontSize: 16,
            color: colors.primary,
        },
    });
};
