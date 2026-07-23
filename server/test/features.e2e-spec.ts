import { createTestApp, TestApp, registerUser, createCar } from './app.helper';

describe('Core features', () => {
  let t: TestApp;
  beforeAll(async () => {
    t = await createTestApp();
  });
  afterAll(async () => {
    await t.close();
  });

  it('serves public listing queries without authentication', async () => {
    const seller = await registerUser(t);
    const car = await createCar(t, seller.token);

    const list = await t.gql(`query { getCars { id make model } }`);
    expect(list.body.errors).toBeUndefined();
    expect(Array.isArray(list.body.data.getCars)).toBe(true);
    expect(list.body.data.getCars.some((c: { id: string }) => c.id === car.id)).toBe(true);

    const byId = await t.gql(`query Q($id: String!) { getCarById(id: $id) { id make } }`, {
      variables: { id: car.id },
    });
    expect(byId.body.data.getCarById.id).toBe(car.id);

    const featured = await t.gql(`query { getFeaturedCars(limit: 5) { id } }`);
    expect(featured.body.errors).toBeUndefined();
    expect(Array.isArray(featured.body.data.getFeaturedCars)).toBe(true);
  });

  it('lists only the current user\'s own listings via getMyListings', async () => {
    const a = await registerUser(t);
    const b = await registerUser(t);
    const carA = await createCar(t, a.token);
    await createCar(t, b.token);

    const mine = await t.gql(`query { getMyListings { id } }`, { token: a.token });
    const ids = mine.body.data.getMyListings.map((c: { id: string }) => c.id);
    expect(ids).toContain(carA.id);
    expect(ids.length).toBe(1);
  });

  it('saves, reports, lists and unsaves a car', async () => {
    const seller = await registerUser(t);
    const buyer = await registerUser(t);
    const car = await createCar(t, seller.token);

    await t.gql(`mutation S($carId: String!) { saveCar(carId: $carId) { id } }`, {
      token: buyer.token,
      variables: { carId: car.id },
    });

    const saved = await t.gql(`query Q($carId: String!) { isCarSaved(carId: $carId) }`, {
      token: buyer.token,
      variables: { carId: car.id },
    });
    expect(saved.body.data.isCarSaved).toBe(true);

    const list = await t.gql(`query { getUserSavedCars { id } }`, { token: buyer.token });
    expect(list.body.data.getUserSavedCars.length).toBe(1);

    await t.gql(`mutation U($carId: String!) { unsaveCar(carId: $carId) }`, {
      token: buyer.token,
      variables: { carId: car.id },
    });
    const after = await t.gql(`query Q($carId: String!) { isCarSaved(carId: $carId) }`, {
      token: buyer.token,
      variables: { carId: car.id },
    });
    expect(after.body.data.isCarSaved).toBe(false);
  });

  it('updates the current user\'s profile', async () => {
    const user = await registerUser(t);
    const res = await t.gql(
      `mutation U($firstName: String, $lastName: String) {
         updateMyProfile(firstName: $firstName, lastName: $lastName) { firstName lastName }
       }`,
      { token: user.token, variables: { firstName: 'Ada', lastName: 'Lovelace' } },
    );
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.updateMyProfile.firstName).toBe('Ada');
    expect(res.body.data.updateMyProfile.lastName).toBe('Lovelace');
  });

  it('lets an anonymous buyer submit an inquiry the seller can then read', async () => {
    const seller = await registerUser(t);
    const car = await createCar(t, seller.token);

    // createCarInquiry is public (reCAPTCHA no-ops without a key in test).
    const inq = await t.gql(
      `mutation I($input: CreateCarInquiryInput!) {
         createCarInquiry(input: $input) { id email }
       }`,
      {
        variables: {
          input: {
            carId: car.id,
            inquirerName: 'Buyer Bob',
            inquirerEmail: 'bob@buyer.test',
            inquiryType: 'GENERAL',
            message: 'Is this still available?',
          },
        },
      },
    );
    expect(inq.body.errors).toBeUndefined();
    expect(inq.body.data.createCarInquiry.email).toBe('bob@buyer.test');

    const sellerInq = await t.gql(`query { getSellerInquiries { id email message } }`, {
      token: seller.token,
    });
    const emails = sellerInq.body.data.getSellerInquiries.map((i: { email: string }) => i.email);
    expect(emails).toContain('bob@buyer.test');
  });
});
