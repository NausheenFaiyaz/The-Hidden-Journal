const addRecordForm = document.querySelector("#addRecordForm");
const title = document.querySelector(".titleInput");
const date_picker = document.querySelector(".datePicker");
const content_Area = document.querySelector(".contentArea");
const submit_Btn = document.querySelector(".Btn");

//get data from local storage
function get_localStorage() {
  if (localStorage.getItem("diary") == null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("diary"));
  }
}

//handle form submit event
function handleSubmit(event) {
  //prevent unwanted page refresh
  event.preventDefault();

  if (
    title.value == "" ||
    date_picker.value == "" ||
    content_Area.value == ""
  ) {
    alert("⚠️ All fields are required ");
  } else {
    const diary = get_localStorage();

    //insert element at the end of the diary array
    diary.push({
      id: `date${Date.now()}`,
      title: title.value,
      createdAt: date_picker.value,
      content: content_Area.value,
    });

    // save data to local storage
    localStorage.setItem("diary", JSON.stringify(diary));

    //empty all block after submission
    title.value = "";
    date_picker.value = "";
    content_Area.value = "";

    alert("Successfully Added to diary 🥳");
  }
}

addRecordForm.addEventListener("submit", handleSubmit);
