// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAlu34aQ5DYG4BmvIB5bHGuzSu-VA9fRfM",
    authDomain: "payments-mp.firebaseapp.com",
    databaseURL: "https://payments-mp.firebaseio.com",
    projectId: "payments-mp",
    storageBucket: "payments-mp.appspot.com",
    messagingSenderId: "782868182932"
  }
};
