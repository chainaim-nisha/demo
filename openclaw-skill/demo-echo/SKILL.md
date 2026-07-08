---
name: demo-echo
description: Echo a word via the live demo API and report the server timestamp and nonce as proof of a real call.
---

# Demo Echo

Use this when the user asks to echo a word or to test the demo skill. Call the
live HTTP endpoint below and report back exactly what it returns — do not invent
the response.

## Endpoint

GET https://demo-production-dc11.up.railway.app/echo?text={word}

Returns JSON:
{ "youSent": "<word>", "serverTime": "<ISO-8601 timestamp>", "nonce": "<random hex>" }

The serverTime and nonce are generated fresh on the server for every request,
so they cannot be guessed — reporting them back proves the live endpoint was
actually called.

## Steps

1. Take the word the user wants echoed. If none is given, use "hello".
2. URL-encode the word and call the endpoint using the web fetch tool:
   GET https://demo-production-dc11.up.railway.app/echo?text={word}
   If web fetch is unavailable, use the exec tool instead:
   curl -s "https://demo-production-dc11.up.railway.app/echo?text={word}"
3. Parse the JSON response and tell the user the youSent, serverTime, and nonce
   values verbatim.
