#!/bin/bash
# Git 커밋 메시지 수정 스크립트

git filter-branch -f --msg-filter '
case "$GIT_COMMIT" in
    7dd9a84a5a80c12f0a8938c80363a3840291bd4a)
        echo "Initial commit: 이스트 바이오 공식 웹사이트 구축"
        ;;
    4aba7e9493518d84a6a433ab28ac101c7a51827f)
        echo "Fix: Vercel 오류를 해결한 설정 추가 (.npmrc 및 overrides 추가)"
        ;;
    22fe5fd2c253042f1f5dd4f353f531e83dcac133)
        echo "Add: Vercel 빌드 설정 파일 추가"
        ;;
    c492aef5705ce814594058c2cd46b3f1b169ad33)
        echo "Fix: Vercel 빌드 설정 수정"
        ;;
    c8f58f8fbbad314e10ee50884fd39dfec709fc26)
        echo "Fix: TypeScript JSX 설정 추가 및 Lenis smoothTouch 옵션 제거"
        ;;
    896c82d61e2b21d19f59d7c361a85ea70697fb38)
        echo "Fix: TypeScript 오류 및 deprecated 패키지 제거 - 빌드 속도를 위해 tsc 검사 제거, @studio-freight/lenis 제거"
        ;;
    dbb467868cce28e7dff7f9a6307e46066b3d1152)
        echo "Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"
        ;;
    d1bf820c16e27d59ee911b92b5f648152761ad5f)
        echo "Performance: 성능 최적화 - Galaxy 파라미터 조정, Lenis 성능 최적화 및 GPU 가속 추가"
        ;;
    1e218c624f670bbab95fd45db8b2a8d49e06d498)
        echo "Initial commit: 이스트 바이오 공식 웹사이트 구축"
        ;;
    7a891698c100783285026e86efe948f58a481484)
        echo "Replace: Galaxy를 LightRays로 변경 - 성능 최적화 및 버그 수정"
        ;;
    58d29b36e1ab9cd64cef4f6c781ed840901fb3be)
        echo "Fix: .gitignore에 .vite 추가"
        ;;
    d3efd75f99b6a1053080b55885656e54160ed15a)
        echo "Merge: LightRays 컴포넌트 변경 충돌 해결"
        ;;
    e307e58dbc1e362f00ba3abb486e1a7f2fba888a)
        echo "Merge: LightRays 컴포넌트로 변경 충돌"
        ;;
    a1da7ccf6d7d90e2dc5ea90272377b312f4b6f4b)
        echo "Remove: 사용하지 않는 Galaxy 컴포넌트 삭제"
        ;;
    049a9472b7d824d2d1594ecff84b84a45df97b58)
        echo "Config: Git 인코딩 설정 및 .gitattributes 추가"
        ;;
    896cbcd01782539b0ebf189a678a95c769f091fa)
        echo "Replace: LightRays를 Prism으로 변경"
        ;;
    *)
        cat
        ;;
esac
' -- --all

