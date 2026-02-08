# 运维部署

## Docker

### 常用命令

```bash
# 构建镜像
docker build -t myapp:latest .

# 运行容器
docker run -d -p 8080:8080 --name myapp myapp:latest

# 查看日志
docker logs -f myapp

# 进入容器
docker exec -it myapp /bin/sh
```

### Dockerfile 示例

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

---

> 💡 运维相关笔记持续更新中...
