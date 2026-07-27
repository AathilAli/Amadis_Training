// =========================================================
// RoomMate+ — app logic
// =========================================================

// ---------- State ----------
let roommates = [];
let expenses = [];
let chores = [];

let nextRoommateID = 1;
let nextExpenseID = 1;
let nextChoreID = 1;

// ---------- DOM refs ----------
const roommateInput = document.getElementById("input");
const addRoommateBtn = document.getElementById("addRoommate");
const roommateList = document.getElementById("roommateList");

const expenseDescription = document.getElementById("expenseDescription");
const expenseAmount = document.getElementById("expenseAmount");
const paidBy = document.getElementById("paidBy");
const addExpenseBtn = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const expenseSearch = document.getElementById("expenseSearch");

const balanceList = document.getElementById("balanceList");

const choreName = document.getElementById("choreName");
const assignTo = document.getElementById("assignTo");
const dueDate = document.getElementById("dueDate");
const addChoreBtn = document.getElementById("addChore");
const choreList = document.getElementById("choreList");
const choreSearch = document.getElementById("choreSearch");
const choreFilter = document.getElementById("choreFilter");

const roommateCountEl = document.getElementById("roommateCount");
const totalExpensesEl = document.getElementById("totalExpenses");
const pendingChoresEl = document.getElementById("pendingChores");

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", init);

function init() {
  roommates = JSON.parse(localStorage.getItem("roommates")) || [];
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  chores = JSON.parse(localStorage.getItem("chores")) || [];

  nextRoommateID = roommates.length ? Math.max(...roommates.map((r) => r.id)) + 1 : 1;
  nextExpenseID = expenses.length ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;
  nextChoreID = chores.length ? Math.max(...chores.map((c) => c.id)) + 1 : 1;

  renderRoommates();
  updateDropdowns();
  renderExpenses(expenses);
  renderChores(chores);
  calculateBalances();
  updateDashboard();
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// =========================
// Roommates
// =========================
addRoommateBtn.addEventListener("click", addRoommate);

function addRoommate() {
  const name = roommateInput.value.trim();
  if (name === "") return;

  roommates.push({ id: nextRoommateID++, name });
  save("roommates", roommates);

  renderRoommates();
  updateDropdowns();
  updateDashboard();

  roommateInput.value = "";
}

function deleteRoommate(id) {
  roommates = roommates.filter((r) => r.id !== id);

  // Cascade delete so nothing points at a roommate that no longer exists
  expenses = expenses.filter((e) => e.paidBy !== id);
  chores = chores.filter((c) => c.assignedTo !== id);

  save("roommates", roommates);
  save("expenses", expenses);
  save("chores", chores);

  renderRoommates();
  updateDropdowns();
  renderExpenses(applyExpenseFilter());
  renderChores(applyChoreFilters());
  calculateBalances();
  updateDashboard();
}

function renderRoommates() {
  roommateList.innerHTML = "";

  roommates.forEach((roommate) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = roommate.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteRoommate(roommate.id));

    li.appendChild(nameSpan);
    li.appendChild(deleteButton);
    roommateList.appendChild(li);
  });
}

function updateDropdowns() {
  paidBy.innerHTML = '<option value="">Select Roommate</option>';
  assignTo.innerHTML = '<option value="">Assign Roommate</option>';

  roommates.forEach((roommate) => {
    const option1 = document.createElement("option");
    option1.value = roommate.id;
    option1.textContent = roommate.name;
    paidBy.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = roommate.id;
    option2.textContent = roommate.name;
    assignTo.appendChild(option2);
  });
}

function getRoommateName(id) {
  const roommate = roommates.find((r) => r.id === id);
  return roommate ? roommate.name : "Unknown";
}

// =========================
// Expenses
// =========================
addExpenseBtn.addEventListener("click", addExpenseHandler);
if (expenseSearch) expenseSearch.addEventListener("input", () => renderExpenses(applyExpenseFilter()));

function addExpenseHandler() {
  if (
    expenseDescription.value.trim() === "" ||
    expenseAmount.value === "" ||
    paidBy.value === ""
  ) {
    return;
  }

  const expense = {
    id: nextExpenseID++,
    description: expenseDescription.value.trim(),
    amount: Number(expenseAmount.value),
    paidBy: Number(paidBy.value),
  };

  expenses.push(expense);
  save("expenses", expenses);

  renderExpenses(applyExpenseFilter());
  calculateBalances();
  updateDashboard();

  expenseDescription.value = "";
  expenseAmount.value = "";
  paidBy.value = "";
}

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  save("expenses", expenses);

  renderExpenses(applyExpenseFilter());
  calculateBalances();
  updateDashboard();
}

function renderExpenses(list) {
  expenseList.innerHTML = "";

  list.forEach((expense) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${expense.description} | ₹${expense.amount} | Paid by ${getRoommateName(expense.paidBy)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteExpense(expense.id));

    li.appendChild(text);
    li.appendChild(deleteButton);
    expenseList.appendChild(li);
  });
}

function applyExpenseFilter() {
  const term = expenseSearch ? expenseSearch.value.trim().toLowerCase() : "";
  if (term === "") return expenses;

  return expenses.filter(
    (e) =>
      e.description.toLowerCase().includes(term) ||
      getRoommateName(e.paidBy).toLowerCase().includes(term)
  );
}

// =========================
// Balances
// =========================
function calculateBalances() {
  balanceList.innerHTML = "";

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const share = roommates.length > 0 ? totalExpense / roommates.length : 0;

  const creditors = [];
  const debtors = [];

  roommates.forEach((roommate) => {
    const totalPaid = expenses
      .filter((e) => e.paidBy === roommate.id)
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalPaid - share;
    const li = document.createElement("li");

    if (balance > 0.004) {
      li.textContent = `${roommate.name} | Paid ₹${totalPaid} | Gets ₹${balance.toFixed(2)}`;
      li.dataset.owed = "false";
      creditors.push({ name: roommate.name, amount: balance });
    } else if (balance < -0.004) {
      li.textContent = `${roommate.name} | Paid ₹${totalPaid} | Owes ₹${Math.abs(balance).toFixed(2)}`;
      li.dataset.owed = "true";
      debtors.push({ name: roommate.name, amount: Math.abs(balance) });
    } else {
      li.textContent = `${roommate.name} | Paid ₹${totalPaid} | Settled`;
    }

    balanceList.appendChild(li);
  });

  debtors.forEach((debtor) => {
    creditors.forEach((creditor) => {
      if (debtor.amount > 0.004 && creditor.amount > 0.004) {
        const payment = Math.min(debtor.amount, creditor.amount);

        const li = document.createElement("li");
        li.textContent = `${debtor.name} should pay ${creditor.name} ₹${payment.toFixed(2)}`;
        balanceList.appendChild(li);

        debtor.amount -= payment;
        creditor.amount -= payment;
      }
    });
  });
}

// =========================
// Chores
// =========================
addChoreBtn.addEventListener("click", addChoreHandler);
if (choreSearch) choreSearch.addEventListener("input", () => renderChores(applyChoreFilters()));
if (choreFilter) choreFilter.addEventListener("change", () => renderChores(applyChoreFilters()));

function addChoreHandler() {
  if (
    choreName.value.trim() === "" ||
    assignTo.value === "" ||
    dueDate.value === ""
  ) {
    return;
  }

  const chore = {
    id: nextChoreID++,
    name: choreName.value.trim(),
    assignedTo: Number(assignTo.value),
    dueDate: dueDate.value,
    completed: false,
  };

  chores.push(chore);
  save("chores", chores);

  renderChores(applyChoreFilters());
  updateDashboard();

  choreName.value = "";
  assignTo.value = "";
  dueDate.value = "";
}

function completeChore(id) {
  const chore = chores.find((c) => c.id === id);
  if (chore) chore.completed = true;

  save("chores", chores);

  renderChores(applyChoreFilters());
  updateDashboard();
}

function deleteChore(id) {
  chores = chores.filter((c) => c.id !== id);
  save("chores", chores);

  renderChores(applyChoreFilters());
  updateDashboard();
}

function renderChores(list) {
  choreList.innerHTML = "";

  list.forEach((chore) => {
    const li = document.createElement("li");
    if (chore.completed) li.classList.add("completed");

    const text = document.createElement("span");
    text.textContent = `${chore.name} | ${getRoommateName(chore.assignedTo)} | ${chore.dueDate}`;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.disabled = chore.completed;
    completeButton.addEventListener("click", () => completeChore(chore.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteChore(chore.id));

    li.appendChild(text);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    choreList.appendChild(li);
  });
}

function applyChoreFilters() {
  const term = choreSearch ? choreSearch.value.trim().toLowerCase() : "";
  const status = choreFilter ? choreFilter.value : "all";

  return chores.filter((chore) => {
    const matchesTerm =
      term === "" ||
      chore.name.toLowerCase().includes(term) ||
      getRoommateName(chore.assignedTo).toLowerCase().includes(term);

    const matchesStatus =
      status === "all" ||
      (status === "completed" && chore.completed) ||
      (status === "pending" && !chore.completed);

    return matchesTerm && matchesStatus;
  });
}

// =========================
// Dashboard
// =========================
function updateDashboard() {
  roommateCountEl.textContent = `Roommates: ${roommates.length}`;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalExpensesEl.textContent = `Total Expenses: ₹${total}`;

  const pending = chores.filter((c) => !c.completed).length;
  pendingChoresEl.textContent = `Pending Chores: ${pending}`;
}
