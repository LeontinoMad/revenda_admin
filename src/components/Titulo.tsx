"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import Image from "next/image";

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("");

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string);
    }
  }, []);

  return (
    // <div className="pt-24">
    //   {" "}
    //   {/* Garantir o espaçamento do cabeçalho */}
    <nav className="bg-blue-400 border-gray-200 dark:bg-gray-700 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link
          href="/principal"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/gado.webp" className="h-16" alt="Fusca" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            Revenda de Gado Biduca: Admin
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold">
        <FiUsers className="mr-2" />
        {adminNome}
      </div>
    </nav>
    // </div>
  );
}
