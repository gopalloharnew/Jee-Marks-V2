function getAnswers() {
  const answerTable = document.querySelector("#ctl00_LoginContent_grAnswerKey");
  let questionIdColumn;
  let questionAnswerArray = [];
  if (!answerTable) {
    console.log("AnswerTable Not Found");
    return;
  }

  let theads = [...answerTable.querySelectorAll("th")];
  theads.forEach((th, i) => {
    if (th.textContent.toLowerCase() == "questionid") {
      questionIdColumn = i;
    }
  });

  let questionRows = answerTable.children[0].children;
  console.log(questionRows.length);
  for (let i = 1; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    let questionIdElement = questionRow.children[questionIdColumn];
    let correctAnswerIdElement = questionRow.children[questionIdColumn + 1];
    let questionId = questionIdElement.children[0].textContent;
    let correctAnswerId = correctAnswerIdElement.children[0].textContent;
    questionAnswerArray.push({
      questionId: questionId,
      correctAnswerId: correctAnswerId,
    });
  }

  console.log(JSON.stringify(questionAnswerArray));
}

getAnswers();
