# 1. 选择一个基础镜像
FROM node:22-alpine
# 2. 在容器内创建一个工作目录
WORKDIR /app
# 3. 拷贝依赖描述文件
COPY package*.json ./
# 4. 安装应用依赖
RUN npm install
# 5. 拷贝所有源代码
COPY . .
# 6. 声明服务端口
EXPOSE 3000
# 7. 定义容器启动时执行的命令
CMD [ "node", "index.js" ]