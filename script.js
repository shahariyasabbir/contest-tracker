// Fetch Codeforces upcoming contests
async function fetchCodeforces() {
  const cfList = document.getElementById("cf-list");
  cfList.innerHTML = "Loading...";
  
  try {
    const response = await fetch("https://codeforces.com/api/contest.list?gym=false");
    const data = await response.json();
    
    if (data.status === "OK") {
      cfList.innerHTML = "";
      // Show only upcoming contests
      const upcoming = data.result.filter(c => c.phase === "BEFORE");
      upcoming.forEach(contest => {
        const li = document.createElement("li");
        const date = new Date(contest.startTimeSeconds * 1000);
        li.innerHTML = `<strong>${contest.name}</strong> - ${date.toLocaleString()}`;
        cfList.appendChild(li);
      });
    }
  } catch (error) {
    cfList.innerHTML = "Failed to load contests.";
    console.error(error);
  }
}

// Dummy CodeChef contests (replace with real API if available)
function fetchCodeChef() {
  const ccList = document.getElementById("cc-list");
  
  const contests = [
    { name: "Long Challenge", start: "2025-10-01 15:00" },
    { name: "Cook-Off", start: "2025-10-12 14:30" },
    { name: "Lunch-Time", start: "2025-10-18 16:00" }
  ];

  ccList.innerHTML = "";
  contests.forEach(contest => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${contest.name}</strong> - ${contest.start}`;
    ccList.appendChild(li);
  });
}

// Initialize
fetchCodeforces();
fetchCodeChef();
