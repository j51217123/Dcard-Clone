import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk5xQsiVVNII41CIURiUvtnc5QY8qCFVc",
  authDomain: "ocard-15db3.firebaseapp.com",
  projectId: "ocard-15db3",
  storageBucket: "ocard-15db3.appspot.com",
  messagingSenderId: "742165587450",
  appId: "1:742165587450:web:77411f66dfefc3c5b17043",
};

firebase.initializeApp(firebaseConfig);

const getPostsData = () => {
  const db = firebase.firestore();
  const postsRef = db.collection("Posts");
  let postsDocData = [];
  return postsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((postsDoc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(postsDoc.id, " => ", postsDoc.data());
      postsDocData.push(postsDoc.data());
    });
    return postsDocData;
  });
};

const getUserData = (postsDocData) => {
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  let usersDocData = [];

  let promises = [];
  postsDocData.forEach((art) => {
    const promise = usersRef
      .where("uid", "==", art.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((userDoc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(userDoc.id, " => ", userDoc.data());
          usersDocData.push(userDoc.data());
        });
        return usersDocData;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    promises.push(promise);
  });
  return Promise.all(promises);
};

const handleUpload = (e, image, title, content) => {
  const storage = firebase.storage();
  if (image) {
    e.preventDefault();
    console.log(image);
    let uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            pushPost(title, content, url);
          });
      }
    );
  } else {
    e.preventDefault();
    pushPost(title, content);
  }
};

const pushPost = (title, content, url = "") => {
  const db = firebase.firestore();
  const postsRef = db.collection("Posts");

  postsRef
    .add({
      title: title,
      content: content,
      url: url,
      // uid: uid,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const registerMember = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result, "result");
    })
    .catch(function (error) {
      if (error.message === "The email address is badly formatted.") {
        alert("帳號不得為空或必須為電子郵件格式");
      } else if (error.message === "Password should be at least 6 characters") {
        alert("密碼至少為六碼！");
      } else if (error.message === "The password must be 6 characters long or more.") {
        alert("密碼不得為空！");
      }
      console.log(error);
      console.log(error.message);
    });
};

const loginMember = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
      if (error.a === null) {
        registerMember(e, email, password);
        // test();
      }
    });
};

const test = () => {
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      // 驗證信發送完成
      window.alert("驗證信已發送到您的信箱，請查收。");
    })
    .catch((error) => {
      // 驗證信發送失敗
      console.log(error.message);
    });
};

export { getPostsData, getUserData, handleUpload, pushPost, registerMember, loginMember };
