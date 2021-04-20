---
tags:
  - git
---

# Git 미세 팁 모음

## 특정 브랜치의 js 파일 변경분만 비교하기

```sh
git diff --name-only feature/XXX..develop '**/*.js'
```

## 여러 개의 커밋 메시지를 한 번에 수정하기

```sh
git filter-branch --msg-filter 'sed -e s/tast/test/g' HEAD~40..HEAD
```

HEAD부터 순서대로 40개의 커밋 메시지에서 `tast`를 `test`로 변경한다.
