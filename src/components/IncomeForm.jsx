import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const IncomeForm = () => {
  const { addIncome } = useExpenses();
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid income amount");
      return;
    }
    setIsSubmitting(true);
    addIncome(Number(amount));
    toast.success("Income added successfully");
    setAmount("");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-[var(--color-expense-dark)] mb-6 text-center">
        Add Income
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="incomeAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount Credited
          </label>
          <input
            type="number"
            id="incomeAmount"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--color-expense-dark)] text-white py-2 rounded-md hover:bg-blue-950 font-medium focus:outline-none focus:ring-2 focus:ring-expense-light transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Income"}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
