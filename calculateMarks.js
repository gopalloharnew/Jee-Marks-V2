function calculateMarks(questionAnswerStr) {
  if (!questionAnswerStr) {
    console.log("Please Enter questionAnswerStr");
    return;
  }
  let questionAnswerObject = JSON.parse(questionAnswerStr);
  let questionPanels = [...document.querySelectorAll(".question-pnl")];
  let sectionLabl = document.querySelectorAll(".section-lbl");
  let marksArray = [];

  questionPanels.forEach((questionPanel) => {
    let menuTable = questionPanel.querySelector(".menu-tbl");
    let menuTableRows = menuTable.querySelectorAll("tr");
    let questionType = menuTableRows[0].children[1].textContent;
    let questionId = menuTableRows[1].children[1].textContent;

    let correctAnswer = questionAnswerObject[questionId];

    if (questionType.toLocaleLowerCase() == "mcq") {
      checkMcq(menuTableRows, correctAnswer, marksArray);
    } else {
      checkNumerical(questionPanel, correctAnswer, marksArray);
    }
  });

  let correctAnswers = 0;
  let wrongAnswers = 0;
  let unanswered = 0;
  let marks = 0;
  for (let mark of marksArray) {
    switch (mark) {
      case -1:
        wrongAnswers++;
        break;
      case 4:
        correctAnswers++;
        break;
      case 0:
        unanswered++;
        break;
      default:
        break;
    }
    marks += mark;
  }
  console.log(
    `
  %c
  Marks: ${marks};
  Attempt: ${wrongAnswers + correctAnswers};
  correct: ${correctAnswers};
  Wrong: ${wrongAnswers};
  `,
    "font-size: 1.5rem;"
  );
}

function checkMcq(menuTableRows, correctOptionId, marksArray) {
  const choosenOptionElem = menuTableRows[menuTableRows.length - 1].children[1];
  let choosenOption;

  let firstOptionIndex = 2;

  for (let i = firstOptionIndex; i < firstOptionIndex + 4; i++) {
    const optionId = menuTableRows[i].children[1].textContent;
    if (optionId == correctOptionId) {
      menuTableRows[i].style.backgroundColor = "hsl(120, 100%, 45%)";
    }
  }

  if (!isNaN(choosenOptionElem.textContent)) {
    choosenOption = parseInt(choosenOptionElem.textContent);
  } else {
    choosenOption = false;
  }

  if (choosenOption) {
    let choosenOptionIndex = firstOptionIndex + choosenOption - 1;
    let choosenOptionId =
      menuTableRows[choosenOptionIndex].children[1].textContent;
    if (choosenOptionId == correctOptionId) {
      // correct
      menuTableRows[0].closest(".rw").style.backgroundColor =
        "hsl(120, 100%, 45%)";
      marksArray.push(4);
    } else {
      // incorrect
      menuTableRows[0].closest(".rw").style.backgroundColor =
        "hsl(20, 75%, 50%)";
      marksArray.push(-1);
    }
  } else {
    marksArray.push(0);
  }
}

function checkNumerical(questionPanel, correctAnswer, marksArray) {
  const questionRowTbl = questionPanel.querySelector(".questionRowTbl");
  const questionRowTblRows = questionRowTbl.querySelectorAll("tr");
  const filledAnswerElem =
    questionRowTblRows[questionRowTblRows.length - 1].children[1];

  questionPanel.querySelector(".menu-tbl").children[0].innerHTML += `
  <tr>
    <td align="right">Correct Answer :</td>
    <td class="bold">${correctAnswer}</td>
  </tr>
  `;

  let filledAnswer;
  if (!isNaN(filledAnswerElem.textContent)) {
    filledAnswer = parseInt(filledAnswerElem.textContent);
  } else {
    filledAnswer = false;
  }

  if (filledAnswer) {
    if (filledAnswer == correctAnswer) {
      // correct
      questionRowTblRows[0].closest(".rw").style.backgroundColor =
        "hsl(120, 100%, 45%)";
      marksArray.push(4);
    } else {
      questionRowTblRows[0].closest(".rw").style.backgroundColor =
        "hsl(20, 75%, 50%)";
      marksArray.push(-1);
    }
  } else {
    marksArray.push(0);
  }
}

calculateMarks();
