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
1. Exchange the authorization code for access/refresh tokens with Subrite
2. Validate the tokens and extract user information
3. Create or update the user session in your system
4. Return user data in the same format as the existing Cognito integration

## Testing

1. Set up your environment variables
2. Register your application with Subrite
3. Test the login flow at `/login/norway`
4. Verify the callback handling works correctly
5. Test logout functionality

## Migration Notes

- The AWS Cognito configuration is still present alongside Subrite for gradual migration
- The existing session management (`setCid`, cookies) remains unchanged
- Backend API endpoints need to be updated to support Subrite token exchange

## References

- [Subrite Auth Documentation](https://github.com/skavl-media/subrite-auth)
- [OAuth 2.0 with PKCE](https://tools.ietf.org/html/rfc7636)
- [OpenID Connect](https://openid.net/connect/) 