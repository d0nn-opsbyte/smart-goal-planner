import React, { useEffect, useState } from "react";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

function App(){
  const [ goals, setGoals ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
    .then((res) => res.json())
    .then(setGoals);
  }, []);

  return(
    <div>
      <h1>Smart Goal Planner</h1>
      <GoalForm setGoals={setGoals}/>
      <DepositForm goals={goals} setGoals={setGoals}/>
      <Overview goals={goals}/>
      <GoalList goals={goals} setGoals={setGoals}/>
    </div>
  );
}

export default App;
