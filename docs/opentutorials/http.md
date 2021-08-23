---
tags:
  - opentutorials
  - http
---

# HTTP

<https://opentutorials.org/course/3385>

::: tip Prerequisite
- WEB1 - HTML & Internet
:::

## HTTP란?

HyperText Transfer Protocol

- Hypertext: 책처럼 선형적으로 이루어지지 않은 문서. 하이퍼링크가 달린 문서
- Protocol: 통신 규약

즉, 서버와 클라이언트가 Hypertext를 주고받는 데 쓰이는 통신 규약이라는 뜻

## Request Message

```
GET /index.html HTTP/1.1
Host: https://example.com
Key-1: value-1
...
Key-N: value-N

(필요한 경우 여기에 request body)
```

1. Request Line: HTTP Method, URL, Protocol version
2. Header
	- key, value 쌍으로 구성
	- Host는 필수값
	- 대체로 key값은 단어의 첫 글자를 대문자로, 단어 사이를 하이픈(`-`)으로 연결하는 듯
3. Request Body/Payload
	- 필요하면 넣는 값. AJAX 통신할 때 query나 data가 이리로 들어간다.
	- Header에서 한 칸 띄우고 작성

## Response Message

```
HTTP/1.1 200 OK
Key-1: value-1
...
Key-N: value-N

(필요한 경우 여기에 response body)
```

1. Status Line: Protocol version, Status code, Phrase
2. Header
3. Response Body

## 더 알아보기

- HTTP vs HTTPS
- Cache
- 개인화: Cookie, Web storage
- Proxy(중계 서버)
- 모니터링 툴
	- ex) WireShark
