"use client";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface gadosRacaI {
  raca: string;
  num: number;
}

interface geralDadosI {
  clientes: number;
  gados: number;
  propostas: number;
}

type DataRow = [string, number, string];

export default function Principal() {
  const [gadosRaca, setGadoRacas] = useState<gadosRacaI[]>([]);
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dashboard/gerais");
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();

    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/dashboard/gadosRaca");
      const dados = await response.json();
      setGadoRacas(dados);
    }
    getDadosGrafico();
  }, []);

  const data: (["Raca", "NºGados", { role: string }] | DataRow)[] = [
    ["Raca", "NºGados", { role: "style" }],
  ];

  const cores = [
    "red",
    "blue",
    "violet",
    "green",
    "gold",
    "cyan",
    "chocolate",
    "purple",
    "brown",
    "orangered",
  ];

  gadosRaca.forEach((gado, index) => {
    data.push([gado.raca, gado.num, cores[index % 10]]);
  });

  return (
    <div className="pt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="flex justify-center mx-auto mb-5 flex-wrap">
        <div className="border-blue-600 border rounded p-6 w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 me-3 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>

        <div className="border-red-600 border rounded p-6 w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 me-3 mb-4">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.gados}
          </span>
          <p className="font-bold mt-2 text-center">Nº Gados</p>
        </div>

        <div className="border-green-600 border rounded p-6 w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.propostas}
          </span>
          <p className="font-bold mt-2 text-center">Nº Propostas</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Gados por Raça</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />
    </div>
  );
}
