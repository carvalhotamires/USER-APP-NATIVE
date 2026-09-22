import { api } from './api';
import { User } from '../types/User';

// Dados locais de reserva (fallback / inicial caso precise dos dados exatos da imagem)
export const LOCAL_USERS: User[] = [
  { id: '1', name: 'Leanne Graham', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
  { id: '2', name: 'Ervin Howell', email: 'Shanna@melissa.tv', company: { name: 'Deckow-Crist' } },
  { id: '3', name: 'Clementine Bauch', email: 'Nathan@yesenia.net', company: { name: 'Romaguera-Jacobson' } },
  { id: '4', name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org', company: { name: 'Robel-Corkery' } },
  { id: '5', name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', company: { name: 'Keebler LLC' } },
  { id: '6', name: 'Mrs. Dennis Schulist', email: 'Karley_Dach@jasper.info', company: { name: 'Considine-Lockman' } },
];

export const getUsers = async (): Promise<User[]> => {
  try {
    const data = await api.get('/users');
    return data;
  } catch (error) {
    console.warn('Usando dados locais como fallback devido a erro na API:', error);
    return LOCAL_USERS;
  }
};