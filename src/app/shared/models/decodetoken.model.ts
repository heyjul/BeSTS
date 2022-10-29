export interface DecodeTokenModel {
    email: string;
    username: string;
    sub: string;
    exp: number;
    iat: number;
}