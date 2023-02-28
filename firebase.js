// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getDatabase, ref, child, get, set, push, update, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// See: https://firebase.google.com/docs/web/learn-more#config-object
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjt64j8mtVi9UEpyY2dMUpJ9kHT9XfUlM",
    authDomain: "rtdb-ce214.firebaseapp.com",
    databaseURL: "https://rtdb-ce214-default-rtdb.firebaseio.com",
    projectId: "rtdb-ce214",
    storageBucket: "rtdb-ce214.appspot.com",
    messagingSenderId: "906009944646",
    appId: "1:906009944646:web:8ed0f826d799d9217a2047",
    measurementId: "G-M0PPHM2MKF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase();

// var userId= "uid";
// var uid = "uid";
// var username = "username";
// var picture = "picture.com";
// var title="title";
// var name="username";
// var email="gmail.com";
// var imageUrl="picture.com";
// var body="body"
//RTDB
// writeUserData(userId, "username", email, imageUrl);
// readUserData(userId);
// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase(app);
//     set(ref(db, 'users/' + userId), {
//         username: name,
//         email: email,
//         profile_picture : imageUrl
//     });
// }
// //Write data
// function readUserData(userId){
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
// }
// function writeNewPost(uid, username, picture, title, body) {
//     const db = getDatabase();
  
//     // A post entry.
//     const postData = {
//       author: username,
//       uid: uid,
//       body: body,
//       title: title,
//       starCount: 0,
//       authorPic: picture
//     };
  
//     // Get a key for a new Post.
//     const newPostKey = push(child(ref(db), 'posts')).key;
  
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
//     return update(ref(db), updates);
// }
// writeNewPost(uid, username, picture, title, body);
//  //update databaseURL
// function write(){
//     const db = getDatabase()
//     var artist = "Dwae";
//     var song = "Wrong Lane";
//     var url = "https://dwaeloe.com"
//     const updates = {}
//     updates[artist + '/' + song] = url;
//     return update(ref(db), updates)
// }
// remove(ref(db))
// export {write}
// function readUserData(userId){
//     const dbRef = ref(getDatabase());
//     get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
// }
document.getElementsByClassName("tab")[1].addEventListener("click", () => {
    //Read the database arranged by number of streams
    const dbRef = ref(getDatabase());
    get(child(dbRef, '/')).then((snapshot) => {
        if(snapshot.exists()){
            let data = snapshot.val();
            //run through the database and extract keys and put them in an array
            let array = [];
            for(artist in data){
                let artistL = data[artist]
                for(song in artistL){
                    let result = `${artist.replaceAll("&", "and")}.${song}.${data[artist][song]}`
                    result = result.split('.').reverse().join('.');
                    array.push(result);
                }
            }
            array.sort((a, b) =>a.toString().split('.').shift()-b.toString().split('.').shift())
            for(item in array){
                array[item] = array[item].split('.').slice(1,3).reverse().join('.');
            }
            pass(array.reverse());
        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error);
    })
})
function recStream(){
    //Extract K and X
    let k = media.refine(xxx).k;
    let x = media.refine(xxx).x;
    // Create Path
    const path = `/${k.name.replaceAll(".", "")}/${x.name}`;
    const dbRef = ref(getDatabase());
    get(child(dbRef, path)).then((snapshot) => {
        if(snapshot.exists()){
            let streams = Number(snapshot.val());
            //increase count
            const db = getDatabase();
            let data = {};
            data[path] = streams+1;
            return update(ref(db), data);
        }
        else {
            //Write data to path
            const db = getDatabase()
            let data = {};
            data[path] = 1;
            return update(ref(db), data);
        }
    }).catch((error) => {
        console.error(error)
    })
}
let hasPlayed = [];
document.querySelector("audio").addEventListener("play", () => {
    if(!hasPlayed.includes(xxx)){
        hasPlayed.push(xxx);
        recStream();
    }
})
