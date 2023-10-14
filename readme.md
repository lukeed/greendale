## Idea

API testing is incredibly important but typically left neglected in most small to mid-sized team projects. Tools like Postman and Insomnia exist to help encourage and bridge that gap, but these tools are *their own* fish tanks and *require* developers to break out of their normal tools & flows in order to work with them. Even so, something like a Postman Collection is updated **after** the fact — if at all — which means that the main source of API tests are lagging behind, out of date, and/or incorrect.

The idea with Greendale is to embed the experience and benefits of visually building & interacting with your API *directly* into VSCode. (Same fish tank.) On top of that, Greendale allows a developer to synchronize its Viewer-based tests with a `greendale.js` file, which is meant to be checked into source control. Any tests within this file will be loaded & usable within other Viewer sessions. This allows all team members to share & maintain immediate access to the latest tests for their APIs — and *review* changes to those tests.

Finally, a `greendale` CLI (**TODO**) can discover & execute the same `greendale.js` test files. This completes the chain, as it allows developers to skip the Viewer altogether yet *still* be able to integrate Greendale test suites into their day-to-day toolchain.

The CLI allows for easy stepping stones to a GitHub Action and a GitHub App, both of which shortcut the "toolchain integration" phase.

## Setup

```sh
# prepare
$ bun install
$ npm run vscode:build

$ cd packages/vscode-greendale
$ code .
```

In the new VSCode window, enter the `Run and Debug` pane & click the green Play button (▶️) in the top bar. This launches a new **Development Host** VSCode window.

In the **Development Host**, open the `/example` workspace provided.

Then run <kbd>CMD</kbd><kbd>SHIFT</kbd><kbd>P</kbd> to launch Command Palette & run the **Open Greendale Viewer** command.

The tests within the `/example/greendale.js` file will be loaded within the

## TODO

> The remaining items are achievable & within reach, but left off due to time.

- [x] HTTP UI/Viewer within VSCode
    - [x] Construct requests
    - [x] View responses
    - [x] Save requests to `greendale.js` file
    - [x] Load requests from `greendale.js` file
    - [x] View recent requests history
    - [x] Custom Headers
    - [x] Request query parameters
    - [x] Request Body (text-based only)
    - [ ] Support any Request body (file, multipart-form, binary)
    - [ ] ENV variables
    - [ ] `$BASEURL` handling
    - [ ] Request collections / groups
    - [ ] Prepend `$BASEURL` if request is `/path`-only
- [ ] Request & Response Validations
    - [ ] Sync validations with test file(s)
    - [ ] Show error toast w/ failures
    - [ ] Report & visualize hierarchy
    - [ ] CodeMirror / Intellisense
    - You can currently paste this into a Validations textbox:
        ```js
        // Note: Open in Devtools
        console.log('Request:', req);

        if (req.method !== 'POST') {
          throw new Error('not a POST request!');
        }
        ```
- [ ] CLI test runner
    * ~> reserved `packages/greendale`
    * Ideally, `npx greendale` in any project
    * Auto-runs any/all `greendale.js` files in the project
- [ ] GitHub Action
    * Uses the CLI & reports results
- [ ] GitHub App
    * Automates the Action
- [ ] Prettify the Viewer ui/colors
