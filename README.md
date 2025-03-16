<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>


<h2 align="center">
  FastFeet, GoStack Bootcamp Final Project
</h2>

<h3 align="start"><strong>1) BackEnd/FrontEnd/Mobile FastFeet Installation</strong></h3>

<h4> After downloading the FastFeet application you will have 3 folders:</h4>
<ul>
<li>backfastfeet-> BackEnd Project</li>
<li>webfastfeet-> FrontEnd Web Project</li>
<li>mobilefastfeet-> Mobile Project</li>
</ul>

<h4 align="start"><strong>1.1) Installing Docker Containers</strong></h4>

<ul>
<li>You must install Docker according to this <a href="https://docs.docker.com/">link</a></li>
<li>You must install the PostGreSql Database image</li>
<p>
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
</p>
<li>You must install the Redis Database image</li>
<p>
docker run --name redis -p 6379:6379 -d -t redis:alpine
</p>
<li>After the installation, you can check the installed PostgreSQL/Redis images using the command:</li>
<p>
docker ps -a
</p>
<li>You must now start the containers using the command below: </li>
<p>docker start database redis</p>
</ul>
<h4 align="start"><strong>1.2) Steps to install the BackEnd</strong></h4>

<ul>
<li>Access the <b>backfastfeet</b> folder on your workstation via the terminal</li>
<li>Run the command to install the project's dependencies: <b>yarn install</b>.</li>
<p>Note: You must have yarn installed on your workstation as a prerequisite, otherwise you can use npm.<p>
<li>You must include a database in the postgresql environment. I used the Postbird application for this task according to the <a href="https://www.electronjs.org/apps/postbird">link.</a></li>
<p>I named the database 'fastfeet', but you can name it whatever you want.</p>
<li>In the backend project, you must include the .env file to set the database name and other settings. There is an example file <b>.env.example</b>, you must copy this file with the name .env and configure it with the correct data.</li>
</p>
<li>You must then run the migrations to include the tables in the database. In the backend directory, run the command in the terminal: <b>yarn sequelize db:migrate</b>.</li>
<li>Now run the command to automatically include the administrator user in the users screen. <b>yarn sequelize db:seed:all</b>.</li>
<li>Now you need to start 2 services, the first backend service, using the <b>yarn dev</b> command and in a new terminal session the <b>yarn queue</b> command, that is, we will have 2 terminals, one running the backend and the other the queue service.</li>
<p>Now we have the backend running to serve our frontend and mobile applications</b>.</p>
</ul>

<h4 align="start"><strong>1.3) Steps to install the FrontEnd</strong></h4>
<ul>
<li>Access the <b>webfastfeet</b> folder in another terminal.</li>
<li>Copy the .env configuration file from the backfastfeet folder to the webfastfeet folder
</li>
<li>In the \src\services\ subdirectory there is the api.js file where you must configure the 'address/port' that the backend is running on when it is a development environment, because if it is production it will look for the settings from the .env file.</li>
<li>Run the command <b>'yarn start'</b> to start the frontend application.</li>
<li>The application will show the login screen and you must enter the user: 'admin@fastfeet.com'<b></b> with the password: '123456'<b></b> to access the system.</li>
<p>Now we have the frontend running.</p>
</ul>
<h4 align="start"><strong>1.4) Steps to install the mobile application</strong></h4>
<ul>
<li>Access the <b>mobilefastfeet</b> folder in another terminal.</li>
<li>In the \src\services\ subdirectory there is the api.js file where you must configure the 'address/port' that the backend is running on, so the mobile application can communicate with the backend.</li>
<li>run the command <b>'react-native run-android'</b> to start the application in the Android emulator or run the command <b>'react-native run-ios'</b> for the iOS emulator.</li>
<p>The Android and iOS emulators must be previously installed.</p>
</ul>
