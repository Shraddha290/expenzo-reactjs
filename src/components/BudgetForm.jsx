import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const BudgetForm = () => {
  const { setBudgetLimit } = useExpenses();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Enter a valid budget amount.");
      return;
    }
    setBudgetLimit(numericAmount);
    toast.success("Budget Updated Successfully!");
    setAmount("");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-center text-[var(--color-expense-dark)]">
          Set Budget Limit
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter budget limit"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="bg-[var(--color-expense)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-expense-dark)]"
          >
            Update Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;

