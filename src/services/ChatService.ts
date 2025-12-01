import ChatRepo from '@src/repos/ChatRepo';
import { IChat } from '@src/models/Chat';

/******************************************************************************
                                Constants
******************************************************************************/

export const CHAT_NOT_FOUND_ERR = 'Chat non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Lire tous les chats
 */
function getAll(): Promise<IChat[]> {
  return ChatRepo.getAll();
}

/**
 * Lire un chat selon son id interne (id du refuge)
 */
function getOne(id: number): Promise<IChat | null> {
  return ChatRepo.getOne(id);
}

/**
 * Extraire des chats selon des filtres
 */
function getFiltres(filtres: {
  race?: string;
  sexe?: string;
  adopte?: boolean;
  minAge?: number;
  maxAge?: number;
}): Promise<IChat[]> {
  return ChatRepo.getFiltres(filtres);
}

/**
 * Ajouter un chat
 */
async function add(chat: IChat): Promise<IChat> {
  return ChatRepo.add(chat);
}

/**
 * Vérifier si un chat existe
 */
async function exists(id: number): Promise<boolean> {
  const chat = await ChatRepo.getOne(id);
  return chat !== null;
}

/**
 * Mettre à jour un chat
 */
async function update(id: number, chat: Partial<IChat>): Promise<IChat | null> {
  return ChatRepo.update(id, chat);
}

/**
 * Supprimer un chat
 */
async function deleteById(id: number): Promise<boolean> {
  return ChatRepo.deleteById(id);
}

/****************************************************
 * VALIDATIONS PERSONNALISÉES
 ****************************************************/

/**
 * Vérifie que la date n’est pas avant l’an 2000
 */
function validerDateArrivee(date: Date): void {
  const min = new Date('2000-01-01');
  if (date < min) {
    throw new Error("La date d'arrivée ne peut pas être avant l'an 2000");
  }
}

/**
 * Interdit les mots offensants dans la description
 */
function validerDescription(desc: string): void {
  const interdits = ['con', 'merde', 'idiot', 'pute'];
  const texte = desc.toLowerCase();

  for (const mot of interdits) {
    if (texte.includes(mot)) {
      throw new Error(`Le mot "${mot}" est interdit dans la description.`);
    }
  }
}

/******************************************************************************
                                Export default
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
