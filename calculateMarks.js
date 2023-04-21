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

calculateMarks(`{"7155054132":"71550513074","7155054133":"71550513077","7155054134":"71550513082","7155054135":"71550513084","7155054136":"71550513090","7155054137":"71550513092","7155054138":"71550513095","7155054139":"71550513100","7155054140":"71550513106","7155054141":"71550513110","7155054142":"71550513114","7155054143":"71550513115","7155054144":"71550513119","7155054145":"71550513124","7155054146":"71550513129","7155054147":"71550513133","7155054148":"71550513137","7155054149":"71550513141","7155054150":"71550513145","7155054151":"71550513149","7155054152":"24","7155054153":"24","7155054154":"26664","7155054155":"16","7155054156":"11","7155054157":"27","7155054158":"6","7155054159":"529","7155054160":"7","7155054161":"6","7155054162":"71550513163","7155054163":"71550513167","7155054164":"71550513171","7155054165":"71550513175","7155054166":"71550513179","7155054167":"71550513183","7155054168":"71550513188","7155054169":"71550513189","7155054170":"71550513196","7155054171":"71550513200","7155054172":"71550513201","7155054173":"71550513208","7155054174":"71550513212","7155054175":"71550513215","7155054176":"71550513219","7155054177":"71550513223","7155054178":"71550513225","7155054179":"71550513230","7155054180":"71550513233","7155054181":"71550513240","7155054182":"20","7155054183":"80","7155054184":"3","7155054185":"48","7155054186":"8","7155054187":"3668","7155054188":"34","7155054189":"44","7155054190":"2","7155054191":"3","7155054192":"71550513252","7155054193":"71550513255","7155054194":"71550513261","7155054195":"71550513263","7155054196":"71550513267","7155054197":"71550513271","7155054198":"71550513277","7155054199":"71550513279","7155054200":"71550513285","7155054201":"71550513287","7155054202":"71550513294","7155054203":"71550513296","7155054204":"71550513299","7155054205":"71550513303","7155054206":"71550513309","7155054207":"71550513311","7155054208":"71550513316","7155054209":"71550513322","7155054210":"71550513324","7155054211":"71550513327","7155054212":"1","7155054213":"4","7155054214":"4","7155054215":"40535","7155054216":"3","7155054217":"66","7155054218":"1","7155054219":"2","7155054220":"4","7155054221":"3"}
`);
