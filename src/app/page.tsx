"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Corrigido para 'next/navigation'
import Cookies from "js-cookie";

type Inputs = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>();
  const router = useRouter(); // Agora está usando o roteador correto

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  async function verificaLogin(data: Inputs) {
    const response = await fetch("http://localhost:3004/admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha }),
    });

    if (response.status === 200) {
      const admin = await response.json();
      Cookies.set("admin_logado_id", admin.id);
      Cookies.set("admin_logado_nome", admin.nome);
      Cookies.set("admin_logado_token", admin.token);

      router.push("/principal");
    } else if (response.status === 400) {
      toast.error("Erro... Login ou senha incorretos");
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/fundo.jpeg")' }}
    >
      <div className="max-w-sm">
        <img
          src="./gado.webp"
          alt="Revenda"
          style={{ width: 240 }}
          className="center"
        />
        <h1 className="text-3xl font-bold my-8">Admin: Revenda Avenida</h1>
        <form
          className="max-w-sm mx-auto"
          onSubmit={handleSubmit(verificaLogin)}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("email")}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("senha")}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}