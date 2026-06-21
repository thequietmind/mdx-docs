# Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch
3. Submit a pull request

## Development setup

Install dependencies with Yarn. The `prepare` script points Git at the repo's
hook directory (`.githooks`), so a `yarn lint` pre-commit check runs on every
commit (bypass in an emergency with `git commit --no-verify`).

```sh
yarn install
```

## Merge driver setup

This repo's `.gitattributes` routes merges for source and configuration files
through [weave](https://github.com/Ataraxy-Labs/weave), a tree-sitter-based
semantic merge driver. It is optional: the merge driver is registered in your
local Git config (not committed), so without it Git simply falls back to its
default line-level merge.

To enable it, install the binary and register the driver in the repo:

```sh
brew install weave
weave setup
```

`weave setup` writes the `merge.weave` entries to your local Git config and
auto-detects the `weave-driver` path. Because `.gitattributes` is already
committed, you can discard any change `weave setup` makes to that file.

To configure it by hand instead:

```sh
git config merge.weave.name "Entity-level semantic merge"
git config merge.weave.driver "weave-driver %O %A %B %L %P"
```
