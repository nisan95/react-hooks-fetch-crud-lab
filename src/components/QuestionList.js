import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestion}) {
  
  React.useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(reponse => reponse.json())
    .then((data)=>setQuestion(data));
    
  }, []);
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          
        questions.map((Question)=> <QuestionItem key={Question.id} question={Question} setQuestion={setQuestion}/> )
        }
      </ul>
    </section>
  );
}

export default QuestionList;
