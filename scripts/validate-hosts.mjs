#!/usr/bin/env node
/**
 * Host-layer contract validation for the StarryKit Agent Plugin.
 *
 * Validates hosts/compatibility.json against the shared host contract and the
 * hosts/ tree against the architecture boundaries: one canonical SKILL.md, one
 * Hosted MCP Production endpoint, no copied tool schemas, no secrets, and no
 * non-Production deployment hostnames. Adding a compatible host only touches hosts/
 * and the manifest; Hosted MCP business code stays untouched.
 *
 * Run with `node scripts/validate-hosts.mjs` from the plugin root; also
 * exercised by the contract tests in tests/host-contract.test.mjs.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const PLUGIN_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const REQUIRED_HOST_FIELDS = [
  "id",
  "displayName",
  "kind",
  "tier",
  "status",
  "verification",
  "adapterPath",
  "minVersion",
  "skill",
  "mcp",
  "lifecycle",
  "limitations",
  "sources",
];

const TIERS = ["A", "B", "C"];
const KINDS = ["named", "generic"];
const STATUSES = ["shipped", "adapter-ready", "planned", "manual"];
const DOGFOOD = ["passed", "pending", "not-applicable"];
const SKILL_DISCOVERY = ["native-agent-skills", "rules-reference", "none"];
const SKILL_SCOPES = ["project", "user", "managed", "package"];
const MCP_CONNECTIONS = ["native-remote", "adapter-required", "manual"];
const HOST_ERA_STATUS = ["verified", "documented", "unknown", "unsupported"];
const SERVER_ERA_STATUS = ["supported", "planned", "none"];
const OAUTH_FLOWS = [
  "authorization-code-pkce",
  "authorization-code",
  "adapter-defined",
  "manual",
  "unknown",
  "none",
];
const EVIDENCE = ["verified", "documented", "unknown", "unsupported"];
const PROTOCOL_ERAS = ["2025-06-18", "2026-07-28"];
const LIFECYCLE_FIELDS = ["install", "login", "update", "uninstall"];

const PRODUCTION_MCP_URL = "https://mcp.starrykit.com/mcp";
// Non-Production deployment hostnames must never appear in the public host layer.
export const FORBIDDEN_HOSTNAMES = ["mcp.stage.starrykit.com"];
// Host adapters must not embed credentials in config files.
export const FORBIDDEN_CONFIG_SECRETS = ["apiKey", "accessToken", "clientSecret", "client_secret"];
// Tool schemas live on the Hosted MCP server only; hosts must not copy them.
const FORBIDDEN_SCHEMA_MARKER = "inputSchema";

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkEnum(errors, value, allowed, code) {
  if (!allowed.includes(value)) {
    errors.push(`${code}:${String(value)}`);
  }
}

export function validateManifest(manifest, schema) {
  const errors = [];
  if (!isPlainObject(manifest)) {
    return ["manifest:not-an-object"];
  }
  if (manifest.schemaVersion !== 1) {
    errors.push("manifest:schema-version");
  }
  if (typeof manifest.updated !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(manifest.updated)) {
    errors.push("manifest:missing-field:updated");
  }

  const canonical = manifest.canonical;
  if (!isPlainObject(canonical)) {
    errors.push("manifest:missing-field:canonical");
  } else {
    if (canonical.skillPath !== "skills/starrykit-authoring/SKILL.md") {
      errors.push("manifest:canonical:skillPath");
    }
    if (canonical.endpointVariable !== "STARRYKIT_MCP_URL") {
      errors.push("manifest:canonical:endpointVariable");
    }
    if (canonical.transport !== "streamable-http") {
      errors.push("manifest:canonical:transport");
    }
    if (canonical.draftAcceptDrop !== false) {
      errors.push("manifest:canonical:draftAcceptDrop");
    }
    if (canonical.clientInfoUsage !== "best-effort-analytics-only") {
      errors.push("manifest:canonical:clientInfoUsage");
    }
    if (!isPlainObject(canonical.protocolEras)) {
      errors.push("manifest:missing-field:canonical.protocolEras");
    } else {
      for (const era of PROTOCOL_ERAS) {
        checkEnum(
          errors,
          canonical.protocolEras[era],
          SERVER_ERA_STATUS,
          `manifest:enum:canonical.protocolEras.${era}`,
        );
      }
    }
    if (!isPlainObject(canonical.oauth)) {
      errors.push("manifest:missing-field:canonical.oauth");
    } else {
      if (!Array.isArray(canonical.oauth.scopes) || canonical.oauth.scopes.length === 0) {
        errors.push("manifest:missing-field:canonical.oauth.scopes");
      }
      if (canonical.oauth.resourceMetadataPath !== "/.well-known/oauth-protected-resource/mcp") {
        errors.push("manifest:canonical:resourceMetadataPath");
      }
    }
  }

  if (!isPlainObject(manifest.tiers)) {
    errors.push("manifest:missing-field:tiers");
  } else {
    for (const tier of TIERS) {
      if (typeof manifest.tiers[tier] !== "string" || manifest.tiers[tier].length === 0) {
        errors.push(`manifest:missing-field:tiers.${tier}`);
      }
    }
  }

  const hosts = manifest.hosts;
  if (!Array.isArray(hosts) || hosts.length === 0) {
    errors.push("manifest:missing-field:hosts");
    return errors;
  }

  const seenIds = new Set();
  let genericCount = 0;
  hosts.forEach((host, index) => {
    const label = isPlainObject(host) && typeof host.id === "string" ? host.id : `hosts[${index}]`;
    if (!isPlainObject(host)) {
      errors.push(`manifest:missing-field:${label}`);
      return;
    }
    for (const field of REQUIRED_HOST_FIELDS) {
      if (!(field in host)) {
        errors.push(`manifest:missing-field:${label}.${field}`);
      }
    }
    if (typeof host.id === "string") {
      if (!ID_PATTERN.test(host.id)) {
        errors.push(`manifest:id-pattern:${host.id}`);
      }
      if (seenIds.has(host.id)) {
        errors.push(`manifest:duplicate-id:${host.id}`);
      }
      seenIds.add(host.id);
    }
    if ("kind" in host) {
      checkEnum(errors, host.kind, KINDS, `manifest:enum:${label}.kind`);
      if (host.kind === "generic") {
        genericCount += 1;
      }
    }
    if ("tier" in host) {
      checkEnum(errors, host.tier, TIERS, `manifest:enum:${label}.tier`);
    }
    if ("status" in host) {
      checkEnum(errors, host.status, STATUSES, `manifest:enum:${label}.status`);
    }
    if ("verification" in host) {
      if (!isPlainObject(host.verification)) {
        errors.push(`manifest:missing-field:${label}.verification`);
      } else {
        checkEnum(
          errors,
          host.verification.stageDogfood,
          DOGFOOD,
          `manifest:enum:${label}.verification.stageDogfood`,
        );
        if (!Number.isInteger(host.verification.trackingIssue) || host.verification.trackingIssue < 1) {
          errors.push(`manifest:missing-field:${label}.verification.trackingIssue`);
        }
      }
    }
    if ("minVersion" in host && (typeof host.minVersion !== "string" || host.minVersion.length === 0)) {
      errors.push(`manifest:missing-field:${label}.minVersion`);
    }
    if ("skill" in host && isPlainObject(host.skill)) {
      checkEnum(errors, host.skill.discovery, SKILL_DISCOVERY, `manifest:enum:${label}.skill.discovery`);
      if (!Array.isArray(host.skill.installScopes)) {
        errors.push(`manifest:missing-field:${label}.skill.installScopes`);
      } else {
        for (const scope of host.skill.installScopes) {
          checkEnum(errors, scope, SKILL_SCOPES, `manifest:enum:${label}.skill.installScopes`);
        }
      }
      if (!Array.isArray(host.skill.installPaths)) {
        errors.push(`manifest:missing-field:${label}.skill.installPaths`);
      }
    } else if ("skill" in host) {
      errors.push(`manifest:missing-field:${label}.skill`);
    }
    if ("mcp" in host && isPlainObject(host.mcp)) {
      checkEnum(errors, host.mcp.connection, MCP_CONNECTIONS, `manifest:enum:${label}.mcp.connection`);
      if (!Array.isArray(host.mcp.transports)) {
        errors.push(`manifest:missing-field:${label}.mcp.transports`);
      }
      if (!isPlainObject(host.mcp.protocolEras)) {
        errors.push(`manifest:missing-field:${label}.mcp.protocolEras`);
      } else {
        for (const era of PROTOCOL_ERAS) {
          checkEnum(
            errors,
            host.mcp.protocolEras[era],
            HOST_ERA_STATUS,
            `manifest:enum:${label}.mcp.protocolEras.${era}`,
          );
        }
      }
      if (!isPlainObject(host.mcp.oauth)) {
        errors.push(`manifest:missing-field:${label}.mcp.oauth`);
      } else {
        checkEnum(errors, host.mcp.oauth.flow, OAUTH_FLOWS, `manifest:enum:${label}.mcp.oauth.flow`);
        checkEnum(
          errors,
          host.mcp.oauth.dynamicClientRegistration,
          EVIDENCE,
          `manifest:enum:${label}.mcp.oauth.dynamicClientRegistration`,
        );
        checkEnum(errors, host.mcp.oauth.pkce, EVIDENCE, `manifest:enum:${label}.mcp.oauth.pkce`);
      }
      if (typeof host.mcp.tokenStorage !== "string" || host.mcp.tokenStorage.length === 0) {
        errors.push(`manifest:missing-field:${label}.mcp.tokenStorage`);
      }
    } else if ("mcp" in host) {
      errors.push(`manifest:missing-field:${label}.mcp`);
    }
    if ("lifecycle" in host && isPlainObject(host.lifecycle)) {
      for (const field of LIFECYCLE_FIELDS) {
        if (typeof host.lifecycle[field] !== "string" || host.lifecycle[field].length === 0) {
          errors.push(`manifest:missing-field:${label}.lifecycle.${field}`);
        }
      }
    } else if ("lifecycle" in host) {
      errors.push(`manifest:missing-field:${label}.lifecycle`);
    }
    if ("limitations" in host && !Array.isArray(host.limitations)) {
      errors.push(`manifest:missing-field:${label}.limitations`);
    }
    if ("sources" in host) {
      if (
        !Array.isArray(host.sources) ||
        host.sources.length === 0 ||
        !host.sources.every((url) => typeof url === "string" && url.startsWith("https://"))
      ) {
        errors.push(`manifest:sources:${label}`);
      }
    }
  });

  if (genericCount !== 1) {
    errors.push("manifest:generic-count");
  }

  // Guard against the JSON Schema (for external consumers) drifting away from
  // the executable contract enforced here.
  if (schema !== undefined) {
    const schemaRequired = schema?.$defs?.host?.required;
    if (
      !Array.isArray(schemaRequired) ||
      schemaRequired.length !== REQUIRED_HOST_FIELDS.length ||
      REQUIRED_HOST_FIELDS.some((field) => !schemaRequired.includes(field))
    ) {
      errors.push("manifest:schema-drift:host-required");
    }
  }

  return errors;
}

function walkFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(path));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }
  return files;
}

export function validateTree(pluginRoot = PLUGIN_ROOT) {
  const errors = [];
  const hostsDir = join(pluginRoot, "hosts");
  const manifestPath = join(hostsDir, "compatibility.json");
  const schemaPath = join(hostsDir, "compatibility.schema.json");

  for (const required of [join(hostsDir, "README.md"), manifestPath, schemaPath]) {
    if (!existsSync(required)) {
      errors.push(`tree:missing:${relative(pluginRoot, required)}`);
    }
  }
  if (errors.length > 0) {
    return errors;
  }

  let manifest;
  let schema;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return ["tree:config-parse:hosts/compatibility.json"];
  }
  try {
    schema = JSON.parse(readFileSync(schemaPath, "utf8"));
  } catch {
    return ["tree:config-parse:hosts/compatibility.schema.json"];
  }

  errors.push(...validateManifest(manifest, schema));

  const hosts = Array.isArray(manifest.hosts) ? manifest.hosts.filter(isPlainObject) : [];

  // Canonical skill must exist and stay the single source of truth.
  if (!existsSync(join(pluginRoot, "skills", "starrykit-authoring", "SKILL.md"))) {
    errors.push("tree:canonical-skill-missing");
  }

  // Every adapterPath must exist; hosts/ adapters must carry a README whose
  // tier statement and Production endpoint match the manifest.
  const manifestHostDirs = new Set();
  for (const host of hosts) {
    if (typeof host.adapterPath !== "string" || host.adapterPath.length === 0) {
      continue;
    }
    const adapterDir = join(pluginRoot, host.adapterPath);
    if (!existsSync(adapterDir) || !statSync(adapterDir).isDirectory()) {
      errors.push(`tree:missing:${host.adapterPath}`);
      continue;
    }
    if (!host.adapterPath.startsWith("hosts/")) {
      continue;
    }
    manifestHostDirs.add(host.adapterPath.replace(/^hosts\//, "").replace(/\/$/, ""));
    const readmePath = join(adapterDir, "README.md");
    if (!existsSync(readmePath)) {
      errors.push(`tree:missing:${host.adapterPath}README.md`);
      continue;
    }
    const readme = readFileSync(readmePath, "utf8");
    if (typeof host.tier === "string" && !readme.includes(`Tier ${host.tier}`)) {
      errors.push(`tree:readme-tier:${host.id}`);
    }
    if (!readme.includes(PRODUCTION_MCP_URL)) {
      errors.push(`tree:readme-endpoint:${host.id}`);
    }
  }

  // Every hosts/ subdirectory must be declared in the manifest.
  for (const entry of readdirSync(hostsDir, { withFileTypes: true })) {
    if (entry.isDirectory() && !manifestHostDirs.has(entry.name)) {
      errors.push(`tree:unlisted-host-dir:${entry.name}`);
    }
  }

  // Purity rules across the whole hosts/ tree.
  for (const file of walkFiles(hostsDir)) {
    const rel = relative(pluginRoot, file);
    if (file.endsWith("SKILL.md")) {
      errors.push(`tree:skill-copy:${rel}`);
      continue;
    }
    const text = readFileSync(file, "utf8");
    for (const hostname of FORBIDDEN_HOSTNAMES) {
      if (text.includes(hostname)) {
        errors.push(`tree:forbidden-endpoint:${rel}`);
        break;
      }
    }
    if (!file.endsWith("compatibility.schema.json") && text.includes(FORBIDDEN_SCHEMA_MARKER)) {
      errors.push(`tree:tool-schema-copy:${rel}`);
    }
    if (file.endsWith(".json") && !file.endsWith("compatibility.json") && !file.endsWith("compatibility.schema.json")) {
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        errors.push(`tree:config-parse:${rel}`);
        continue;
      }
      for (const secret of FORBIDDEN_CONFIG_SECRETS) {
        if (text.includes(secret)) {
          errors.push(`tree:secret:${rel}`);
          break;
        }
      }
      if (text.includes('"url"') && !text.includes(PRODUCTION_MCP_URL) && isPlainObject(parsed)) {
        errors.push(`tree:config-endpoint:${rel}`);
      }
    }
  }

  return errors;
}

const invokedDirectly =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  const errors = validateTree();
  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`FAIL ${error}`);
    }
    process.exit(1);
  }
  console.log("StarryKit plugin host contract validation passed.");
}
