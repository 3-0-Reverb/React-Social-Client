# Project 3 - Reverb

## Project Description

Reverb (styled as ReverB) is an upcoming social media app designed for Revature employees that emphasizes personal connectivity by echoing professional growth. Users can create profiles where they can post images and create messages that resonate with their experience and insight. Users can also view and comment on posts from other profiles, and “reverb” (like) on posts that personally reverberate with them.

## Technologies Used

- Java
- Spring Boot
- Spring Data
- Spring Framework
- Firebase Authentication
- React Typescript
- React Redux
- React Bootstrap
- HTML/CSS
- Jenkins
- Docker
- Git
- Maven
- 
## Features
- Profanity filter 
- Sessions are managed using Firebase

- Users can:
- Register and log in
- Edit their profile including a picture and bio
- Post images and text to their profile
- View feed of posts from other profiles
- View list of followers 
- Comment on and bookmark posts
- Like comments and posts
- Receive notifications
- Search for groups
- Reset password

## Getting Started

- Install JDK 8, Maven, Git, and NPM.

### Repository Clone
- Clone the frontend and backend using the following commands:
- - git clone https://github.com/Revature-Reverb-2/React-Social-Client
- - git clone https://github.com/Revature-Reverb-2/React-Social-Server
- - DEVIATION: At this point, you need to checkout to the dev branch on React-Social-Client to run locally. (reverbClient.ts and Register.tsx)

### Setting up Firebase
#### FrontEnd
- We are using Firebase for authentication. User passwords are not stored in the database. Instead, Firebase handles password storage and token generation.
- [Create a Firebase Account](https://firebase.google.com/)
- Click on "Get Started"
- Add a project
-- Enter project name
-- Disable Google Analytics for this project
-- Create Project
-- Add a web app to your project
![image](https://user-images.githubusercontent.com/62768384/163589057-8c14019c-6510-4edd-89b0-1c51b3ea946a.png)
-- Name your project (eg: reverb-client)
-- Register your app
---- Uncheck Firebase Hosting
---- Copy these lines and replace them in the firebase.ts file inside React-Social-Client
![image](https://user-images.githubusercontent.com/62768384/163589649-da9bdda2-64e4-4b78-bb95-db63366b7634.png)
---- Make sure git does not track this file because these configurations can be compromised if they are uploaded to GitHub.
---- run "npm install firebase" to add this dependency to your front-end project

#### Backend
- Now you must connect your Backend with the Firebase account
- Click on the "gear icon"
![image](https://user-images.githubusercontent.com/62768384/163590105-477f3bb0-e90f-4b20-8d54-c38aeeecf28c.png)
- Go to the "Service accounts" tab
- Click on the "Java" radio button
- Click on "Generate new private key"
- A JSON file will be downloaded. This file contains configurations that connect your Backend to the firebase.
-- This file will go inside the "resources" folder in the "React-Social-Server" and rename it -- "firebase_config.json"
-- Make sure git does not track this file. You don't want this file to be exposed to the internet

- Configuring your dependencies
-- You need 2 more files inside the resources folder to fully connect this application to all its dependencies (make sure git is not tracking these files):
---- application-dev.properties - This file will connect you to your local database for local development.
  - - spring.datasource.url=jdbc:postgresql://localhost:5432/postgres?currentSchema=<<your_schema_name>>
  - - spring.datasource.username=<<db-username-here>>
  - - spring.datasource.password=<<db-password-here>>
  - - spring.datasource.driver-class-name=org.postgresql.Driver
  - - spring.datasource.initialization-mode=never

---- application-s3.properties - This file will connect you to an S3 bucket that will run the API withouw AWS related errors
  - - amazonProperties.endpointUrl=<<s3-bucket-url>>
  - - amazonProperties.bucketName=<<bucket-name-here>>
  - - amazonProperties.accessKey=<<bucket-access-key-here>>
  - - amazonProperties.secretKey=<<bucket-secret-key-here>>
  
#### Starting the API
- Run Maven Update either within an IDE (having imported the backend as a Maven project) or using the following command in the backend directory:
- - mvn clean install -U
- Start the backend as a Spring Boot Application within an IDE or using the following command in the backend directory:
- - mvn spring-boot:run
- Install frontend dependencies using the command:
- - npm install --legacy-peer-deps
  
#### Setting up the S3 bucket
- Setup an s3 bucket for profile picture uploads.
- - Create a user with the Add user feature of IAM
- - Check the user's Access type 'Programatic access'
- - Add permissions to the user
- - Press 'Attach existing policy directly'
- - Search for 's3' and choose AmazonS3FullAccess
- - Presss next and 'Create User'
- - Click on Download.csv to get the keys for this user.
- - Place these into a 'application-s3.yml' in the resources directory with the...
- - endpointURL , accessKey , secretKey , and bucketName
- Follow either Local or AWS Deployment instructions.

#### Local

- Switch to the dev branch of the React-Social-Client and the main server using the following command:
- Run the following comamnd in the directory of the server to install your dependencies.
- - mvn clean install -U
- Start the server using the following command in the server directory.
- - mvn spring-boot:run
- Launch the client using the following command inside of the client's directory.
- - npm start

### AWS Deployment

- Backend
- Setup an Elastic Beanstalk that uses Coretto 8 that will take our jar file and deploy it to an EC2 automatically.
- Source stage for the API needs to take a source from the Reverb Server github repo at main.
- In the build stage, use the following build setup. This build setup will give us an artifact that can be deployed in our deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -
- -       # Correto is basically Amazon's in-house version of Java that they mainta, it is
- -       # compatible with project's built using native Java (match versions).
- -       java: corretto8
- -
- - pre_build:
- -     commands:
- -
- -       # Grab properties file from S3 bucket prior to project build
- -       - aws s3 cp s3://reverb-resources-bucket/application-dev.yml ./src/main/resources/application-dev.yml
- -       - aws s3 cp s3://reverb-resources-bucket/firebase_config.json ./src/main/resources/firebase_config.json
- -
- - build:
- -     commands:
- -
- -       # Build the project
- -       - mvn clean package -Dspring.profiles.active=test
- -
- - post_build:
- -     commands:
- -
- -       - mv target/*.jar ./reverbAPI.jar
- -
- - #Declare build artifacts to be passed to the next stage of the pipeline
- - artifacts:
- - files:
- -     - reverbAPI.jar
- - name: artifact
- In our deploy stage, that jar file we just created is deployed to our elastic beanstalk using Coretto 8.
- Note the url that we have here.

- Frontend
- Setup an S3 bucket for the UI side with static webhosting enabled.
- Use a find and replace functionality to find any mention of 'localhost' or 'elasticbeanstalk' and replace those full url's with the appropriate new url for the API you just made.
- Source stage for the UI needs to take a source from the Reverb Client github repository at main.
- In the build stage, use the following build setup which should install node js, and then uses the command nmp install to install the dependencies needed for the UI side. It then runs npm run-script build which gives us a build folder that gives us an index.html artifact that we will deploy in the deploy stage.
- - version: 0.2
- -
- - phases:
- - install:
- -     runtime-versions:
- -       nodejs: 12
- -
- -     commands:
- -        # install npm
- -         - npm install
- -
- - build:
- -     commands:
- -         # run build script
- -         - npm run-script build
- -         - mkdir ./views
- -         - cp -rf ./build/* ./views
- - artifacts:
- - files:
- - - '\*_/_'
- - base-directory: 'views'\*
- In the deploy stage, that index.html file is deployed to the s3 bucket with static webhosting enabled.
- You should now be able to connect to the UI at the url of your s3 bucket.

## Usage

Using the social media app should be intuitive and easy.
