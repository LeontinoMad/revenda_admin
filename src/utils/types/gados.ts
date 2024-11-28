import { RacaI } from "./racas";

export interface GadoI {
  id: number;
  tipo: string;
  idade: string;
  preco: number;
  peso: number;
  destaque: boolean;
  informacoes: string;
  foto: string;
  sexo: string;
  racas: RacaI;
  racasId: number;
  adminId: number;
}
