# Safe and Sound Music Player Desktop Webapp

Hello! Here you will find my current ongoing project where I am making a local music player, my aim is to be able to provide an open-source ad-free music player with the ability to add whatever music you like!

A feature I am working towards (and would be a great indicato the app is coming along) is using some sort of Spotify/Youtube API in order to download songs from the web without you as the user needing to download the file yourself.

## Prerequisites

You'll need to have npm:                                    
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm                    
Use this documentation to find information on how to install it.

## Building the application

Use **npm start** in your command line

If you get an issue with SQLite on build, fix the dependencies by running these commands.
- npm install --save-dev @electron/rebuild 
- npx electron-rebuild -f -w better-sqlite3