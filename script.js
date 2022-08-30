const content = document.querySelector(".content");
const btnNew = document.querySelector(".addNote-content");

let items_db = localStorage.getItem("items_db")
  ? JSON.parse(localStorage.getItem("items_db"))
  : [];

const colors = [
  "#845EC2",
  "#008F7A",
  "#008E9B",
  "#FFC75F",
  "#FF8066",
  "#BA3CAF",
];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

function loadItems() {
  content.innerHTML = "";
  verifyNulls();

  items_db.forEach((item, i) => {
    addHTML(item, i);
  });

  addOnChange();
}

btnNew.onclick = () => {
  addHTML();

  addOnChange();
};

function addHTML(item, i) {
  const div = document.createElement("div");

  div.innerHTML = `<div class="item" style="background-color: ${
    item?.color || randomColor()
  }">
    <span class="remove" onclick="removeItem(${i})">X</span>
    <textarea>${item?.text || ""}</textarea>
  </div>`;

  content.appendChild(div);
}

function addOnChange() {
  const notes = document.querySelectorAll(".item textarea");

  notes.forEach((item, i) => {
    item.oninput = () => {
      items_db[i] = {
        text: item.value,
        color: items_db[i]?.color || item.parentElement.style.backgroundColor,
      };

      localStorage.setItem("items_db", JSON.stringify(items_db));
    };
  });
}

function removeItem(i, div) {
  if (i !== undefined) {
    items_db.splice(i, 1);
    localStorage.setItem("items_db", JSON.stringify(items_db));
    loadItems();
  }
}

function verifyNulls() {
  items_db = items_db.filter((item) => item);
  localStorage.setItem("items_db", JSON.stringify(items_db));
}

loadItems();
