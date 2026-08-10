# @waline-plugins/easy-storage

这是一个 Waline 的插件，用于利用 Waline 的存储能力，提供一个简单的 JSON 存储与输出接口，方便扩展到其他简单服务中。

## 功能特点

- 提供简洁的 key/value 存储能力
- 支持通过 HTTP 接口读取和写入配置或数据
- 可用于将 Waline 的存储能力扩展到其他简单服务或轻量场景

## 安装

与其他 Waline 插件的安装方式类似，先安装插件包，然后在 Waline 配置中注册该插件：

```bash
npm install @waline/plugin-easy-storage
# 或者
pnpm add @waline/plugin-easy-storage
```

安装完成后，在 Waline 的配置中按与其他插件相同的方式注册该插件，例如：

```js
import easyStorage from '@waline/plugin-easy-storage';

export default {
  plugins: [easyStorage()],
};
```

## 使用前准备

如果你使用的是 MySQL、PostgreSQL、SQLite 等数据库存储服务，需要先自行创建一张新的表来保存数据。下面给出 PostgreSQL 的建表语句示例：

```sql
CREATE TABLE "wl_config" (
    "id" integer GENERATED ALWAYS AS IDENTITY,
    "key" text,
    "value" text,
    PRIMARY KEY ("id")
);
```

## 接口说明

该插件新增了两个接口：

### GET /api/plugin/easy-storage

用于读取指定 key 对应的存储内容。

参数：

- `key`: string，待查询的键名

示例：

```bash
curl "http://localhost:8360/api/plugin/easy-storage?key=demo"
```

### POST /api/plugin/easy-storage

用于写入或更新指定 key 对应的值。

参数：

- `key`: string，待写入的键名
- `value`: string，待写入的值

说明：

- 该接口会校验管理员登录状态
- 只有管理员可以执行写入操作

示例：

```bash
curl -X POST "http://localhost:8360/api/plugin/easy-storage" \
  -H "Content-Type: application/json" \
  -d '{"key":"demo","value":"{\"a\": 1}"}'
```

## 说明

这个插件主要面向需要将 Waline 的存储能力快速暴露为简单接口的场景，适合与其他简单服务或前端页面进行集成。
