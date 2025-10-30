---
description: Find GraphQL API by variable name and show required inputs
argument-hint: [variable_name]
allowed-tools: Bash(curl:*), Bash(jq:*), Grep
---

Search for GraphQL API containing variable: $ARGUMENTS

Use simple approach with minimal data fetching:

```bash
# Find matching operations with minimal schema data
curl -s -X POST https://serverv2.dev.digiqc.com/main-server/graphql \
  -H "Content-Type: application/json" \
  -H "x-introspection-restriction-secret: ypRjr8S091CIRyGz0SGQ" \
  -d '{"query":"{ __schema { mutationType { fields { name } } queryType { fields { name } } } }"}' \
  | jq -r --arg var "$ARGUMENTS" '(.data.__schema.queryType.fields + .data.__schema.mutationType.fields) | .[] | select(.name | test($var; "i")) | .name' \
  | head -1 > /tmp/found_op

# Get details for the found operation
FOUND_OP=$(cat /tmp/found_op)
if [ -n "$FOUND_OP" ]; then
  echo "Found operation: $FOUND_OP"
  
  # Get operation details and related types
  curl -s -X POST https://serverv2.dev.digiqc.com/main-server/graphql \
    -H "Content-Type: application/json" \
    -H "x-introspection-restriction-secret: ypRjr8S091CIRyGz0SGQ" \
    -d "{\"query\":\"{ __schema { mutationType { fields { name args { name type { name kind ofType { name kind } } } type { name kind ofType { name kind } } } } queryType { fields { name args { name type { name kind ofType { name kind } } } type { name kind ofType { name kind } } } } } }\"}" \
    | jq --arg op "$FOUND_OP" '.data.__schema.queryType.fields + .data.__schema.mutationType.fields | .[] | select(.name == $op)'
else
  echo "No operation found matching: $ARGUMENTS"
fi
```

Then search the response for APIs related to the variable name and provide:
1. Query/Mutation name that matches
2. Required input parameters with types  
3. Return type structure
4. Usage example with the found API