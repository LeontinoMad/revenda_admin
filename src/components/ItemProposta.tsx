import { useEffect, useState } from "react";

// Defina a interface para a proposta
interface PropostaI {
  id: string;
  clienteId: string; // ID do cliente relacionado
  tipo: string;
  preco: number;
  nomeCliente: string;
  oferta: string;
  resposta: string;
  // Outros campos da proposta
}

// Defina a interface para o cliente
interface ClienteI {
  id: string;
  nome: string;
  email: string;
}

const ControlePropostas = () => {
  const [clientes, setClientes] = useState<ClienteI[]>([]);
  const [propostas, setPropostas] = useState<PropostaI[]>([]);

  // Função para buscar clientes
  useEffect(() => {
    async function getClientes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes`
      );
      const dados = await response.json();
      setClientes(dados);
    }
    getClientes();
  }, []);

  // Função para buscar propostas
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome Cliente</th>
          </tr>
        </thead>
        <tbody>
          {propostas.map((proposta) => (
            <tr key={proposta.id}>
              <td className={`px-6 py-4`}>
                {
                  clientes.find((cliente) => cliente.id === proposta.clienteId)
                    ?.nome
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ControlePropostas;
