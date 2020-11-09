const TOKEN_ENTREGAS_CARIRI: string = '@EntregasCariri:token';

export const getToken = () => localStorage.getItem(TOKEN_ENTREGAS_CARIRI);

export const isAuthenticated = () => localStorage.getItem(TOKEN_ENTREGAS_CARIRI) !== null;

export const login = (token: string) => {
  localStorage.setItem(TOKEN_ENTREGAS_CARIRI, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_ENTREGAS_CARIRI);
};