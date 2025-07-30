const fetchBtn = document.getElementById("fetchBtn");
const btnContainer = document.getElementById("btnContainer");
const transactions = document.getElementById("transactions");
const transactionsTable = document.getElementById("transactionsTable");
let data = [];

function getTransactions() {
  return axios
    .get("http://localhost:3000/transactions")
    .then((result) => result.data)
    .catch((err) => console.log(err));
}

function updateDOM(data) {
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
  updateDOM(data);
  btnContainer.classList.add("hidden");
  transactions.classList.remove("hidden");
});
