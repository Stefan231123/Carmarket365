import { createTestApp, TestApp, registerUser, BASE_CAR, createCar as createCarHelper } from './app.helper';

/**
 * Regression tests for the access-control fixes. Each of these guards a hole
 * that was actually open in production at some point this cycle.
 */
describe('Security / access control', () => {
  let t: TestApp;
  beforeAll(async () => {
    t = await createTestApp();
  });
  afterAll(async () => {
    await t.close();
  });

  const CREATE_CAR = `mutation C($input: CreateCarInput!) {
    createCar(input: $input) { id make model isFeatured }
  }`;

  const baseCar = BASE_CAR;
  const createCar = (token: string, extra: Record<string, unknown> = {}) => createCarHelper(t, token, extra);

  it('requires authentication to create a listing', async () => {
    const res = await t.gql(CREATE_CAR, { variables: { input: baseCar } });
    expect(res.body.errors).toBeDefined();
  });

  it('does not let a seller mark their own listing as featured (mass assignment)', async () => {
    const seller = await registerUser(t);
    // isFeatured is not part of CreateCarInput; the strict validation pipe must reject it.
    const res = await t.gql(CREATE_CAR, {
      token: seller.token,
      variables: { input: { ...baseCar, isFeatured: true } },
    });
    expect(res.body.errors).toBeDefined();
    expect(JSON.stringify(res.body.errors)).toMatch(/isFeatured/i);
  });

  it('forbids a non-owner from updating or deleting a listing (IDOR)', async () => {
    const owner = await registerUser(t);
    const attacker = await registerUser(t);
    const car = await createCar(owner.token);

    const upd = await t.gql(
      `mutation U($id: String!, $input: UpdateCarInput!) { updateCar(id: $id, input: $input) { id } }`,
      { token: attacker.token, variables: { id: car.id, input: { price: 1 } } },
    );
    expect(upd.body.errors).toBeDefined();

    const del = await t.gql(`mutation D($id: String!) { deleteCar(id: $id) }`, {
      token: attacker.token,
      variables: { id: car.id },
    });
    expect(del.body.errors).toBeDefined();

    // Owner can still update their own car.
    const ok = await t.gql(
      `mutation U($id: String!, $input: UpdateCarInput!) { updateCar(id: $id, input: $input) { id price } }`,
      { token: owner.token, variables: { id: car.id, input: { price: 14000 } } },
    );
    expect(ok.body.data.updateCar.price).toBe(14000);
  });

  it('forbids a non-owner from reading a listing\'s inquiries (IDOR)', async () => {
    const owner = await registerUser(t);
    const attacker = await registerUser(t);
    const car = await createCar(owner.token);

    const res = await t.gql(
      `query Q($carId: String!) { getCarInquiries(carId: $carId) { id email } }`,
      { token: attacker.token, variables: { carId: car.id } },
    );
    expect(res.body.errors).toBeDefined();
    expect(res.body.data?.getCarInquiries ?? null).toBeNull();
  });

  it('restricts express-sale opportunities to dealers/admins', async () => {
    const normalUser = await registerUser(t);
    const dealer = await registerUser(t, { dealerName: 'Dealer Co' });

    const asUser = await t.gql(`query { getExpressSaleOpportunities { id } }`, { token: normalUser.token });
    expect(asUser.body.errors).toBeDefined();

    const asDealer = await t.gql(`query { getExpressSaleOpportunities { id } }`, { token: dealer.token });
    expect(asDealer.body.errors).toBeUndefined();
    expect(Array.isArray(asDealer.body.data.getExpressSaleOpportunities)).toBe(true);
  });

  it('requires authentication for an image upload signature', async () => {
    const anon = await t.http().post('/api/uploads/presign').send({ fileName: 'x.jpg', contentType: 'image/jpeg' });
    expect(anon.status).toBe(401);
  });
});
