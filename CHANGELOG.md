# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2020-08-05
- Frontend rework
- Account system
- Database refactor

### Added
- Add modal for grabit creation.
- Creation of modals for manage nodes and edges.
- Add properties in modals.
- Define properties with name, domain, default and mandatory value.
- Remove nodes and edges via button in their models.
- Add graph layout.
- Add dashboard for choice user's project.
- Autosave system on nodes and edges creation.
- Add color palette and style on nodes.
- Use MaterialUI componenets.
- Windows resize.
- Use real nav bar height in the editor page.
- Change update time model field from date to datetime.
- Create user models in backend and bind it to its grabit.
- Creation of untitled grabit directly on editor page.
- Add Django graphAuth for backend user authentication.
- Create login and singup page.
- Set fix zoom level.


## [0.0.1] - 2020-04-30
- Prototype to create, load, save and delete graphs called Grabits.

### Added
- Added snapshot match tests for components and API calls in the backend.
- Installed Apollo to use the GraphQL server, used by the four buttons to communicate with the backend.
- Added navbar, footer and buttons for create, save, delete and load a Grabit.
- Prototyped graph editor with Cytoscape.js to create graphs visually.
- Installed Bootstrap and React-Bootstrap for components styling.
- Setup GraphQL API with schema to query, create and delete Grabit.
- Installed Graphene-Django to create a GraphQL server and created Grabit app to model a user project (name, description, and JSON to represent graphs).
- Django backend and React frontend setup.

<!-- 
### Changed
- Start using "changelog" over "change log" since it's the common usage.

### Removed
- Section about "changelog" vs "CHANGELOG".

### Fixed
- Fix typos in recent README changes. -->


<!-- [Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...HEAD
[0.0.1]: https://github.com/olivierlacan/keep-a-changelog/releases/tag/v0.0.1 -->
