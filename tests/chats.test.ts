import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '@src/server';
import Paths from '@src/common/constants/Paths';

describe('API Chats', () => {
  // -----------------------------
  //  GET /chats/all
  // -----------------------------
  it('devrait retourner tous les chats', async () => {
    const res = await request(app).get(Paths.Chats.Base + Paths.Chats.Get);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('chats');
    expect(Array.isArray(res.body.chats)).toBe(true);
  });

  // -----------------------------
  //  POST /chats/add
  // -----------------------------
  it('devrait ajouter un nouveau chat', async () => {
    const nouveauChat = {
      id: 900,
      nom: 'MinouTest',
      age: 2,
      race: 'Siamois',
      sexe: 'M',
      description: 'Chat de test',
      images: ['test.jpg'],
      adopte: false,
      dateArrivee: '2024-01-01',
    };

    const res = await request(app)
      .post(Paths.Chats.Base + Paths.Chats.Add)
      .send(nouveauChat);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('nouveauChat');
    expect(res.body.nouveauChat.nom).toBe('MinouTest');
  });

  // -----------------------------
  // GET /chats/:id
  // -----------------------------
  it('devrait retourner un chat par ID', async () => {
    const res = await request(app).get(Paths.Chats.Base + '/900');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('chat');
    expect(res.body.chat.id).toBe(900);
  });

  // -----------------------------
  // GET /chats/filtrer
  // -----------------------------
  it('devrait retourner des chats filtrés', async () => {
    const res = await request(app).get(
      Paths.Chats.Base + Paths.Chats.Filters + '?race=Siamois',
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('chats');
  });

  // -----------------------------
  // PUT /chats/update/:id
  // -----------------------------
  it('devrait mettre à jour un chat', async () => {
    const res = await request(app)
      .put(Paths.Chats.Base + '/update/900')
      .send({ nom: 'MinouModifié' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('updated');
  });

  // -----------------------------
  // DELETE /chats/delete/:id
  // -----------------------------
  it('devrait supprimer un chat', async () => {
    const res = await request(app).delete(Paths.Chats.Base + '/delete/900');

    expect(res.status).toBe(200);
    expect(res.body.message).toContain('Chat supprimé');
  });
});
