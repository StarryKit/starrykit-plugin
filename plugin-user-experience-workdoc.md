# StarryKit Plugin user experience refresh

## Design

The repository should present StarryKit Plugin as a product that users can install and use, not as an exported engineering snapshot.

- Make the root README bilingual through paired English and Chinese documents, with a marketing-oriented introduction, real StarryKit brand assets, clear outcomes, and real product demos.
- Keep one primary installation path on the project homepage: send a prompt to the current agent and let it install the Plugin, Hosted MCP connection, and canonical Skill.
- Move host-specific manual setup into `docs/<host>/README.md` and `README.zh-CN.md`. Remove the compatibility-matrix and adapter abstraction from `hosts/`.
- Adapt the private runtime main-agent prompt into the public canonical Skill. Preserve its Design Director principles, design-quality bar, anti-patterns, and brief-writing guidance while replacing private dispatch/runtime tools with the public Hosted MCP tool set.
- Replace the existing host-contract machinery with a small repository integrity test. CI remains useful as a cheap pull-request guard, but it does not deploy or test the hosted service.
- Use existing StarryKit logo and real editor demo recordings rather than invented marketing artwork.

## Tracker

- [x] Add brand and demo assets.
- [x] Rewrite `README.md` and add `README.zh-CN.md`.
- [x] Rewrite the canonical Skill for the Hosted MCP contract.
- [x] Replace `hosts/` with bilingual manual setup guides under `docs/`.
- [x] Simplify validation tests and GitHub Actions workflow.
- [x] Explain repository development, CI, and test scope under `docs/`.
- [x] Run tests, verify local links, and review the final tree.
