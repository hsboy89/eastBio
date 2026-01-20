# 깨진 커밋 메시지 수정 스크립트
$ErrorActionPreference = "Stop"

# UTF-8 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 커밋 메시지 매핑
$commitMessages = @{
    "896cbcd" = "Replace: LightRays를 Prism으로 변경"
    "049a947" = "Config: Git 인코딩 설정 및 .gitattributes 추가"
    "a1da7cc" = "Remove: 사용하지 않는 Galaxy 컴포넌트 삭제"
    "e307e58" = "Merge: LightRays 컴포넌트로 변경 충돌"
    "d3efd75" = "Merge: LightRays 컴포넌트 변경 충돌 해결"
    "58d29b3" = "Fix: .gitignore에 .vite 추가"
    "7a89169" = "Replace: Galaxy를 LightRays로 변경 - 성능 최적화 및 버그 수정"
    "1e218c6" = "Initial commit: 이스트 바이오 공식 웹사이트 구축"
    "d1bf820" = "Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"
    "dbb4678" = "Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"
    "896c82d" = "Fix: TypeScript 오류 및 deprecated 패키지 제거 - 빌드 속도를 위해 tsc 검사 제거, @studio-freight/lenis 제거"
    "c8f58f8" = "Fix: TypeScript JSX 설정 추가 및 Lenis smoothTouch 옵션 제거"
    "c492aef" = "Fix: Vercel 빌드 설정 수정"
    "22fe5fd" = "Add: Vercel 빌드 설정 파일 추가"
    "4aba7e9" = "Fix: Vercel 오류를 해결한 설정 추가 (.npmrc 및 overrides 추가)"
    "7dd9a84" = "Initial commit: 이스트 바이오 공식 웹사이트 구축"
}

Write-Host "커밋 메시지 수정을 시작합니다..." -ForegroundColor Green

# 각 커밋을 수정
foreach ($hash in $commitMessages.Keys) {
    $msg = $commitMessages[$hash]
    Write-Host "수정 중: $hash - $msg" -ForegroundColor Yellow
    
    # 커밋 메시지를 파일로 저장
    $msg | Out-File -FilePath "commit-msg-$hash.txt" -Encoding UTF8 -NoNewline
    
    # git commit --amend를 사용하여 수정 (하지만 이미 push된 커밋이므로 rebase 필요)
}

Write-Host "`n모든 커밋 메시지 파일이 생성되었습니다." -ForegroundColor Green
Write-Host "다음 단계: git rebase -i를 사용하여 각 커밋을 수정하세요." -ForegroundColor Cyan


