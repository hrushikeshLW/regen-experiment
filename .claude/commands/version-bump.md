---
description: Increment build number or set specific version in package.json
argument-hint: [version]
allowed-tools: Bash(/home/hrushikesh-yadav-us/.claude/version-bump.sh:*)
---

Execute the user-level version-bump shell script:
- If $ARGUMENTS is provided: Pass it to the script to set specific version
- If no arguments: Script will auto-increment build number (e.g., 3.1.6-10 → 3.1.6-11, or 3.1.6 → 3.1.6-1)

Run: `/home/hrushikesh-yadav-us/.claude/version-bump.sh $ARGUMENTS`
