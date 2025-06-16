# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Important Note

After every changes done natively we have to run the following command:

```bash
npx expo start -c
```
For bundle cache clearing

To run the json server locally for the app data to fetch and show inside the app
```bash
npx json-server db.json
```

## Developement build creation using EAS

For local development build I have used EAS.
We have to sign-in inside the Expo account and configure the 
EAS for our project following the Expo official documentation.
Follow all the steps as provided inside the documentation

https://docs.expo.dev/tutorial/eas/configure-development-build/

You have to install the expo-dev-client using the command:
```bash
npx expo install expo-dev-client
```

Then using the following command create a development build:
```bash
eas build --platform android --profile development
```

You will get the build created inside the Expo Dashboard overview section
From there you can download the build or share with the QA members.
