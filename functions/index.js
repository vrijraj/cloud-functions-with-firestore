const admin = require("firebase-admin");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

admin.initializeApp();


exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.onNewDocument = onDocumentCreated("edata/{documentId}", (event) => {
  const a = event.data.data().a;
  const b = event.data.data().b;

  admin
    .firestore()
    .collection("result")
    .add({
      res: `Sum of ${a} and ${b} = ${a + b}`,
    })
    .then((doc) => {
      console.log("Done");
    })
    .catch((error) => {
      console.log(error);
    });
});
