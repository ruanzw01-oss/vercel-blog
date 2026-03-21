---
title: OAuth2 授权流程详解
description: 从原理到实战，完整讲解 OAuth2 授权码模式，附 GitHub 登录具体示例
---

# OAuth2 授权流程详解

OAuth2 是目前最主流的**第三方授权框架**，几乎所有「用 GitHub / Google / 微信登录」的功能背后都是它。本文从核心概念讲起，完整走一遍授权码模式的流程，最后用 GitHub 登录的真实例子落地说明。

## 为什么需要 OAuth2？

假设某应用想读取你的 GitHub 仓库列表。最原始的做法是让你直接把 GitHub 账号密码交给它——显然不可接受：密码一旦泄漏，账号彻底失控，而且你没法限制它只能读仓库、不能删仓库。

OAuth2 解决的就是这个问题：**让用户在不暴露密码的前提下，向第三方应用授予有限的访问权限。**

---

## 核心角色

| 角色 | 英文术语 | 说明 |
|------|---------|------|
| **资源拥有者** | Resource Owner | 用户本人，拥有被访问的数据 |
| **客户端** | Client | 想获取用户数据的第三方应用 |
| **授权服务器** | Authorization Server | 验证用户身份、颁发令牌（如 GitHub 的 OAuth 服务） |
| **资源服务器** | Resource Server | 存放用户数据的 API（如 GitHub API） |

> 在 GitHub 场景中，授权服务器和资源服务器都是 GitHub，只是职责不同。

---

## 四种授权模式

| 模式 | 适用场景 |
|------|----------|
| **授权码模式**（Authorization Code） | 有服务端的 Web 应用，最安全，最常用 |
| 隐式模式（Implicit） | 纯前端 SPA，已逐渐被 PKCE 替代 |
| 客户端凭证（Client Credentials） | 服务间调用，无用户参与 |
| 密码模式（Resource Owner Password） | 高度信任的场景，不推荐 |

本文重点讲**授权码模式**，这也是日常「第三方登录」的标准实现。

---

## 授权码模式完整流程

### 流程总览

```
用户浏览器        客户端应用（服务端）        授权服务器           资源服务器
    |                    |                      |                     |
    |--- 点击「第三方登录」-->|                      |                     |
    |                    |-- 构造授权 URL，重定向 ->|                     |
    |<-------- 显示授权/登录页面 --------------------------------         |
    |                    |                      |                     |
    |--- 输入账密，点击「授权」 ---------------------->|                     |
    |                    |                      |                     |
    |<------- 带 code 重定向回客户端 --------------|                     |
    |                    |                      |                     |
    |         code 传给服务端                      |                     |
    |                    |-- POST: code + secret ->|                     |
    |                    |<-- 返回 access_token --|                     |
    |                    |                      |                     |
    |                    |-- GET /user (Bearer token) ----------------->|
    |                    |<-- 返回用户数据 --------------------------------|
    |                    |                      |                     |
    |<-- 登录成功，建立 Session --|               |                     |
```

---

### Step 1：构造授权 URL，引导用户跳转

用户点击登录按钮后，客户端将用户**重定向**到授权服务器的授权页面：

```
https://auth-server.com/oauth/authorize
  ?response_type=code          # 固定值，表示使用授权码模式
  &client_id=YOUR_CLIENT_ID    # 应用注册时获得的 ID
  &redirect_uri=https://your-app.com/callback  # 授权后回调地址
  &scope=read:user email       # 申请的权限范围
  &state=RANDOM_STRING         # 防 CSRF 的随机值
```

**关键参数说明：**

- `client_id`：应用在授权服务器注册时分配，公开可见
- `scope`：精确声明需要哪些权限，用户会在授权页看到这些权限列表
- `state`：客户端随机生成，授权完成后原样返回，用于校验，防止跨站请求伪造

---

### Step 2：用户登录并同意授权

用户在授权服务器的页面上完成登录（若已登录则跳过），并点击「允许授权」。

授权服务器随即将用户**重定向回** `redirect_uri`，并附上授权码：

```
https://your-app.com/callback?code=AUTH_CODE_HERE&state=RANDOM_STRING
```

> `code` 是一次性的短期凭证，有效期通常只有几分钟，且只能使用一次。

---

### Step 3：服务端用 code 换取 access_token

这一步**必须在服务端完成**，不能在浏览器端执行。客户端服务端向授权服务器发起 POST 请求：

```http
POST https://auth-server.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE_HERE
&redirect_uri=https://your-app.com/callback
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

授权服务器验证通过后，返回令牌：

```json
{
  "access_token": "gho_xxxxxxxxxxxxxxxxxxxx",
  "token_type": "bearer",
  "scope": "read:user,email",
  "expires_in": 28800
}
```

> `client_secret` 是应用的私钥，**只能存在服务端**，绝不能暴露给浏览器或客户端代码。

---

### Step 4：用 access_token 请求用户数据

拿到令牌后，客户端向资源服务器请求所需数据：

```http
GET https://api.auth-server.com/user
Authorization: Bearer gho_xxxxxxxxxxxxxxxxxxxx
Accept: application/json
```

资源服务器验证令牌有效后，返回用户信息：

```json
{
  "id": 123456,
  "login": "username",
  "email": "user@example.com",
  "name": "张三",
  "avatar_url": "https://avatars.githubusercontent.com/u/123456"
}
```

---

### Step 5：完成登录

客户端拿到用户信息后：

1. 在数据库中查找该用户（通过第三方 `id` 匹配）
2. 若不存在，自动注册创建新用户
3. 建立登录态（签发 Session 或 JWT）
4. 将登录态写入 Cookie，返回给浏览器

用户登录完成。

---

## GitHub 登录实战示例

### 准备工作：注册 GitHub OAuth App

1. 进入 GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. 填写应用信息：
   - **Application name**：你的应用名
   - **Homepage URL**：`https://your-app.com`
   - **Authorization callback URL**：`https://your-app.com/auth/github/callback`
3. 提交后获得 `Client ID` 和 `Client Secret`

---

### Step 1：跳转 GitHub 授权页

用户点击「用 GitHub 登录」，后端重定向到：

```
https://github.com/login/oauth/authorize
  ?client_id=Ov23liABCDEFGHIJ
  &redirect_uri=https://your-app.com/auth/github/callback
  &scope=read:user user:email
  &state=csrf_token_abc123
```

用户会看到 GitHub 的授权确认页，显示应用名称及申请的权限。

---

### Step 2：GitHub 回调，带回 code

用户点击「Authorize」后，GitHub 重定向到：

```
https://your-app.com/auth/github/callback
  ?code=a1b2c3d4e5f6
  &state=csrf_token_abc123
```

服务端首先校验 `state` 是否与 Step 1 发出的一致，防止 CSRF。

---

### Step 3：用 code 换 token

服务端发起请求：

```http
POST https://github.com/login/oauth/access_token
Accept: application/json
Content-Type: application/x-www-form-urlencoded

client_id=Ov23liABCDEFGHIJ
&client_secret=your_client_secret_here
&code=a1b2c3d4e5f6
```

GitHub 返回：

```json
{
  "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope": "read:user,user:email",
  "token_type": "bearer"
}
```

---

### Step 4：获取用户信息

```http
GET https://api.github.com/user
Authorization: Bearer gho_16C7e42F292c6912E7710c838347Ae178B4a
User-Agent: your-app-name
```

返回：

```json
{
  "id": 7890123,
  "login": "octocat",
  "name": "The Octocat",
  "email": null,
  "avatar_url": "https://github.com/images/error/octocat_happy.gif"
}
```

> GitHub 的 email 字段可能为 `null`（用户设置了邮箱隐私）。需要额外请求 `GET /user/emails` 获取邮箱列表。

---

### Step 5：完成登录

```python
# 伪代码示例
user = db.find_by_github_id(github_id=7890123)

if not user:
    user = db.create_user(
        github_id=7890123,
        username="octocat",
        email="octocat@github.com",
        avatar=avatar_url
    )

session["user_id"] = user.id
return redirect("/dashboard")
```

---

## 安全要点清单

| 要点 | 原因 |
|------|------|
| `client_secret` 只存服务端 | 浏览器可见则等同泄漏，攻击者可伪造任意 token 请求 |
| 校验 `state` 参数 | 防止 CSRF 攻击，让攻击者无法伪造授权回调 |
| `code` 只能用一次 | 授权码如被截获，也因已消费而无效 |
| 严格匹配 `redirect_uri` | 防止授权码被重定向到攻击者控制的地址 |
| Token 存 httpOnly Cookie | 防止 XSS 脚本读取 Token，不要存 localStorage |
| 最小化 `scope` | 只申请必要权限，降低 Token 泄漏的危害范围 |
| Token 设置过期时间 | 配合 refresh_token 机制，减少长期有效 Token 的风险 |

---

## 常见疑问

**Q：为什么要多一步 code，不直接返回 token？**

`code` 通过 URL 传递，会被浏览器历史、服务器日志记录。而 token 的交换发生在服务端之间的 HTTPS 请求中，不经过浏览器，更安全。`code` 短暂有效且一次性使用，即使被截获也难以利用。

**Q：access_token 过期了怎么办？**

完整的 OAuth2 实现会同时颁发 `refresh_token`。当 `access_token` 过期后，用 `refresh_token` 静默换取新的 `access_token`，无需用户重新授权。GitHub 的 OAuth App 默认不过期，GitHub App 则有过期机制。

**Q：纯前端应用（SPA）怎么用 OAuth2？**

没有服务端就无法安全保存 `client_secret`，推荐使用带 **PKCE**（Proof Key for Code Exchange）的授权码模式。PKCE 用动态生成的 `code_verifier` / `code_challenge` 替代 `client_secret`，实现纯前端的安全授权。

**Q：OAuth2 是认证（Authentication）还是授权（Authorization）？**

OAuth2 本质是**授权**框架，解决的是「能不能访问」的问题，不定义用户身份。**OpenID Connect（OIDC）** 是在 OAuth2 之上构建的认证层，通过额外的 `id_token`（JWT 格式）传递用户身份信息，「用第三方登录」严格来说走的是 OIDC。

---

## 总结

OAuth2 授权码模式的核心是一次「三方握手」：

1. 客户端把用户送到授权服务器，拿回一个**一次性 code**
2. 服务端用 code + secret 换取 **access_token**（这步在后端，浏览器不可见）
3. 用 token 向资源服务器换取**用户数据**

整个设计的精妙之处在于：密码从不经过客户端，token 的核心交换不经过浏览器，`code` 短暂有效且一次性，每一层都有独立的安全保障。