# Welcome to Top Trumps Game

This is a simple app for creating Top Trumps decks and playing with your friends.

## Demo

See the demo app at: https://top-trumps-game.web.app/

## Getting started

1. Install dependencies by running:

```sh
yarn
```

2. Install firebase command line tools:

```sh
npm i -g firebase-tools
```

3. Create a Firebase project following this [setup guide](https://firebase.google.com/docs/web/setup), make sure to include a realtime database.

4. Copy the Firebase config object generated during setup.

5. Create a file in the root of the project called `.env`

6. Copy the contents of the `.env.example` file across to your new `.env` file and fill out the values from the config object you got from step 4. All of the variables are prefixed with `REACT_APP_` and converted to upper snake case. For example, `apiKey` becomes `REACT_APP_API_KEY`.

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
