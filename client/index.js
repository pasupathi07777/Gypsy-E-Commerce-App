// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import { Provider } from 'react-redux'
// import { store } from './src/app/store';

// const RNRedux = () => (
  

//     <Provider store={store}>
//       <App />
//     </Provider>
// )

// AppRegistry.registerComponent(appName, () => RNRedux);
/**
 * @format
 */

import { AppRegistry, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const RNRedux = () => (



  <Provider store={store}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <ScrollView> */}
        <App />
        {/* </ScrollView> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </Provider>

);

AppRegistry.registerComponent(appName, () => RNRedux);
