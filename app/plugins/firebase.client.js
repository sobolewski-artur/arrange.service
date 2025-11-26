import { getApp, initializeApp } from "firebase/app"
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyCrG62mbzgUwYUP9VNOJE4PUKI8yLme-4c",
        authDomain: "arrange-day1.firebaseapp.com",
        projectId: "arrange-day1",
        storageBucket: "arrange-day1.firebasestorage.app",
        messagingSenderId: "320709279280",
        appId: "1:320709279280:web:501c5b616cdec7b48c37f5",
        measurementId: "G-0PVZ8ZW0G9"
    }
    initializeApp(firebaseConfig)
    initializeFirestore(getApp(),{ localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
})