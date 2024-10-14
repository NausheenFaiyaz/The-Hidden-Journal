const recordList = document.querySelector("#recordList");

//get data from local storage
function get_localStorage() {
  if (localStorage.getItem("diary") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("diary"));
  }
}

//handle window load
function handleLoad() {
  const diary = get_localStorage();

  if (diary.length == 0) {
    recordList.innerHTML = "<h1 class='notFound'>No Diary Record Found 😵</h1>";
  } else {
    //Execute a function for each element, or item of the diary array
    diary.forEach(function (record) {
      recordList.innerHTML += `
        <li id="${record.id}">
          <h2 class="heading">
           ${record.title}
            <button class="Btn"><i class="fa-solid fa-trash"></i></button>
          </h2>
          <time>${record.createdAt}</time>
          <p>${record.content}
          </p>
          <hr />
        </li>
        `;
    });
  }
}

//refresh window on load
window.addEventListener("DOMContentLoaded", handleLoad);

recordList.addEventListener("click", function (event) {
  const elementClicked = event.target;
  console.log(elementClicked);
  if (elementClicked.classList.contains("fa-solid")) {
    const recordItem = elementClicked.parentElement.parentElement.parentElement;

    const diary = get_localStorage();
    const updatedDiary = [];

    //Execute a function for each element, or item of the diary array
    diary.forEach(function (record) {
      if (record.id != recordItem.id) {
        updatedDiary.push(record);
      }
    });

    //resave diary array to local storage
    localStorage.setItem("diary", JSON.stringify(updatedDiary));

    //remove record item in the HTML
    recordItem.remove();

    if (recordList.children.length == 0) {
      recordList.innerHTML =
        "<h1 class='notFound heading'>No Diary Record Found 😵</h1>";
    }
  }
});
