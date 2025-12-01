import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import ChatService from '@src/services/ChatService';
import { IChat } from '@src/models/Chat';

/******************************************************************************
 *                               Routes Chat
 ******************************************************************************/

/** GET /chats */
async function getAll(_: IReq, res: IRes) {
  try {
    const chats = await ChatService.getAll();
    return res.status(HttpStatusCodes.OK).json({ chats });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message });
  }
}

/** GET /chats/:id */
async function getOne(req: IReq, res: IRes) {
  try {
    const id = parseInt(req.params.id as string, 10);
    const chat = await ChatService.getOne(id);

    if (!chat) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: 'Chat non trouvé' });
    }

    return res.status(HttpStatusCodes.OK).json({ chat });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message });
  }
}

/** GET /chats/filtrer */
async function getFiltres(req: IReq, res: IRes) {
  try {
    const filtres = {
      race: req.query.race as string,
      sexe: req.query.sexe as string,
      adopte: req.query.adopte
        ? (req.query.adopte as string) === 'true'
        : undefined,
      minAge: req.query.minAge ? Number(req.query.minAge) : undefined,
      maxAge: req.query.maxAge ? Number(req.query.maxAge) : undefined,
    };

    const chats = await ChatService.getFiltres(filtres);
    return res.status(HttpStatusCodes.OK).json({ chats });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message });
  }
}

/** POST /chats */
async function add(req: IReq, res: IRes) {
  try {
    const nouveauChat = await ChatService.add(req.body as unknown as IChat);
    return res.status(HttpStatusCodes.CREATED).json({ nouveauChat });
  } catch (error) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: (error as Error).message });
  }
}

/** PUT /chats/:id */
async function update(req: IReq, res: IRes) {
  try {
    const id = Number(req.params.id as string);
    const chat = req.body as Partial<IChat>;

    const exists = await ChatService.exists(id);
    if (!exists) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: 'Chat non trouvé' });
    }

    const updated = await ChatService.update(id, chat);
    return res.status(HttpStatusCodes.OK).json({ updated });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message });
  }
}

/** DELETE /chats/:id */
async function remove(req: IReq, res: IRes) {
  try {
    const id = Number(req.params.id as string);

    const exists = await ChatService.exists(id);
    if (!exists) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: 'Chat non trouvé' });
    }

    const deleted = await ChatService.deleteById(id);
    return res.status(HttpStatusCodes.OK).json({
      message: deleted
        ? 'Chat supprimé avec succès'
        : 'Erreur lors de la suppression',
    });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: (error as Error).message });
  }
}

/******************************************************************************
 *                                Export
 ******************************************************************************/

export default {
  getAll,
  getOne,
  getFiltres,
  add,
  update,
  remove,
} as const;
