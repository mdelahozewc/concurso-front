const URLBASE = 'http://localhost/concurso-back/public/api/';

export const environment = {
  production: true,
  LOGIN: URLBASE+'login',
  SIGNUP: URLBASE+'signup',
  LOGOUT: URLBASE+'logout',
  FORGOTPASSWORD: URLBASE+'forgot-password',
  PEOPLE:URLBASE+'people',
  PEOPLEALL:URLBASE+'people/all',
  UPDATEPASSWORD:URLBASE+'update-password',
  CHECKPEOPLE:URLBASE+'people/check'
};