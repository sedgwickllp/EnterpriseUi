import { Injectable } from '@angular/core';

@Injectable()
export class AuthConfiguration {

    // The Issuer Identifier for the OpenID Provider (which is typically obtained during Discovery) MUST exactly match the value of the iss (issuer) Claim.
    public iss = 'http://localhost:5000';

    public server = 'http://localhost:5000'; //'http://10.31.201.176:5000';

    public redirect_url = 'http://localhost:3000/index.html';

    // This is required to get the signing keys so that the signiture of the Jwt can be validated.
    public jwks_url = this.server + '/.well-known/openid-configuration/jwks';

    public userinfo_url = this.server + '/connect/userinfo';

    public logoutEndSession_url = this.server + 'connect/endsession';

    // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified by the iss (issuer) Claim as an audience.
    // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
    public client_id = 'EnterpriseUI';

    public response_type = 'id_token token';

    public scope = 'openid profile EnterpriseApi';

    public post_logout_redirect_uri = this.server + '/login';

    public start_checksession = false;

    public silent_renew = true;

    public checksession = this.server + '/connect/checksession'

    public startupRoute = '/app/dashboard/';
}