class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static get(): AuthService {
        if (!AuthService.instance) AuthService.instance = new AuthService();
        return AuthService.instance;
    }
}