export const name = (value) => {
  if (value.length < 3) return 'Name must be more than 3 letters';
  if (value.length > 45) return 'Name must be less than 45 letters';
  if (/\s+/.test(value)) return 'Name cannot contain spaces';
  if (!/^[a-z]+[']{0,1}[a-z]+$|^[a-z]+[-]{0,1}[a-z]+$/gi.test(value)) return 'Name can only contain alphabets, one apostrophe and one hyphen character.';
};

export const email = (value) => {
  if (!/^.+[.]{1}[a-z]+$/g.test(value)) return 'Invalid email';
};

export const password = (value) => {
  if (value.length < 7) return 'Password cannot be less than 7 characters';
  if (value.trim() === '') return 'Password cannot be an empty string';
};

export const confirmPassword = (pass, confirmPass) => {
  const error = password(confirmPass);
  if (error) return error;
  if (pass !== confirmPass) return 'Passwords do not match';
};
