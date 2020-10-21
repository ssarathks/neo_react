// import firebase from '../../fbConfig'
// import * as actionTypes from './actionTypes'

// const db = firebase.firestore()

// export const addToFavourite = (userId, neoId) => {
//   return((dispatch) => {
//     db.collection("favourites")
//     .doc(userId)
//     .update({
//         neoIds: firebase.firestore.FieldValue.arrayUnion(neoId)
//     });
//   })
// }