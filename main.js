/* All answer options */
const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2"),
  option3 = document.querySelector(".option3"),
  option4 = document.querySelector(".option4");

/* All our options */
const optionElements = document.querySelectorAll(".option");

/* Question */
const question = document.getElementById("question"); // this question
const numberOfQuestion = document.getElementById("number-of-question"), // number of question
  numberOfAllQuestions = document.getElementById("number-of-all-questions"); //all question

let indexOfQuestion, //index this question
  indexOfPage = 0; //index page

const answersTracker = document.getElementById("answers-tracker"); //wrap trackers
const btnNext = document.getElementById("btn-next"); //next button

/* Modal result */
let score = 0; // result

const correctAnswer = document.getElementById("correct-answer"), //count true answer
  numberofAllQuestions2 = document.getElementById("number-of-all-questions-2"),
  btnTryAgain = document.getElementById("btn-try-again");

const questions = [
  {
    question: "Какой параметр отвечает за функцию управления двигателем ?",
    options: ["1-01", "1-10", "1-16", "1-17"],
    rightAnswer: 0,
  },
  {
    question: "Какой параметр отвечает за включение тормозного резистора ?",
    options: ["1-10", "2-01", "2-10", "2-11"],
    rightAnswer: 2,
  },
  {
    question: "Какой параметр задает сопротивление тормозного резистора?",
    options: ["2-10", "2-11", "5-40", "5-32"],
    rightAnswer: 1,
  },
  {
    question:
      "Какой параметр задает % от мощности номинального двигателя по битово",
    options: ["2-10", "3-10", "3-11", "1-01"],
    rightAnswer: 1,
  },
  {
    question: "Какой параметр отвечает за время ускорения ?",
    options: ["5-40", "5-41", "3-41", "3-42"],
    rightAnswer: 2,
  },
  {
    question: "Какой параметр отвечает за время торможения ?",
    options: ["5-40", "5-41", "3-41", "3-42"],
    rightAnswer: 3,
  },
  {
    question:
      "Какой параметр отвечает за установку задания для цифрового входа клеммы 12 ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 0,
  },
  {
    question:
      "Какой параметр отвечает за установку задания для цифрового входа клеммы 18 ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 1,
  },
  {
    question:
      "Какой параметр отвечает за установку задания для цифрового входа клеммы 19 ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 2,
  },
  {
    question:
      "Какой параметр отвечает за установку задания для цифрового входа клеммы 29 ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 3,
  },
  {
    question: "Какой параметр отвечает за установку механического тормоза ?",
    options: ["5-40", "5-32", "2-10", "2-11"],
    rightAnswer: 0,
  },
  {
    question: "Какое значение должно быть в параметре 1-01 ?",
    options: ["0", "1", "2", "3"],
    rightAnswer: 1,
  },
  {
    question:
      "Какое значение должно быть в параметре 2-10, если тормозной резистор установлен ?",
    options: ["0", "1", "150", "240"],
    rightAnswer: 1,
  },
  {
    question:
      "Какое значение должно быть в параметре 2-11, если установлено 2 резистора по 240 Ом ?",
    options: ["240", "480", "120", "80"],
    rightAnswer: 2,
  },
  {
    question: "Какие значения принятно устанавливать в параметре 3-10 ?",
    options: [
      "0 - 25%, 1 - 100%",
      "0 - 100%, 1 - 25%",
      "0 - 0, 1 - 25%, 2 - 100%",
      "нет необходимости настраивать параметры",
    ],
    rightAnswer: 0,
  },
  {
    question: "Какие значения принятно устанавливать в параметре 3-41, 3-42 ?",
    options: [
      "3-41: Таль: 5сек, Кран - 5сек; 3-42: Таль: 5сек, Кран - 5сек",
      "3-41: Таль: 3сек, Кран - 3сек; 3-42: Таль: 3сек, Кран - 3сек",
      "3-41: Таль: 3сек, Кран - 5сек; 3-42: Таль: 3сек, Кран - 5сек",
      "3-41: Таль: 5сек, Кран - 3сек; 3-42: Таль: 5сек, Кран - 3сек",
    ],
    rightAnswer: 2,
  },
  {
    question: "Какой параметр отвечает за установку задания 1-ой скорости ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 2,
  },
  {
    question: "Какой параметр отвечает за установку задания 2-ой скорости ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 3,
  },
  {
    question: "Какой параметр отвечает за установку задания для пуска ?",
    options: ["5-10", "5-11", "5-12", "5-13"],
    rightAnswer: 0,
  },
  {
    question: "Какое значение параметра 5-11 следует устанавливать ?",
    options: ["8", "11", "16", "32"],
    rightAnswer: 1,
  },
  {
    question: "Какое значение параметра 5-10 следует устанавливать ?",
    options: ["8", "11", "16", "32"],
    rightAnswer: 0,
  },
  {
    question: "Какое значение параметра 5-12 следует устанавливать ?",
    options: ["8", "11", "16", "32"],
    rightAnswer: 2,
  },
  {
    question: "Какое значение параметра 5-13 следует устанавливать ?",
    options: ["8", "11", "16", "32"],
    rightAnswer: 2,
  },
  {
    question:
      "Какое значение параметра 5-40 следует устанавливать, если установлен механический тормоз ?",
    options: ["8", "11", "16", "32"],
    rightAnswer: 3,
  },
  {
    question: "Какой параметр сбрасывает все настройки ?",
    options: ["14-22", "14-20", "1-01", "1-00"],
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
    element.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    element.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

// Удаление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Вам нужно выбрать один из вариантов ответа");
  } else {
    randomQuestion();
    enableOptions();
  }
};

btnNext.addEventListener("click", () => {
  validate();
});

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberofAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
