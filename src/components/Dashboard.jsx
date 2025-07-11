import BudgetForm from "./BudgetForm";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import ExpenseSummary from "./ExpenseSummary";

const Dashboard = () => {
  return (
    <div className="space-y-8">
     
      <ExpenseSummary />

      <BudgetForm />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseChart />
        </div>
        <div>
          <ExpenseForm />
          <div className="mt-6">
            <IncomeForm />
          </div>
        </div>
      </div>

     
      <ExpenseList />
    </div>
  );
};

export default Dashboard;














