//  let retter;
let temp =
  document.querySelector("template");
let container = document.querySelector(
  ".dish_container"
);
const dbUrl =
  "https://babushka-dd8a.restdb.io/rest/menu";
const key = "600ec2fb1346a1524ff12de4";
let filterRet = "alle";

async function getJson() {
  const data = await fetch(dbUrl, {
    method: "GET",
    headers: {
      "Content-Type":
        "application/json",
      "x-apikey": key,
      "cache-control": "no-cache",
    },
  });
  retter = await data.json();
  console.log(retter);
  visRetter();
  addEventListenersToButtons();
}

function visRetter() {
  container.innerHTML = "";
  retter.forEach((ret) => {
    if (
      filterRet == "alle" ||
      filterRet == ret.kategori
    ) {
      let klon =
        temp.cloneNode(true).content;
      klon.querySelector(
        "h2"
      ).textContent = ret.navn;
      klon.querySelector("img").src =
        "medium/" +
        ret.billednavn +
        "-md.jpg";
      // klon.querySelector(
      //   ".kategori"
      // ).textContent = ret.kategori;
      klon.querySelector(
        ".tekst"
      ).textContent =
        ret.kortbeskrivelse;
      klon.querySelector(
        ".pris"
      ).textContent +=
        ret.pris + " kr,-";
      klon
        .querySelector("article")
        .addEventListener(
          "click",
          () => {
            location.href =
              "singleview.html?id=" +
              ret._id;
          }
        );
      container.appendChild(klon);
    }
  });
}
function addEventListenersToButtons() {
  document
    .querySelectorAll(
      ".headline button"
    )
    .forEach((elm) => {
      elm.addEventListener(
        "click",
        filtrering
      );
    });
}

// funktion der filtrer indholdet på siden, alt efter hvilken knap der er klikket på
function filtrering() {
  filterRet = this.dataset.ret;
  document.querySelector(
    "h1"
  ).textContent = this.textContent;
  document
    .querySelectorAll(".filter")
    .forEach((elm) => {
      elm.classList.remove("valgt");
    });
  this.classList.add("valgt");
  visRetter();
}
getJson();
