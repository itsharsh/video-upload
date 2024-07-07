import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
