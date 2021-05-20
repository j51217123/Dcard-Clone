import firebase from "firebase/app";
import "firebase/storage";

import { pushPost } from "./pushPost";

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

export { handleUpload };
