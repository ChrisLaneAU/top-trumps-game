# Welcome to Top Trumps Game

This is a simple app for creating Top Trumps decks and playing with your friends.

## Demo

See the demo app at: https://top-trumps-game.web.app/

## Getting started

1. Install dependencies by running:

```sh
yarn
```

2. Create a Firebase project following this [setup guide](https://firebase.google.com/docs/web/setup), make sure to include a realtime database.

3. Copy the Firebase config object generated during setup.

4. Create a file `/src/api/firebaseConfig.js`

5. The contents of this new file should be (replace the `'...'` with your own config object from step 3):

```js
const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};

export default firebaseConfig;
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn deploy`

This will build and deploy your project to Firebase.
