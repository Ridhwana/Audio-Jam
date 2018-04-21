----------------------------------
Setting up the audio application

-----------------------------------

Ensure that you connect your google drive to the application containing a library of songs.

*Google Drive API:*

To authenticate your application to read from your google drive follow step 1 outlined [here](https://developers.google.com/drive/v3/web/quickstart/nodejs).

At the end of this process you should have a client_secret.json file and a credentials.json file.

*MusixMatch API:*

In order to generate an API key to get the song metadata from the MusixMatch API, follow the instructions [here](https://playground.musixmatch.com/).


*Development:*

run ```npm install``` in the root directory and the client folder to install all dependencies.

run ```yarn dev``` in the root folder to start the development environment.
