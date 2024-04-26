# minify-web

Compress all html, js, and css files in the entire folder, and output other files to the specified directory without processing

## Language

[中文](./README.zh-CN.md)

## Installation

```sh
npm install minify-web -g
# or
yarn global add minify-web
```

## Usage

> The src directory is compressed by default, and directory dist is entered

```sh
minify-web
```

## Options

### -D, --dir <Folder>

Package directory

### -O, --out <Folder>

Output directory

### -H, --help

Show help

## Example

the src directory is compressed and placed in the dist directory
```sh
minify-web
```

the app directory is compressed and placed in the out directory

```sh
minify-web -D app -O out
```

## Used in the project

1. Create the `package.json` file in the project root directory and add the following
```json
{
  // ...
  "scripts": {
    "minify": "minify-web"
  }
  // ...
}
```

2. run `npm run minify` in the project root