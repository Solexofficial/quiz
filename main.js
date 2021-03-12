/* All answer options */
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

/* All our options */
const optionElements = document.querySelectorAll('.option');

/* Question */
const question = document.getElementById('question'); // this question
const numberOfQuestion = document.getElementById('number-of-question'), // number of question
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); //all question

let indexOfQuestion, //index this question
    indexOfPage = 0; //index page

const answersTracker = document.getElementById('answers-tracker'); //wrap trackers
const btnNext = document.getElementById('btn-next'); //next button

/* Modal result */
let score = 0; // result

const correctAnswer = document.getElementById('correct-answer'), //count true answer
    numberofAllQuestions2 = document.getElementById(
        'number-of-all-questions-2',
    ),
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Что делает метод event.preventDefault() ?',
        options: [
            'отключает распространение события',
            'отключает поведение элемента по умолчанию',
            'отключает погружение события ',
            'отключает всплытие события',
        ],
        rightAnswer: 1,
    },
    {
        question: 'Результат выражения: console.log(7 - 7 + "2" + "12")',
        options: ['0212', '14', 'NaN', '014'],
        rightAnswer: 0,
    },
    {
        question: 'Что делает метод event.stopPropagation() ?',
        options: [
            'отключает пропаганду',
            'отключает поведение элемента по умолчанию',
            'отключает распространение события (его всплытие или погружение).',
            'отключает целевой элемент',
        ],
        rightAnswer: 2,
    },
    {
        question: 'Результат выражения: console.log("4" - 2 + 12)',
        options: ['undefined', '414', '14', 'NaN'],
        rightAnswer: 2,
    },
    {
        question: 'Что такое функции высшего порядка?',
        options: [
            'функция, возвращающая другую функцию или принимающая другую функцию в качестве аргумента',
            'функция имеющая самый высокий приоритет',
            'функции которые выполняются самыми первыми в очереди стека вызывов',
            'таких функций в языке JS не существует',
        ],
        rightAnswer: 0,
    },
    {
        question: 'console.log(4 + 10 + "px")',
        options: ['14px', '410px', 'undefined', 'NaN'],
        rightAnswer: 0,
    },
];

numberOfAllQuestions.innerHTML = questions.length; // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // Массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // Якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach((item) => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (element) => {
    if (element.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        element.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        element.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for (option of optionElements) {
    option.addEventListener('click', (e) => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach((item) => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

// Удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach((item) => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener('click', () => {
    validate();
});

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberofAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
