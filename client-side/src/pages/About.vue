<template>
  <div id="about">
    <h1> About the project</h1>
    <div>
      <p class="text">This site was built as part of the project of the course Internet Development Environments.
         Our recipe site was built in a client server architecture.
         The server side is developed in Node.js, the client side is developed using Vue.js.
         Feel free to watch our project (we do not guarantee you will not be hungry) 
         and previous projects we did in the course, building a website and playing Pacman.
         </p>
    </div>
      <div id="assignement1">
        <h2> 
            Development team :
        </h2>
        <p class="text"> <strong> Gal Borabia </strong> last year student in the department of
            Information System Engineering at Ben Gurion University of the Negev. 
            Knowledge of programming languages - java, node.js, python, c++, c#, databases.
        </p>
        <p>
           <a class="ref" href="https://sise-web-development-environments.github.io/assignment1-galborabia/">Gal web page</a>
        </p>
        <p class="text">
            <strong> chen arazi </strong>
           Third year information systems engineer
            at Ben Gurion University of the Negev. 
            Knowledge of programming languages - java, node.js, python, c++, c#, databases.
        </p>
        <p>
          <a class="ref" href="https://sise-web-development-environments.github.io/307875633/">Chen web page</a>
        </p>
      </div>
      <p class="text"> try our packman game :</p>
      <p>
        <a class="ref" href="https://sise-web-development-environments.github.io/assignment2-gal-chen/">Packman game</a>
      </p>
  </div>
</template>

<script>
export default {
    name: "about"
}
</script>

<style scoped>

body, html {
  width: auto;
  height: auto;
  margin: 0;
  min-height: 100vh;
}
.about {
  margin-left: 5%;
  color: bisque;
  text-align: left;
}
.text {
  color: bisque;
  text-align: left;
  margin-left: 3%;
  position: relative;
  width: 48%;
}
h1, h2 {
  margin-left: 4%;
  color: rgb(111, 109, 209);
  text-align: left;
  margin: 1%;
  padding: 3px;
}
.ref {
  margin-left: 4%;
  color: rgb(87, 179, 233);
  text-align: left;
  padding: 3px;
}
</style>

