## 简介

[HyunLowCode] (基于 [Vue3.0](https://github.com/vuejs/vue-next)、[Vite](https://github.com/vitejs/vite)、 [Naive UI](https://www.naiveui.com/)、[TypeScript](https://www.typescriptlang.org/) 
的低代码平台.

## 使用

- 获取项目代码

```bash
git clone http://bitbucket.ghcchina.cn/projects/MFS/repos/mfs-web/browse
```

- 安装依赖

```bash
cd mfs-web

npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build
```

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE


## 发布

```bash
# 构建生产环境
npm run build:prod
```

## 项目规范

### （一）. 关于项目基本规范

基本规范已在Eslint，Prettier中控制，不推荐使用VSCode自行配置的格式化文件。 建议使用Webstorm并开启`Run eslint --fix on save`设置。

### (二). 编程规范

[基于凹凸实验室规范](https://guide.aotu.io/docs/)


## Git提交规范

### 作用
+ release：线上分支
+ master：测试分支
+ develop： 开发分支
+ develop-TK：（dev-tk编号） 版本/需求开发分支
+ hotfix-develop（hotfix-版本号）hotfix分支

## Git Commit规范指定
+ feat：新增feature
+ fix：修复bug
+ docs：仅仅修改了文档，比如README、gitignore 等等
+ style：仅仅修改了空格、格式缩进、逗号、规范等等，不改变代码逻辑
+ refactor：代码重构，没有加新功能或者修复BUG
+ perf：优化相关，比如提升性能、体验
+ test：测试用例，包括单元测试、集成测试

> JetBrains全家桶软件 ( Webstorm, Idea ...） ，推荐使用 Git Commit Message Helper插件
