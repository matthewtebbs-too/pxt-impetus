# Impetus MakeCode Editor

This repo contains a code editor called 'Impetus' built with [Microsoft MakeCode (PXT)](https://github.com/Microsoft/pxt).

The editor is hosted on the GitHub pages [here](http://muddytummy.github.io/pxt-impetus/).

## Running locally

These instructions allow to run locally to modify the sample.

### Setup

The following commands are a one-time setup after synching the repo on your machine.

- Install [node.js](https://nodejs.org/en/)
- Install the PXT command line

```shell
npm install -g pxt
```
* install the dependencies
```
npm install
```

### Running the local server

After you're done, simple run this command to open a local web server.

```shell
pxt serve
```

After making a change in the source, refresh the page in the browser.

## Updating the tools

If you would like to pick up the latest PXT build.

```shell
pxt update
```

More instructions [here](https://github.com/Microsoft/pxt#running-a-target-from-localhost).

## Latest Release Notes

_No formal releses yet._

## Open Source Software Usage and Licenses

- Impetus renders using WebGL via the [three.js](https://threejs.org) JavaScript library.
- Physics is simulated via the [Ammo.js](https://github.com/kripken/ammo.js/) Emscripten port of Bullet Physics .
- The Blockly interface and Monaco Strict TypeScript coding environment is provided by the [Microsoft MakeCode (PXT - Programming eXperience Toolkit)](https://github.com/Microsoft/pxt).

Please refer to this project's LICENSE and THIRD_PARTY_LICENSES files for more details.

## Examples

All examples are Impetus ports of the very excellent three.js examples written by various authors originally hosted [here](https://threejs.org/examples/).