import { getAuth, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
      console.log(uid);
    } else {
      console.log("User is not logged in.");
    }
  });