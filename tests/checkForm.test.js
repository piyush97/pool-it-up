const checkForm = require('../utils/checkForm');

describe('checkForm.checkSignUpForm', () => {
  test('0', () => {
    const result = checkForm.checkSignUpForm({
      email: 'TestUpperCase@Example.com',
      password: { length: 8 },
    });
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    const result = checkForm.checkSignUpForm({
      email: 'user1+user2@mycompany.com',
      password: { length: 8 },
    });
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    const result = checkForm.checkSignUpForm({
      email: 'email@Google.com',
      password: { length: 8 },
    });
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    const result = checkForm.checkSignUpForm({
      email: 'something.example.com',
      password: { length: 9.0 },
    });
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    const result = checkForm.checkSignUpForm({
      email: 'something@example.com',
      password: { length: 9 },
    });
    expect(result).toMatchSnapshot();
  });

  test('5', () => {
    const result = checkForm.checkSignUpForm({
      email: '',
      password: { length: Infinity },
    });
    expect(result).toMatchSnapshot();
  });
});

describe('checkForm.checkSignUpForm', () => {
  test('0', () => {
    const result = checkForm.checkSignUpForm({
      email: 'bed-free@tutanota.de',
      password: { length: 8 },
    });
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    const result = checkForm.checkSignUpForm({
      email: '',
      password: { length: NaN },
    });
    expect(result).toMatchSnapshot();
  });
});
