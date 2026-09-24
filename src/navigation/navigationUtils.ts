import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { AppStackParamList } from "@interfaces/navigation";
import { CommonActions } from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<RouteName extends keyof AppStackParamList>(
    name: RouteName,
    params?: AppStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate({ name, params }));
    }
}

export function replace<RouteName extends keyof AppStackParamList>(
    name: RouteName,
    params?: AppStackParamList[RouteName]
) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}