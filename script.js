const habits = [
  "12:00am–8:00am: Sleep 8 hours",
  "8:00am: Wake up",
  "8:00–8:10: Oil pulling, make bed",
  "8:10–8:20: Brush, wash face, wudu, morning skincare",
  "8:20–9:00: Quran, dhikr, duas",
  "9:00–10:00: Drop Sami, breakfast, juice, vitamins",
  "10:00–4:00: 2 Deep work",
  "4:00–5:00: 2 Light work & plan tomorrow",
  "5:00–5:30: Get ready for gym",
  "5:30–6:00: Lunch",
  "6:00–8:00: Gym session",
  "6:00–8:00: Weekly Maintenance",
  "8:00–10:00: Dinner routine",
  "10:00–10:30: Brush, floss, wudu, night skincare",
  "10:30–11:30: Isha, hajat, istikhara, dhikr, duas",
  "11:30–12:00: Wind down & sleep"
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const tableBody = document.getElementById("habit-rows");
const dailyStats = document.getElementById("daily-stats");
const weeklyBar = document.getElementById("weekly-bar");
const weeklyPercent = document.getElementById("weekly-percent");

habits.forEach((habit, habitIndex) => {
  const row = document.createElement("tr");
  const labelCell = document.createElement("td");
const [time, task] = habit.split(": ");
labelCell.innerHTML = `
  <div class="habit-time">${time}</div>
  <div class="habit-task">${task}</div>
`;
  row.appendChild(labelCell);

  days.forEach((day, dayIndex) => {
    const cell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.row = habitIndex;
    checkbox.dataset.col = dayIndex;

    // Disable gym on Sat/Sun
    if (habit.includes("Gym session") && (day === "Sat" || day === "Sun")) {
      checkbox.disabled = true;
    }

    // Disable Weekly Maintenance on Mon–Fri
    if (habit.includes("Weekly Maintenance") && ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(day)) {
      checkbox.disabled = true;
    }

    checkbox.addEventListener("change", updateStats);
    cell.appendChild(checkbox);
    row.appendChild(cell);
  });

  tableBody.appendChild(row);
});

function updateStats() {
  const checkboxes = document.querySelectorAll("tbody input[type='checkbox']");
  const totalDays = days.length;
  const totalHabits = habits.length;

  let dailyCounts = Array(totalDays).fill(0);
  let validPerDay = Array(totalDays).fill(0);
  let weeklyTotalChecks = 0;
  let totalValid = 0;

  checkboxes.forEach(cb => {
    const col = Number(cb.dataset.col);
    if (!cb.disabled) {
      validPerDay[col]++;
      totalValid++;
      if (cb.checked) {
        dailyCounts[col]++;
        weeklyTotalChecks++;
      }
    }
  });

  // Daily %
const ids = [
  "mon-percent", "tue-percent", "wed-percent",
  "thu-percent", "fri-percent", "sat-percent", "sun-percent"
];

dailyCounts.forEach((count, i) => {
  const percent = validPerDay[i] ? Math.round((count / validPerDay[i]) * 100) : 0;
  document.getElementById(ids[i]).textContent = `${percent}%`;
});


  // Weekly %
  const weekPercent = totalValid ? Math.round((weeklyTotalChecks / totalValid) * 100) : 0;
  weeklyBar.style.width = `${weekPercent}%`;
  weeklyPercent.textContent = `${weekPercent}%`;
}

updateStats();