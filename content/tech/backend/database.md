# 数据库

## MySQL 优化技巧

### 索引优化

```sql
-- 创建复合索引
CREATE INDEX idx_user_status_time 
ON users(status, create_time);

-- 查看执行计划
EXPLAIN SELECT * FROM users 
WHERE status = 1 
ORDER BY create_time DESC;
```

### 慢查询优化

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 1;

-- 查看慢查询日志
SHOW VARIABLES LIKE 'slow_query%';
```

## Redis 常用操作

```bash
# 字符串操作
SET user:1:name "张三"
GET user:1:name

# 哈希操作
HSET user:1 name "张三" age 25
HGETALL user:1

# 列表操作
LPUSH messages "新消息"
LRANGE messages 0 -1

# 设置过期时间
EXPIRE user:1:token 3600
```

## MongoDB 查询

```javascript
// 查找文档
db.users.find({ status: 1 })

// 聚合查询
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { 
      _id: "$userId", 
      total: { $sum: "$amount" } 
  }}
])
```

---

> 📝 更多数据库内容持续更新中...
