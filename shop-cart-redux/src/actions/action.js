export const PURCHASE = 'PURCHASE';
export const CLEARCART = 'CLEARCART';
export const purchase = (value) => ({ type: PURCHASE, value });
export const cleanCart = (value) => ({ type: CLEARCART, value });
