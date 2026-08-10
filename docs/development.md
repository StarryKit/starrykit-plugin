# Repository development

This repository is the installable client-side StarryKit Plugin bundle. It contains the public manifests, production MCP endpoint configuration, canonical Authoring Skill, user documentation, and demo media. The hosted MCP service and its end-to-end service tests live elsewhere.

## What the workflow means

`.github/workflows/validation.yml` runs `npm test` for pull requests and pushes to `main`. It is a repository-integrity guard, not a deployment workflow and not a live MCP health check.

The test verifies that:

- the Codex and Claude manifests describe the same plugin release;
- the bundled MCP config points to the production HTTPS endpoint without embedded credentials;
- the canonical Skill mentions the complete public tool set and preserves important design and safety boundaries;
- English and Chinese user docs exist for every documented host;
- local Markdown links and media links resolve;
- the removed `hosts/` compatibility layer does not return.

This makes accidental packaging drift visible in a pull request without maintaining a second copy of the server's tool schemas.

## What it does not test

The repository test does not call production, exercise OAuth, inspect a user's documents, render a page, or verify export quality. Those behaviors require service-side contract tests and host dogfooding with real accounts.

Run the local check with:

```sh
npm test
```

When the Hosted MCP adds or removes a public tool, update the canonical Skill and the expected tool-name set in `tests/plugin.test.mjs` together.
