import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { describe, it } from "node:test";

const ROOT = resolve(import.meta.dirname, "..");
const PRODUCTION_MCP_URL = "https://mcp.starrykit.com/mcp";
const HOSTS = ["codex", "claude-code", "cursor", "opencode", "openclaw", "pi", "other-hosts"];

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

function json(path) {
  return JSON.parse(read(path));
}

describe("plugin bundle", () => {
  it("keeps the manifests aligned", () => {
    const codex = json(".codex-plugin/plugin.json");
    const claude = json(".claude-plugin/plugin.json");
    const packageManifest = json("package.json");

    assert.equal(codex.name, "starrykit-plugin");
    assert.equal(claude.name, codex.name);
    assert.equal(claude.version, codex.version);
    assert.equal(packageManifest.version, codex.version);
    assert.equal(codex.interface.displayName, "StarryKit");
    assert.equal(claude.displayName, "StarryKit");
    assert.deepEqual(claude.author, codex.author);
    assert.equal(claude.homepage, codex.homepage);
    assert.equal(claude.repository, codex.repository);
    assert.equal(codex.license, "MIT");
    assert.equal(claude.license, "MIT");
    assert.equal(codex.mcpServers, "./.mcp.json");
    assert.equal(claude.mcpServers, "./.mcp.json");
    assert.equal(claude.skills, "./skills/");
  });

  it("provides concise Codex discovery metadata and starter prompts", () => {
    const { interface: metadata } = json(".codex-plugin/plugin.json");

    assert.ok(metadata.displayName.length <= 30);
    assert.ok(metadata.shortDescription.length <= 30);
    assert.ok(metadata.defaultPrompt.length > 0 && metadata.defaultPrompt.length <= 3);
    for (const prompt of metadata.defaultPrompt) {
      assert.ok(prompt.length <= 128, `default prompt is too long: ${prompt}`);
    }
    assert.equal(metadata.websiteURL, "https://starrykit.com");
    assert.equal(metadata.privacyPolicyURL, "https://starrykit.com/privacy");
    assert.equal(metadata.termsOfServiceURL, "https://starrykit.com/terms");
  });

  it("publishes installable Claude and Codex marketplace catalogs", () => {
    const codexMarketplace = json(".agents/plugins/marketplace.json");
    const claudeMarketplace = json(".claude-plugin/marketplace.json");

    assert.equal(codexMarketplace.name, "starrykit");
    assert.equal(claudeMarketplace.name, "starrykit");
    assert.equal(codexMarketplace.plugins[0].name, "starrykit-plugin");
    assert.equal(claudeMarketplace.plugins[0].name, "starrykit-plugin");
    assert.equal(codexMarketplace.plugins[0].source.path, "./");
    assert.equal(claudeMarketplace.plugins[0].source, "./");
    assert.equal(claudeMarketplace.plugins[0].version, json(".claude-plugin/plugin.json").version);
  });

  it("uses the production Hosted MCP without embedded credentials", () => {
    const mcp = json(".mcp.json");
    assert.deepEqual(mcp, {
      mcpServers: {
        starrykit: { type: "http", url: PRODUCTION_MCP_URL },
      },
    });

    const serialized = JSON.stringify(mcp);
    for (const forbidden of ["apiKey", "accessToken", "clientSecret", "Authorization", "mcp.stage.starrykit.com"]) {
      assert.ok(!serialized.includes(forbidden), `forbidden MCP configuration: ${forbidden}`);
    }
  });

  it("ships a valid canonical Skill with essential safety boundaries", () => {
    const skill = read("skills/starrykit/SKILL.md");
    const workflow = read("skills/starrykit/references/mcp-workflow.md");
    const metadata = read("skills/starrykit/agents/openai.yaml");
    const completeSkill = `${skill}\n${workflow}`;

    assert.ok(!existsSync(resolve(ROOT, "skills/starrykit-authoring")), "legacy Skill name must stay removed");
    assert.match(skill, /^---\nname: starrykit\ndescription: .+\n---\n/);
    assert.match(skill, /# StarryKit/);
    assert.match(skill, /references\/mcp-workflow\.md/);
    assert.match(skill, /## Work from any reference/);
    assert.match(skill, /`design\.md`/);
    assert.match(metadata, /display_name: "StarryKit"/);
    assert.match(metadata, /Use \$starrykit /);
    assert.ok(!completeSkill.includes("starrykit-authoring"), "legacy Skill identifier must stay removed");
    assert.ok(completeSkill.includes(PRODUCTION_MCP_URL), "Skill must reference the production MCP endpoint");
    for (const boundary of [
      "Never invoke or delegate to a private StarryKit Main Agent",
      "Do not accept, keep, commit, reject, discard, or drop a Page Draft",
      "A read-only grant rejects every write tool",
    ]) {
      assert.ok(completeSkill.includes(boundary), `Skill boundary missing: ${boundary}`);
    }
  });

  it("ships bilingual user and host documentation", () => {
    for (const path of ["README.md", "README.zh-CN.md"]) {
      assert.ok(existsSync(resolve(ROOT, path)), `${path} is missing`);
    }
    for (const path of ["docs/README.md", "docs/README.zh-CN.md"]) {
      assert.ok(existsSync(resolve(ROOT, path)), `${path} is missing`);
    }
    for (const host of HOSTS) {
      assert.ok(existsSync(resolve(ROOT, "docs", host, "README.md")), `${host} English guide is missing`);
      assert.ok(existsSync(resolve(ROOT, "docs", host, "README.zh-CN.md")), `${host} Chinese guide is missing`);
    }
    assert.ok(!existsSync(resolve(ROOT, "hosts")), "legacy hosts/ compatibility layer must stay removed");
  });

  it("keeps local documentation and media links resolvable", () => {
    const markdownFiles = [
      "README.md",
      "README.zh-CN.md",
      "docs/README.md",
      "docs/README.zh-CN.md",
      "docs/development.md",
      "skills/starrykit/SKILL.md",
      "skills/starrykit/references/mcp-workflow.md",
      ...HOSTS.flatMap((host) => [`docs/${host}/README.md`, `docs/${host}/README.zh-CN.md`]),
    ];

    for (const path of markdownFiles) {
      const source = read(path);
      const links = [
        ...source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g),
        ...source.matchAll(/(?:href|src)="([^"]+)"/g),
      ].map((match) => match[1]);

      for (const rawTarget of links) {
        const target = rawTarget.split("#", 1)[0];
        if (!target || /^(?:[a-z]+:|\/\/)/i.test(target)) continue;
        const localPath = resolve(ROOT, dirname(path), decodeURIComponent(target));
        assert.ok(existsSync(localPath), `${path} contains a broken local link: ${rawTarget}`);
      }
    }

    for (const asset of [
      "assets/brand/starrykit-wordmark-on-purple.svg",
      "assets/demos/roadtrip-editing.gif",
      "assets/demos/event-design.gif",
    ]) {
      assert.ok([".svg", ".webp", ".gif"].includes(extname(asset)));
      assert.ok(existsSync(resolve(ROOT, asset)), `${asset} is missing`);
    }
  });
});
