"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import { PropostaI } from "@/utils/types/propostas";
import Image from "next/image";
import { ClienteI } from "@/utils/types/clientes"; // Substitua pelo caminho correto do arquivo onde ClienteI está definido

interface listaPropostaProps {
  proposta: PropostaI;
  propostas: PropostaI[];
  setPropostas: Dispatch<SetStateAction<PropostaI[]>>;
  clientes: ClienteI[];
}

function ItemProposta({
  proposta,
  propostas,
  clientes,
  setPropostas,
}: listaPropostaProps) {
  async function excluirProposta() {
    if (confirm(`Confirma Exclusão da Proposta "${proposta.descricao}"?`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/propostas/${proposta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.status == 200) {
        const propostas2 = propostas.filter((x) => x.id != proposta.id);
        setPropostas(propostas2);
        alert("Proposta excluída com sucesso");
      } else {
        alert("Erro... Proposta não foi excluída");
      }
    }
  }

  async function responderProposta() {
    const respostaRevenda = prompt(
      `Resposta da Revenda para "${proposta.descricao}"`
    );

    if (respostaRevenda == null || respostaRevenda.trim() == "") {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/propostas/${proposta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: ("Bearer " +
            Cookies.get("admin_logado_token")) as string,
        },
        body: JSON.stringify({ resposta: respostaRevenda }),
      }
    );

    if (response.status == 200) {
      const propostas2 = propostas.map((x) => {
        if (x.id == proposta.id) {
          return { ...x, resposta: respostaRevenda };
        }
        return x;
      });
      setPropostas(propostas2);
    }
  }

  return (
    <tr
      key={proposta.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image
          src={proposta.gado.foto}
          alt="Foto do gado"
          width={50} // Ajuste conforme a necessidade
          height={40} // Ajuste conforme a necessidade
        />
      </th>
      <td className={"px-6 py-4"}>{proposta.gado.tipo}</td>
      <td className={"px-6 py-4"}>
        {Number(proposta.gado.preco).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className={`px-6 py-4`}>
        {clientes.find((cliente) => cliente.id === proposta.clienteId)?.nome}
      </td>

      <td className={`px-6 py-4`}>{proposta.descricao}</td>
      <td className={`px-6 py-4`}>{proposta.resposta}</td>
      <td className="px-6 py-4">
        {proposta.resposta ? (
          <>
            <Image src="/ok_png.jpg" alt="Ok" width={60} height={50} />
          </>
        ) : (
          <>
            <TiDeleteOutline
              className="text-3xl text-red-600 inline-block cursor-pointer"
              title="Excluir"
              onClick={excluirProposta}
            />
            &nbsp;
            <FaRegEdit
              className="text-3xl text-yellow-600 inline-block cursor-pointer"
              title="Destacar"
              onClick={responderProposta}
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default ItemProposta;
