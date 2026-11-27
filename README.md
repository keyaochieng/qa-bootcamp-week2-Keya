# QA Bootcamp Week 2 — Playwright suite

This repository contains three Toolshop UI tests, an invalid-login page-object test, and three API tests. The cart test creates and cleans up its own data.

## Setup and run

After cloning the repository, run these three steps from the project folder:

1. Install dependencies and the Chromium browser:
   ```bash
   npm install
   npx playwright install chromium
   ```
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Run the full suite:
   ```bash
   npm test
   ```

The `.env.example` file supplies the Toolshop UI and API URLs. The tests use the API's full URL for API requests. Do not commit your `.env` file.

## Test files

- `tests/toolshop.spec.ts` — homepage title, product search, and invalid login.
- `tests/invalid-login-page-object.spec.ts` — invalid login using a page object.
- `tests/toolshop-api.spec.ts` — products API check.
- `tests/toolshop-carts-api.spec.ts` — cart creation, product addition, cleanup, and unknown-cart response.

The optional Cucumber scenario was not added; the suite work took priority.
