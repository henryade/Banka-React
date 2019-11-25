export const signUpData = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    class: 'authInput input-lg',
    required: true,
    screenPortion: 6
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    class: 'authInput input-lg',
    required: true,
    screenPortion: 6,
  },
  {
    type: 'email',
    autoComplete: 'email',
    name: 'email',
    placeholder: 'Email',
    class: 'authInput input-lg',
    required: true,
    screenPortion: false,
  },
  {
    type: 'password',
    autoComplete: 'password',
    name: 'password',
    placeholder: 'Password',
    class: 'authInput input-lg',
    required: true,
    screenPortion: false,
  },
  {
    type: 'password',
    autoComplete: 'new-password',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    class: 'authInput input-lg',
    required: true,
    screenPortion: false,
  },
];

export const signInData = [
  signUpData[2],
  signUpData[3],
];

export const resetPasswordData = [
  signUpData[2]
];

export const changePasswordData = [
  signUpData[3],
  signUpData[4],
];
