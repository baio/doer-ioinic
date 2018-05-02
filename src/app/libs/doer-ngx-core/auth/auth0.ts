import  * as Verifier from 'idtoken-verifier';
import { AdfsUserProfile } from 'auth0-js';


export class JwksCache {

    constructor(private readonly data) {
    }

    get() {
        return this.data;
    }

    has() {
      return !!this.data;
    }

    set(key, x) {}
}

export const validateToken = (config: {domain: string, clientID: string, jwks?: any|null}) => (token: string, nonce?: string): Promise<AdfsUserProfile> => {

    const issuer = `https://${config.domain}/`;
    const jwksURI = `${issuer}.well-known/jwks.json`;

    var verifier = new Verifier({
      issuer,
      jwksURI,
      audience: config.clientID,
      jwksCache: config.jwks ? new JwksCache(config.jwks) : null,
      leeway: 0
    });

    return new Promise((resolve, reject) => {
        //console.log('111', verifier, nonce);
        verifier.verify(token, nonce || null, (err, payload) => {
          //console.log('222', err, payload);
          if (err) {
            return reject(err);
          } else {
            return resolve(payload);
          }
        });
    });
  }
