// Configuração base de API (exemplo utilizando fetch ou axios)
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  },
};