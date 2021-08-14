# [Core Components and Native Components](https://reactnative.dev/docs/intro-react-native-components)

React Native 를 사용하면, 자바스크립트로 iOS 및 android 플랫폼의 APIs 에 액세스하고, React 컴포넌트를 사용한 UI 의 모양과 행동을 describe 할 수 있다.

## view

a view 는 UI의 기본적인 빌딩 블록으로서, 스크린에 있는 작은 사각형 요소이다. — 이 작은 요소로 text, images 를 표시하고, 사용자 입력에 반응한다.

![Diagram of Android and iOS app showing them both built on top of atomic elements called views.](https://reactnative.dev/docs/assets/diagram_ios-android-views.svg)

android 및 iOS 앱에서 사용되는 많은 views 예제

## Native Components

android 에서는 Kotlin 또는 Java 로 view 를 작성하고, iOS 에서는 Swift 또는 Objective-C 로 view 를 작성한다.

- React Native 를 사용하여, React 컴포넌트들을 사용한 JavaScript 로 이러한 views 를 불러올 수 있다.
- React Native 가 이러한 React 컴포넌트들을 같은 android 및 iOS 의 views 로 만들어 준다.
- 이렇게 React Native 가 사용 준비가 되도록 만들어 놓은 컴포넌트들을 Native Components 라고 부른다.

Native Components 중에서 React Native가 당장 사용할 수 있도록 만든 주요한 Native Components 들을 Core Components 라고 한다.

## [Core Components]()

| React Native  | android view  | ios View        | web 유사성             | description                                                                                             |
| ------------- | ------------- | --------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| \<View>       | \<ViewGroup>  | \<UIView>       | a non-scrolling \<div> | flex box, style, touch handlings, accessibility controls 속성이 있는 layout 을 지원하는 **a container** |
| \<Text>       | \<TextView>   | \<UITextView>   | \<p>                   | text의 displys, styles, nests strings 및 touch events 처리                                              |
| \<Image>      | \<ImageView>  | \<UIImageView>  | \<img>                 | 다양한 타입의 image를 display                                                                           |
| \<ScrollView> | \<ScrollView> | \<UIScrollView> | \<div>                 | 여러 컴포넌트 및 views 가 있는 a generic scrolling container                                            |
| \<TextInput>  | \<EditText>   | \<UITextField>  | \<input type=“text”>   | 사용자가 text 를 입력                                                                                   |

![A diagram showing React Native's Core Components are a subset of React Components that ship with React Native.](https://reactnative.dev/docs/assets/diagram_react-native-components.svg)

## 개발 환경 셋업

| no  | 구분                                                                     | 설명          |
| --- | ------------------------------------------------------------------------ | ------------- |
| 1   | $ npx react-native init reactNativeOrg                                   |               |
| 2   | $ cd reactNativeOrg                                                      |               |
| 3   | $ yarn add react-dom                                                     | web 환경 구축 |
|     | $ yarn add -D @babel/core @babel-loader @babel/preset-react              |               |
|     | $ yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin |               |
|     | $ touch webpack.config.js                                                | create        |

webpack.config.js

```tsx
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    open: true,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
};
```

| no  | 구분                 | 설명               |
| --- | -------------------- | ------------------ |
|     | $ touch package.json | web 환경 구축 계속 |

package.json

- scripts: build-react, start-react 추가

```json
{
  "name": "reactnativeorg",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "build-react": "webpack --mode production",
    "start-react": "webpack serve --config ./webpack.config.js --mode development",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "17.0.1",
    "react-native": "0.64.2",
    "react-native-web": "^0.17.1"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/runtime": "^7.12.5",
    "@react-native-community/eslint-config": "^2.0.0",
    "babel-jest": "^26.6.3",
    "eslint": "7.14.0",
    "html-webpack-plugin": "^5.3.2",
    "jest": "^26.6.3",
    "metro-react-native-babel-preset": "^0.64.0",
    "react-test-renderer": "17.0.1",
    "webpack": "^5.50.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  },
  "jest": {
    "preset": "react-native"
  }
}
```

| no  | 구분                      | 설명               |
| --- | ------------------------- | ------------------ |
|     | $ touch public/index.html | web 환경 구축 계속 |

public/index.html

```tsx
<!DOCTYPE html>
<html>
  <head>
    <title>React Native Web</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

| no  | 구분                 | 설명               |
| --- | -------------------- | ------------------ |
|     | $ touch index.web.js | web 환경 구축 계속 |

index.web.js

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.web';

ReactDOM.render(<App />, document.getElementById('app'));
```

| no  | 구분               | 설명               |
| --- | ------------------ | ------------------ |
|     | $ touch App.web.js | web 환경 구축 계속 |

App.web.js

```tsx
import React from 'react';

function App() {
  return (
    <>
      <h1>Hello world from react</h1>
    </>
  );
}

export default App;
```

| no  | 구분                        | 설명               |
| --- | --------------------------- | ------------------ |
|     | $ yarn add react-native-web | web 환경 구축 계속 |
|     | $ touch webpack.config.js   |                    |

```tsx
resolve: {
  alias: {
    'react-native$': 'react-native-web',
  },
},
```

```tsx
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    open: true,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
};
```

| no  | 구분         | 설명         |
| --- | ------------ | ------------ |
|     | package.json | final update |

package.json

```json
{
  "name": "reactnativeorg",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "build-react": "webpack --mode production",
    "start-react": "webpack serve --config ./webpack.config.js --mode development",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "17.0.1",
    "react-dom": "^17.0.2",
    "react-native": "0.64.2",
    "react-native-web": "^0.17.1"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/preset-react": "^7.14.5",
    "@babel/runtime": "^7.12.5",
    "@react-native-community/eslint-config": "^2.0.0",
    "babel-jest": "^26.6.3",
    "babel-loader": "^8.2.2",
    "eslint": "7.14.0",
    "html-webpack-plugin": "^5.3.2",
    "jest": "^26.6.3",
    "metro-react-native-babel-preset": "^0.64.0",
    "react-test-renderer": "17.0.1",
    "webpack": "^5.50.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  },
  "jest": {
    "preset": "react-native"
  }
}
```

| no  | 구분               | 설명               |
| --- | ------------------ | ------------------ |
|     | $ touch App.web.js | web 환경 구축 계속 |

App.web.js

```tsx
import React from 'react';
import {View, Text} from 'react-native';

function App() {
  return (
    <View>
      <Text>Hello world from react</Text>
    </View>
  );
}

export default App;
```

## 이제 모든 환경에서 App.js 를 사용하도록 수정

| no  | 구분            | 설명   |
| --- | --------------- | ------ |
| 1   | $ rm App.web.js |        |
| 2   | $ touch App.js  | update |

App.js

```tsx
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world from React Naitve Web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

| no  | 구분                 | 설명   |
| --- | -------------------- | ------ |
| 3   | $ touch index.web.js | update |

index.web.js

```tsx
import App from './App.web' > './App'
```

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('app'));
```

| no  | 구분                  | 설명 |
| --- | --------------------- | ---- |
| 4   | $ npm run start-react | run  |

## Exercises

**1) Curly Braces**

App.js

```tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import SectionListBasics from './components/SectionListBasics';

function App() {
  return (
    <View style={styles.container}>
      <SectionListBasics />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

components/SectionListBasics.js

```tsx
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};
export default SectionListBasics;
```

## Troubleshooting

**1) Port already in use**

Metro 번들러는 port 8081 에서 실행한다.

- 그런데, 이미 이 port 를 다른 process 가 사용하고 있는 경우, 해당 process 를 terminate 할 수 있거나, 번들러가 사용하는 port 를 변경할 수 있다.

| no  | 구분                                  | 설명                                                                                                                                                                   |
| --- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | $ sudo lost -i 8081                   | 해당 port를 terminate 하는 경우, 먼저 PID 를 찾고                                                                                                                      |
|     | $ kill -9 \<PID>                      | 해당 PID 를 kill 한다.                                                                                                                                                 |
| 2   | $ npx react-native start \--port=8080 | 디폴트 8081 port 를 8080 port 로 change 한다.                                                                                                                          |
|     |                                       | 또한, 새로운 port 에서 JavaScript bundle을 load 하도록, 당신의 애플리케이션을 update 해야 한다.                                                                        |
|     |                                       | 만약, Xcode의 device 에서 실행하는 경우에는, node_modules/react-native/React/React.xcodeproj/project.pbxproj 파일에서 당신이 선택한 port 로 8081을 update 하여야 한다. |

**2) npm locking error**

React Native CLI 를 사용하는 경우, npm WARN locking Error: EACCES 라는 에러를 만나게 되면, 다음 명령을 실행한다.

```sh
$ sudo chown -R $USER ~/.npm
$ sudo chown -R $USER /usr/local/lib/node_modules
```

**3) Missing libraries for React**

수작업으로 React Native 를 당신의 프로젝트에 추가하였다면, RCTText.xcodeproj, RCTImage.xcodeproj 와 같은 연관된 모든 dependencies 를 포함하는지를 확인해야 한다.

- 그런 다음, 이러한 dependencies 에 의해 만들어진 binaries 가 당신의 app binary에 link 되어져야만 한다.
- Xcode project settings 에 있는 “Linked Frameworks and Binaries” 섹션을 사용한다.
- 구체적인 단계들은 [Linking Libraries](https://reactnative.dev/docs/linking-libraries-ios#content) 를 참조한다.

만약 CocoaPods를 사용하고 있으면, Podfile 에 대한 subpecs 와 함게 React 를 추가하였는지를 확인한다.

- 예를 들면, \<Text />, \<Image />, fetch() APIs를 사용하고 있다면, 이것들을 당신의 Podfile 에 add 해야만 한다.

```tsx
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

- 그런 다음, pod install 을 실행하고, 설치된 React와 함께 당신의 프로젝트에 Pods/ 디렉토리가 만들어진다.
- CocoaPods 는 이후로 generate 된 .xcworkspace 파일을 사용하여 이러한 설치된 dependencies 를 사용하라고 지시할 것이다.

**<u>React Native does not compile when being used as a Cocoapod</u>**

a dependency manager 를 사용할 때, differences 에 기인한 source code 의 어떠한 potential post-fixing 을 처리하는 [cocoapods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native) 라고 하는 a CocoaPods 플러그인이 있다.

**<u>Argument list too long: recursive header expansion failed</u>**

프로젝트의 build settings 에서, “User Search Header Paths”와 “Header Search Paths” 라는 2개의 configs가 있는데, Xcode 가 코드에서 지정된 #import header files 를 찾는 곳을 지정한다.

- Pods 에서, CocoaPods 는 디폴트 특정 폴더들의 배열을 사용하여, 찾는다.
- 이러한 특별한 config가 overwritten 되지 않아야 하고, configure 된 폴더들의 어떠한 것도 너무 커서는 안된다.
- 만약 폴더들 중의 하나가 너무 큰 폴더이면, Xcode 가 전체 디렉토리를 recursive 하게 검색을 하고, 어느 지점에서는 상기와 같은 에러를 throw 할 것이다.

“User Search Header Paths”와 “Header Search Paths” 라는 build settings를 CocoaPods가 설정한 그들의 디폴트들로 revert 하려면, Build Settings 패널에 있는 entry를 선택하고, 그것을 delete 한다.

- 이렇게 하면, custom override 를 remove 하고, CocoaPod 디폴트들을 return 할 것이다.

**3) No transports available**

React Native 는 WebSockets 에 대한 a polyfill을 구현하고 있다.

- 이러한 [polyfills](https://github.com/facebook/react-native/blob/master/Libraries/Core/InitializeCore.js) 는 import React from ‘react’ 를 통해, 당신의 앱에 당신이 포함한 react-native module 의 부분으로 초기화된다.
- 만약 WebSocket 에 필요한 [Firebase](https://github.com/facebook/react-native/issues/3645) 와 같은 또 다른 모듈을 load 하려면, react-native 다음에 이것을 load/require 해야 한다.

```tsx
import React from 'react';
import Firebase from 'firebase';
```

## Shell Command Unresponsive Exception

만약 다음과 같은 ShellCommandUnresponsiveException 이라는 exception에 마주치면, android/build.gradle 에서 [downgrading your Gradle version to 1.2.3](https://github.com/facebook/react-native/issues/2720) 을 시도하라

```sh
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

## react-native init hangs

만약 npx react-native init 이 당신의 시스템에서 계속 끝나지 않고 실행하고 있다면, 다음을 시도하고, [#2797](https://github.com/facebook/react-native/issues/2797) 을 참조한다.

```sh
$ npx react-native init --verbose
```

## Unable to start react-native package manager (on Linux)

**<u>CASE 1: Error “code”: “ENOSPC”,”errno”:”ENOSPC</u>**

Linux 의 watchmane 에 의해서 사용된 디렉토리 [inotify](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)의 갯수에 의해서 원인이 되는 이슈는 모니터할 수 있다.

- 이것을 해결하려면, 당신의 터미널에서 다음 명령을 실행한다.

```sh
$ echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

# [Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)

a cross-platform 앱을 만들 때, 가능한 한 많은 코드를 재사용하기를 바랄 것이다.

- 예를 들면, android 및 iOS 에 대하여, 별도의 비주얼 컴포넌트들을 구현하기를 원할 것이다.

React Native 는 2가지 방식을 제공하여, 플랫폼 별로 당신의 코드를 체계화하고 분리한다.

| no  | 구분                                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | [`Platform` module](https://reactnative.dev/docs/platform-specific-code#platform-module) 사용하기                              |
| 2   | [platform-specific file extensions](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions) 사용하기 |

특정 컴포넌트들은 오직 하나의 플랫폼에서만 작동하는 속성들을 가진다.

- 이러한 모든 속성들은 @platfrorm 으로 주석되고, 웹사이트에서는 이러한 속성들 옆에 작은 badge를 가진다.

## Platform module

React Native 는 앱이 실행되는 플랫폼을 detect 하는 a module 을 제공하고 있다.

- 이러한 detection logic을 사용하여, platform-specific code 를 구현할 수 있다.
- a component 의 small parts만이 platform-specific 할 때, 다음과 같은 option 을 사용한다.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

또한, Platform.select 메서드를 사용할 수 있다.

- keys 가 ‘ios’ | ‘android’ | ‘native’ | ‘default’ 중의 하나가 될 수 있는 주어진 객체에서, 당신이 현재 실행하고 있는 platform 의 가장 적합한 value를 return 한다.
- 즉, a phone 에서 실행하는 경우, ios 및 android 라는 keys가 preference 를 take 할 것이다.
- 만약 이러한 것이 지정되지 않으면, native 라는 key 가 사용될 것이고, 아니면 그 다음으로 default key 가 사용될 것이다.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

- 모든 platforms 에서 flex: 1 이 되고, iOS 에서는 red background color, android 에서는 green background color, 다른 platforms 에서는 blue background color 를 가지는 a container 가 된다.

다음과 같은 경우에는 any value 도 accept 하기 때문에 이것을 사용하여, platform-specific components를 return 한다.

```tsx
const Component = Platfomr.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Comonent />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

**<u>Detecting the Android version</u>**

android 에서는 Platform 모듈이 또한 사용되어 앱이 실행하는 android platform의 version을 detect 할 수 있다.

```tsx
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

**<u>Detecting the iOS version</u>**

iOS 에서는 Version은 -[UIDevice systemVersion]의 결과이고, os의 현재 version 이 있는 문자열을 가리킨다.

- system version 의 예는 “10.3” 이다.
- 예를 들머, iOS에 있는 major verion을 detect 하려면 다음과 같이 하면 된다.

```tsx
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

## Platform-specific extensions

당신의 platform-specific code 가 점점 더 복잡해지면, 당신은 code 를 별도의 파일들로 splitting 하는 것을 고려해야 한다.

- React Native 는 언제 어떤 파일이 .ios 또는 .android 확장자들을 가지는 지를 detect 하고, 다른 컴포넌트들에서 필요해질 때, 관련 플랫폼 파일을 load 할 것이다.

예를 들면, 당신의 프로젝트에 다음과 같은 파일들이 있다고 가정한다.

```sh
BigButton.ios.js
BigButton.android.js
```

- 다음과 같이 컴포넌트들이 필요해질 수 있다.

```tsx
import BigButton from './BigButton';
```

React Native 가 자동적으로 실행 플랫폼에 기반하여 올바른 파일을 pick 할 것이다.

## Native-specific extensions (i.e. sharing code with NodeJS and Web)

어떤 모듈이 NodeJS/Web 그리고 React Native 간에 공유되어져 하고, Android/iOS 차이들은 없는 경우, .native.js 확장자들을 사용할 수 있다.

- 특히, React Native 와 ReactJS 간에 공유디는 common code 를 가지는 프로젝트들에서 매우 유용하다.

예를 들면, 당신의 프로젝트에 다음과 같은 파일들이 있다고 가정한다.

```sh
Container.js # picked up by Webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

- 다음가 같이 .native 확장자 없이 여전히 이것을 필요할 수 있다.

```tsx
import Container from './Container';
```

> Pro tip: 당신의 production bundle 에서 사용되지 않는 코드를 가지지 못하도록 하기 위해서는 .native.js 확장자들을 ignore 하도록, 당신의 Web bundler 를 configure 한다.
>
> - 그렇게 하면, final bundle size 를 줄일 수 있다.

# More Resources

알아야 할 것들이 항상 있다. : developer workflow, shipping to app stores, internationalization, security 등등

| no  | 구분                                                                                |
| --- | ----------------------------------------------------------------------------------- |
| 1   | [Set up your environment](https://reactnative.dev/docs/environment-setup)           |
| 2   | [Set up your development workflow](https://reactnative.dev/docs/running-on-device)  |
| 3   | [Design and layout your app](https://reactnative.dev/docs/flexbox)                  |
| 4   | [Debug your app](https://reactnative.dev/docs/debugging)                            |
| 5   | [Make your app cross platform](https://reactnative.dev/docs/platform-specific-code) |
| 6   | [Get involved in the React Native community](https://reactnative.dev/help)          |

## Dive Deep

| no  | 구분                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | [React’s Documentation](https://reactjs.org/docs/hello-world.html)                                                  |
| 2   | [MDN’s JavaScript tutorials, reference, and guides](https://developer.mozilla.org/en-US/docs/Web/JavaScript)        |
| 3   | [Android](https://developer.android.com/docs) 및 [iOS](https://developer.apple.com/documentation/uikit) 플랫폼 문서 |

## Platform to try

| no  | 구분                                                                                               |
| --- | -------------------------------------------------------------------------------------------------- |
| 1   | [Expo](https://docs.expo.io/)                                                                      |
| 2   | [Ignite](https://github.com/infinitered/ignite)                                                    |
|     | [Ignite Bowser](https://github.com/infinitered/ignite-bowser) : MobX-State-Tree, React Navigation, |

## Example Apps

| no  | 구분                                                                                  |
| --- | ------------------------------------------------------------------------------------- |
| 1   | [Showcase](https://reactnative.dev/showcase)                                          |
| 2   | [set of example apps on GitHub](https://github.com/ReactNativeNews/React-Native-Apps) |
