---
id: docker-basics
title: Docker Basics
description: Essential Docker commands for container management
category: Tools
tags: docker, containers, devops, virtualization
---

# Docker Basics

## Step 1: Check Docker Version
```bash
docker --version
docker info
```

## Step 2: Run Your First Container
```bash
docker run hello-world
```

## Step 3: List Running Containers
```bash
docker ps
docker ps -a
```

## Step 4: Pull an Image
```bash
docker pull nginx:latest
```

## Step 5: Run Container with Port Mapping
```bash
docker run -d -p 8080:80 nginx:latest
```

## Step 6: Stop and Remove Container
```bash
docker stop container_id
docker rm container_id
```

## Additional Tips
- Use `docker logs container_id` to view container logs
- Use `docker exec -it container_id bash` to access container shell
- Use `docker images` to list all downloaded images
