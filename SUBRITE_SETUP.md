# Subrite Authentication Setup

This document describes how to configure Subrite authentication for the Kopshop.no site.

## Overview

The application has been migrated from AWS Cognito to Subrite Auth, an OAuth 2.0 and OpenID Connect based authentication service.

## Required Environment Variables

The following environment variables can be set to override the default staging configuration:

```bash
# The base URL of your Subrite server (defaults to staging)
SUBRITE_URL=https://stage.minside.liverpool.no

# Your Subrite application's client ID (defaults to staging)
SUBRITE_CLIENT_ID=7b35e1436d73411880f2

# Your Subrite application's client secret (REQUIRED - no default for security)
SUBRITE_CLIENT_SECRET=7a794a7da32d4dbf919c7b7dee0340dc

# The redirect URI where Subrite will send users after authentication
SUBRITE_REDIRECT_URI=https://kopshop.no/callback/subrite/login

# The URL where users will be redirected after logout
SUBRITE_LOGOUT_REDIRECT_URI=https://kopshop.no/login
```

**Note:** Default staging values are built into the configuration, but you should set `SUBRITE_CLIENT_SECRET` as an environment variable for security.

## Backend Integration

You'll need to implement a new endpoint:

```
POST /webapi/kopshop/CreateSubriteToken?code={code}&state={state}
```

This endpoint should exchange the authorization code for tokens with Subrite.

## References

- [Official Subrite OAuth Integration Documentation](https://docs.subrite.no/docs/developers/recipes/subrite-oauth-integration/)