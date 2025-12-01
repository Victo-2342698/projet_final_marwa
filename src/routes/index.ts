import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import ChatRoutes from './ChatRoutes';

/******************************************************************************
 *                                Setup
 ******************************************************************************/

const apiRouter = Router();

// Router pour les chats
const chatRouter = Router();

// Définition des routes
chatRouter.get(Paths.Chats.Get, ChatRoutes.getAll);
chatRouter.get(Paths.Chats.GetOne, ChatRoutes.getOne);
chatRouter.get(Paths.Chats.Filters, ChatRoutes.getFiltres);
chatRouter.post(Paths.Chats.Add, ChatRoutes.add);
chatRouter.put(Paths.Chats.Update, ChatRoutes.update);
chatRouter.delete(Paths.Chats.Delete, ChatRoutes.remove);

// Ajout au router principal
apiRouter.use(Paths.Chats.Base, chatRouter);

/******************************************************************************
 *                              Export
 ******************************************************************************/

export default apiRouter;
