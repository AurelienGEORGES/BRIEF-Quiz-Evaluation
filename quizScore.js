//définition des constantes pour sauvegarder le score

//on va récupérer les données saisies dans l'input 
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
//le score final
const finalScore = document.getElementById('finalScore');
//Le score le plus récent
const mostRecentScore = localStorage.getItem('mostRecentScore');
//les scores les plus élevés
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


finalScore.innerText = mostRecentScore;

//la saisie de l'input
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// fonction qui permet de sauvegarder le score
saveHighScore = (e) => {
    e.preventDefault();
    //récupération du score et du nom
    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    //Rajout du score dans les scores les plus élevés
    highScores.push(score);
    //les scores s'affichent par ordre décroissant
    highScores.sort((a, b) => b.score - a.score);
    //les cinq meilleurs scores sont sauvegardés
    highScores.splice(5);
    //chargement du score dans le local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};
