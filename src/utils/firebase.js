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

const getSinglePostData = (articleId) => {
  const db = firebase.firestore();
  const singlePostRef = db.collection("Posts").doc(articleId);

  return singlePostRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
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
      // doc.data() is never undefined for query doc snapshots
      // console.log(postsDoc.id, " => ", postsDoc.data());
      postsDocData.push({ ...postsDoc.data(), articleId: postsDoc.id });
      console.log(postsDoc.id); //  文章 ID
      console.log(postsDocData);
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

const getKanBansData = () => {
  const db = firebase.firestore();
  const kanBansRef = db.collection("Kanbans");
  let kanBansData = [];
  return kanBansRef.get().then((querySnapshot) => {
    querySnapshot.forEach((kanBansDoc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      kanBansData.push(kanBansDoc.data());
    });
    console.log(kanBansData);
    return kanBansData;
  });
};

const handleUpload = (e, image, title, content, uid, email, selectKanBan, time) => {
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
            pushPost(title, content, uid, email, selectKanBan, time, url);
          });
      }
    );
  } else {
    e.preventDefault();
    pushPost(title, content, uid, email, selectKanBan, time);
  }
};

const handlePostComment = (e, image, articleId, content, email, Link) => {
  const storage = firebase.storage();
  if (image) {
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
            return pushComment(articleId, content, email, Link, url).then((comment) => {
              return comment;
            });
          });
      });
  } else {
    e.preventDefault();
    return pushComment(articleId, content, email, Link).then((comment) => {
      return comment;
    });
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
      postRef
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
        })
        .catch((error) => {
          console.log("Error :", error);
        });
      break;

    case "happy":
      postRef
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
        })
        .catch((error) => {
          console.log("Error :", error);
        });
      break;

    case "angry":
      postRef
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
        })
        .catch((error) => {
          console.log("Error :", error);
        });
      break;
  }
};

// refactor
const handleUploadCommentEmotionCount = async (articleId, email, Params) => {
  const db = firebase.firestore();
  const postRef = db.collection("Posts").doc(articleId);
  const postData = await getSinglePostData(articleId);

  const existedLike = postData.emotion.like;

  postData.comment.map((comment) => {
    console.log(comment.floor, "commentFloor");
    console.log(comment, "comment");
  });

  const isLikeEmails = existedLike.filter((mail) => {
    return mail !== email;
  });

  switch (Params) {
    case "like":
      postRef
        .update({
          comment: existedLike.includes(email)
            ? {
                like: isLikeEmails,
              }
            : {
                like: [...existedLike, email],
              },
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.log("Error :", error);
        });
      break;
  }
};

const pushPost = (title, content, uid, email, selectKanBan, time, url = "") => {
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
      postTime: time,
      emotion: {
        like: [0],
        angry: [0],
        happy: [0],
      },
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// refactor
const pushComment = async (articleId, content, email, url = "") => {
  const db = firebase.firestore();
  const commentRef = db.collection("Posts").doc(articleId);
  console.log(url);

  const existedComment = await getSinglePostData(articleId);

  const commentData = {
    commentTime: firebase.firestore.Timestamp.now(),
    content: content,
    name: email,
    floor: 1, // index
    audio: url,
    like: ["0"],
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

const registerMember = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result.user, "result");
      getMemberInfo(result.user);
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
      }
    });
};

const logoutMember = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(function () {
      // 登出後強制重整一次頁面
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

const getMemberInfo = (callback) => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // 使用者已登入，可以取得資料
      var email = user.email;
      var uid = user.uid;
      console.log(email, uid);

      saveMemberInfoToFireStore(email, uid);
      callback({ email, uid });
    } else {
      // 使用者未登入
    }
  });
};

const saveMemberInfoToFireStore = (email, uid) => {
  const db = firebase.firestore();
  const UsersRef = db.collection("Users").doc(uid);

  UsersRef.set({
    email: email,
    uid: uid,
  }).then(() => {
    console.log("add data successful");
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
  loginMember,
  logoutMember,
  getMemberInfo,
};
