/**
 * @format
 */
// global.PaymentRequest = require('react-native-payments').PaymentRequest;

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
