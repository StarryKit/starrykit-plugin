#!/usr/bin/env python3
"""Validate the host-neutral StarryKit plugin contract without network access."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PLUGIN_NAME = "starrykit-agent-plugin"
PRODUCTION_MCP_URL = "https://mcp.starrykit.com/mcp"

# Public Hosted MCP tool names. Fixture `expected` entries must stay inside
# this contract (plus the review hand-off marker) so evals cannot drift from
# the server's registered tools.
KNOWN_TOOLS = {
    "list_documents",
    "move_page",
    "read_document",
    "preview_page",
    "create_document",
    "get_profile_catalog",
    "insert_pages",
    "rewrite_pages",
    "edit_pages",
    "get_authoring_statuses",
    "update_document_title",
    "update_page_titles",
    "export_document",
    "get_export_status",
}
WORKFLOW_MARKERS = {"review_in_starrykit_ui"}


def read_json(path: Path) -> object:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def assert_nonempty_str(value: object, label: str) -> None:
    assert isinstance(value, str) and value.strip(), f"{label} must be a non-empty string"


def main() -> None:
    codex = read_json(ROOT / ".codex-plugin" / "plugin.json")
    claude = read_json(ROOT / ".claude-plugin" / "plugin.json")
    mcp = read_json(ROOT / ".mcp.json")
    fixtures = read_json(ROOT / "tests" / "fixtures.json")
    skill = (ROOT / "skills" / "starrykit-authoring" / "SKILL.md").read_text(encoding="utf-8")
    host_setup = ROOT / "skills" / "starrykit-authoring" / "references" / "host-setup.md"

    assert isinstance(codex, dict) and codex.get("name") == PLUGIN_NAME
    assert isinstance(claude, dict) and claude.get("name") == PLUGIN_NAME
    assert codex.get("mcpServers") == "./.mcp.json"
    assert host_setup.is_file(), "Skill host setup reference is missing"

    # One plugin bundle, one version: both host manifests must agree.
    version = codex.get("version")
    assert_nonempty_str(version, "codex version")
    assert claude.get("version") == version, "manifest versions diverged"

    assert isinstance(mcp, dict)
    server = mcp.get("mcpServers", {}).get("starrykit", {})
    assert server == {"type": "http", "url": PRODUCTION_MCP_URL}

    assert isinstance(fixtures, dict)
    positive = fixtures.get("positive", [])
    negative = fixtures.get("negative", [])
    assert len(positive) >= 5
    assert len(negative) >= 3
    for case in positive:
        assert isinstance(case, dict), "positive fixture must be an object"
        assert_nonempty_str(case.get("prompt"), "positive prompt")
        assert_nonempty_str(case.get("behavior"), "positive behavior")
        expected = case.get("expected")
        assert isinstance(expected, list) and expected, "positive expected must be non-empty"
        for step in expected:
            assert step in KNOWN_TOOLS | WORKFLOW_MARKERS, f"Unknown expected step: {step}"
    for case in negative:
        assert isinstance(case, dict), "negative fixture must be an object"
        assert_nonempty_str(case.get("prompt"), "negative prompt")
        assert_nonempty_str(case.get("behavior"), "negative behavior")
        assert_nonempty_str(case.get("rationale"), "negative rationale")
        must_not = case.get("mustNot")
        assert isinstance(must_not, list) and must_not, "negative mustNot must be non-empty"
        for token in must_not:
            assert_nonempty_str(token, "negative mustNot entry")

    required_skill_phrases = (
        "never invoke or delegate to a StarryKit Main Agent",
        "list_documents",
        "read_document",
        "get_profile_catalog",
        "insert_pages",
        "rewrite_pages",
        "edit_pages",
        "get_authoring_statuses",
        "move_page",
        "update_document_title",
        "update_page_titles",
        "documentUrl",
        "Do not accept, keep, commit, reject, discard, or drop",
        "Moving a design document out of a granted Folder",
        "A read-only grant rejects every write tool",
        "If they are unavailable",
        "polished, beautifully structured presentations",
    )
    for phrase in required_skill_phrases:
        assert phrase in skill, f"Missing skill boundary: {phrase}"

    forbidden = ("apiKey", "accessToken", "clientSecret", "mcp.stage.starrykit.com")
    serialized_config = json.dumps(mcp)
    for value in forbidden:
        assert value not in serialized_config, f"Forbidden MCP config value: {value}"

    print("StarryKit plugin contract validation passed.")


if __name__ == "__main__":
    main()
