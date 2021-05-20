import firebase from "firebase";

const getKanbanData = () => {
  const db = firebase.firestore();
  const kanbansRef = db.collection("Kanbans");
  let kanbansData = [];

  return kanbansRef.get().then((querySnapshot) => {
    querySnapshot.forEach((kanbansDoc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(postsDoc.id, " => ", postsDoc.data());
      kanbansData.push(kanbansDoc.data());
    });
    return kanbansData;
  });
};

export { getKanbanData };
