# minify-web

压缩整个文件夹中所有的html、js和css文件，其余文件不做任何处理，直接输出到指定目录

## 语言

[English](./README.md)

## 安装

```sh
npm install minify-web -g
# 或者
yarn global add minify-web
```

## 使用

> 默认压缩src目录，输入目录dist

```sh
minify-web
```

## 参数选项

### -D, --dir <Folder>

需要打包压缩的文件夹

### -O, --out <Folder>

输入目录

### -H, --help

显示帮助

## 示例

打包压缩`src`目录到`dist`目录
```sh
minify-web
```

打包压缩`app`目录到`out`目录
```sh
minify-web -D app -O out
```

## 在项目中使用

1. 在项目根目录下创建`package.json`文件，并添加以下内容
```json
{
  // ...
  "scripts": {
    "minify": "minify-web"
  }
  // ...
}
```

2. 在项目根目录下执行`npm run minify`