const questions = [
    {
        question: "❃ Alin sa mga sakramento ang nagdadala sa atin ng bagong buhay kay Kristo at kapatawaran ng mga kasalanan sa pamamagitan ng tubig at Espiritu?",
        options: ["Kumpil", "Binyag", "Pagtanggap ng Banal na komunyon", "Wala sa pamilian"],
        answer: "Binyag"
    },
    {
        question: "❃ Sa binyag, ano ang nililinis at inaalis sa taong tumatanggap nito?",
        options: ["Personal na kasalanan", "Kasalanang Mana", "Pareho", "Wala sa pamilian"],
        answer: "Pareho"
    },
    {
        question: "❃ Sa binyag ay nagiging kaanib ng _____________ ang simbahan?",
        options: ["Iglesia ni Kristo", "Katawan ni Kristo", "Samahang Banal", "wala sa pamilian"],
        answer: "Katawan ni Kristo"
    },
    {
        question: "❃ Sa pamamagitan din ng Binyag tayo ay nagiging mga ____________ at nagiging mga tagapagmana ng langit?",
        options: ["Kristiyano", "Anak ni Kristo", "Anak ng Diyos", "Kaanib ni Kristo"],
        answer: "Anak ng Diyos"
    },
    {
        question: "❃ Sino ang dapat tumanggap ng Binyag?",
        options: ["Lahat ng may gusto kahit di kaanib ng simbahang Katoliko", "Ang mga sanggol at mga taong wala pang binyag ngunit nagnanais na tumanggap nito", "Ang mga taong may sapat na gulang lang", "Ang mga sanggol lang na wala pang binyag"],
        answer: "Ang mga sanggol at mga taong wala pang binyag ngunit nagnanais na tumanggap nito"
    },
    {
        question: "❃ Sino naman ang naggawad ng Sakramento ng Binyag?",
        options: ["Kahit sinong tao", "Diyakuno lang", "Pari lamang", "Pari, Diyakuno at Obispo"],
        answer: "Pari, Diyakuno at Obispo"
    },
    {
        question: "❃ Alin sa mga sumusunod ang obligasyon ng mga magulang?",
        options: ["Sila ang gagabay ay magtuturo ng tungkol sa Simbahan at pananampalataya habang lumalaki at dumadating sa wastong gulang ang mga batang nabinyagan", "Dapat magpapakita ng mga mabubuting halimbawa at wastong asal sa isang nabinyagan sa Simabahang Katolika", "Pareho", "Wala sa pamilian"],
        answer: "Pareho"
    },
    {
        question: "❃ Ano ang mga gampanin ng mga Ninong at Ninang?",
        options: ["Pag agapay sa mga magulang", "Sila ang tutulong sa pagtuturo tungkol sa pananampalataya kasama na din ang pagpapakita ng mabuting pamumuhay bilang Kristiyano", "Pareho", "Wala sa pamilian"],
        answer: "Pareho"
    },
    {
        question: "❃ Ilan ang utos ng Santa Iglesia?",
        options: ["4", "6", "5", "10"],
        answer: "5"
    },
    {
        question: "❃ Ilan ang sakramento ng Simbahang Katoliko?",
        options: ["5", "7", "6", "8"],
        answer: "7"
    }
];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultText = document.getElementById("result-text");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = false;

function showQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    questionText.textContent = currentQuestionObj.question;

    optionsContainer.innerHTML = '';
    currentQuestionObj.options.forEach((option, index) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    resultText.textContent = "";
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].answer) {
            score++;
            resultText.textContent = "Correct!";
            resultText.style.color = 'green';
        } else {
            resultText.textContent = "Incorrect!";
            incorrectAnswers = true; // Set flag for incorrect answer
            resultText.style.color = 'red';
        }
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value !== questions[currentQuestion].answer) {
        incorrectAnswers = true;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // All questions answered
        if (!incorrectAnswers) {
            redirectToCertificate();
        } else {
            alert("You have incorrect answers. Quiz will restart.");
            restartQuiz();
        }
    }
}

function redirectToCertificate() {
    // Retrieve the respondent's first name and last name from the registration form
    var fname = sessionStorage.getItem('respondent_first_name') || 'Anonymous';
    var lname = sessionStorage.getItem('respondent_last_name') || '';

    // Construct the URL with query parameters to pass fname and lname
    var certificateUrl = `certificate.html?fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}`;

    // Redirect to certificate.html with fname and lname in the URL
    window.location.href = certificateUrl;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = false;

    // Shuffle the questions array
    shuffleArray(questions);

    // Shuffle the options within each question
    questions.forEach(question => {
        shuffleArray(question.options);
    });

    showQuestion();
    hideResult();
    showOptions();
    showSubmitButton();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);

showQuestion(); // Display the first question when the page loads
