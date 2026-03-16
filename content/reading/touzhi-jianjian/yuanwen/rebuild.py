path='D:/Dev_Center/01_Workspace/Personal/vercel-blog/content/reading/touzhi-jianjian/yuanwen/ch4.md'
with open(path,'r',encoding='utf-8') as f:
    content = f.read()
sec4_start = content.find('## \u7b2c\u56db\u8282')
sec5_start = content.find('---\n\n## \u7b2c\u4e94\u8282')
before = content[:sec4_start]
after = content[sec5_start:]
print(len(before), len(after))
