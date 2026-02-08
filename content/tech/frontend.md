# 前端开发

## React 笔记

### 基础概念

React 是一个用于构建用户界面的 JavaScript 库。

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

### Hooks 使用

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me: {count}
    </button>
  );
}
```

## Vue 笔记

### 组合式 API

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <button @click="count++">{{ count }} x 2 = {{ doubled }}</button>
</template>
```

---

> 💡 这是示例内容，你可以根据自己的学习进度添加更多笔记。
