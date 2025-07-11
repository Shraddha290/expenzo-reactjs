import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";

const categoryOptions = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
  { value: "utilities", label: "Utilities" },
];

const ExpenseForm = () => {
  const { addExpense, expenses, budgetLimit } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("other");
 // const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState(() => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const amountValue = parseFloat(amount);
      if (!description || isNaN(amountValue) || amountValue <= 0) {
        toast.error("Please enter valid details.");
        return;
      }

      const newExpense = {
        id: crypto.randomUUID(),
        description,
        amount: amountValue,
        category,
        date,
      };

      const currentTotalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const newTotalExpenses = currentTotalExpenses + amountValue;

      if (budgetLimit && newTotalExpenses > budgetLimit) {
        toast.error("🚨 Budget Limit Exceeded. Control your expenses.");
      }

      addExpense(newExpense);
      toast.success("Expense Added Successfully!");

      setDescription("");
      setAmount("");
      setCategory("other");
      setDate("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-[var(--color-expense-dark)] mb-6 text-center">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--color-expense-dark)] text-white py-2 rounded-md hover:bg-blue-950 font-medium focus:outline-none focus:ring-2 focus:ring-expense-light transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

