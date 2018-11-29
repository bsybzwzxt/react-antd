使用说明

1. 安装node.js (下载地址: https://nodejs.org/en/)
2. npm切换到淘宝源 (淘宝镜像地址: https://npm.taobao.org/)
   npm config set registry https://registry.npm.taobao.org
   (可选安装cnpm)
   npm install -g cnpm --registry=https://registry.npm.taobao.org
3. 安装依赖包
   npm install
4. 两种模式
    npm run development 开发模式
    npm run production 生产模式，打包成静态文件


开发说明

整体项目结构分为框架文件和项目文件
为了避免多人开发时代码的冗余，项目结构的混乱，要保证代码的可维护性
开发人员不要随意加载第三方包，不要修改框架文件和全局文件，调用文件时以按需的形式加载
框架文件和全局文件是提供使用的，使用时有问题可以提，会逐步完善


src目录说明

components
全局组件，开发人员不要修改全局组件

css
分为framework和project
framework为框架样式，project为项目样式，开发人员修改项目样式

directive
全局自定义指令，开发人员不要修改全局自定义指令

images
图片文件夹

javascript
分为framework和project
framework为框架js，project为项目js，开发人员修改项目js

router
index.js为路由主入口
main文件夹是一种主要的排版，所有的布局文件都放在router文件里，不代表组件或者页面


App.vue和main.js为项目主入口开发人员不要修改

package.json 避免或减少引入第三方包，有需求可以提

webpack.config.js 不要修改webpack配置

webpack.options.js 本地服务的配置文件，需自行修改

没提到的的文件夹暂时不用管


命名规范

文件夹的命名 >>> 全部小写

js文件，函数，变量 >>> 小驼峰

vue文件，类名，包名，模块 >>> 大驼峰

css，html标签 >>> 中杠分隔


框架文件详细说明




git代码管理
master为生产环境主分支
test-environment为测试环境分支
所有开发统一由test-environment拉取代码，然后建立自己的分支
功能自测完成后提交到自己分支即可，发布版本时联系我，review过后统一合并到test-environment分支
