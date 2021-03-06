const functions = require('firebase-functions');
const admin=require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.addMessage=functions.https.onRequest((req,res)=>{
    const original=req.query.text;
    return admin.database().ref('/messages').push({original:original}).then((snapshot)=>{
        return res.redirect(303,snapshot.ref);
    });
});
