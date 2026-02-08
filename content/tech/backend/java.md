# Java 开发

## Spring Boot 快速入门

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

## MyBatis-Plus 使用

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

## Spring Security 配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .build();
    }
}
```

---

> 📝 更多 Java 内容持续更新中...
