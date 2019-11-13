export const checkErrorState = (state) => {
  const errorKeyList = Object.keys(state).filter(key => key.includes('Error'));
  return errorKeyList.map(error => state[error]).filter(error => error !== '' && error !== undefined);
};

export const checkUserState = (state) => {
  const userDetails = Object.keys(state).filter(key => !key.includes('Error') && !key.includes('Button'));
  return userDetails.map(input => state[input]).filter(input => input === '');
};
