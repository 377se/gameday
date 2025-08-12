# Subrite Authentication Setup

This document describes how to configure Subrite authentication for the Kopshop.no site.

## Overview

The application has been migrated from AWS Cognito to Subrite Auth, an OAuth 2.0 and OpenID Connect based authentication service.

## Required Environment Variables

Add the following environment variables to your deployment configuration:

```bash
# The base URL of your Subrite server
SUBRITE_URL=https://your-subrite-server.com

# Your Subrite application's client ID
SUBRITE_CLIENT_ID=your-client-id

# Your Subrite application's client secret  
SUBRITE_CLIENT_SECRET=your-client-secret

# The redirect URI where Subrite will send users after authentication
# This should match the URL registered in your Subrite application
SUBRITE_REDIRECT_URI=https://kopshop.no/callback/subrite/login

# The URL where users will be redirected after logout
SUBRITE_LOGOUT_REDIRECT_URI=https://kopshop.no/login
```

## Subrite Application Configuration

When registering your application with Subrite, make sure to configure:

1. **Redirect URI**: `https://kopshop.no/callback/subrite/login`
2. **Post Logout Redirect URI**: `https://kopshop.no/login`
3. **Scopes**: `openid`, `offline_access`
4. **Grant Types**: Authorization Code with PKCE (S256)

## Changes Made

### 1. Nuxt Configuration (`nuxt.config.kopshop.js`)
- Added new `subrite` strategy to the auth configuration
- Configured OAuth2 endpoints for Subrite
- Set up PKCE (S256) code challenge method
- Configured scopes: `openid`, `offline_access`

### 2. Login Page (`pages/login/norway.vue`)
- Replaced AWS Cognito login with Subrite login
- Added fallback direct login link for testing
- Updated method to use `this.$auth.loginWith("subrite")`

### 3. Callback Handler (`pages/callback/subrite/login.vue`)
- Created new callback handler for Subrite OAuth flow
- Processes authorization code and exchanges for tokens
- Integrates with existing user session management

## Backend Integration

You'll need to implement a new endpoint in your backend API:

```
POST /webapi/kopshop/CreateSubriteToken?code={code}&state={state}
```

This endpoint should:
1. Exchange the authorization code for access/refresh tokens with Subrite using PKCE
2. Validate the tokens and extract user information
3. Create or update the user session in your system
4. Return user data in the same format as the existing Cognito integration

### Token Exchange Details

Based on the [official Subrite documentation](https://docs.subrite.no/docs/developers/recipes/subrite-oauth-integration/), your backend should make a POST request to:

```
POST {SUBRITE_URL}/api/oidc/token
Content-Type: application/x-www-form-urlencoded
Accept: application/json
```

**Required Parameters:**
- `grant_type`: "authorization_code"
- `client_id`: Your Subrite client ID
- `client_secret`: Your Subrite client secret  
- `code`: The authorization code received from the callback
- `code_verifier`: PKCE code verifier (must be stored from initial auth request)

**Response:**
```json
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "...",
  "refresh_token": "...",
  "id_token": "...",
  "scope": "openid offline_access"
}
```

### Getting Member Information

Once you have the access token, you can get detailed member information:

```
GET {SUBRITE_URL}/api/v1/members/profile/info-with-active-subscriptions
Authorization: Bearer {access_token}
```

**Important:** The member ID in Subrite responses is now a string (e.g., "1", "c29a724f-36cf-4584-9d47-1cdde8733f75").

### PKCE Implementation Note

Subrite requires PKCE (Proof Key for Code Exchange) for security. The Nuxt Auth module should handle this automatically, but your backend needs to:

1. Store the `code_verifier` when the initial auth request is made
2. Use this `code_verifier` when exchanging the authorization code for tokens
3. The authorization code is **only valid for 10 minutes**

### Refresh Token Handling

To refresh access tokens, make a POST request to the same token endpoint:

```
POST {SUBRITE_URL}/api/oidc/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&refresh_token={REFRESH_TOKEN}
```

## Logout Implementation

According to the official documentation, logout must be handled in two steps:

1. **Log out from Subrite first**: Direct the browser to `{SUBRITE_URL}/api/oidc/session/end?client_id={CLIENT_ID}`
2. **Then log out from your application**: User will be redirected to your configured `post_logout_redirect_uri`

## Testing

1. Set up your environment variables (get stage/production URLs from Subrite)
2. Register your application with Subrite Admin Portal
3. Test the login flow at `/login/norway`
4. Verify the callback handling works correctly
5. Test logout functionality
6. Verify member information API access with Bearer token

## Migration Notes

- The AWS Cognito configuration is still present alongside Subrite for gradual migration
- The existing session management (`setCid`, cookies) remains unchanged
- Backend API endpoints need to be updated to support Subrite token exchange

## Environment URLs

According to the official documentation:
- **Stage URL**: [Will be provided by Subrite]
- **Production URL**: [Will be provided by Subrite]

## References

- [Official Subrite OAuth Integration Documentation](https://docs.subrite.no/docs/developers/recipes/subrite-oauth-integration/)
- [OAuth 2.0 with PKCE](https://tools.ietf.org/html/rfc7636)
- [OpenID Connect](https://openid.net/connect/)
- [Subrite GitHub Repository](https://github.com/skavl-media/subrite-auth) 