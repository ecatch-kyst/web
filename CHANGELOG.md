# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- authentication redirects:
  - logged out
    - after registering a user -> dashboard
    - dashboard -> root
    - 404 -> root

  - logged in
    - register -> profile
    - logout -> root
    - 404 -> dashboard
    - root -> dashboard

#10

## [0.3.0] - 2019-01-30
### Added
- logo
- routing with `react-router`
- styling 💄
  - empty state image at `NotFound`
  - React UI Framework `material-ui`
    - basic styling
    - login example
- registered Service Worker

### Changed
- name from e-Catch Kyst to eCatch Kyst
- `LanguageChooser` is now a dropdown menu instead of a list buttons

### Removed
- backend. it is now moved to its [own repository](https://github.com/ecatch-kyst/backend)
- old CSS files
- old, unused images


## [0.2.1] - 2019-01-27
### Added
- Store `Context`
  - Database `Context.Provider`
  - `withStore` Context HOC
- `CONTRIBUTING.md`
- `PULL_REQUEST_TEMPLATE.md`

## [0.2.0] - 2019-01-27
### Changed
- Lighthouse settings:
  - run only on PRs
  - run on website related to the branch the PR will merge into
  - add delay, so deploy changes can propagate
  - provide report by WebPageTest
  
### Added
- `prop-types`
- `i18next` and `react-i18next`:
  - I18nextProvider
  - Language chooser
  - English 🇬🇧 and Norwegian 🇳🇴 locales (WIP 🚧)
- Auto commenting a checklist to pull-requests

## [0.1.3] - 2019-01-21
### Changed
- Only notify about failures on Slack

### Added
- Lighthouse testing to Travis pipeline
- Firebase 🔥


## [0.1.2] - 2019-01-18
### Changed
- Badge links in the `README.md` to support the private repository

## [0.1.1] - 2019-01-18
### Added
- This is intended to be the first release
- New issue templates for more transparent issue handling
- Basic Create React App files
- Travis CI
- Coverage reporter
- ESLint config

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)