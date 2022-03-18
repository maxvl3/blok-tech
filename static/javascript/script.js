//Input field voornaam selecteren
const voorNaam = document.getElementById("voornaamid");

//Verwijder attribuut required als Javascript werkt
const verwijderenRequired = () => {
  voorNaam.removeAttribute("required");
};
verwijderenRequired();

//Als er op de verzend knop wordt geklikt wordt er gekeken of er wel een voornaam is ingevuld, zo niet dan krijgt de gebruiker een popup alert en wordt de styling aangepast
document
  .querySelector(".registeren button")
  .addEventListener("click", function (event) {
    if (voorNaam.value.length == 0) {
      alert("U heeft geen voornaam ingevuld");
      event.preventDefault();
      voorNaam.style.border = "solid #ff0000";
    } else {
      console.log("Yes! Ik heb een voornaam gekregen");
    }
  });
