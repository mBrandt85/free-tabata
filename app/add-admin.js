const admin = require('firebase-admin')

const serviceAccount = require('./service-account-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

async function addAdmin(email) {
  try {
    if (!email) throw new Error('email is required as args')
    const user = await admin.auth().getUserByEmail(email)
    console.log(`granting user with email "${email}" admin claims`)
    await admin.auth().setCustomUserClaims(user.uid, { admin: true })
    console.log('success')
  } catch ({ message }) {
    console.log(message)
  }
}

addAdmin(process.argv[2])