import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '@src/server';
import Paths from '@src/common/constants/Paths';

// Types sécurisés pour éviter "unsafe member access"
interface IChatTest {
  id: number;
  nom: string;
  age: number;
  race: string;
  sexe: string;
  description: string;
  images: string[];
  adopte: boolean;
  dateArrivee: string;
}

interface ChatsResponse {
  chats: IChatTest[];
}

interface ChatResponse {
  chat: IChatTest;
}

interface AddResponse {
  nouveauChat: IChatTest;
}

interface DeleteResponse {
  message: string;
}

// --------------------------------------------------------

describe('API Chats', () => {
  // GET /chats/all
  it('devrait retourner tous les chats', async () => {
    const res = await request(app).get(Paths.Chats.Base + Paths.Chats.Get);

    const body = res.body as ChatsResponse;

    expect(res.status).toBe(200);
    expect(Array.isArray(body.chats)).toBe(true);
  });

  // POST /chats/add
  it('devrait ajouter un nouveau chat', async () => {
    const nouveauChat: IChatTest = {
      id: 900,
      nom: 'MinouTest',
      age: 2,
      race: 'Siamois',
      sexe: 'M',
      description: 'Chat de test ok',
      images: ['test.jpg'],
      adopte: false,
      dateArrivee: '2024-01-01',
    };

    const res = await request(app)
      .post(Paths.Chats.Base + Paths.Chats.Add)
      .send(nouveauChat);

    const body = res.body as AddResponse;

    expect(res.status).toBe(201);
    expect(body.nouveauChat.nom).toBe('MinouTest');
  });

  // GET /chats/:id
  it('devrait retourner un chat par ID', async () => {
    const res = await request(app).get(Paths.Chats.Base + '/900');

    const body = res.body as ChatResponse;

    expect(res.status).toBe(200);
    expect(body.chat.id).toBe(900);
  });

  // GET /chats/filtrer
  it('devrait retourner des chats filtrés', async () => {
    const res = await request(app).get(
      Paths.Chats.Base + Paths.Chats.Filters + '?race=Siamois',
    );

    const body = res.body as ChatsResponse;

    expect(res.status).toBe(200);
    expect(Array.isArray(body.chats)).toBe(true);
  });

  // PUT /chats/update/:id
  it('devrait mettre à jour un chat', async () => {
    const res = await request(app)
      .put(Paths.Chats.Base + '/update/900')
      .send({ nom: 'MinouModifié' });

    expect(res.status).toBe(200);
  });

  // DELETE /chats/delete/:id
  it('devrait supprimer un chat', async () => {
    const res = await request(app).delete(Paths.Chats.Base + '/delete/900');

    const body = res.body as DeleteResponse;

    expect(res.status).toBe(200);
    expect(body.message).toContain('Chat supprimé');
  });
});
