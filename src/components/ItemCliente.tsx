"use client";

import { ClienteI } from "@/utils/types/clientes";

interface ItemClienteProps {
  cliente: ClienteI;
  handleDelete: (id: string) => void;
}

function ItemCliente({ cliente, handleDelete }: ItemClienteProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{cliente.id}</td>
      <td className="px-6 py-4">{cliente.nome}</td>
      <td className="px-6 py-4">{cliente.email}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleDelete(cliente.id)}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Deletar
        </button>
      </td>
    </tr>
  );
}

export default ItemCliente;
