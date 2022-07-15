# mopeds

[![mopeds](https://github.com/porkus1990/mopeds/actions/workflows/mopeds.yml/badge.svg)](https://github.com/porkus1990/mopeds/actions/workflows/mopeds.yml)

## Tool for fixing MOnorepo-PeErDependency conflictS

### Why?

From time to time, i had struggle with peerDependency updates - especially in monorepos like lerna. That's what this tool is for.
Run -> check -> commit.

### Usage

````
Usage: mopeds [options] [command]

Options:
  -p, --path <path>       path to the folder where the packages live in (default: "")
  -pf, --prefix <prefix>  package prefix like @name/ (slash is required, if set) (default: "")
  -m, --mode <mode>       set lerna or workspace
  -dry, --dryRun          use dryRun and see what woulb be changed (default: false)
  -h, --help              display help for command

Commands:
  mopeds                  automatically fix peerDependency conflicts in monorepos or workspaces
  help [command]          display help for command
  ````

