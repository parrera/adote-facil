import { authenticatorInstance, } from '../providers/authenticator.js';
class UserAuthMiddleware {
    authenticator;
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token não fornecido.' });
        }
        const [, token] = authHeader.split(' ');
        const decoded = this.authenticator.validateToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Token inválido ou expirado.' });
        }
        // Adiciona o payload decodificado ao objeto `req.user`
        req.user = decoded;
        return next();
    }
}
export const userAuthMiddlewareInstance = new UserAuthMiddleware(authenticatorInstance);
