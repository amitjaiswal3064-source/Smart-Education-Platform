document.addEventListener("DOMContentLoaded", function () {

    /* ================= DOM ELEMENTS ================= */

    const loginPage = document.getElementById("loginPage");
    const studentPage = document.getElementById("studentPage");
    const subjectsPage = document.getElementById("subjectsPage");
    const subjectPage = document.getElementById("subjectPage");
    const quizPage = document.getElementById("quizPage");
    const resultPage = document.getElementById("resultPage");
    const teacherPage = document.getElementById("teacherPage");

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const studentRole = document.getElementById("studentRole");
    const teacherRole = document.getElementById("teacherRole");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");

    const studentName = document.getElementById("studentName");
    const studentYear = document.getElementById("studentYear");
    const teacherName = document.getElementById("teacherName");

    const recentScore = document.getElementById("recentScore");
    const averageScore = document.getElementById("averageScore");

    const selectedSubjectName =
        document.getElementById("selectedSubjectName");

    const subjectTitle =
        document.getElementById("subjectTitle");

    const topicContainer =
        document.getElementById("topicContainer");

    const quizTopic =
        document.getElementById("quizTopic");

    const questionNumber =
        document.getElementById("questionNumber");

    const totalQuestions =
        document.getElementById("totalQuestions");

    const currentScore =
        document.getElementById("currentScore");

    const question =
        document.getElementById("question");

    const option1 =
        document.getElementById("option1");

    const option2 =
        document.getElementById("option2");

    const option3 =
        document.getElementById("option3");

    const option4 =
        document.getElementById("option4");

    const nextBtn =
        document.getElementById("nextBtn");

    const finalScore =
        document.getElementById("finalScore");

    const correctAnswers =
        document.getElementById("correctAnswers");

    const wrongAnswers =
        document.getElementById("wrongAnswers");

    const resultWeakTopic =
        document.getElementById("resultWeakTopic");

    const answerExplanation =
        document.getElementById("answerExplanation");

    const retryBtn =
        document.getElementById("retryBtn");

    const studentData =
        document.getElementById("studentData");

    const classWeakTopics =
        document.getElementById("classWeakTopics");

    const studentSearch =
        document.getElementById("studentSearch");

    const announcementInput =
        document.getElementById("announcementInput");

    const announcementBtn =
        document.getElementById("announcementBtn");

    const announcementList =
        document.getElementById("announcementList");


    /* ================= VARIABLES ================= */

    let selectedRole = "student";
    let currentSubject = "";
    let currentTopic = "";
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let wrongTopics = [];

    let lastQuizTopic = "";

    /*
        Demo performance data.
        Backend नहीं है इसलिए browser में temporary data रहेगा.
    */

    let performanceData = {
        Rahul: 82,
        Priya: 76,
        Aman: 61,
        Neha: 88
    };


    /* ================= SHOW PAGE ================= */

    function showPage(page) {

        document.querySelectorAll(".page").forEach(function (p) {
            p.classList.remove("active");
        });

        page.classList.add("active");
    }


    /* ================= ROLE SELECTION ================= */

    studentRole.addEventListener("click", function () {

        selectedRole = "student";

        studentRole.classList.add("selected");
        teacherRole.classList.remove("selected");
    });


    teacherRole.addEventListener("click", function () {

        selectedRole = "teacher";

        teacherRole.classList.add("selected");
        studentRole.classList.remove("selected");
    });


    /* ================= LOGIN ================= */

    loginBtn.addEventListener("click", function () {

        const name = username.value.trim();
        const pass = password.value.trim();

        if (name === "" || pass === "") {

            loginMessage.textContent =
                "Please enter username and password.";

            return;
        }

        loginMessage.textContent = "";

        if (selectedRole === "student") {

            studentName.textContent = name;
            studentYear.textContent = name;

            showPage(studentPage);

        } else {

            teacherName.textContent = name;

            updateTeacherAnalytics();

            showPage(teacherPage);
        }
    });


    /* ================= STUDENT NAVIGATION ================= */

    document.getElementById("studentHomeBtn")
        .addEventListener("click", function () {

            showPage(studentPage);
        });


    document.getElementById("subjectsNavBtn")
        .addEventListener("click", function () {

            showPage(subjectsPage);
        });


    document.getElementById("studentLogoutBtn")
        .addEventListener("click", function () {

            showPage(loginPage);
        });


    /* ================= SUBJECT DATA ================= */

    const subjects = {

        "Data Structure": [
            "Arrays",
            "Linked List",
            "Stack",
            "Queue"
        ],

        "COA": [
            "Number System",
            "CPU Organization",
            "Memory",
            "Input Output"
        ],

        "DBMS": [
            "ER Model",
            "Keys",
            "Normalization",
            "SQL"
        ],

        "Operating System": [
            "Process",
            "CPU Scheduling",
            "Deadlock",
            "Memory Management"
        ],

        "Mathematics": [
            "Sets",
            "Relations",
            "Matrices",
            "Probability"
        ],

        "DAA": [
            "Time Complexity",
            "Searching",
            "Sorting",
            "Greedy Algorithm"
        ]
    };


    /* ================= SUBJECT PAGE ================= */

    document.getElementById("subjectsHomeBtn")
        .addEventListener("click", function () {

            showPage(studentPage);
        });


    document.getElementById("subjectsLogoutBtn")
        .addEventListener("click", function () {

            showPage(loginPage);
        });


    /* ================= OPEN SUBJECT ================= */

    document.querySelectorAll(".open-subject")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                currentSubject = button.textContent.trim();

                selectedSubjectName.textContent = currentSubject;
                subjectTitle.textContent =
                    currentSubject + " Topics";

                createTopics(currentSubject);

                showPage(subjectPage);
            });
        });


    /* ================= SUBJECT BUTTONS ================= */

    document.querySelectorAll(".subject-btn")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                currentSubject = button.textContent.trim();

                selectedSubjectName.textContent = currentSubject;
                subjectTitle.textContent =
                    currentSubject + " Topics";

                createTopics(currentSubject);

                showPage(subjectPage);
            });
        });


    /* ================= CREATE TOPICS ================= */

    function createTopics(subject) {

        topicContainer.innerHTML = "";

        subjects[subject].forEach(function (topic) {

            const button = document.createElement("button");

            button.textContent = topic;

            button.className = "topic-btn";

            button.addEventListener("click", function () {

                startTopic(topic);
            });

            topicContainer.appendChild(button);
        });
    }


    /* ================= QUIZ DATA ================= */

    const quizData = {

        "Arrays": [
            {
                q: "Which index is used for the first element of an array?",
                options: ["0", "1", "2", "-1"],
                answer: 0,
                explanation: "Array indexing normally starts from 0."
            },
            {
                q: "Array stores elements in which manner?",
                options: [
                    "Contiguous memory",
                    "Random memory",
                    "Only stack",
                    "Only queue"
                ],
                answer: 0,
                explanation: "Array elements are stored in contiguous memory."
            }
        ],

        "Linked List": [
            {
                q: "A linked list is made up of?",
                options: [
                    "Nodes",
                    "Only arrays",
                    "Only functions",
                    "Only variables"
                ],
                answer: 0,
                explanation: "A linked list consists of nodes."
            }
        ],

        "Stack": [
            {
                q: "Stack follows which principle?",
                options: [
                    "FIFO",
                    "LIFO",
                    "Random",
                    "Priority"
                ],
                answer: 1,
                explanation: "Stack follows Last In First Out."
            }
        ],

        "Queue": [
            {
                q: "Queue follows which principle?",
                options: [
                    "LIFO",
                    "FIFO",
                    "Random",
                    "None"
                ],
                answer: 1,
                explanation: "Queue follows First In First Out."
            }
        ],

        "Number System": [
            {
                q: "Binary number system uses?",
                options: [
                    "0 and 1",
                    "1 and 2",
                    "0 to 9",
                    "A to F"
                ],
                answer: 0,
                explanation: "Binary uses only 0 and 1."
            }
        ],

        "CPU Organization": [
            {
                q: "CPU mainly consists of?",
                options: [
                    "ALU and Control Unit",
                    "Keyboard",
                    "Monitor",
                    "Printer"
                ],
                answer: 0,
                explanation: "ALU and Control Unit are major CPU components."
            }
        ],

        "ER Model": [
            {
                q: "ER stands for?",
                options: [
                    "Entity Relationship",
                    "Easy Relation",
                    "External Record",
                    "Entity Record"
                ],
                answer: 0,
                explanation: "ER means Entity Relationship."
            }
        ],

        "Keys": [
            {
                q: "Which key uniquely identifies a record?",
                options: [
                    "Primary Key",
                    "Foreign Key",
                    "Candidate only",
                    "Normal Key"
                ],
                answer: 0,
                explanation: "Primary key uniquely identifies a record."
            }
        ],

        "Process": [
            {
                q: "A program in execution is called?",
                options: [
                    "Process",
                    "File",
                    "Folder",
                    "Compiler"
                ],
                answer: 0,
                explanation: "A program in execution is a process."
            }
        ],

        "Sets": [
            {
                q: "A set is a collection of?",
                options: [
                    "Well-defined objects",
                    "Only numbers",
                    "Only strings",
                    "Functions"
                ],
                answer: 0,
                explanation: "A set is a well-defined collection of objects."
            }
        ],

        "Relations": [
            {
                q: "A relation is a subset of?",
                options: [
                    "Cartesian Product",
                    "Union",
                    "Intersection",
                    "Difference"
                ],
                answer: 0,
                explanation: "A relation is a subset of Cartesian product."
            }
        ],

        "Time Complexity": [
            {
                q: "Which notation represents upper bound?",
                options: [
                    "Big O",
                    "Big Omega",
                    "Theta only",
                    "None"
                ],
                answer: 0,
                explanation: "Big O represents the upper bound."
            }
        ],

        "Searching": [
            {
                q: "Binary search requires the array to be?",
                options: [
                    "Sorted",
                    "Empty",
                    "Random",
                    "Unsorted"
                ],
                answer: 0,
                explanation: "Binary search works on sorted data."
            }
        ]
    };


    /* ================= START TOPIC ================= */

    function startTopic(topic) {

        if (!quizData[topic]) {

            alert("Quiz for this topic is coming soon.");

            return;
        }

        currentTopic = topic;
        lastQuizTopic = topic;

        currentQuestions = quizData[topic];

        currentQuestionIndex = 0;
        score = 0;
        wrongTopics = [];

        quizTopic.textContent = topic + " Quiz";

        totalQuestions.textContent =
            currentQuestions.length;

        currentScore.textContent = 0;

        showQuestion();

        showPage(quizPage);
    }


    /* ================= SHOW QUESTION ================= */

    function showQuestion() {

        const q = currentQuestions[currentQuestionIndex];

        questionNumber.textContent =
            currentQuestionIndex + 1;

        question.textContent = q.q;

        option1.textContent = q.options[0];
        option2.textContent = q.options[1];
        option3.textContent = q.options[2];
        option4.textContent = q.options[3];

        document.querySelectorAll(
            'input[name="answer"]'
        ).forEach(function (radio) {

            radio.checked = false;
        });
    }


    /* ================= NEXT BUTTON ================= */

    nextBtn.addEventListener("click", function () {

        const selected =
            document.querySelector(
                'input[name="answer"]:checked'
            );

        if (!selected) {

            alert("Please select an answer.");

            return;
        }

        const selectedAnswer =
            Number(selected.value);

        const current =
            currentQuestions[currentQuestionIndex];

        if (selectedAnswer === current.answer) {

            score++;

        } else {

            /*
                Personalized Learning:
                जिस topic में mistake हुई,
                उसे weak topic में store करेंगे.
            */

            wrongTopics.push(currentTopic);
        }

        currentScore.textContent = score;

        currentQuestionIndex++;

        if (
            currentQuestionIndex <
            currentQuestions.length
        ) {

            showQuestion();

        } else {

            showResult();
        }
    });


    /* ================= RESULT ================= */

    function showResult() {

        const total = currentQuestions.length;

        const wrong =
            total - score;

        const percentage =
            Math.round((score / total) * 100);

        finalScore.textContent =
            score + "/" + total;

        correctAnswers.textContent =
            score;

        wrongAnswers.textContent =
            wrong;

        /*
            Personalized Learning
        */

        if (wrongTopics.length > 0) {

            resultWeakTopic.textContent =
                currentTopic;

            answerExplanation.textContent =
                "You need more practice in " +
                currentTopic +
                ". We recommend revising this topic and attempting the quiz again.";

        } else {

            resultWeakTopic.textContent =
                "None";

            answerExplanation.textContent =
                "Excellent! You answered all questions correctly.";
        }


        /* Student performance update */

        const student =
            studentName.textContent;

        performanceData[student] = percentage;

        recentScore.textContent =
            percentage + "%";

        averageScore.textContent =
            percentage + "%";


        showPage(resultPage);
    }


    /* ================= RETRY ================= */

    retryBtn.addEventListener("click", function () {

        startTopic(lastQuizTopic);
    });


    /* ================= RESULT HOME ================= */

    document.getElementById("resultHomeBtn")
        .addEventListener("click", function () {

            showPage(studentPage);
        });


    /* ================= BACK TO SUBJECTS ================= */

    document.getElementById("backToSubjects")
        .addEventListener("click", function () {

            showPage(subjectsPage);
        });


    /* ==================================================
       TEACHER ANALYTICS
       ================================================== */

    function updateTeacherAnalytics() {

        const students =
            Object.keys(performanceData);

        /*
            Total Students
        */

        document.getElementById("totalStudents")
            .textContent = students.length;


        /*
            Class Average
        */

        let total = 0;

        students.forEach(function (student) {

            total += performanceData[student];
        });

        const average =
            Math.round(total / students.length);

        document.getElementById("classAverage")
            .textContent = average + "%";


        /*
            Student Performance List
        */

        studentData.innerHTML = "";

        students.forEach(function (student) {

            const row =
                document.createElement("div");

            row.className = "student-row";

            row.innerHTML =
                `<span>${student}</span>
                 <span>${performanceData[student]}%</span>`;

            studentData.appendChild(row);
        });


        /*
            Class Weak Topics
        */

        classWeakTopics.innerHTML = "";

        const weakTopics = [
            "DBMS - Normalization",
            "COA - CPU Organization",
            "DAA - Time Complexity"
        ];

        weakTopics.forEach(function (topic) {

            const p =
                document.createElement("p");

            p.textContent = topic;

            classWeakTopics.appendChild(p);
        });
    }


    /* ================= STUDENT SEARCH ================= */

    studentSearch.addEventListener("input", function () {

        const searchValue =
            studentSearch.value.toLowerCase();

        document.querySelectorAll(".student-row")
            .forEach(function (row) {

                const name =
                    row.children[0]
                        .textContent
                        .toLowerCase();

                if (name.includes(searchValue)) {

                    row.style.display = "grid";

                } else {

                    row.style.display = "none";
                }
            });
    });


    /* ================= ANNOUNCEMENT ================= */

    announcementBtn.addEventListener("click", function () {

        const text =
            announcementInput.value.trim();

        if (text === "") {

            alert("Please write an announcement.");

            return;
        }

        const announcement =
            document.createElement("div");

        announcement.className =
            "announcement";

        announcement.textContent = text;

        announcementList.appendChild(
            announcement
        );

        announcementInput.value = "";
    });


    /* ================= TEACHER HOME ================= */

    document.getElementById("teacherHomeBtn")
        .addEventListener("click", function () {

            showPage(teacherPage);
        });


    /* ================= TEACHER LOGOUT ================= */

    document.getElementById("teacherLogoutBtn")
        .addEventListener("click", function () {

            showPage(loginPage);
        });

});