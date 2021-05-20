import firebase from "firebase/app";

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

export { pushPost };
