# Contributing to e-Catch Kyst

The following is a set of guidelines for contributing to e-Catch Kyst and its subsystems, which are hosted in the [ecatch-it2901](https://github.com/balazsorban44/ecatch-it2901) repository on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Local development](#local-development)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for e-Catch Kyst. Following these guidelines helps maintainers understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](.github/ISSUE_TEMPLATE/bug.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Perform a [cursory search](https://github.com/balazsorban44/ecatch-it2901/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### Local development

To start developing, follow these steps:

```
git clone git@github.com:balazsorban44/ecatch-it2901.git
cd ecatch-it2901
yarn
cd functions
yarn
```

Keep in mind, that yarn is not a must, we do recommend it.

Also some other tools you find useful:

- [Visual Studio Code](https://code.visualstudio.com/download)
- [BabelEdit](https://www.codeandweb.com/babeledit)

You can run `yarn serve` to start the local server.

To run tests, you can do `yarn test:watch`

To build/deploy, you can do `yarn build` and `yarn deploy` though we recommend you let [Travis CI](https://travis-ci.com/balazsorban44/ecatch-it2901) do that.

##### Git Flow
We try to follow Git Flow. For you, this means the following:

`master` and `develop` branches are protected, meaning you must make a PR if you wish to contribute to them.
The normal workflow is, that you first make an issue, following the [Feature request](.github/ISSUE_TEMPLATE/feature.md) issue template. Then you create a branch from `develop`, to have the most up-to-date code as a starting point. The branch name begins with feature, and follows [kebab-case](http://wiki.c2.com/?KebabCase) (`feature/this-is-a-branch`). Whenever you are satisfied with your work, and have checked that you wrote all the necessary tests and documentation, please update the `CHANGELOG.md`. Then you are ready to open a Pull Request.

### Pull Requests

The process described here has several goals:

- Maintain quality
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](.github/PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will intervene.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* prefer lowercase, unless it is an abbreviation or you have another good reason ("URL")
* use the present tense ("add feature" not "added feature")
* use the imperative mood ("move cursor to..." not "moves cursor to...")
* reference issues and pull requests liberally after the first line
* if your commit does not require CI to run, add `[skip ci]` to the commit title
* consider starting the commit message with an applicable emoji:
    * :globe_with_meridians: `:globe_with_meridians:` when working on translations / language related stuff
    * :wrench: `:wrench:` when updating config files
    * :sparkles: `:sparkles:` when introducing a new feature
    * :lipstick: `:lipstick:` when adding/updating UI and style files
    * :art: `:art:` when improving the format/structure of the code
    * :construction: `:construction:` when you are commiting something that is work in progress
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding/updating tests
    * :camera_flash: `:camera_flash:` when updating test snapshots
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :rotating_light: `:rotating_light:` when removing linter warnings

### JavaScript Styleguide

For a consistent codebase, we use ESLint and Prettier. This should already take most of the weight off of your sholders. In addition though:

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```