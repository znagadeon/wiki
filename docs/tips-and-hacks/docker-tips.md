---
tags:
  - docker
---

# Docker 미세 팁 모음

## Windows-Docker 간 볼륨 연결

```sh
docker run -it --name {컨테이너 이름} -v "{내 컴퓨터 경로}:{마운트할 경로}" {이미지 이름}
# Windows의 경우 /c/Users/로 시작
```

## Docker 이미지를 불러올 수 없을 때

1. `Docker -> Settings -> Network`로 이동
2. DNS Server를 8.8.8.8로 변경

- [출처](https://github.com/docker/for-win/issues/611)

<PageTags />
