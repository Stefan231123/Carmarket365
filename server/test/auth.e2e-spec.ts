import { createTestApp, TestApp, registerUser, uniqueEmail, VALID_PASSWORD } from './app.helper';

describe('Auth', () => {
  let t: TestApp;
  beforeAll(async () => {
    t = await createTestApp();
  });
  afterAll(async () => {
    await t.close();
  });

  it('registers a new user with the USER role', async () => {
    const email = uniqueEmail();
    const res = await t.gql(
      `mutation R($input: RegisterInput!) { register(input: $input) { access_token user { email role } } }`,
      { variables: { input: { email, password: VALID_PASSWORD, name: 'Jane' } } },
    );
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.register.user.role).toBe('USER');
    expect(res.body.data.register.access_token).toBeTruthy();
  });

  it('assigns the DEALER role when a dealerName is supplied', async () => {
    const { userId } = await registerUser(t, { dealerName: 'Acme Motors' });
    expect(userId).toBeTruthy();
    // role is asserted via a follow-up me query
    const { token } = await registerUser(t, { dealerName: 'Beta Cars' });
    const me = await t.gql(`query { getCurrentUser { role } }`, { token });
    expect(me.body.data.getCurrentUser.role).toBe('DEALER');
  });

  it('rejects a weak password', async () => {
    const res = await t.gql(
      `mutation R($input: RegisterInput!) { register(input: $input) { access_token } }`,
      { variables: { input: { email: uniqueEmail(), password: 'weak', name: 'X' } } },
    );
    expect(res.body.errors).toBeDefined();
  });

  it('logs in with correct credentials and rejects wrong ones', async () => {
    const email = uniqueEmail();
    await registerUser(t, { email });

    const ok = await t.gql(
      `mutation L($input: LoginInput!) { login(input: $input) { access_token user { email } } }`,
      { variables: { input: { email, password: VALID_PASSWORD } } },
    );
    expect(ok.body.data.login.access_token).toBeTruthy();

    const bad = await t.gql(
      `mutation L($input: LoginInput!) { login(input: $input) { access_token } }`,
      { variables: { input: { email, password: 'WrongPass123' } } },
    );
    expect(bad.body.errors).toBeDefined();
    expect(bad.body.data?.login ?? null).toBeNull();
  });

  it('returns the current user for a valid token and rejects an anonymous request', async () => {
    const { token, email } = await registerUser(t);
    const me = await t.gql(`query { getCurrentUser { email } }`, { token });
    expect(me.body.data.getCurrentUser.email).toBe(email);

    const anon = await t.gql(`query { getCurrentUser { email } }`);
    expect(anon.body.errors).toBeDefined();
  });
});
