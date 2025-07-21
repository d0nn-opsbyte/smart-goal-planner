import React, { useState } from 'react';

function DepositForm({ goals, setGoals }) {
  const [amount, setAmount] = useState('');
  const [goalId, setGoalId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const selectedGoal = goals.find((g) => String(g.id) === goalId);
    if (!selectedGoal) return;

    const newSavedAmount = Number(selectedGoal.savedAmount) + Number(amount);

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        setGoals((prev) =>
          prev.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
          )
        );
        setAmount('');
        setGoalId('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Deposit to a Goal</h2>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
        <option value="">Select goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;