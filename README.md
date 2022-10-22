
<div align="center">
	<br />
	<p>
		<a href="https://www.npmjs.com/package/files.env"><img src="https://i.imgur.com/3aXCnDp.png" width="546" alt="files.env" /></a>
	</p>
	<p>
		<a  href="https://www.npmjs.com/package/files.env><img src="https://img.shields.io/npm/dt/files.env?color=770077&style=for-the-badge"  alt="NPM Downloads"  /></a>
		<a  href="https://www.npmjs.com/package/files.env"><img  src="https://img.shields.io/npm/v/files.env?color=2F0148&style=for-the-badge"  alt="npm Version" /></a>
		<a href="https://www.npmjs.com/package/files.env"><img src="https://img.shields.io/npm/types/files.env?style=for-the-badge" alt="Types" /></a>
	</p>
	<p>
		<img src="https://i.imgur.com/e4PtZV6.png" width="212" height="44" alt="Powered by Enormous"/>
	</p>
</div>

## About
Modern package for managing environment variables Files with extension ".env", zero-dependency in the package and easily you can access data in [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env) and you can modify and read the data for more details you can read below the method of registering and deleting variables

## Table of Contents
-   [Features](#features)
-   [Installing](#installing)
- [Documentation](#documentation)
-   [Usage](#usage)
	- [Configuration](#configuration)
	- [Preload](#preload)
-   [Example](#example)
    - [Example of class FileEnv](#example-of-class-fileenv)
    - [Parse and stringify](#parse-and-stringify)
- [File structure](#file-structure)
- [Do you have a problem or question?](#help)
## Features
- It allows you to read and write `.env` files easily and quickly!
- It does not affect the system values in [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env) but you can turn it off if you want but by default it is enabled
- You can use the package with just a command, without the need to import, which makes the situation easier for you! But you can also import `node -r files.env/config index.js`
- Supports writing comments in the file by placing # before the comment line
- Zero-dependency in the package
- Allows you to write in the form of an object or add a variable and delete a variable

## Installing
Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):
```sh
npm install files.env
yarn add files.env
pnpm add files.env
```
## Usage
- The first step is to create an .env file and put your data in it or use the package to put the data
### Configuration
#### [CommonJS](https://en.wikipedia.org/wiki/CommonJS)
```js
require("files.env").config()
process.env //FileEnv class will be returned to you
```
#### [ES Module support](https://nodejs.org/api/esm.html#import-specifiers)
```js
import { config} from 'files.env';
config()
process.env//FileEnv class will be returned to you
```
#### [TypeScript Support](https://www.typescriptlang.org/)
```js
import { FileEnv } from 'files.env';
const env = new FileEnv()
env//FileEnv class will be returned to you
```
`⚠️ Note` in the event that you were a [TypeScript](https://www.typescriptlang.org/) Why shouldn't you use the config function and instead use the class??
You must know that [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env) has an interface and this interface we cannot modify, so you cannot make the methods available through [process.env](https://nodejs.org/docs/latest/api/process.html#process_process_env) so if you do a config only you will be able to read so you must use the `FileEnv` class so that you can read and write

### Preload
- If you do this, you do not need to write a callback, the package will be called in advance
```sh
$ node -r files.env/config index.js
```

## Example
### Example of class FileEnv
```js
// Read variable from file
process.env.set("name","Mohamed Abdelkarim")//Add a variable in the env . file

//Read variables in the file
console.log(process.env.name)// return "Mohamed Abdelkarim"
//or console.log(process.env.get("name"))

//Delete variable from file
process.env.delete("name")

//Check if a variable exists in the file
console.log(process.env.has("name")) 

//To write an object to the file
process.env.writeFile({token:"11",prefix:"#"})

//Delete all variables from the file
process.env.clear()

//Delete and destroy the file
process.env.destroy()

//If you have modified the file and it is running, you can make the package re-read the variables in the file through this method 
process.env.reloadVariables()//Only in the event that you have modified the file and not from methods or if you want to re-make the package to re-read the file!
```
### Parse and stringify
```js
import { parse, stringify } from 'files.env';
console.log(parse('name="Mohamed"')) // return {"name":"Mohamed"}

console.log(stringify({name:"Mohamed"})) // return name="Mohamed"
```

## File structure
- Structure example
```dosini
# Registration information
Name="Mohamed Abdelkarim"
UUID="3cae8d3c-5219-11ed-bdc3-0242ac120002"

# API 
Token="12"# your token!
```
## Documentation
You can see the [Documentation](https://files-env.netlify.app/) of the st.db package to know all the details

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [Discord Server](https://dsc.gg/shuruhatik) .
