import ChatRepo from '@src/repos/ChatRepo';
import { IChat } from '@src/models/Chat';

/******************************************************************************
 *                             Service Chat
 ******************************************************************************/

/**
 * Retourner tous les chats
 */
async function getAll(): Promise<IChat[]> {
  return await ChatRepo.getAll();
}

/**
 * Retourner un chat selon son id interne (id du refuge)
 */
async function getOne(id: number): Promise<IChat | null> {
  return await ChatRepo.getOne(id); // ✔️ correction ici
}

/**
 * Retourner des chats filtrés
 */
async function getFiltres(filtres: {
  race?: string;
  sexe?: string;
  adopte?: boolean;
  minAge?: number;
  maxAge?: number;
}): Promise<IChat[]> {
  return await ChatRepo.getFiltres(filtres);
}

/**
 * Ajouter un chat
 */
async function add(chat: IChat): Promise<IChat> {
  try {
    return await ChatRepo.add(chat);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Erreur inconnue');
  }
}

/**
 * Vérifier l'existence d'un chat
 */
async function exists(id: number): Promise<boolean> {
  const chat = await ChatRepo.getOne(id); // ✔️ correction ici
  return chat !== null;
}

/**
 * Mettre à jour un chat
 */
async function update(id: number, chat: Partial<IChat>): Promise<IChat | null> {
  try {
    return await ChatRepo.update(id, chat);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Erreur inconnue');
  }
}

/**
 * Supprimer un chat
 */
async function deleteById(id: number): Promise<boolean> {
  return await ChatRepo.deleteById(id);
}

/******************************************************************************
 *                               Export
 ******************************************************************************/

export default {
  getAll,
  getOne,
  getFiltres,
  add,
  exists,
  update,
  deleteById,
} as const;
