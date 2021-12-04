heroku-festive
================
*Note: Not affiliated with Heroku, just a fun idea I had*

A way to bring festivities to your Heroku CLI this winter season.
This is an oclif plugin comaptible with the heroku cli.

<!-- toc -->
* [Installation](#installation)
* [Commands](#commands)
<!-- tocstop -->
* [Installation](#installation)
* [Commands](#commands)

# Installation

Pre-requisite: The heroku cli must be installed already ([documentation](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)).

Install the heroku-festive plugin from the command-line by running:
```shell
heroku plugins:install heroku-festive
```

To verify that it is installed run `heroku plugins` and it should be included in the list.

<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku festive`](#heroku-festive)
* [`heroku firelog`](#heroku-firelog)

## `heroku festive`

make any heroku command more festive

```
USAGE
  $ heroku festive

EXAMPLE
  $ heroku festive apps
  $ heroku festive apps:info --app my-heroku-app
```

_See code: [src/commands/festive.ts](https://github.com/chadian/heroku-festive/blob/v0.1.0/src/commands/festive.ts)_

## `heroku firelog`

stay warm this winter

```
USAGE
  $ heroku firelog
```

_See code: [src/commands/firelog.ts](https://github.com/chadian/heroku-festive/blob/v0.1.0/src/commands/firelog.ts)_
<!-- commandsstop -->
