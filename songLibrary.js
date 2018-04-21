const fs                = require('fs');
const readline          = require('readline');
const google            = require('googleapis');
const OAuth2Client      = google.google.auth.OAuth2;
const SCOPES            = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH        = 'credentials.json';
const GOOGLE_LIBRARY_ID = "'1kLaltAY7BUMYwywaJJHaHv8rRmaLBWap'"

function authorizeGoogleDriveAPI(callback) {
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), callback);
  });
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {

    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(auth) {
  const drive = google.google.drive({version: 'v3', auth});

  const promise = new Promise((resolve, reject) => {
    console.log(GOOGLE_LIBRARY_ID);
    drive.files.list({
      fields: 'nextPageToken, files(id, name)',
      'q': `${GOOGLE_LIBRARY_ID} in parents`
    }, (err, {data}) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = data.files;
      if (files.length) {
        resolve(files)
      } else {
        reject(err)
        console.log('No files found.', err);
      }
    });
  });

  return promise
}

function authorizeListFiles() {
  const promise = new Promise(function(resolve, reject) {
    authorizeGoogleDriveAPI((auth) => {
      return listFiles(auth).then((files) => {
        resolve(files);
      }).catch((err) => {
        reject(err);
      });
    });
  });
  return promise;
}

module.exports.listFiles  = authorizeListFiles;
