<p align="center"><img src="docs/logo.png" width="300"></p>
# colorpath
[![Build Status](https://travis-ci.org/Leopoldthecoder/colorpath.svg?branch=master)](https://travis-ci.org/Leopoldthecoder/colorpath)
[![Coverage Status](https://coveralls.io/repos/github/Leopoldthecoder/colorpath/badge.svg?branch=master)](https://coveralls.io/github/Leopoldthecoder/colorpath?branch=master)
[![npm](https://img.shields.io/npm/v/colorpath.svg)](https://www.npmjs.org/package/colorpath)
> There's a path for everyone, and my path always leads me back to you

## 安装

```shell
npm install colorpath
```

## 使用

colorpath 支持以下三个函数的运算和逆运算：
- tint
- shade
- mix

引入 colorpath：
```javascript
import clp from 'colorpath'
```

接下来就可以使用以下 API（参数中的 `sourceColor`、`destinationColor` 和 `mixer` 均支持十六进制和 RGB 两种表示法）：
- tint(sourceColor, percentage)
```javascript
clp.tint('#ff08d5', 0.4) //[255, 107, 230]
```

- findTint(sourceColor, destinationColor)
```javascript
clp.findTint('#ff08d5', '#ff6be6') //0.4028
```

- shade(sourceColor, percentage)
```javascript
clp.shade('#ffc8d5', 0.4) //[153, 120, 128]
```

- findShade(sourceColor, destinationColor)
```javascript
clp.findShade('#ffc8d5', '#997880') //0.3997
```

- mix(sourceColor, mixer, percentage)
```javascript
clp.mix('#ffc8d5', 'd3985a', 0.4) //[229, 171, 139]
```

- findMixer(sourceColor, destinationColor)
```javascript
clp.findMixer('#ffc8d5', '#e5ab8b') //{ mixer: [ 180, 117, 0 ], percentage: 0.6526 }
```

- findPath(sourceColor, destinationColor)
```javascript
clp.findPath('#ff08d5', '#ff6be6') //{ method: 'tint', percentage: 0.4028 }
clp.findPath('#ffc8d5', '#997880') //{ method: 'shade', percentage: 0.3997 }
clp.findPath('#ffc8d5', '#e5ab8b') //{ method: 'mix', mixer: [ 180, 117, 0 ], percentage: 0.6526 }
```

> 注意：若 `findTint` 或 `findShade` 无解，则会抛出一个错误；而 `findPath` 会先尝试调用 `findTint` 和 `findShade`，若发现无解会调用 `findMixer`。因此，如果不确定两种颜色之间是否存在 tint 或 shade 的关系，建议直接使用 `findPath`。

## 命令行工具

### 安装

```shell
npm install -g colorpath
```

### 使用

```shell
$ clp <arguments> <method>
```

其中 `arguments` 为调用参数，`method` 为调用方法。上述例子中的 `clp.findPath('#ffc8d5', '#e5ab8b')` 对应的命令行调用为：
```shell
$ clp ffc8d5 e5ab8b --find-path
```
