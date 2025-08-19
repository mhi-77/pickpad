export interface User {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  avatar_url: string | null;
}

export interface PadronRecord {
  DOCUMENTO: string;
  APELLIDO: string | null;
  NOMBRE: string | null;
  SEXO: string | null;
  CLASE: number | null;
  CIRCUITO: string | null;
  ORDEN: number | null;
  MESA: number | null;
  LOCALIDAD: string | null;
  NUEVO: string | null;
  VNO: string | null;
  AM: string | null;
  ANTERIORES: string | null;
  VOTO: boolean | null;
  TEAM: string | null;
  OBSERVACIONES: string | null;
  OK: boolean | null;
}

export interface SearchFilters {
  documento?: string;
  apellido?: string;
  nombre?: string;
  localidad?: string;
  circuito?: string;
  mesa?: number;
  clase?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}