import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App).
// This app relies on native modules not included in Expo Go, so be sure to run
// it with a custom dev client using `npx expo run:android` or `npx expo run:ios`.
registerRootComponent(App);
