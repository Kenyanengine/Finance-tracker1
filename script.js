let totalIncome = 0;
let totalSpending = 0;

function addIncome() {
  let income = parseFloat(document.getElementById("incomeInput").value);
  if (!isNaN(income)) {
    totalIncome += income;
    document.getElementById("totalIncome").innerText = totalIncome.toFixed(2);
    document.getElementById("incomeInput").value = "";
  }
}

function addSpending() {
  let spend = parseFloat(document.getElementById("spendInput").value);
  if (!isNaN(spend)) {
    totalSpending += spend;
    document.getElementById("totalSpending").innerText = totalSpending.toFixed(2);
    document.getElementById("spendInput").value = "";
  }
}

function calculateSnowball() {
  const debts = document.getElementById("debtsInput").value.split(",").map(d => parseFloat(d.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
  const monthlyBudget = parseFloat(document.getElementById("monthlyPayment").value);
  let output = "";

  if (debts.length === 0 || isNaN(monthlyBudget)) {
    output = "<p>Please enter valid debts and monthly payment amount.</p>";
  } else {
    let month = 1;
    output = "<ul>";
    while (debts.length > 0) {
      let payment = monthlyBudget;
      for (let i = 0; i < debts.length; i++) {
        if (payment >= debts[i]) {
          output += `<li>Month ${month}: Paid off debt of Ksh ${debts[i]}</li>`;
          payment -= debts[i];
          debts.splice(i, 1);
          break; // Apply full payment to the smallest debt
        } else {
          debts[i] -= payment;
          output += `<li>Month ${month}: Paid Ksh ${payment} towards debt of Ksh ${debts[i].toFixed(2)}</li>`;
          break;
        }
      }
      month++;
    }
    output += "</ul>";
  }

  document.getElementById("snowballOutput").innerHTML = output;
}
