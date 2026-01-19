# 모든 깨진 커밋 메시지 수정 스크립트
$commits = @(
    @{hash="896cbcd"; msg="Replace: LightRays를 Prism으로 변경"},
    @{hash="049a947"; msg="Config: Git 인코딩 설정 및 .gitattributes 추가"},
    @{hash="a1da7cc"; msg="Remove: 사용하지 않는 Galaxy 컴포넌트 삭제"},
    @{hash="e307e58"; msg="Merge: LightRays 컴포넌트로 변경 충돌"},
    @{hash="d3efd75"; msg="Merge: LightRays 컴포넌트 변경 충돌 해결"},
    @{hash="58d29b3"; msg="Fix: .gitignore에 .vite 추가"},
    @{hash="7a89169"; msg="Replace: Galaxy를 LightRays로 변경 - 성능 최적화 및 버그 수정"},
    @{hash="1e218c6"; msg="Initial commit: 이스트 바이오 공식 웹사이트 구축"},
    @{hash="d1bf820"; msg="Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"},
    @{hash="dbb4678"; msg="Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"},
    @{hash="896c82d"; msg="Fix: TypeScript 오류 및 deprecated 패키지 제거 - 빌드 속도를 위해 tsc 검사 제거, @studio-freight/lenis 제거"},
    @{hash="c8f58f8"; msg="Fix: TypeScript JSX 설정 추가 및 Lenis smoothTouch 옵션 제거"},
    @{hash="c492aef"; msg="Fix: Vercel 빌드 설정 수정"},
    @{hash="22fe5fd"; msg="Add: Vercel 빌드 설정 파일 추가"},
    @{hash="4aba7e9"; msg="Fix: Vercel 오류를 해결한 설정 추가 (.npmrc 및 overrides 추가)"},
    @{hash="7dd9a84"; msg="Initial commit: 이스트 바이오 공식 웹사이트 구축"}
)

Write-Host "총 $($commits.Count)개의 커밋 메시지를 수정합니다."

