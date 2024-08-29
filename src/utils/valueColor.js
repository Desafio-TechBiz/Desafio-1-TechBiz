import colors from "../styles/variables";
export default function valueColor(link) {
  let valor = link.value;
  if (valor < 0 || valor > 10) {
    throw new Error("O valor deve estar entre 0 e 100.");
  }

  if (valor <= 2.5) {
    return colors.comment; // Azul
  } else if (valor <= 5.0) {
    return colors.green; // Verde
  } else if (valor <= 7.5) {
    return colors.yellow; // Amarelo
  } else {
    return colors.red; // Vermelho
  }
}
