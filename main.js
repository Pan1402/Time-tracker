const trackerOptionsParent = document.querySelector(".tracker-card__options");
const trackerOptions = document.querySelectorAll(".tracker-card__options p");
const trackerContainer = document.querySelector(".tracker-container");
const trackerCard = document.querySelector(".tracker-card");

trackerOptionsParent.addEventListener("click", (e) => {
  if (e.target.parentElement === e.currentTarget) {
    trackerOptions.forEach((option) => option.classList.remove("active"));
    e.target.classList.add("active");
    trackerContainer.innerHTML = "";
    showData(e.target.textContent.toLowerCase());
  }
});

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

async function showData(option) {
  const activities = await getData("./data.json");
  trackerContainer.append(trackerCard);

  activities.forEach((activity) => {
    const div = document.createElement("div");
    div.classList.add(`tracker-card`);
    div.classList.add(
      `tracker-card--${
        activity.title.includes(" ")
          ? activity.title.split(" ")[1]?.toLowerCase()
          : activity.title.toLowerCase()
      }`
    );
    const timeFrameData = activity.timeframes[option];
    console.log(timeFrameData);
    div.innerHTML = `
    <img class="tracker-card__icon" src="./images/icon-${
      activity.title.toLowerCase().includes(" ")
        ? activity.title.toLowerCase().split(" ").join("-")
        : activity.title.toLowerCase()
    }.svg" />
    <div class="tracker-card__container">
    
     
          <div class="tracker-card__activity">
            <h2 class="tracker-card__activity-name">${activity.title}</h2>
            <p class="tracker-card__activity-options">
              <img src="./images/icon-ellipsis.svg" alt="more options" />
            </p>
          </div>
          <div class="tracker-card__data">
            <p class="tracker-card__duration">${timeFrameData.current}hrs</p>
            <p class="tracker-card__duration--history">Last Week - ${
              timeFrameData.previous
            }hrs</p>
          </div>
        </div>
        `;
    trackerContainer.appendChild(div);
  });
}

showData("weekly");
