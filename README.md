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
