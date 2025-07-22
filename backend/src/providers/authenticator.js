import jwt from 'jsonwebtoken';
export class Authenticator {
    secret = process.env.JWT_SECRET || 'secret';
    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: '1h' });
    }
    validateToken(token) {
        const secret = process.env.JWT_SECRET || 'secret';
        try {
            return jwt.verify(token, secret);
        }
        catch (err) {
            const error = err;
            console.log({ error });
            return null;
        }
    }
}
export const authenticatorInstance = new Authenticator();
