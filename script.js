const leaveData = [
  {
    name: "Brooklyn Simmons",
    type: "Annual Leave",
    from: "Jan 23, 2024",
    to: "Jan 24, 2024",
    days: 1,
    status: "Pending",
  },
  {
    name: "Ralph Edwards",
    type: "Sick Leave",
    from: "Jan 23, 2024",
    to: "Jan 27, 2024",
    days: 4,
    status: "Pending",
  },
  {
    name: "Leslie Alexander",
    type: "Annual Leave",
    from: "Jan 12, 2024",
    to: "Jan 14, 2024",
    days: 2,
    status: "Approved",
  },
  {
    name: "Cody Fisher",
    type: "Sick Leave",
    from: "Jan 04, 2024",
    to: "Jan 06, 2024",
    days: 2,
    status: "Approved",
  },
  {
    name: "Arlene McCoy",
    type: "Annual Leave",
    from: "Jan 03, 2024",
    to: "Jan 08, 2024",
    days: 5,
    status: "Approved",
  },
];

let editRow = null;

function renderTable(data) {
  const t = document.getElementById("leaveTable");
  t.innerHTML = "";
  data.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.from}</td>
        <td>${item.to}</td>
        <td>${item.days}</td>
        <td><span class="status ${item.status}">${item.status}</span></td>
        <td>${
          item.status === "Pending"
            ? `<button class="approve-btn btn" onclick="updateStatus(${i},'Approved')">Approve</button>
           <button class="reject-btn btn" onclick="updateStatus(${i},'Rejected')">Reject</button>`
            : `<button class="edit-btn btn" onclick="alert('Edit Leave feature')">Edit</button>`
        }</td>`;
    t.appendChild(tr);
  });
}

function updateStatus(i, s) {
  leaveData[i].status = s;
  renderTable(leaveData);
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function switchTab(id, btn) {
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => (c.style.display = "none"));
  document.getElementById(id).style.display = "block";
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function openModal() {
  document.getElementById("modalOverlay").style.display = "block";
  document.getElementById("employeeModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = "Add Employee";
  document.getElementById("employeeForm").reset();
  editRow = null;
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("employeeModal").style.display = "none";
}

function editEmployee(btn) {
  openModal();
  document.getElementById("modalTitle").textContent = "Edit Employee";
  editRow = btn.closest("tr");
  const cells = editRow.querySelectorAll("td");
  document.getElementById("empName").value = cells[0].textContent;
  document.getElementById("empPosition").value = cells[1].textContent;
  document.getElementById("empDepartment").value = cells[2].textContent;
  document.getElementById("empEmail").value = cells[3].textContent;
}

function submitEmployee(e) {
  e.preventDefault();
  const name = document.getElementById("empName").value;
  const pos = document.getElementById("empPosition").value;
  const dept = document.getElementById("empDepartment").value;
  const email = document.getElementById("empEmail").value;
  const rowHTML = `<td>${name}</td><td>${pos}</td><td>${dept}</td><td>${email}</td><td><button class="btn" onclick="editEmployee(this)">Edit</button></td>`;

  if (editRow) editRow.innerHTML = rowHTML;
  else
    document
      .getElementById("manageBody")
      .insertAdjacentHTML("beforeend", `<tr>${rowHTML}</tr>`);

  closeModal();
}

document.getElementById("search").addEventListener("input", (e) => {
  const kw = e.target.value.toLowerCase();
  const filtered = leaveData.filter(
    (item) =>
      item.name.toLowerCase().includes(kw) ||
      item.type.toLowerCase().includes(kw) ||
      item.status.toLowerCase().includes(kw)
  );
  renderTable(filtered);
});

renderTable(leaveData);
