import { NavigatorScreenParams } from "@react-navigation/native";

export type PublicStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
}

export type PrivateStackParamList = {
    Dashboard: undefined;
    Profile: { userId: string };
}

export type AppStackParamList = {
    AppInit: undefined;
    PublicStack: NavigatorScreenParams<PublicStackParamList>;
    PrivateStack: NavigatorScreenParams<PrivateStackParamList>;
};