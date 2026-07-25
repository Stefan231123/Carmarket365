import { createTestApp, TestApp, registerUser, createCar } from './app.helper';

describe('Messaging', () => {
  let t: TestApp;
  beforeAll(async () => {
    t = await createTestApp();
  });
  afterAll(async () => {
    await t.close();
  });

  const START = `mutation S($carId: String!, $content: String!) {
    startConversation(carId: $carId, content: $content) {
      id unreadCount messages { content } seller { id } buyer { id }
    }
  }`;

  it('lets a buyer start a conversation on a listing and the seller read it', async () => {
    const seller = await registerUser(t);
    const buyer = await registerUser(t);
    const car = await createCar(t, seller.token);

    const start = await t.gql(START, {
      token: buyer.token,
      variables: { carId: car.id, content: 'Is this still available?' },
    });
    expect(start.body.errors).toBeUndefined();
    const conv = start.body.data.startConversation;
    expect(conv.messages[0].content).toBe('Is this still available?');

    // Seller sees the conversation with 1 unread.
    const sellerList = await t.gql(`query { getMyConversations { id unreadCount } }`, { token: seller.token });
    const forSeller = sellerList.body.data.getMyConversations.find((c: { id: string }) => c.id === conv.id);
    expect(forSeller).toBeTruthy();
    expect(forSeller.unreadCount).toBe(1);

    // Seller replies; buyer now has an unread. Select `sender` so the
    // non-nullable relation must resolve (regression guard for a reply whose
    // sender wasn't loaded after save).
    const reply = await t.gql(
      `mutation M($id: String!, $c: String!) {
         sendMessage(conversationId: $id, content: $c) { content sender { id name } }
       }`,
      { token: seller.token, variables: { id: conv.id, c: 'Yes, still available.' } },
    );
    expect(reply.body.errors).toBeUndefined();
    expect(reply.body.data.sendMessage.content).toBe('Yes, still available.');
    expect(reply.body.data.sendMessage.sender.id).toBe(seller.userId);

    // A second reply must also work (the bug only surfaced on replies).
    const reply2 = await t.gql(
      `mutation M($id: String!, $c: String!) {
         sendMessage(conversationId: $id, content: $c) { content sender { id } }
       }`,
      { token: seller.token, variables: { id: conv.id, c: 'Let me know.' } },
    );
    expect(reply2.body.errors).toBeUndefined();
    expect(reply2.body.data.sendMessage.sender.id).toBe(seller.userId);

    // Two seller replies → two unread for the buyer.
    const buyerUnread = await t.gql(`query { getUnreadMessageCount }`, { token: buyer.token });
    expect(buyerUnread.body.data.getUnreadMessageCount).toBe(2);
  });

  it('reuses the same conversation for repeat messages on one listing', async () => {
    const seller = await registerUser(t);
    const buyer = await registerUser(t);
    const car = await createCar(t, seller.token);

    const a = await t.gql(START, { token: buyer.token, variables: { carId: car.id, content: 'first' } });
    const b = await t.gql(START, { token: buyer.token, variables: { carId: car.id, content: 'second' } });
    expect(a.body.data.startConversation.id).toBe(b.body.data.startConversation.id);
  });

  it('forbids a non-participant from reading a conversation', async () => {
    const seller = await registerUser(t);
    const buyer = await registerUser(t);
    const outsider = await registerUser(t);
    const car = await createCar(t, seller.token);

    const start = await t.gql(START, { token: buyer.token, variables: { carId: car.id, content: 'hi' } });
    const convId = start.body.data.startConversation.id;

    const read = await t.gql(`query Q($id: String!) { getConversation(id: $id) { id } }`, {
      token: outsider.token,
      variables: { id: convId },
    });
    expect(read.body.errors).toBeDefined();
    expect(read.body.data?.getConversation ?? null).toBeNull();

    const send = await t.gql(
      `mutation M($id: String!, $c: String!) { sendMessage(conversationId: $id, content: $c) { id } }`,
      { token: outsider.token, variables: { id: convId, c: 'sneaky' } },
    );
    expect(send.body.errors).toBeDefined();
  });

  it('requires authentication', async () => {
    const anon = await t.gql(`query { getMyConversations { id } }`);
    expect(anon.body.errors).toBeDefined();
  });

  it('prevents starting a conversation on your own listing', async () => {
    const seller = await registerUser(t);
    const car = await createCar(t, seller.token);
    const res = await t.gql(START, { token: seller.token, variables: { carId: car.id, content: 'hi' } });
    expect(res.body.errors).toBeDefined();
  });

  it('marks messages read', async () => {
    const seller = await registerUser(t);
    const buyer = await registerUser(t);
    const car = await createCar(t, seller.token);
    const start = await t.gql(START, { token: buyer.token, variables: { carId: car.id, content: 'hello' } });
    const convId = start.body.data.startConversation.id;

    const updated = await t.gql(`mutation R($id: String!) { markConversationRead(conversationId: $id) }`, {
      token: seller.token,
      variables: { id: convId },
    });
    expect(updated.body.data.markConversationRead).toBe(1);

    const after = await t.gql(`query { getUnreadMessageCount }`, { token: seller.token });
    expect(after.body.data.getUnreadMessageCount).toBe(0);
  });
});
