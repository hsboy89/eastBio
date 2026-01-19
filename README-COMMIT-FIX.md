# 커밋 메시지 수정 가이드

깨진 커밋 메시지를 수정하려면 다음 단계를 따르세요:

## 방법 1: Git Rebase 사용 (권장)

1. `git rebase -i --root` 실행
2. 각 커밋에 대해 `pick`을 `reword`로 변경
3. 각 커밋 메시지를 올바른 한글로 수정

## 방법 2: 각 커밋 개별 수정

각 커밋 해시에 대해:
```bash
git rebase -i <commit-hash>^
# 또는
git commit --amend -m "올바른 메시지"
```

## 수정할 커밋 목록

- 896cbcd: Replace: LightRays를 Prism으로 변경
- 049a947: Config: Git 인코딩 설정 및 .gitattributes 추가
- a1da7cc: Remove: 사용하지 않는 Galaxy 컴포넌트 삭제
- e307e58: Merge: LightRays 컴포넌트로 변경 충돌
- d3efd75: Merge: LightRays 컴포넌트 변경 충돌 해결
- 58d29b3: Fix: .gitignore에 .vite 추가
- 7a89169: Replace: Galaxy를 LightRays로 변경 - 성능 최적화 및 버그 수정
- 1e218c6: Initial commit: 이스트 바이오 공식 웹사이트 구축
- d1bf820: Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가
- dbb4678: Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가
- 896c82d: Fix: TypeScript 오류 및 deprecated 패키지 제거 - 빌드 속도를 위해 tsc 검사 제거, @studio-freight/lenis 제거
- c8f58f8: Fix: TypeScript JSX 설정 추가 및 Lenis smoothTouch 옵션 제거
- c492aef: Fix: Vercel 빌드 설정 수정
- 22fe5fd: Add: Vercel 빌드 설정 파일 추가
- 4aba7e9: Fix: Vercel 오류를 해결한 설정 추가 (.npmrc 및 overrides 추가)
- 7dd9a84: Initial commit: 이스트 바이오 공식 웹사이트 구축

## 주의사항

- 이미 push된 커밋을 수정하면 `git push --force`가 필요합니다
- 다른 사람과 협업 중이라면 force push 전에 반드시 협의하세요

