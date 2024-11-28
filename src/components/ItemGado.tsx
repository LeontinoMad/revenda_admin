"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { GadoI } from "@/utils/types/gados";

interface ListaGadoProps {
  gado: GadoI;
  gados: GadoI[];
  setGados: Dispatch<SetStateAction<GadoI[]>>;
}

function ItemGado({ gado, gados, setGados }: ListaGadoProps) {
  async function excluirGado() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/gados/${gado.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " +
              Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.status === 200) {
        const gados2 = gados.filter((x) => x.id !== gado.id);
        setGados(gados2);
        alert("Gado excluído com sucesso");
      } else {
        alert("Erro... Gado não foi excluído");
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/gado/destaque/${gado.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: ("Bearer " +
            Cookies.get("admin_logado_token")) as string,
        },
      }
    );

    if (response.status === 200) {
      const gados2 = gados.map((x) => {
        if (x.id === gado.id) {
          return { ...x, destaque: !x.destaque };
        }
        return x;
      });
      setGados(gados2);
    }
  }

  return (
    <tr
      key={gado.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img src={gado.foto} alt="Capa do gado" style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 ${gado.destaque ? "font-extrabold" : ""}`}>
        {gado.tipo}
      </td>
      <td className={`px-6 py-4 ${gado.destaque ? "font-extrabold" : ""}`}>
        {gado.racas?.nome}
      </td>

      <td className={`px-6 py-4 ${gado.destaque ? "font-extrabold" : ""}`}>
        {gado.idade}
      </td>

      <td className={`px-6 py-4 ${gado.destaque ? "font-extrabold" : ""}`}>
        {Number(gado.peso)} kg
      </td>
      <td className={`px-6 py-4 ${gado.destaque ? "font-extrabold" : ""}`}>
        {Number(gado.preco).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={excluirGado}
        />
        &nbsp;
        <FaRegStar
          className="text-3xl text-yellow-600 inline-block cursor-pointer"
          title="Destacar"
          onClick={alterarDestaque}
        />
      </td>
    </tr>
  );
}

export default ItemGado;
