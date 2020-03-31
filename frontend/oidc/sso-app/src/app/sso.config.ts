import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://github.com/login/oauth/authorize',
    redirectUri: window.location.origin + '/index.html',
    clientId: 'ac3d3e3558f73c4f9972',
    scope: ''
}