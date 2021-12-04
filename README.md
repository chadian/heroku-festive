heroku-festive
================
*Note: Not affiliated with Heroku, just a fun idea I had*

A way to bring festivities to your Heroku CLI this winter season.
This is an oclif plugin comaptible with the heroku cli.

<!-- toc -->
* [Installation](#installation)
* [Commands](#commands)
<!-- tocstop -->

# Installation

Pre-requisite: The heroku cli must be installed already ([documentation](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)).

Install the heroku-festive plugin from the command-line by running:
```shell
heroku plugins:install heroku-festive
```

To verify that it is installed run `heroku plugins` and it should be included in the list.

# Commands
* [`heroku festive`](#heroku-festive)
* [`heroku firelog`](#heroku-firelog)

## `heroku festive`

make any heroku command more festive by replacing `heroku command` with `heroku festive command`

![Screenshot of heroku festive command](./static/heroku-festive-command.gif)

```
USAGE
  $ heroku festive

EXAMPLE
  $ heroku festive apps
  $ heroku festive apps:info --app my-heroku-app
```

## `heroku firelog`

stay warm this winter

![Screenshot of heroku firelog command](./static/heroku-firelog-command.gif)

```
USAGE
  $ heroku firelog
```
