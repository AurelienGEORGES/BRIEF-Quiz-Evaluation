//variables pour la liste des meilleurs scores
const highScoresList = document.getElementById("listeMeilleursScores");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Affichage des cinq meilleurs scores
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li>${score.name} - ${score.score}</li>`;
  })
  .join("");