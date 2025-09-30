const question = [
    {
        question: "What is the best selling Nintendo Switch game of all time?",
        options: {
            a: "The Legend of Zelda: Breath of the Wild",
            b: "Mario Kart 8 Deluxe",
            c: "The Legend of Zelda: Tears of the Kingdom",
            d: "Super Smash Bros. Ultimate"
        },
        correctAnswer: "b"
    },
    {
        question: "Which game won Game of the Year at The Game Awards 2022?",
        options: {
            a: "God of War Ragnarök",
            b: "Horizon Forbidden West",
            c: "Elden Ring",
            d: "Xenoblade Chronicles 3"
        },
        correctAnswer: "c"
    },
    {
        question: "What year was the original PlayStation released in Japan?",
        options: {
            a: "1994",
            b: "1995",
            c: "1999",
            d: "1997"
        },
        correctAnswer: "a"
    },
    {
        question: "Which video game character is based on Kurt Rusell's character in the movie Escape from New York?",
        options: {
            a: "Leon S. Kennedy",
            b: "Nathan Drake",
            c: "Sam Porter Bridges",
            d: "Solid Snake"
        },
        correctAnswer: "d"
    },
    {
        question: "Which video game marked the first appearance of Mario? (Although he was known as Jumpman at the time)",
        options: {
            a: "Super Mario Bros.",
            b: "Super Mario 64",
            c: "Donkey Kong",
            d: "Donkey Kong Bananza"
        },
        correctAnswer: "c"
    },
    {
        question: "Which gaming publisher is known for popular series such as Grand Theft Auto, Red Dead Redemption, and Max Payne?",
        options: {
            a: "Naughty Dog",
            b: "Rockstar Games",
            c: "Ubisoft",
            d: "Electronic Arts"
        },
        correctAnswer: "b"
    },
    {
        question: "Which popular, animated Netflix series is based off of the game League of Legends?",
        options: {
            a: "Invincible",
            b: "Cyberpunk: Edgerunners",
            c: "The Witcher",
            d: "Arcane"
        },
        correctAnswer: "d"
    },
    {
        question: "Which famous voice actor is known for his roles as Joel in The Last of Us, Pagan Min in Far Cry 4, and Indiana Jones in Indiana Jones and the Great Circle?",
        options: {
            a: "Troy Baker",
            b: "Nolan North",
            c: "Steve Blum",
            d: "Ben Starr"
        },
        correctAnswer: "a"
    }
];

// Declaration of Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
const totalQuestions = question.length;

// Fecthing DOM ELements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback');
const currentQuestionNumber = document.getElementById('current-question-number');
const currentScoreNumber = document.getElementById('current-score');
const finalScoreText = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');

totalQuestionsElement.textContent = totalQuestions;


//Functions for screens, buttons, and quiz logic
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

startButton.addEventListener('click', () => {
    showScreen(quizScreen);
    renderQuestion();
});
submitButton.addEventListener('click', submitAnswer);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function renderQuestion() {
    if (currentQuestionIndex >= totalQuestions) {
        showResults();
        return;
    }

    const currentQ = question[currentQuestionIndex];

    optionsContainer.innerHTML = '';
    feedbackText.textContent = '';
    submitButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    submitButton.disabled = true;
    selectedAnswer = null;

    currentQuestionNumber.textContent = currentQuestionIndex + 1;
    currentScoreNumber.textContent = score;

    questionText.textContent = currentQ.question;

    for (const key in currentQ.options) {
        const optionText = currentQ.options[key];
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = optionText;
        button.addEventListener('click', () => selectAnswer(button, key));
        optionsContainer.appendChild(button);
    }
}

function selectAnswer(button, answer) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedAnswer = answer;
    submitButton.disabled = false;
}

function submitAnswer() {
    if (!selectedAnswer) return;

    const currentQ = question[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;

    });

    if (isCorrect) {
        score++;
        feedbackText.textContent = 'Correct!';
    } else {
        feedbackText.textContent = "Incorrect. The correct answer was: " + currentQ.options[currentQ.correctAnswer];
    }

    currentScoreNumber.textContent = score;
    submitButton.classList.add('hidden');
    nextButton.classList.remove('hidden');

}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultScreen);
    finalScoreText.textContent = `You scored ${score} out of ${totalQuestions}`;

}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    showScreen(startScreen);
}