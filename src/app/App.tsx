import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigator } from "../navigations/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../hooks";
import LoadingModal from "../components/modal/LoadingModal";

const App = () => {
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent />
        <LoadingModal />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>;
};
export default App;
