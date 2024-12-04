"use client";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { RacaI } from "@/utils/types/racas";

type Inputs = {
  tipo: string;
  idade: string; // Mantido como string
  preco: number;
  peso: number;
  informacoes: string;
  foto: string;
  sexo: string;
  racasId: number;
};

function NovoGado() {
  const [racas, setRacas] = useState<RacaI[]>([]);
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  useEffect(() => {
    async function getRacas() {
      const response = await fetch(`http://localhost:3004/racas`);
      const dados = await response.json();
      setRacas(dados);
    }
    getRacas();
    setFocus("tipo");
  }, [setFocus]);

  const optionsRaca = racas.map((raca) => (
    <option key={raca.id} value={raca.id}>
      {raca.nome}
    </option>
  ));

  async function incluirGado(data: Inputs) {
    const novoGado: Inputs = {
      tipo: data.tipo,
      idade: data.idade,
      preco: Number(data.peso),
      peso: Number(data.peso),
      informacoes: data.informacoes,
      foto: data.foto,
      sexo: data.sexo,
      racasId: Number(data.racasId),
    };

    const response = await fetch(`http://localhost:3004/gados`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: ("Bearer " +
          Cookies.get("admin_logado_token")) as string,
      },
      body: JSON.stringify(novoGado),
    });

    if (response.status == 200) {
      toast.success("Ok! Gado cadastrado com sucesso");
      reset();
    } else {
      toast.error("Erro no cadastro do Gado...");
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-gray-200">
        Inclusão de Gados
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirGado)}>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="tipo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Tipo de Gado
            </label>
            <input
              type="text"
              id="tipo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("tipo")}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="foto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              URL da Foto
            </label>
            <input
              type="text"
              id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("foto")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="racasId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Raça
            </label>
            <select
              id="racasId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("racasId")}
            >
              {optionsRaca}
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="idade"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Idade
            </label>
            <input
              type="text"
              id="idade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("idade")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label
              htmlFor="preco"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Preço R$
            </label>
            <input
              type="number"
              id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("preco")}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="peso"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Peso
            </label>
            <input
              type="number"
              id="peso"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("peso")}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="sexo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Sexo
            </label>
            <input
              type="text"
              id="sexo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
              {...register("sexo")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="informacoes"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
          >
            Informações
          </label>
          <textarea
            id="informacoes"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-gray-500 dark:focus:border-gray-500"
            {...register("informacoes")}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Incluir
        </button>
      </form>
    </>
  );
}

export default NovoGado;
