var semana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

var d = new Date();

document.getElementById("dia").innerHTML = semana[d.getDay()];
