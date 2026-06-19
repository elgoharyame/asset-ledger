/* Asset Ledger — cloud config.
 *
 * The app runs FULLY LOCAL (no login, no sync) while `firebase` stays null.
 * To turn on two-way desktop<->mobile sync + Google Drive backup, follow
 * SETUP.md, then paste your Firebase web-app config below.
 *
 * NOTE: a Firebase web config is NOT a secret — it only identifies the project.
 * Your data is protected by the Firestore security rules (firestore.rules),
 * which restrict every document to its signed-in owner.
 */
window.LEDGER_CONFIG = {

  // Replace `null` with your Firebase config object, e.g.:
  // firebase: {
  //   apiKey: "AIzaSy...",
  //   authDomain: "asset-ledger-xxxx.firebaseapp.com",
  //   projectId: "asset-ledger-xxxx",
  //   storageBucket: "asset-ledger-xxxx.appspot.com",
  //   messagingSenderId: "000000000000",
  //   appId: "1:000000000000:web:abcdef123456"
  // },
  firebase: {
    apiKey: "AIzaSyDxlOe6UFDKupctE42aUsrY1lPVH2keWos",
    authDomain: "asset-ledger-c23f9.firebaseapp.com",
    projectId: "asset-ledger-c23f9",
    storageBucket: "asset-ledger-c23f9.firebasestorage.app",
    messagingSenderId: "687754293089",
    appId: "1:687754293089:web:50f907d3b0ea1be45d1f20"
  },

  // Also mirror a JSON backup file into your Google Drive every time you
  // press "Record snapshot". Uses the same Google sign-in (drive.file scope:
  // the app can only see files it created — never the rest of your Drive).
  driveBackup: true,
  driveFileName: "asset-ledger-backup.json",
};
