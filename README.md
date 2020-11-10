# umi-antd-pro

### umijs + ant-design-pro

## 支持

- 支持热更新
- 支持 umi-ui 自动添加组件
- ant-design-pro@^4.x

## 项目结构

<img src="internals/img/web.png" width="100%" />

```ssh
.
|-- config
|   `-- config.js                         # umijs配置
|-- dist                                  # 项目编译输出目录
|-- mock                                  # 本地模拟数据
|-- public                                # 静态资源目录
|-- src                                   # 开发目录
│   |-- assets                            # 本地静态资源
│   |-- components                        # 业务通用组件
│   |-- e2e                               # 集成测试用例
│   |-- layouts                           # 通用布局
│   |-- models                            # 全局 dva model
│   |-- pages                             # 业务页面入口和常用模板
│   |-- services                          # 后台接口服务
│   |-- utils                             # 工具库
│   |-- locales                           # 国际化资源
│   |-- global.less                       # 全局样式
│   `-- global.ts                         # 全局 JS
|-- tests                                 # 测试工具
|-- package.json                          # 项目依赖以及打包配置
`-- README.md                             # 项目说明文档
```

## 环境搭建

### 安装

然后通过 yarn 下载依赖

```javascript
  $ yarn
```

### 开发

首先通过以下命令启动渲染进程(默认端口：8000)

```javascript
  // 插入区块异常时，尝试 BABEL_CACHE=none yarn start
  $ yarn start
```

## Git 规范

使用 [commitlint](https://github.com/conventional-changelog/commitlint) 工具，常用有以下几种类型：

- feat ：新功能
- fix ：修复 bug
- chore ：对构建或者辅助工具的更改
- refactor ：既不是修复 bug 也不是添加新功能的代码更改
- style ：不影响代码含义的更改 (例如空格、格式化、少了分号)
- docs ：只是文档的更改
- perf ：提高性能的代码更改
- revert ：撤回提交
- test ：添加或修正测试

举例 git commit -m 'feat: add list'

---
