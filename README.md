# my-portfolio

Personal portfolio site — React + Vite, deployed on Vercel.

```bash
npm install
npm run dev              # local dev server
npm run build            # production build
npm run validate:content # check the content JSON
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Content automation

Projects and experience live in `src/data/projects.json` and
`src/data/experience.json` (shapes documented in `src/data/types.js`). Opening
a labelled issue makes an agent add one entry and open a PR against it.

The agent runs on [OpenCode](https://opencode.ai), which is provider-agnostic:
the model is a repo variable, so switching between Anthropic, OpenAI,
OpenRouter or a self-hosted model needs no code change.

### One-time setup

1. **Create the labels** the workflow gates on:

   ```bash
   gh label create new-project    --description "Add a project to the site"    --color 0E8A16
   gh label create new-experience --description "Add a role to the timeline"   --color 1D76DB
   ```

2. **Add the model variable** — Settings → Secrets and variables → Actions →
   *Variables*:

   | Variable | Example |
   | --- | --- |
   | `OPENCODE_MODEL` | `anthropic/claude-sonnet-5` |

3. **Add the API key** for that provider under *Secrets*. The workflow passes
   `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` and `OPENROUTER_API_KEY` through; you
   only need the one your model uses.

4. **Allow Actions to open PRs** — Settings → Actions → General → Workflow
   permissions → tick *Allow GitHub Actions to create and approve pull
   requests*. Without this the agent commits but cannot open the PR.

### Adding a project or a role

1. Open an issue with the **New project** or **New experience** template and
   fill it in. Rough notes are fine; the agent will not invent numbers, so put
   any metric you want on the site into the issue.
2. The agent edits one JSON file and opens a PR that closes the issue.
3. Check the Vercel preview on the PR, confirm CI is green, merge. Merging to
   `main` deploys.

Only issues **opened by the repo owner** and carrying one of the two labels
trigger the agent — anything else is ignored. The agent may only edit the two
JSON files; `npm run validate:content` runs in CI on every PR and blocks a
malformed entry from merging.

### Switching model or provider

For a provider OpenCode supports out of the box, change `OPENCODE_MODEL` and
add the matching secret. Nothing else changes.

For anything OpenAI-compatible — OpenRouter, Together, a self-hosted model —
declare it in `opencode.json` and point `OPENCODE_MODEL` at it:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["AGENTS.md"],
  "provider": {
    "openrouter": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OpenRouter",
      "options": {
        "baseURL": "https://openrouter.ai/api/v1",
        "apiKey": "{env:OPENROUTER_API_KEY}"
      },
      "models": {
        "qwen/qwen3-coder": { "name": "Qwen3 Coder" }
      }
    }
  }
}
```

Then set `OPENCODE_MODEL` to `openrouter/qwen/qwen3-coder`.

A self-hosted Ollama server uses the same shape with
`"baseURL": "https://your-host:11434/v1"`. Note that a GitHub-hosted runner
cannot reach `localhost`, so the server has to be reachable from the runner —
or you run the workflow on a self-hosted runner.

Keys are always read from the environment with `{env:...}`; never commit one.
