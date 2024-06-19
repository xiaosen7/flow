export const IS_SERVER_SIDE = typeof window === "undefined";
export const IS_CLIENT_SIDE = !IS_SERVER_SIDE;

export const IDENTITY_FN = <T>(x: T) => x;
