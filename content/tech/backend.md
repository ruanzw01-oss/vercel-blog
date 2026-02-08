# 后端开发

## Java

### Spring Boot 快速入门

```java
@RestController
@RequestMapping("/api")
public class HelloController {
    
    @GetMapping("/hello")
    public String hello(@RequestParam String name) {
        return "Hello, " + name + "!";
    }
}
```

### MyBatis-Plus 使用

```java
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> 
    implements IUserService {
    
    public List<User> getActiveUsers() {
        return lambdaQuery()
            .eq(User::getStatus, 1)
            .orderByDesc(User::getCreateTime)
            .list();
    }
}
```

## Python

### FastAPI 示例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

---

> 💡 后端开发笔记持续更新中...
