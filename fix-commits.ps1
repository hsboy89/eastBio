# Git 커밋 메시지 수정 스크립트
$commits = @(
    @{hash="049a947"; msg="Config: Git 인코딩 설정 및 .gitattributes 추가"},
    @{hash="a1da7cc"; msg="Remove: 사용하지 않는 Galaxy 컴포넌트 삭제"}
)

foreach ($commit in $commits) {
    Write-Host "수정 중: $($commit.hash) - $($commit.msg)"
}


