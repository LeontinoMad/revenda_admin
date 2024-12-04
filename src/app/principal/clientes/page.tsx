"use client";
import { useEffect, useState } from "react";
import ItemCliente from "@/components/ItemCliente";

export interface ClienteI {
  id: string;
  nome: string;
  email: string;
}

function ControleClientes() {
  const [clientes, setClientes] = useState<ClienteI[]>([]);

  useEffect(() => {
    async function getClientes() {
      try {
        const response = await fetch(`http://localhost:3004/clientes`);

        if (!response.ok) {
          throw new Error("Erro ao buscar clientes");
        }

        // Definir um tipo intermediário para o retorno da API
        type ClienteApi = {
          id: number | string;
          nome: string;
          email: string;
        };

        const dados: ClienteApi[] = await response.json();

        // Garantir que o id seja sempre string
        const clientesValidos: ClienteI[] = dados.map((cliente) => ({
          id: String(cliente.id),
          nome: cliente.nome,
          email: cliente.email,
        }));

        setClientes(clientesValidos);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    }

    getClientes();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3004/clientes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedClientes = clientes.filter((item) => item.id !== id);
      setClientes(updatedClientes);
    }
  };

  const listaClientes = clientes.map((cliente) => (
    <ItemCliente
      key={cliente.id}
      cliente={cliente}
      handleDelete={handleDelete}
    />
  ));

  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Clientes
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{listaClientes}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ControleClientes;
