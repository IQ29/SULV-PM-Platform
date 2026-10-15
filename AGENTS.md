# AGENTS.md — SULV-PM-Platform

Follow repository README and existing product/project authority and operational constraints.

## SHINE Prompt / Result / Review traceability

Use [SHINE traceability v1](https://github.com/IQ29/SHINE-Engineering-OS/blob/main/protocols/PROMPT_RESULT_REVIEW_PROTOCOL.md) for ChatGPT/Codex/agent instructions and reports. First lines must use matching IDs: `[PROMPT] <PROJECT>-PR<N>-P<NN>`, `[STATUS] ...-S<NN>`, `[RESULT] ...-R<NN>`, `[REVIEW] ...-REV<NN>` (or stable `-TASK-<SLUG>-` for non-PR tasks). Prompt declares Expected Result ID; Result states `Responds To`, exact git SHA, files, test/environment status (PASS/FAIL/BLOCKED/NOT RUN), human validation still required; Review identifies the exact original Result and Prompt. Never reuse IDs or fabricate previous identifiers. Protocol is communication-only; preserve all domain authority, privacy, site evidence, legal approvals, financial/release control.
