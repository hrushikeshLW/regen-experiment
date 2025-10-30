---
description: Commit changes with a message, excluding .env.development
argument-hint: [message]
allowed-tools: Bash(git:*)
---

Commit all changes to git with a specific message:

- If $ARGUMENTS is provided: Use $ARGUMENTS as the commit message
- If no arguments: Generate a descriptive commit message based on the changes

Always exclude .env.development file from the commit. Add all other changes and create the commit.

Commit message format:

- Add relevant emoji at the start followed by a space and the description (e.g., ♻️ refactor components, ✨ add new feature, 🐛 fix login bug, 📝 update docs, 🎨 improve styling, ⚡ optimize performance, ✅ add tests)
- Do NOT include commit type keywords like "feat:", "fix:", "chore:", "refactor:", etc.
- Do NOT include "🤖 Generated with [Claude Code]" footer
- Do NOT include "Co-Authored-By: Claude" footer
