const url = "http://localhost:3000/transactions";

//! DOM Elements
const fetchBtn = document.getElementById("fetchBtn");
const btnContainer = document.getElementById("btnContainer");
const transactions = document.getElementById("transactions");
const transactionsTable = document.getElementById("transactionsTable");

const allTransactions = document.getElementById("allTransactions");
const sumDeposits = document.getElementById("sumDeposits");
const sumWithdrawal = document.getElementById("sumWithdrawal");
const total = document.getElementById("total");

const amountHeader = document.getElementById("amountHeader");
const date = document.getElementById("date");

const searchInput = document.getElementById("search");
const submissionForm = document.getElementById("submissionForm");

let data = [];

//! Back-End API calls
function getTransactions() {
  return axios
    .get(url)
    .then((result) => result.data)
    .catch((err) => console.log(err));
}

function sortTransactions(key = "price", direction = "asc") {
  const allowedKeys = ["price", "date"];
  const allowedDirections = ["asc", "desc"];

  if (!allowedKeys.includes(key) || !allowedDirections.includes(direction)) {
    console.error("Invalid sort parameters");
    return Promise.resolve([]);
  }

  return axios
    .get(
      `${url}?_sort=${key}&_order=${direction}&refId_like=${searchInput.value}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching transactions:", err);
      return [];
    });
}

function searchFunction(value) {
  return axios.get(`${url}?refId_like=${value}`).catch((err) => {
    console.error("Search Failed!", err);
    return [];
  });
}

//! UI Update
function updateSummary(data) {
  const transactionCount = data.length;
  const totalDeposits = data
    .filter((item) => item.type === "Deposit")
    .reduce((sum, item) => (sum += item.price), 0);
  const totalWithdrawals = data
    .filter((item) => item.type === "Withdrawal")
    .reduce((sum, item) => (sum += item.price), 0);
  const balance = totalDeposits - totalWithdrawals;

  allTransactions.innerText = transactionCount;
  sumDeposits.innerText = "$" + totalDeposits;
  sumWithdrawal.innerText = "$" + totalWithdrawals;
  total.innerHTML = "$" + balance;
}

function updateTable(data) {
  transactionsTable.innerHTML = "";

  data.forEach((item) => {
    const transactionType = item.type;
    const transactionColor =
      transactionType === "Withdrawal"
        ? "ring-red-300 bg-red-200 text-red-600"
        : "ring-green-300 bg-green-200 text-green-600";
    const amountColor =
      transactionType === "Withdrawal" ? "text-red-500" : "text-green-500";
    const amount =
      transactionType === "Withdrawal" ? `-$${item.price}` : `$${item.price}`;
    const id = item.refId;
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = `${day}/${month}/${year}`;
    const time = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;

    transactionsTable.innerHTML += `<tr class="text-center h-10">
              <td class="text-xs md:text-sm text-nowrap">${
                transactionsTable.rows.length + 1
              }</td>
              <td class="text-xs md:text-sm text-nowrap hidden md:table-cell">
                <span
                  class="ring-1 ${transactionColor} rounded-xl px-3 py-0.5"
                >
                  ${transactionType}
                </span>
              </td>
              <td class="${amountColor} text-xs md:text-sm text-nowrap">${amount}</td>
              <td class="text-xs md:text-sm text-nowrap">
                <span
                  class="ring-1 bg-violet-500 rounded-xl px-3 py-0.5 text-white"
                >
                  ${id}
                </span>
              </td>
              <td class="text-xs md:text-sm text-nowrap">${dateStr}</td>
              <td class="text-xs md:text-sm text-nowrap hidden md:table-cell">${weekday}</td>
              <td class="text-xs md:text-sm text-nowrap">${time}</td>
            </tr>`;
  });
}

//! Evenet Listeners
document.addEventListener("DOMContentLoaded", () => (searchInput.value = ""));

fetchBtn.addEventListener("click", async () => {
  data = await getTransactions();
  updateSummary(data);
  updateTable(data);
  btnContainer.classList.add("hidden");
  transactions.classList.remove("hidden");
});

amountHeader.addEventListener("click", async () => {
  const icon = amountHeader.querySelector("span");
  // Rotating the chevron
  icon.classList.add("transform", "transition-transform", "duration-300");
  icon.classList.toggle("rotate-180");

  // Sorting
  const direction = icon.classList.contains("rotate-180") ? "asc" : "desc";
  try {
    data = await sortTransactions("price", direction);
    updateTable(data);
  } catch (err) {
    console.error("Failed to sort transactions:", err);
  }
});

date.addEventListener("click", async () => {
  const icon = date.querySelector("span");
  // Rotating the chevron
  icon.classList.add("transform", "transition-transform", "duration-300");
  icon.classList.toggle("rotate-180");

  // Sorting
  const direction = icon.classList.contains("rotate-180") ? "asc" : "desc";
  try {
    data = await sortTransactions("date", direction);
    updateTable(data);
  } catch (err) {
    console.error("Failed to sort transactions:", err);
  }
});

searchInput.addEventListener("input", async () => {
  searchResults = (await searchFunction(searchInput.value)).data;
  updateTable(searchResults);
});

submissionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const amount = Number(formData.get("amount"));
  const type = formData.get("type");

  // posting the transaction to the database
  axios
    .post(url, {
      refId: Math.floor(100_000_000 + Math.random() * 900_000_000), // random 9 digit ID
      price: amount,
      type: type,
      date: Date.now(),
    })
    .then(async () => {
      data = await getTransactions();
      updateSummary(data);
      updateTable(data);
    });
  submissionForm.reset();
});
