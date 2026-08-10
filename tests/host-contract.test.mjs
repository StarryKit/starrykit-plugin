/**
 * Contract tests for the StarryKit Agent Plugin: hosts/compatibility.json,
 * per-host adapters, the shared manifest fixtures, the legacy Python root
 * validator, and the standalone export flow. Lives inside the plugin so the
 * open-source split ships the tests with the tree; the StarryKit monorepo
 * gate imports this file from scripts/test/agent-plugin-hosts.test.mjs.
 *
 * Standalone: `node --test tests/` from the plugin root.
 */

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";

import { PLUGIN_ROOT, validateManifest, validateTree } from "../scripts/validate-hosts.mjs";

const fixturesDir = resolve(PLUGIN_ROOT, "tests", "host-fixtures");
const schema = JSON.parse(
  readFileSync(resolve(PLUGIN_ROOT, "hosts", "compatibility.schema.json"), "utf8"),
);

function readFixture(name) {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), "utf8"));
}

function deleteAtPath(target, path) {
  const segments = path.split(".");
  const last = segments.pop();
  let node = target;
  for (const segment of segments) {
    node = node[segment];
    assert.notEqual(node, undefined, `fixture path ${path} missing at ${segment}`);
  }
  assert.ok(last in node, `fixture path ${path} does not exist`);
  delete node[last];
}

function setAtPath(target, path, value) {
  const segments = path.split(".");
  const last = segments.pop();
  let node = target;
  for (const segment of segments) {
    node = node[segment];
    assert.notEqual(node, undefined, `fixture path ${path} missing at ${segment}`);
  }
  node[last] = value;
}

describe("agent plugin host layer", () => {
  it("hosts tree and compatibility manifest pass contract validation", () => {
    assert.deepEqual(validateTree(), []);
  });

  it("base fixture manifest is valid", () => {
    const { manifest, expect } = readFixture("valid.json");
    assert.deepEqual(expect, []);
    assert.deepEqual(validateManifest(manifest, schema), []);
  });

  it("fixture cases raise the pinned contract errors", () => {
    const { base, cases } = readFixture("manifest-cases.json");
    assert.ok(cases.length >= 5, "expected a meaningful fixture suite");
    for (const testCase of cases) {
      const manifest = structuredClone(readFixture(base).manifest);
      for (const path of testCase.delete ?? []) {
        deleteAtPath(manifest, path);
      }
      for (const [path, value] of Object.entries(testCase.set ?? {})) {
        setAtPath(manifest, path, value);
      }
      const errors = validateManifest(manifest, schema);
      for (const expected of testCase.expect) {
        assert.ok(
          errors.some((error) => error.startsWith(expected)),
          `${testCase.name}: expected ${expected}, got ${JSON.stringify(errors)}`,
        );
      }
    }
  });

  it("legacy python root-contract validator passes", (t) => {
    const probe = spawnSync("python3", ["--version"], { encoding: "utf8" });
    if (probe.error !== undefined || probe.status !== 0) {
      t.skip("python3 unavailable");
      return;
    }
    const result = spawnSync("python3", [resolve(PLUGIN_ROOT, "scripts", "validate.py")], {
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
  });
});

describe("standalone export", () => {
  it("export succeeds, strips monorepo material, and passes the secret scan", (t) => {
    const exportScript = resolve(PLUGIN_ROOT, "scripts", "export-standalone.mjs");
    if (!existsSync(exportScript)) {
      t.skip("export script absent (already-standalone tree)");
      return;
    }
    const outDir = resolve(PLUGIN_ROOT, "dist", `test-export-${process.pid}`);
    try {
      const result = spawnSync(
        process.execPath,
        [exportScript, "--out", outDir, "--force"],
        { encoding: "utf8" },
      );
      assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

      const shipped = [
        "README.md",
        "package.json",
        ".gitignore",
        ".mcp.json",
        ".claude-plugin/plugin.json",
        ".codex-plugin/plugin.json",
        "skills/starrykit-authoring/SKILL.md",
        "hosts/compatibility.json",
        "docs/versioning.md",
        "tests/fixtures.json",
        "tests/host-contract.test.mjs",
        "scripts/validate-hosts.mjs",
        "scripts/validate.py",
      ];
      for (const path of shipped) {
        assert.ok(existsSync(resolve(outDir, path)), `missing exported file: ${path}`);
      }

      const monorepoOnly = [
        "scripts/export-standalone.mjs",
        "docs/split-boundary.md",
        "docs/release",
        "dist",
      ];
      for (const path of monorepoOnly) {
        assert.ok(!existsSync(resolve(outDir, path)), `must not export: ${path}`);
      }

      const readme = readFileSync(resolve(outDir, "README.md"), "utf8");
      // Built dynamically so this exported test file never contains the
      // monorepo path prefix that the export scan forbids.
      const monorepoPrefix = ["integrations", "starrykit-agent-plugin"].join("/");
      assert.ok(!readme.includes(monorepoPrefix), "path prefix survived");
      assert.ok(readme.includes("独立发布快照"), "standalone banner missing");
      assert.ok(readme.includes("MIT License"), "license note missing");
    } finally {
      rmSync(outDir, { force: true, recursive: true });
    }
  });
});
