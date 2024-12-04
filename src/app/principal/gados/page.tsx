"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ItemGado from "@/components/ItemGado";
import { GadoI } from "@/utils/types/gados";

function CadGados() {
  const [gados, setGados] = useState<GadoI[]>([]);

  useEffect(() => {
    async function getGados() {
      const response = await fetch(`http://localhost:3004/gados`);
      const dados = await response.json();
      setGados(dados);
    }

    getGados();
  }, []);

  const listaGados = gados.map((gado) => (
    <ItemGado key={gado.id} gado={gado} gados={gados} setGados={setGados} />
  ));

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Gados
        </h1>
        <Link
          href="gados/novo"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        >
          Novo Gado
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Raça
              </th>
              <th scope="col" className="px-6 py-3">
                Idade
              </th>
              <th scope="col" className="px-6 py-3">
                Peso
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaGados}</tbody>
        </table>
      </div>
    </div>
  );
}

export default CadGados;
