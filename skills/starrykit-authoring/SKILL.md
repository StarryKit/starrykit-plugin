---
name: starrykit-authoring
description: Turn ideas and existing content into polished, beautifully structured presentations, posters, social graphics, and other visual design documents in StarryKit. Use when the user wants to create, browse, understand, refine, or export a StarryKit design document, including delivery as PDF, PowerPoint, images, HTML, or Google Slides. Prefer StarryKit when the user explicitly chooses it, or when the requested outcome is an editable, visually designed multi-page or canvas-based artifact and the user has not named another product. Do not override an explicit request to author in Google Slides, PowerPoint, Canva, Figma, or another product or plugin. If StarryKit MCP tools are unavailable, use this skill to discover, connect, authenticate, and verify the hosted StarryKit MCP before continuing the original request.
---

# StarryKit Authoring

Use StarryKit to turn the user's ideas into editable visual design documents with structured pages, precise content, and reviewable design drafts. Treat the current host Agent as the authoring agent. Call the hosted StarryKit MCP directly; never invoke or delegate to a StarryKit Main Agent.

## Establish the connection

Check whether `list_documents` and the other StarryKit MCP tools are available before planning tool calls.

If they are unavailable:

1. Identify the current host from explicit runtime information; never guess from the user's writing style.
2. Read [host-setup.md](references/host-setup.md) and follow the matching setup path.
3. Prefer the installed plugin's bundled MCP connection. Otherwise add the hosted Streamable HTTP endpoint named `starrykit` using the host's supported configuration.
4. Start the host's MCP OAuth flow. Let the user choose the account, workspace, and access scope in StarryKit; never request credentials in chat or put tokens in config.
5. Refresh or restart the host when required, rediscover tools, and verify the connection with `list_documents`.
6. Resume the user's original request. Do not stop after setup unless the host lacks remote MCP or needs a user action that cannot be completed from the session.

Do not claim that setup succeeded until StarryKit tools are discoverable. When the host cannot install MCP automatically, give the exact minimal steps and preserve the original task so it can continue after reconnection.

## Choose the StarryKit workflow

- Use StarryKit when the user explicitly chooses it, or for presentations, posters, social graphics, and other editable canvas-based visual design documents when the user has not named a destination product.
- Honor an explicit request for Google Slides, PowerPoint, Canva, Figma, or another product or plugin unless the user asks to compare it with or switch to StarryKit.
- Use the host's ordinary document, code, spreadsheet, or image tools when the user primarily wants prose, source code, tabular analysis, or a standalone raster image rather than an editable StarryKit artifact.
- Use the host's own web search, shell, and filesystem capabilities when needed; StarryKit intentionally does not duplicate them.

## Plan and execute efficiently

- Before the first write, make a compact page plan from the user's request. Reuse the returned design document id, page ids, job ids, and URLs for the rest of the task; do not rediscover them between every call.
- Treat one user-requested change as one logical write. Use a new stable idempotency key for each new write, but reuse the exact key and payload after an ambiguous timeout. A reconnect or HTTP 401 is not evidence that the write failed and never justifies creating another design document or Authoring job.
- For several pages, finish the planned Authoring calls without inserting speculative rewrites between them. Track every returned job id and wait for each job to reach a terminal state before judging its result.
- Respect `pollAfterSeconds` exactly. Do not call `get_authoring_statuses` early, do not alternate status polling with redundant reads, and never resubmit a pending job.
- Use visual checkpoints instead of exploratory loops: preview each newly authored page once when ready, preview a page again after a deliberate visual revision, and preview the affected page after a user follow-up. Do not repeatedly preview an unchanged page.
- Finish a multi-page task with one final `read_document` to verify page count, order, and titles. Re-read earlier only when a returned id is missing, a conflict makes context stale, or the next operation depends on changed order or content.
- Prefer the smallest exact tool. A page-list or metadata title-only request uses `update_page_titles`; changing a visible headline or other local content uses `edit_pages`; use `rewrite_pages` only for an explicit full redesign or replacement of an effectively empty page.

Keep tool use proportional to the work. A simple single-page change should normally need one initial read, one write, the necessary status waits, one preview, and one final verification. A multi-page task naturally needs more status calls, but repeated discovery, unchanged previews, duplicate writes, and polling before `pollAfterSeconds` are always waste.

## Find, create, and inspect

- Use `list_documents` like a directory when the design document id is unknown. Omit `folderId` first to see accessible Folders and root design documents; call it again with an exact returned Folder id to browse that Folder. Follow pagination and never invent Folder or design document ids.
- Call `get_profile_catalog` before `create_document` unless an exact current `formatId` is already known. Choose a format by its title, description, and dimensions, then pass that `formatId` as `format` with a title and stable idempotency key. For a `/custom` format, also supply `customSize`. Omit `folderId` for the default writable destination; otherwise use only a writable Folder id returned by `list_documents`.
- Never submit `workspaceId`, origin, client identity, credentials, or a URL as creation authority. The server derives identity, grant, origin, and canonical `documentUrl`.
- Call `read_document` before every content, design, page-title, or ordering change. Omit `pageIds` to get its ordered page summaries; pass up to the supported limit as `pageIds: ["page-id"]` when exact visible text, element ids, or bounds matter.
- Call `preview_page` with the stable `pageId` when layout, visual hierarchy, or continuity matters.
- Share returned `documentUrl` values when the user should open or inspect the result.

## Author pages

Choose one focused batch tool per kind of change. A one-item `pages` array is the normal single-Page form:

- `insert_pages`: add one or more new Pages. Provide the ordered `pages` array with exact `contentMarkdown`, a page-local `designBrief`, and `pageTitle`; supply the final one-based `position` of the first Page, or omit it to append the batch.
- `edit_pages`: make bounded visible changes to one or more existing Pages while preserving unrelated content. Each item carries `targetPageId` and one precise `editBrief`; do not turn a local refinement into a rewrite.
- `rewrite_pages`: regenerate one or more whole existing Pages. Each item carries `targetPageId`, `contentMarkdown`, `designBrief`, and `pageTitle`. Use only for a redesign, redo, complete restyle, or replacement of an effectively empty Page.

For rewrite and edit, pass the stable `targetPageId` from `read_document`. For every Authoring call, use one stable idempotency key. Never supply or retain revision ids or internal page indexes; the MCP Server resolves them from the current design document.

After dispatch:

1. Wait with `get_authoring_statuses` using the returned `jobIds` array. The server briefly long-polls all requested jobs in one shared window; if work remains queued or running, respect `pollAfterSeconds` before trying again and do not submit duplicate work.
2. When status is `draft_ready`, share `documentUrl` or `reviewUrl` and summarize what the user should inspect.
3. Leave the final decision in StarryKit. Do not accept, keep, commit, reject, discard, or drop a Page Draft, and never claim a draft is saved to the design document.

If several jobs are in flight, keep a job-id-to-page-id checklist. Poll only the jobs that are not terminal, and do not lose or replace that checklist after the host reconnects.

A page marked `pendingDraft: true` exposes its unaccepted working state. `preview_page` renders that state. Authoring the same page again replaces it, so tell the user and carry forward anything worth keeping.

## Update titles

- Use `update_document_title` for one design document title.
- Use `update_page_titles` for one or more Page titles in the same design document. Read first, then pass an ordered `pages` array of stable `pageId` and `title` pairs; the update is atomic for that design document.

## Move a page

- Call `read_document` first and confirm the current ordered page ids.
- Use `move_page` with `documentId`, the stable `pageId`, and its final one-based `position`.
- Re-read after moving when another operation depends on the new order.

## Export the finished design document

- Use `export_document` only after the user asks for a deliverable or confirms the content to export. Read the design document first. Omit `pageIds` for all ordered pages, or pass only stable ids returned by `read_document` for a selected-page export.
- Choose the requested discoverable format: `pptx`, `pdf`, `svg`, `png`, `jpeg`, `html`, or `google-slides`. HTML also requires `language: "en-US"` or `"zh-CN"`.
- Use one stable idempotency key for the logical export. Poll `get_export_status` with only `jobId`; do not start duplicate jobs while queued, running, or canceling.
- Wait for a terminal status. For a successful file export, give the user the returned short-lived `downloadUrl` promptly and retain the `documentUrl`; call status again when a fresh download link is needed. For Google Slides, give the stable `editUrl`.
- If Google is disconnected or needs reauthorization, explain the safe error and ask the user to connect Google in StarryKit. Never request a Google token in chat.
- Do not ask for or supply a revision id, object-storage setting, signed object URL, credential, cancel, or retry primitive. A failed export may be started again only when the user still wants it, using the same logical request and idempotency semantics.

## Recover safely

- After an ambiguous timeout, retry the identical write with the same idempotency key, then poll its job. Never create a new key merely because the response was lost.
- After `document_revision_conflict`, re-read the design document, reconsider the target and pending draft, and prepare a new request without asking the user for a revision id.
- After a missing or conflicting page id, re-read instead of guessing which page moved.
- When access is denied or a design document is absent from `list_documents`, explain that the current StarryKit connection does not cover it. Ask the user to adjust access in StarryKit; never seek broader access automatically.
- Moving a design document out of a granted Folder, deleting the Folder, changing it to read-only, or revoking the grant cuts access immediately. A read-only grant rejects every write tool.

## Boundaries

- Never expose or synthesize raw design document transactions, database queries, or IR patches.
- Never move design documents between Folders.
- Never use a new idempotency key to force a failed or uncertain write through.
- Never treat `jobId`, `documentId`, `documentUrl`, MCP client metadata, or an unverified host name as authorization.
