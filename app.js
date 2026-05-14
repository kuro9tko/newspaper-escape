const submitBtn = document.getElementById("submitBtn");
const answer = document.getElementById("answer");
const result = document.getElementById("result");

const openSound = document.getElementById("openSound");
const printSound = document.getElementById("printSound");

submitBtn.addEventListener("click", () => {

  const value = answer.value;

  if (value === "1961") {

    openSound.play();

    result.innerHTML = `
      鍵を確認…<br><br>
      未来への扉が開いた。
    `;

    document.body.style.transition = "1.5s";
    document.body.style.opacity = "0";

    setTimeout(() => {
      document.body.style.opacity = "1";

      printSound.play();

      result.innerHTML = `
        <br>
        NEXT 65 YEARS
      `;
    }, 1500);

  } else {

    result.textContent = "鍵が違うようだ…";

  }

});