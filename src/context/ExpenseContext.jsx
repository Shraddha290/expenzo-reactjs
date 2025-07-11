import { createContext, useContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  income: JSON.parse(localStorage.getItem("income")) || 0,
  budgetLimit: JSON.parse(localStorage.getItem("budgetLimit")) || 0,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        income: state.income - action.payload.amount,
      };
    case "DELETE_EXPENSE":
      const deletedExpense = state.expenses.find(
        (expense) => expense.id === action.payload.id
      );
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
        income: deletedExpense ? state.income + deletedExpense.amount : state.income,
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "ADD_INCOME":
      return {
        ...state,
        income: state.income + action.payload,
      };
    case "SET_BUDGET_LIMIT":
      return {
        ...state,
        budgetLimit: action.payload,
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("income", JSON.stringify(state.income));
    localStorage.setItem("budgetLimit", JSON.stringify(state.budgetLimit));
  }, [state.expenses, state.income, state.budgetLimit]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: { id } });
  };

  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: expense });
  };

  const addIncome = (amount) => {
    dispatch({ type: "ADD_INCOME", payload: amount });
  };

  const setBudgetLimit = (limit) => {
    dispatch({ type: "SET_BUDGET_LIMIT", payload: limit });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        income: state.income,
        budgetLimit: state.budgetLimit,
        addExpense,
        deleteExpense,
        updateExpense,
        addIncome,
        setBudgetLimit,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};















