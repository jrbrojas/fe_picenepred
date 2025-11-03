import React from "react";

const FechaRango = ({ fechaInicio, fechaFin }: {fechaInicio: string | Date, fechaFin: string | Date}) => {
  if (!fechaInicio || !fechaFin) return null;

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  const diaInicio = inicio.getDate();
  const diaFin = fin.getDate();
  const mesInicio = inicio.toLocaleDateString("es-ES", { month: "long" });
  const mesFin = fin.toLocaleDateString("es-ES", { month: "long" });
  const anioInicio = inicio.getFullYear();
  const anioFin = fin.getFullYear();

  const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  let texto = "";

  if (anioInicio === anioFin && mesInicio === mesFin) {
    // 🟢 Mismo mes y año
    texto = `del ${diaInicio} al ${diaFin} de ${cap(mesFin)} del ${anioFin}`;
  } else if (anioInicio === anioFin) {
    // 🟠 Diferente mes, mismo año
    texto = `del ${diaInicio} de ${cap(mesInicio)} al ${diaFin} de ${cap(mesFin)} del ${anioFin}`;
  } else {
    // 🔴 Diferente año
    texto = `del ${diaInicio} de ${cap(mesInicio)} del ${anioInicio} al ${diaFin} de ${cap(mesFin)} del ${anioFin}`;
  }

  return <span>{texto}</span>;
};

export default FechaRango;