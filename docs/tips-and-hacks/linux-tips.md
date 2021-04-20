---
tags:
  - linux
---

# Linux 미세 팁 모음

## 랜덤하게 아무거나 뽑아내기

```sh
cat sample.txt | sort -R | head -n 1
```

## SSH Config

`~/.ssh/config` 파일에 호스트명, 유저명 등을 입력해서 alias할 수 있다.

```
Host my-host
    HostName example.com
    User username
```

예를 들어 위 설정값은 `ssh my-host`를 `ssh username@example.com`로 alias해준다. 와일드카드도 사용 가능하니 적잘한 값을 입력해 사용해 보자.

## cp949 인코딩 적용된 압축파일 풀기

```sh
unzip -0 cp949 sample.zip
```
