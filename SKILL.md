# Demo Echo

Echoes a word back with a server-generated timestamp and nonce, so you can
verify that an agent actually called this live service (rather than guessing
the answer). Test/demo skill.

## Base URL
https://demo-production-dc11.up.railway.app

## Endpoints

GET /echo?text={text}
  Echoes {text} back, plus a server timestamp and a random nonce.
  The serverTime and nonce are generated fresh on the server for every call,
  so they cannot be predicted by the agent — receiving them proves this
  endpoint was actually reached.
  Example:
    curl "https://demo-production-dc11.up.railway.app/echo?text=HelloNanda"
  Response (serverTime and nonce vary per call):
    { "youSent": "platypus", "serverTime": "2026-07-08T12:34:56.789Z", "nonce": "a1b2c3d4e5f6" }

GET /
  Health check.
  Example:
    curl "https://demo-production-dc11.up.railway.app/"
  Response:
    { "status": "ok", "service": "demo", "try": "/echo?text=hello" }

## How the agent should use this
1. Take the word the user wants to echo.
2. Call GET /echo with text set to that word (URL-encode the value).
3. Read youSent from the JSON response and report it back to the user.
4. Also report serverTime and nonce as proof the live service was called.
