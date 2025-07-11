import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import { formatCurrency, getExpensesByCategory, getTotalExpenses } from "../utils/expenses";
import { DollarSign, Wallet, TrendingUp } from "lucide-react";

const ExpenseSummary = () => {
  const { expenses, income, budgetLimit } = useExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const categoriesData = getExpensesByCategory(expenses);

  let highestCategory = { name: "none", amount: 0 };
  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount: amount };
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Income */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign size={24} className="text-green-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(income)}</p>
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Wallet size={24} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-700">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
      </div>

      {/* Highest Category */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <TrendingUp size={24} className="text-yellow-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Highest Category</h3>
            <p className="text-md font-bold text-[var(--color-expense-dark)]">
              {highestCategory.name !== "none" ? (
                <>
                  <span className="capitalize">{highestCategory.name}</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({formatCurrency(highestCategory.amount)})
                  </span>
                </>
              ) : (
                "None"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Limit Card */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <DollarSign size={24} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Budget Limit</h3>
            <p className="text-2xl font-bold text-purple-700">
              {budgetLimit > 0 ? formatCurrency(budgetLimit) : "Not Set"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;































