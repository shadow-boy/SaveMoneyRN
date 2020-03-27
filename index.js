/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Global from './app/global/index';//首先导入。必须在其他模块导入之前

import App from './app/App';
import Main from './app/components/main/main'
import main_tab from './app/router/bottom-navigation'
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => main_tab);
