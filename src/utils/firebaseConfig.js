const firebaseConfig = {
  apiKey: "AIzaSyCk5xQsiVVNII41CIURiUvtnc5QY8qCFVc",
  authDomain: "ocard-15db3.firebaseapp.com",
  projectId: "ocard-15db3",
  storageBucket: "ocard-15db3.appspot.com",
  messagingSenderId: "742165587450",
  appId: "1:742165587450:web:77411f66dfefc3c5b17043",
};

export default firebaseConfig;

// switch (Params) {
//     case "like":
//       postRef
//         .update({
//           emotion: existedLike.includes(email)
//             ? {
//                 like: isLikeEmails,
//                 happy: isHappyEmails,
//                 angry: isAngryEmails,
//               }
//             : {
//                 like: [...existedLike, email],
//                 happy: isHappyEmails,
//                 angry: isAngryEmails,
//               },
//         })
//         .then(() => {
//           console.log("Document successfully updated!");
//         })
//         .catch((error) => {
//           console.log("Error :", error);
//         });
//       break;

//     case "happy":
//       postRef
//         .update({
//           emotion: existedLike.includes(email)
//             ? {
//                 like: isLikeEmails,
//                 happy: isHappyEmails,
//                 angry: isAngryEmails,
//               }
//             : {
//                 like: isLikeEmails,
//                 happy: [...existedHappy, email],
//                 angry: isAngryEmails,
//               },
//         })
//         .then(() => {
//           console.log("Document successfully updated!");
//         })
//         .catch((error) => {
//           console.log("Error :", error);
//         });
//       break;

//     case "angry":
//       postRef
//         .update({
//           emotion: existedLike.includes(email)
//             ? {
//                 like: isLikeEmails,
//                 happy: isHappyEmails,
//                 angry: isAngryEmails,
//               }
//             : {
//                 like: isLikeEmails,
//                 happy: isHappyEmails,
//                 angry: [...existedAngry, email],
//               },
//         })
//         .then(() => {
//           console.log("Document successfully updated!");
//         })
//         .catch((error) => {
//           console.log("Error :", error);
//         });
//       break;