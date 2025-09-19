export interface AuthResponse {
    user: { email: string },
    accessToken: string,
    refreshToken: string,
}
