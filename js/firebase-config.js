// Firebase Web App config for Cypress Flips.
// Values copied from your Firebase SDK setup.

export const firebaseConfig = {
    apiKey: "AIzaSyAeGbPEaHxrBuc8yxygq9rZJsV8YIQmgms",
    authDomain: "cypressflips.firebaseapp.com",
    projectId: "cypressflips",
    storageBucket: "cypressflips.firebasestorage.app",
    messagingSenderId: "338456218836",
    appId: "1:338456218836:web:71561dba7c9bb75ce2ff41",
    measurementId: "G-ZPYCT2XX88"
};

export function isFirebaseConfigured() {
    return Boolean(
        firebaseConfig.apiKey &&
        !firebaseConfig.apiKey.startsWith("REPLACE_") &&
        firebaseConfig.projectId &&
        !firebaseConfig.projectId.startsWith("REPLACE_")
    );
}
