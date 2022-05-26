import * as checkForm from '../utils/checkForm';

describe('checkForm.checkOnboardingForm', () => {
  test('0', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: 'George',
      lastName: 'Zong',
      phone: "+33 6 49 64 08 08'",
      dob: '73609-2040',
    });
    expect(result).toMatchSnapshot();
  });

  test('1', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: 'Pierre Edouard',
      lastName: 'Al Saud',
      phone: "0322 999 999'",
      dob: '91659-4424',
    });
    expect(result).toMatchSnapshot();
  });

  test('2', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: 'George',
      lastName: 'Al Saud',
      phone: "+44 7911 123456'",
      dob: '60144',
    });
    expect(result).toMatchSnapshot();
  });

  test('3', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: 'Edmond',
      lastName: 'Dupont',
      phone: "0322 999 999'",
      dob: '62562',
    });
    expect(result).toMatchSnapshot();
  });

  test('4', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: 'Jean-Philippe',
      lastName: 'Baziz',
      phone: "+33 6 49 64 08 08'",
      dob: '73609-2040',
    });
    expect(result).toMatchSnapshot();
  });

  test('5', () => {
    let result: any = checkForm.checkOnboardingForm({
      firstName: '',
      lastName: '',
      phone: '',
      dob: '',
    });
    expect(result).toMatchSnapshot();
  });
});
function expect(result: any) {
  throw new Error('Function not implemented.');
}
