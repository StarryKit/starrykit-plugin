# Repository development

This repository is the installable client-side StarryKit Plugin bundle. It contains the public manifests, production MCP endpoint configuration, canonical StarryKit Skill, user documentation, and demo media. The hosted MCP service and its end-to-end service tests live elsewhere.

## What the workflow means

`.github/workflows/validation.yml` runs `npm test` for pull requests and on manual dispatch. It is a repository-integrity guard, not a deployment workflow and not a live MCP health check.

The test verifies that:

- the Codex, Claude, Grok, and Cursor manifests keep the same release identity and component paths while allowing host-specific marketing copy;
- the bundled MCP config points to the production HTTPS endpoint without embedded credentials;
- the canonical Skill has valid metadata, references the production MCP endpoint, and preserves essential safety boundaries;
- English and Chinese user docs exist for every documented host;
- local Markdown links and media links resolve;
- the removed `hosts/` compatibility layer does not return.

This makes accidental packaging drift visible in a pull request without duplicating the server's tool schema or coupling harmless Skill copy changes to CI.

## What it does not test

The repository test does not call production, exercise OAuth, inspect a user's documents, render a page, or verify export quality. Those behaviors require service-side contract tests and host dogfooding with real accounts.

Run the local check with:

```sh
npm test
```
