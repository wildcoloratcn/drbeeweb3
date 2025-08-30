好的 👍 那我帮你把这个 **DrBEE 项目的 PRD（产品需求文档）** 整理出来，方便你后面写合约和前端的时候直接参考。

---

# 🐝 DrBEE 项目 - 产品需求文档 (PRD)

## 1. 项目简介

DrBEE 是一个基于以太坊测试链（Sepolia）的教学与展示项目，包含一个代币合约（ERC20）、一个水龙头合约（Vault）以及一个 NFT 合约（ERC721）。
核心目标：展示完整的 Web3 应用闭环，包括代币发行、领取、消费与 NFT Mint 权限控制。


用途：ERC20发代币
水龙头：Vault可以每天领代币
功能：NFT有代币可以mint NFT，需要100代币，会被burn掉，通缩系统


== Logs ==
  BEE token deployed at: 0x2011551065B37D6762D7401ebBaa39adc4eED0e7
  Vault deployed at: 0x1c852498880ff2711a62541C4A36AE8dDEC6dfE9
  BeeStaking deployed at: 0x7C12D5a404867F9E265FbB6947aC46592B226451
  NFT contract deployed at: 0xA6C0E968cCF8DB76eEDe84Bf3d62151c999208BD
  Transferred to Vault: 6000000000000000000000000000
  Transferred to Staking: 3000000000000000000000000000
  Deployer keeps: 1000000000000000000000000000
  Minted first NFT to deployer
---

## 2. 系统组件

* **ERC20 - DrBEE Token (BEE)**

  * 符合 OpenZeppelin 的 ERC20 标准
  * 名称：`DrBEE`
  * 符号：`BEE`
  * 总量：`10,000,000,000 (100 亿)`
  * 分配：

    * 部署者（Owner）：`1,000,000,000 (10 亿)`
    * Vault（水龙头）：`9,000,000,000 (90 亿)`

* **Vault（水龙头合约）**

  * 用户每天可领取 **100 BEE**
  * 每个地址有冷却时间（24 小时）
  * BEE 从 Vault 内余额转给用户

* **NFT 合约（ERC721）**

  * 用户必须持有并支付 **10 BEE** 才能 Mint 一个 NFT
  * Mint 消耗的 10 BEE 会 **销毁（burn）**
  * NFT 的元数据使用基础的 URI 模板（如：`https://api.drbee.xyz/metadata/{id}`）

---

## 3. 功能需求

### 3.1 ERC20 DrBEE Token

* [x] 标准 ERC20 功能（转账、授权、余额查询）
* [x] 代币发行与初始分配
* [x] 与 Vault / NFT 合约交互兼容

### 3.2 Vault（水龙头）

* [x] `claim()`：用户调用后领取 100 BEE
* [x] 限制：同一地址 24 小时只能领取一次
* [x] Vault 必须有足够的 BEE 余额，否则领取失败

### 3.3 NFT 合约

* [x] `mint()`：用户支付 10 BEE 即可 Mint
* [x] 支付的 BEE 会 **burn**
* [x] NFT 具有基本元数据（URI 可配置）
* [x] 每个用户可多次 Mint（只要有足够的 BEE）

---

## 4. 非功能需求

* **安全性**

  * 使用 OpenZeppelin 合约库
  * 防止重入攻击
  * 确保 Vault 的冷却逻辑正确（不能绕过）
* **可扩展性**

  * NFT 合约可后续扩展为随机属性 NFT
  * Vault 可扩展为积分系统
* **易用性**

  * 提供前端界面（Next.js + wagmi + rainbowkit）
  * 用户可以一键连接钱包、领取 BEE、Mint NFT

---

## 5. 合约接口（初稿 ABI 设计）

### ERC20 - DrBEE

```solidity
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address from, address to, uint256 amount) external returns (bool);
```

### Vault

```solidity
function claim() external;  // 领取 100 BEE
function lastClaim(address user) external view returns (uint256); // 查询上次领取时间
```

### NFT

```solidity
function mint() external;   // 消耗 10 BEE，Mint 一个 NFT
function tokenURI(uint256 tokenId) external view returns (string memory);
```

---

## 6. 用户流程

1. 用户连接钱包（Sepolia 测试链）
2. 调用 Vault `claim()`，领取 100 BEE
3. 用户调用 NFT `mint()`，消耗 10 BEE，得到 1 个 NFT
4. 用户可以多次操作，形成一个完整的代币经济循环
