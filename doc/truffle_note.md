## Truffle 学习笔记

Truffle v5.1.67

### 本地部署MetaCoin项目

1. 本地安装truffle `npm install -g truffle`

2. 创建项目文件夹, 例如 `mkdir MetaCoin`

3. 在MetaCoin文件夹下面, 执行 `truffle unbox metacoin` 创建项目

4. 安装Ganache, 并修改metacoin项目里的truffle-config.js, 放开如下配置
```javascript
development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
}
```

5. 在终端执行 `truffle migrate` 编译并部署项目到Canache的链上

6. 进入到app目录下, 执行`npm run dev`, 然后打开`http://localhost:8080/`

### Q&A

#### DApp里出现`You have loading... META`, 读取不到余额

在加载过程中, index.js中会尝试直接连接MetaMask

```javascript
if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }
```

所以要把MetaMask和Ganache关联上。具体的步骤有[官方文档](https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask), 
但是文档好像不是最新的, 里面让修改web3的监听接口, 和本地实际的代码不一致, 我在没有修改的情况下, 最后也显示余额了.

