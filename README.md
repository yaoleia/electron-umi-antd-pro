# umi-electron-javascript

### 一个基于umijs + electron + javascript的模板

## 主要特性
- 支持整个应用的热重载

## 安装


然后通过yarn下载依赖

```javascript
  $ yarn
```

## 开发

首先通过以下命令启动渲染进程(默认端口：8000)

```javascript
  $ yarn start:renderer
```

然后启动主进程

```javascript
  $ yarn start:main
```

## 打包

```javascript
  $ npm run pack
```

如果想把代码打包成一个dmg文件或者zip文件，可以执行以下命令

```javascript
  $ npm run dist
```

## 配置

### 1. 打包配置说明 

[electron-builder-参数参考](https://www.electron.build/configuration/configuration) 

[category-Mac分类参考](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)

```json
{
  ...
  "build": {
    "productName": "LittleStrong",// 程序名称
    "files": [ // 需要打包的文件
      "dist/",
      "node_modules/",
      "package.json"
    ],
    "mac": { // 打包mac版本
      "category": "your.app.category.type", // mac app分类 
      "target": [ // 打包类型
        "dmg",
        "zip"
      ]
    },
    "win": { // 打包windows版本
      "target": [ // 打包类型
        "nsis"
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    },
    "directories": { // 打包后输出目录
      "output": "release"
    },
    "appId": "com.cn.littlestrong.demo", // appstore包名
    "asar": false //  是否加密处理
  },
}
```