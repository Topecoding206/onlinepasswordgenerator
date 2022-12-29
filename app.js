// declaring global variable
const displayResult = document.querySelector("#display");
const rangeValue = document.querySelector("#range");
const submitButton = document.querySelector(".submit");
const getCheckItems = document.querySelectorAll(".list-items>input");
const label = document.querySelector(".label");
const copyText = document.querySelector("#copy");

// display initial range value
label.textContent = rangeValue.value;

// creating object data for random generation
const randomObject = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "#$%£&!*()+-_@",
};
// creating a copy of object
const copyObj = { ...randomObject };

// these function delete object properties when user uncheck box
function deleteProps(arr) {
  delete copyObj[arr];
  return copyObj.uppercase.concat(
    copyObj.lowercase,
    copyObj.number ?? "",
    copyObj.symbol ?? ""
  );
}
// these function check when user click on check box
function callCheck(items) {
  items.addEventListener("change", (e) => {
    if (!items.checked) {
      deleteProps(`${e.target.value}`);
    } else {
      copyObj[`${e.target.value}`] = randomObject[`${e.target.value}`];
      deleteProps();
    }
  });
}

// this function generate random numbers
function submit() {
  const array = new Uint32Array(rangeValue.value);
  const random = crypto.getRandomValues(array);

  let password = "";
  getCheckItems.forEach(callCheck);
  for (let code of random) {
    password += deleteProps()[code % deleteProps().length];
  }
  displayResult.value = password;
}

rangeValue.addEventListener("change", () => {
  label.textContent = rangeValue.value;
});
// this function copy to clipboard
function copy() {
  if (displayResult.value === "") {
    alert("Hey, I'm empty. Generate Now");
  } else {
    displayResult.select();
    document.execCommand("copy");
    alert("Password copied successfully");
  }
}
submitButton.addEventListener("click", submit);
copyText.addEventListener("click", copy);
