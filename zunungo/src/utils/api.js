import { initializeApp, } from 'firebase/app';
import { doc, getFirestore, collection, getDocs, setDoc, query, where, deleteDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import 'react-toastify/dist/ReactToastify.css';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAotxs6VLPQ_YeSjkbUjynk9EfdXv-mLOU",
    authDomain: "zunungo-ec53e.firebaseapp.com",
    projectId: "zunungo-ec53e",
    storageBucket: "zunungo-ec53e.appspot.com",
    messagingSenderId: "774256174199",
    appId: "1:774256174199:web:d1464d0c0bde1467d35272",
    measurementId: "G-LGEQH7N542"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

const storage = getStorage();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

const getCurrentUser = async (uid, next) => {

    const user = auth.currentUser;

    if (user) {
        getUserData(user, next);
    } else {
        next({ status: false, data: null });
    }
}

const signOut = async () => {
    auth.signOut();
}


const signup = async (dt, next) => {
    const authentication = getAuth();

    createUserWithEmailAndPassword(authentication, dt.email, dt.password).then((response) => {
        console.log(response)
        sessionStorage.setItem('zAuthToken', response._tokenResponse.refreshToken);
        sessionStorage.setItem('zAuthUID', response.user.uid);

        // dt.token = response._tokenResponse.refreshToken
        dt.uid = response.user.uid;
        addNewUserData(dt, next);
    }).catch((error) => {
        console.log(error)
        if (error.code === 'auth/email-already-in-use') {
            toast.error('Email déjà utilisé. Veuillez vous connecter / Email Already in Use');
        } else {
            toast.error("Une erreur s'est produite ! Veuillez réessayer plus tard / Unable to create! Please try again later");
        };
        next({ status: false, token: null })
    });
}

const login = async (dt, next) => {
    const authentication = getAuth();

    signInWithEmailAndPassword(authentication, dt.email, dt.password).then((response) => {
        console.log(response)
        sessionStorage.setItem('zAuthToken', response._tokenResponse.refreshToken);
        sessionStorage.setItem('zAuthUID', response.user.uid);
        dt.token = response._tokenResponse.refreshToken;
        dt.uid = response.user.uid;
        getUserData(dt, next);
    })
        .catch((error) => {
            console.log('error: ', error.code);
            toast.error('Email ou mot de passe incorrect / Incorrect email or password');
            // if (error.code === 'auth/wrong-password') {
            //     toast.error('Email ou mot de passe incorrect / Incorrect email or password');
            // }
            // if (error.code === 'auth/user-not-found') {
            //     toast.error('Email ou mot de passe incorrect / Incorrect email or password');
            // }
            next({ status: false, token: null })
        })
}

const addNewUserData = async (dt, next) => {
    dt.password = null;
    try {
        const ref = doc(db, 'users', dt.uid);
        setDoc(ref, dt, { merge: true });
        console.log("Document successfully written!");
        toast.done("Account created!");
        next({ status: true, data: dt });
    } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Error writing document: ", error);
        next({ status: false, data: null })
    }

}

const updateApplicationData = async (dt, isAdmin, next) => {
    try {
        const ref = doc(db, 'application-datas', dt.uid);
        setDoc(ref, dt, { merge: true });
        console.log("Document successfully written!");
        toast.done("Sauvegarder! / Saved!");

        next({ status: true, data: dt });
        getUserData(dt, (res) => {
            if (res.status) {
                var user = res.data[0]
                var subject = '';
                var msg = "";
                console.log("user: ", user)
                if (isAdmin) {
                    subject = "DV 2024 - Le statut de votre dossier a changé sur le groupe Zunungo."
                    if (dt.status == 'Incomplète') {
                        msg = `Veuillez revoir et corriger vos informations sur le groupe zunungo. Nous remarquons que certaines informations clés sont manquantes ou incorrectes. Veuillez vous connecter à votre compte et compléter vos informations <br /> Please review and correct your information sur zunungo group. We notice that some key information are missing or incorrect. <br /> Please login to your account and complete your information`
                    } else if (dt.status == 'Complété') {
                        msg = `Votre application pour la lotterie Visa DV-2024 a été soumise avec succès <br /> You application for DV-2024 was successfully submitted`
                    } else if (dt.status == 'En cour de traitement') {
                        msg = `Nous traitons actuellement votre candidature pour DV-2024 <br /> We are currently handling your application for DV-2024`
                    }
                } else {
                    if (dt.status == 'Resoumis') {
                        subject = `Vous avez une nouvelle re-soumission`
                    } else if (dt.status == 'Reçue Par Zunungo') {
                        subject = `Vous avez une nouvelle soumission`
                    }

                    msg = `Date: ${dt.update_date} <br /> Client: ${user.nom} <br /> ${user.prenom} <br /> email: ${user.email} <br /> phone: ${user.phone} <br /> id: ${dt.uid}`
                }

                fetch("https://6irf3427n4.execute-api.us-east-2.amazonaws.com/sendEmail",
                    {
                        mode: "no-cors",
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            from: "contact@zunungo-group.com",
                            to: isAdmin ? user.email : "contact@zunungo-group.com",
                            message: msg,
                            date: new Date(),
                            subject: subject,
                            clientName: user.nom + " " + user.prenom,
                            contact: '+1 (347) 884 3554'
                        })
                    }
                )
            }
        });

    } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Error writing document: ", error);
        next({ status: false, data: null })
    }

}

const getUserData = async (dt, next) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", dt.uid));
        const querySnapshot = await getDocs(q);
        var d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ ...doc.data(), id: doc.id })
        });
        next({ status: true, data: d });

    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null })
    }
}


const getUserApplications = async (dt, next) => {
    try {
        const q = query(collection(db, "application-datas"), where("uid", "==", dt.uid));
        const querySnapshot = await getDocs(q);
        var d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ ...doc.data(), id: doc.id })
        });
        next({ status: true, data: d });

    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null })
    }
}


const getAllApplications = async (next) => {
    try {
        const q = query(collection(db, "application-datas"));
        const querySnapshot = await getDocs(q);
        var d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ ...doc.data(), id: doc.id })
        });
        next({ status: true, data: d });

    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null })
    }
}

const updateCatType = async (dt, next) => {
    console.log("updateCatType: ", dt)
    try {
        const ref = doc(db, 'file-categories', dt.catId.toString());
        setDoc(ref, dt, { merge: true });
        console.log("Document successfully written!");
        toast.done("Account created!");
        next({ status: true, data: dt });
    } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Error writing document: ", error);
        next({ status: false, data: null })
    }
}

const getAllFilesCategories = async (next) => {
    try {
        const q = query(collection(db, "file-categories"));
        const querySnapshot = await getDocs(q);
        var d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ ...doc.data(), id: doc.id })
        });
        next({ status: true, data: d });

    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null })
    }
}

const getUserFiles = async (dt, next) => {
    try {
        const q = query(collection(db, "user-files"), where("uid", "==", dt.uid));
        const querySnapshot = await getDocs(q);
        var d = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            d.push({ ...doc.data(), id: doc.id })
        });
        next({ status: true, data: d });

    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null, error })
    }
}

const uploadFiles = async (dt, next) => {
    try {
        var path = 'files/' + dt.name + dt.file.name;
        const storageRef = ref(storage, path);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, dt.file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                next({ status: true, data: downloadURL });
                console.log('File available at', downloadURL);
            });

        });
    } catch (error) {
        console.log("Error getting documents: ", error);
        toast.error("Error getting document: ", error);
        next({ status: false, data: null, error })
    }
}

const addUserFilesRecord = async (dt, next) => {
    try {
        console.log("addUserFilesRecord: ", dt)
        const ref = doc(db, 'user-files', dt.name);
        setDoc(ref, dt, { merge: true });
        console.log("Document successfully written!");
        toast.done("File uploaded!");
        next({ status: true, data: dt });
    } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Error writing document: ", error);
        next({ status: false, data: null, error })
    }

}

const deleteFile = async (dt, next) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, 'files/' + dt.name + dt.original_name);

    // Delete the file
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        deleteFilesRecord(dt, next);
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log()
        toast.error("Une erreur inattendue est apparue: ", error);
        next({ status: false, data: null, error })
    });
}

const deleteFilesRecord = async (dt, next) => {
    try {
        await deleteDoc(doc(db, "user-files", dt.name));
        toast.done("votre fichier a été supprimé avec succès! / Your file has been successfully deleted!");
        next({ status: true, data: {} });
    } catch (error) {
        toast.error("Une erreur inattendue est apparue: ", error);
        next({ status: false, data: null, error })
    }
}



export {
    getUserData,
    addNewUserData,
    login,
    signup,
    updateApplicationData,
    getUserApplications,
    getAllApplications,
    getAllFilesCategories,
    updateCatType,
    getCurrentUser,
    getUserFiles,
    signOut,
    uploadFiles,
    addUserFilesRecord,
    deleteFilesRecord,
    deleteFile
};