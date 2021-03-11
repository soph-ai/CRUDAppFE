'use strict'

const contextPath = "http://localhost:8080";
const output = document.getElementById("output");

function getMeeseeks() {
    axios.get(contextPath + "/getMeeseeks")
        .then(res => {
            output.innerHTML = "";
            const meeseeks = res.data;

            meeseeks.forEach(meeseek => {
                const newMeeseeks = renderMeeseeks(meeseek);
                console.log("New Meeseeks: ", newMeeseeks);
                output.appendChild(newMeeseeks);
            });
        }).catch(err => console.error(err))
}

function renderMeeseeks(meeseek) {

    const newColumn = document.createElement("div");
    newColumn.className = "col";

    const newMeeseeks = document.createElement("div");
    newMeeseeks.className = "card";
    newColumn.appendChild(newMeeseeks);

    const meeseeksBody = document.createElement("div");
    meeseeksBody.className = "card-body";
    newMeeseeks.appendChild(meeseeksBody);

    const meeseeksName = document.createElement("h5");
    meeseeksName.className = "card-title";
    meeseeksName.innerText = meeseek.name;
    meeseeksBody.appendChild(meeseeksName);

    const meeseeksText = document.createElement("p");
    meeseeksText.className = "card-text";
    meeseeksText.innerHTML = "Purpose: " + meeseek.purpose;
    meeseeksText.innerHTML += "<br>";
    meeseeksText.innerHTML += "Date Activated: " + meeseek.dateActivated;
    meeseeksBody.appendChild(meeseeksText);

    const meeseeksFooter = document.createElement("div");
    meeseeksFooter.className = "card-footer"
    newMeeseeks.appendChild(meeseeksFooter);
  
    const deleteMeeseeksButton = document.createElement("button");
    deleteMeeseeksButton.className = "card-link";
    deleteMeeseeksButton.innerText = "Delete";

    deleteMeeseeksButton.addEventListener('click', function () {
      deleteMeeseeks(meeseek.id);
    });

    meeseeksFooter.appendChild(deleteMeeseeksButton);
  
    return newColumn;
  }
  
  function deleteMeeseeks(id) {
    axios.delete(contextPath + "/expireMeeseeks/" + id)
      .then(() => getMeeseeks())
      .catch(err => console.error(err));
  }

  document.getElementById("meeseeksForm").addEventListener('submit', function (event) {
    event.preventDefault();
  
    const data = {
      name: this.name.value,
      purpose: this.purpose.value,
      dateActivated: this.dateActivated.value
    };
  
    axios.post(contextPath + "/createMeeseeks", data)
    .then(() => {
      this.reset();
      this.name.focus();
      getMeeseeks();
    })
      .catch(err => console.error(err));
  
  });

getMeeseeks();