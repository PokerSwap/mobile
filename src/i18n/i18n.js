import i18n from 'i18n-js';
import { en, es } from './locales';
import {NativeModules} from 'react-native';

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;

console.log(deviceLanguage); //en_US

var myLanguage;
if(deviceLanguage == 'en_US'){
  myLanguage = 'en'
} else if(deviceLanguage == 'es_US') {
  myLanguage = 'es'
} else {
  myLanguage = 'en'
}

i18n.defaultLocale = myLanguage;
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en, es };

export default i18n;
