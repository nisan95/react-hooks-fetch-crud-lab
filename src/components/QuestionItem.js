import React from "react";

function QuestionItem({ question, setQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option  key={index} value={index}>
      {answer}
    </option>
  ));


  function fetchQuestions() {
    fetch("http://localhost:4000/questions")
            .then(reponse => reponse.json())
            .then((data)=>setQuestion(data));
  }

  function handleClick(id){
    fetch('http://localhost:4000/questions/'+id,{method:"DELETE",})
    .then(reponse => {
      if(reponse.ok){
        fetchQuestions();
      }
    })
    .catch((err)=> console.error("ereur:",err));

  }

  function handleChange(id,index) {
    fetch('http://localhost:4000/questions/'+id,{
      method: 'PATCH',
      headers:{ "Content-Type": "application/json" },

      body:JSON.stringify({"correctIndex": parseInt(index)})
    }).then(reponse => reponse.json())
    fetchQuestions();


  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(event)=>handleChange(id,event.target.value)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={()=>handleClick(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
