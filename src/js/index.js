const fetchBtn = document.getElementById("fetchBtn");
const btnContainer = document.getElementById("btnContainer");
const transactions = document.getElementById("transactions");
const transactionsTable = document.getElementById("transactionsTable");

const allTransactions = document.getElementById("allTransactions");
const sumDeposits = document.getElementById("sumDeposits");
const sumWithdrawal = document.getElementById("sumWithdrawal");
const total = document.getElementById("total");

const amount = document.getElementById("amount");

let data = [];

function getTransactions() {
  return axios
    .get("http://localhost:3000/transactions")
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
    .get(`http://localhost:3000/transactions?_sort=${key}&_order=${direction}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching transactions:", err);
      return [];
    });
}

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
  sumDeposits.innerText = totalDeposits + "$";
  sumWithdrawal.innerText = totalWithdrawals + "$";
  total.innerHTML = balance + "$";
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
      transactionType === "Withdrawal" ? `-${item.price}$` : `${item.price}$`;
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
              <td>${transactionsTable.rows.length + 1}</td>
              <td>
                <span
                  class="ring-1 ${transactionColor} rounded-xl px-3 py-0.5"
                >
                  ${transactionType}
                </span>
              </td>
              <td class="${amountColor}">${amount}</td>
              <td>
                <span
                  class="ring-1 bg-violet-500 rounded-xl px-3 py-0.5 text-white"
                >
                  ${id}
                </span>
              </td>
              <td>${dateStr}</td>
              <td>${weekday}</td>
              <td>${time}</td>
            </tr>`;
  });
}

fetchBtn.addEventListener("click", async () => {
  data = await getTransactions();
  console.log(data);
  updateSummary(data);
  updateTable(data);
  btnContainer.classList.add("hidden");
  transactions.classList.remove("hidden");
});

amount.addEventListener("click", async () => {
  const icon = amount.querySelector("span");
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
