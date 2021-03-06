import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ocard-15db3.firebaseapp.com",
  projectId: "ocard-15db3",
  storageBucket: "ocard-15db3.appspot.com",
  messagingSenderId: "742165587450",
  appId: "1:742165587450:web:77411f66dfefc3c5b17043",
};

firebase.initializeApp(firebaseConfig);

const getSinglePostData = (articleId) => {
  const db = firebase.firestore();
  const singlePostRef = db.collection("Posts").doc(articleId);

  return singlePostRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

const getPostsData = () => {
  const db = firebase.firestore();
  const postsRef = db.collection("Posts");
  let postsDocData = [];
  return postsRef.get().then((querySnapshot) => {
    querySnapshot.forEach((postsDoc) => {
      postsDocData.push({ ...postsDoc.data(), articleId: postsDoc.id });
    });
    return postsDocData;
  });
};

const getSingleUserData = (postsDocData) => {
  const db = firebase.firestore();
  const singleUserRef = db.collection("Users");
  let usersDocData = [];
  return singleUserRef
    .where("uid", "==", postsDocData.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(userDoc.id, " => ", userDoc.data());
        usersDocData.push(userDoc.data());
      });
      return usersDocData[0];
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

const getUsersData = (postsDocData) => {
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

const getKanBansData = () => {
  const db = firebase.firestore();
  const kanBansRef = db.collection("Kanbans");
  let kanBansData = [];
  return kanBansRef.get().then((querySnapshot) => {
    querySnapshot.forEach((kanBansDoc) => {
      kanBansData.push(kanBansDoc.data());
    });
    return kanBansData;
  });
};

const handleUpload = (e, image, title, content, uid, email, selectedKanBan, time, history) => {
  const storage = firebase.storage();
  if (image) {
    e.preventDefault();
    let uploadTask = storage.ref(`images/${image.name}`).put(image);
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
            pushPost(title, content, uid, email, selectedKanBan, time, history, url);
          });
      }
    );
  } else {
    e.preventDefault();
    pushPost(title, content, uid, email, selectedKanBan, time, history);
  }
};

const handlePostComment = (e, image, articleId, content, email) => {
  const storage = firebase.storage();
  if (image && email !== "") {
    e.preventDefault();
    console.log(image);
    return storage
      .ref(`images/${image.name}`)
      .put(image)
      .then(() => {
        return storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return pushComment(articleId, content, email, url).then((comment) => {
              return comment;
            });
          });
      });
  } else if (email !== "") {
    e.preventDefault();
    return pushComment(articleId, content, email).then((comment) => {
      return comment;
    });
  } else {
    e.preventDefault();
    return getSinglePostData();
  }
};

// refactor
const handleUploadPostEmotionCount = async (articleId, email, Params) => {
  const db = firebase.firestore();
  const postRef = db.collection("Posts").doc(articleId);
  const postData = await getSinglePostData(articleId);

  const existedLike = postData.emotion.like;
  const existedHappy = postData.emotion.happy;
  const existedAngry = postData.emotion.angry;

  const isLikeEmails = existedLike.filter((mail) => {
    return mail !== email;
  });

  const isHappyEmails = existedHappy.filter((mail) => {
    return mail !== email;
  });

  const isAngryEmails = existedAngry.filter((mail) => {
    return mail !== email;
  });

  switch (Params) {
    case "like":
      return postRef
        .update({
          emotion: existedLike.includes(email)
            ? {
                like: isLikeEmails,
                happy: isHappyEmails,
                angry: isAngryEmails,
              }
            : {
                like: [...existedLike, email],
                happy: isHappyEmails,
                angry: isAngryEmails,
              },
        })
        .then(() => {
          console.log("Document successfully updated!");
          const likeLen = existedLike.includes(email) ? isLikeEmails.length : [...existedLike, email].length;
          const emotionLen = likeLen + isHappyEmails.length + isAngryEmails.length;
          return emotionLen;
        })
        .catch((error) => {
          console.log("Error :", error);
        });

    case "happy":
      return postRef
        .update({
          emotion: existedHappy.includes(email)
            ? {
                like: isLikeEmails,
                happy: isHappyEmails,
                angry: isAngryEmails,
              }
            : {
                like: isLikeEmails,
                happy: [...existedHappy, email],
                angry: isAngryEmails,
              },
        })
        .then(() => {
          console.log("Document successfully updated!");
          const happyLen = existedHappy.includes(email) ? isHappyEmails.length : [...existedHappy, email].length;
          const emotionLen = happyLen + isLikeEmails.length + isAngryEmails.length;
          return emotionLen;
        })
        .catch((error) => {
          console.log("Error :", error);
        });

    case "angry":
      return postRef
        .update({
          emotion: existedAngry.includes(email)
            ? {
                like: isLikeEmails,
                happy: isHappyEmails,
                angry: isAngryEmails,
              }
            : {
                like: isLikeEmails,
                happy: isHappyEmails,
                angry: [...existedAngry, email],
              },
        })
        .then(() => {
          console.log("Document successfully updated!");
          const angryLen = existedAngry.includes(email) ? isAngryEmails.length : [...existedAngry, email].length;
          const emotionLen = angryLen + isLikeEmails.length + isHappyEmails.length;
          return emotionLen;
        })
        .catch((error) => {
          console.log("Error :", error);
        });

    default:
      // no default;
      break;
  }
};

// refactor
const handleUploadCommentEmotionCount = async (articleId, email, commentFloor) => {
  const db = firebase.firestore();
  const postRef = db.collection("Posts").doc(articleId);
  const postData = await getSinglePostData(articleId);

  const selectedCommentFloorInfo = postData.comment.filter((c) => {
    return c.floor === commentFloor;
  });

  const existedCommentLikes = postData.comment[commentFloor - 1].like;

  const newCommentArr = [...postData.comment];

  const isLikeEmails = existedCommentLikes.filter((mail) => {
    return mail !== email;
  });

  newCommentArr[commentFloor - 1].like = existedCommentLikes.includes(email) ? isLikeEmails : [...isLikeEmails, email];

  return postRef
    .update({
      comment: newCommentArr,
    })
    .then(() => {
      console.log("Document successfully updated!");
      const likeLen = existedCommentLikes.includes(email) ? isLikeEmails.length : [...isLikeEmails, email].length;
      console.log(likeLen, "likeLen 304");
      const currentFloorCommentInfo = { selectedCommentFloorInfo, likeLen };
      console.log(currentFloorCommentInfo);
      return currentFloorCommentInfo;
    })
    .catch((error) => {
      console.log("Error :", error);
    });
};

const pushPost = (title, content, uid, email, selectKanBan, time, history, url = "") => {
  const db = firebase.firestore();
  const postRef = db.collection("Posts");

  postRef
    .add({
      title: title,
      content: content,
      audio: url,
      name: email,
      uid: uid,
      kanBan: selectKanBan,
      postTime: firebase.firestore.Timestamp.now(),
      emotion: {
        like: [],
        angry: [],
        happy: [],
      },
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      history.push("/");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// refactor
const pushComment = async (articleId, content, email, url = "") => {
  const db = firebase.firestore();
  const commentRef = db.collection("Posts").doc(articleId);

  const existedComment = await getSinglePostData(articleId);

  const commentData = {
    commentTime: firebase.firestore.Timestamp.now(),
    content: content,
    name: email,
    floor: 1, // index
    audio: url,
    like: [],
  };

  if (!existedComment.comment) {
    return commentRef
      .update({
        comment: firebase.firestore.FieldValue.arrayUnion(commentData),
      })
      .then(() => {
        console.log("Document successfully updated!");
        return commentData;
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  } else {
    return commentRef
      .update({
        comment: firebase.firestore.FieldValue.arrayUnion({
          ...commentData,
          floor: existedComment.comment.length + 1,
        }),
      })
      .then(() => {
        console.log("Document successfully updated!");
        return { ...commentData, floor: existedComment.comment.length + 1 }; // one comment >> obj
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }
};

const registerMember = (email, password, history) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result.user, "result.user");
      history.push("/");
    })
    .catch(function (error) {
      if (error.message === "The email address is badly formatted.") {
        alert("????????????????????????????????????????????????");
      } else if (error.message === "Password should be at least 6 characters") {
        alert("????????????????????????");
      } else if (error.message === "The password must be 6 characters long or more.") {
        alert("?????????????????????");
      }
      console.log(error);
      console.log(error.message);
    });
};

const facebookMemberLogin = (history) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      history.push("/");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};

const googleMemberLogin = (history) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      history.push("/");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

const loginMember = (email, password, history) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      history.push("/");
    })
    .catch((error) => {
      console.log(error);
      if (error.a === null) {
        registerMember(email, password, history);
      }
    });
};

const logoutMember = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

const getMemberInfo = (callback) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // ???????????????????????????????????????
      var email = user.email;
      var uid = user.uid;
      console.log(email, uid);

      saveMemberInfoToFireStore(email, uid);
      callback({ email, uid });
    } else {
      // ??????????????????
    }
  });
};

const saveMemberInfoToFireStore = (email, uid) => {
  const db = firebase.firestore();
  const UsersRef = db.collection("Users").doc(uid);

  return UsersRef.set({
    email: email,
    uid: uid,
  }).then(() => {
    console.log("add data successful for saveMemberInfoToFireStore");
  });
};

export {
  getSinglePostData,
  getPostsData,
  getSingleUserData,
  getUsersData,
  getKanBansData,
  handleUpload,
  handlePostComment,
  handleUploadPostEmotionCount,
  handleUploadCommentEmotionCount,
  pushPost,
  registerMember,
  facebookMemberLogin,
  googleMemberLogin,
  loginMember,
  logoutMember,
  getMemberInfo,
};
