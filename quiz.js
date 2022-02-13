//définition des variables pour la page de quiz
const question = document.getElementById('question');
const descriptionReponse = document.getElementById('descriptionReponse');
const choices = Array.from(document.getElementsByClassName('choix'));
const progressionQuestions = document.getElementById('progressionQuestions');
const scoreEnCours = document.getElementById('score');
const RemplissageProgressBar = document.getElementById('RemplissageProgressBar');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

//fonction qui va récupérer les données du fichier json
async function getData() {
fetch("questions.json")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
}

//réglage du nombre de points gagnés par question
const CORRECT_BONUS = 10;
//réglage du nombre de questions
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

//Chargement des questions
getNewQuestion = () => {

    //condition de fin du questionnaire
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //charger le score dans le local storage
        localStorage.setItem('mostRecentScore', score);
        //aller à la page des scores
        return window.location.assign('quizScore.html');
    }
    
    //le compteur de question est incrementé à chaque nouvelle question
    questionCounter++;

    //Remplissage de la progress bar et compteur de progression des questions
    progressionQuestions.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    RemplissageProgressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    //les questions sont choisies aléatoirement
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    //affichage des réponses
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
//fonction qui s'execute lorsque la réponse est selectionnée, 
//incremente le score et permet d'afficher la bonne réponse en vert et la mauvaise en rouge 
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        //définition de la classe suivant si la reponse selectionnée est correcte ou incorrecte 
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        //si la reponse est juste on incremente le score 
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        //ajout de la classe à la réponse sélectionnée
        selectedChoice.parentElement.classList.add(classToApply);

        //

        //ajout de la description lorsque la réponse est incorrecte
        if (classToApply === 'incorrect') {
        descriptionReponse.innerText = currentQuestion['descriptionReponse'];       
        }
        
        //appel de la nouvelle question après que la réponse soit donnée
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            descriptionReponse.innerText=''; 
            getNewQuestion();
        }, 3000);
    });
});

//fonction qui incremente le score 
incrementScore = (num) => {
    score += num;
    scoreEnCours.innerText = score;
};

//Appel de la fonction de fetch du fichier json
getData();








