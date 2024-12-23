"use client";
import { useEffect, useState } from "react";
import { PropostaI } from "@/utils/types/propostas";
import ItemProposta from "@/components/ItemProposta";
import { ClienteI } from "@/utils/types/clientes"; // Substitua pelo caminho correto do arquivo onde ClienteI está definido

function ControlePropostas() {
  const [propostas, setPropostas] = useState<PropostaI[]>([]);

  const [clientes, setClientes] = useState<ClienteI[]>([]);
  useEffect(() => {
    async function fetchClientes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes`
      );
      const data: ClienteI[] = await response.json();
      setClientes(data);
    }
    fetchClientes();
  }, []);

  useEffect(() => {
    async function getPropostas() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/propostas`
      );
      const dados = await response.json();
      setPropostas(dados);
    }
    getPropostas();
  }, []);

  const listaPropostas = propostas.map((proposta) => (
    <ItemProposta
      key={proposta.id}
      proposta={proposta}
      propostas={propostas}
      setPropostas={setPropostas}
      clientes={clientes} // Passe a lista de clientes aqui
    />
  ));

  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Propostas
      </h1>

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
                Preço
              </th>
              <th scope="col" className="px-6 py-3">
                Nome Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Oferta
              </th>
              <th scope="col" className="px-6 py-3">
                Resposta
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaPropostas}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ControlePropostas;
