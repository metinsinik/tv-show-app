const input = document.querySelector("#input");
const button = document.querySelector(".button");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let value = "";
let pagenum = 1;

input.addEventListener("input", (e) => {
  e.preventDefault();
  value = input.value;
});

button.addEventListener("click", () => {
  pagenum = 1;
  getmovie(value, pagenum);
});

async function getmovie(value) {
  console.log("value ", value);
  if (value === "") return;

  const data = await fetch(`https://api.tvmaze.com/search/shows?q=${value}`);

  document.querySelector(".display").innerHTML = "";
  const result = await data.json();
  console.log(result);
  /*
  if (!result || result.length === 0) {
    console.log("visible");
    document.getElementsById("not-found-img").style.visibility = "visible";
    return;
  } else {
    console.log("hidden ");
    document.getElementsById("not-found-img").style.visibility = "hidden";
  }*/
  result.forEach((item) => {
    let moviediv = document.createElement("div");
    moviediv.classList.add("movie");
    let Poster = document.createElement("Poster");
    Poster.classList.add("Poster");

    let tresult = document.createElement("p");
    tresult.classList.add("tresult");

    tresult.innerHTML = `Total Results:${result.length}`;
    moviediv.appendChild(tresult);

    let img = document.createElement("img");
    img.src =
      `${item.show.image.medium}` === "N/A"
        ? (image.src = "./img/noimg.png")
        : `${item.show.image.medium}`;
    Poster.appendChild(img);
    moviediv.appendChild(Poster);

    let description = document.createElement("div");
    description.classList.add("description");
    description.innerHTML = `Title : ${item.show.name} <br><br>Year: ${
      item.show.premiered || "-"
    } <br><br>Type: ${item.show.genres}  <br><br> <a href=${
      item.show.url
    } target="_blank"> Official Website: ${item.show.url} </a>`;

    moviediv.appendChild(description);

    document.querySelector(".display").appendChild(moviediv);
  });
  next.classList.add("visible");
  prev.classList.add("visible");
}

next.addEventListener("click", () => {
  if (value === "") return;
  pagenum++;
  getmovie(value, pagenum);
});
prev.addEventListener("click", () => {
  if (value === "") return;
  if (pagenum === "") return;
  pagenum--;
  getmovie(value, pagenum);
});
