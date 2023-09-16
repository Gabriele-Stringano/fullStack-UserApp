<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">FullStack-User Authentication App by Gabriele Stringano</h3>

  <p align="center">
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#how-it-work">How it Works</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## 💡About The Project

As a Start2impact student, I developed this application to put my acquired knowledge of JavaScript, React, Node.js and much more.

<p align="right">(<a href="#top">back to top</a>)</p>

<ol>

### Built With


* [![Javascript][Javascript.js]][Javascript-url]
* [![NodeJs][NodeJs.js]][NodeJs-url]
* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![Netlify Status](https://api.netlify.com/api/v1/badges/401f510f-de99-424c-afe4-fec6c58fc970/deploy-status)](https://app.netlify.com/sites/autenticatio-app-front/deploys)
* <a href="https://www.mongodb.com/">External Service-> MongoDb Cloud</a>

<p align="right">(<a href="#top">back to top</a>)</p>

</ol>

<!-- How it Works + ScreenShot -->

## ⚙️How it Works
<b>Overview</b>: The application allows users to register and/or login to access private routes, modify their profile data, and view it.

<b>Back-end</b>: RESTful APIs have been developed in node.js+express to allow for viewing, creating, and modifying user data stored in the MongoDB Cloud database. JWT tokens are used for authentication and bcrypt is used for password security. The joi library is used to verify the correctness of user input when modifying profiles. Helmet and Mongoose increase backend security.

<b>Front-end</b>: Using React, Redux, Router, and @mui/material, the UI and UX are more than satisfactory, while maintaining clear code.For example, if a user enters an invalid value, they will be alerted as to what is not valid.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## ❗Getting Started

To get a local copy up and running follow these simple example steps:
<ol>
<li> Go to https://github.com/Gabriele-Stringano/fullStack-UserApp and press the green button </li>
<li> Select Download zipper </li>
<li> Open the zipper and extract the folder </li>
<li> Open a text editor and add the extracted folder </li>
<li> Install the dependencies: npm install for bot Server and Client folders</li>
<li> Connect your MongoDB database: Create, if don't exist, a .env file and then insert an enviroment variable named DB_URI with your MongoDB connection string
<li> Run the Server: npm run dev port</li>
<li> Run the Client: npm start</li>
<li> The browser should open automatically</li>
<li> localhost: 5'000 (server) 3'000 (client)</li>

</ol>

### Prerequisites
You need to own these programs:
<ul>
    <li> A text editor-IDE </li>
    <li> A program to unzip files</li>
    <li> Instal Node.js</li>
</ul>


<!-- CONTACT -->
## 📲Contact

Email: - gabrielestringano@gmail.com </br>
LinkedIn: - https://www.linkedin.com/in/gabriele-stringano/

My Projects: - https://github.com/Gabriele-Stringano/
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## 📚Acknowledgments

List of resources I used:

* [GitHub](https://github.com)
* [Start2Impact](https://www.start2impact.it/)
* [Visual-Studio](https://code.visualstudio.com/)
* [ChatGPT](https://openai.com/)
* [Best-README-Template](https://github.com/ferneynava/Best-README-Template)
* [MuiComponents](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[Javascript.js]: https://img.shields.io/static/v1?message=Javascript&logo=JavaScript&labelColor=5c5c5c&color=efd81d&logoColor=white&label=%20&style=FOR-THE-BADGE
[Javascript-url]: https://en.wikipedia.org/wiki/JavaScript
[NodeJs.js]: https://img.shields.io/badge/Js-Node.js-brightgreen
[NodeJs-url]: https://nodejs.org/en/
[React.js]: https://img.shields.io/badge/Js-React-lightblue
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/Js-Redux-purple
[Redux-url]: https://redux.js.org/introduction/getting-started
