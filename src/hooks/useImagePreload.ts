import { useEffect, useState } from 'react'

export const useImagePreload = (imageUrls: string[]) => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) {
            setIsLoaded(true)
            return
        }

        let loadedCount = 0
        const totalImages = imageUrls.length

        const handleImageLoad = () => {
            loadedCount++
            if (loadedCount === totalImages) {
                setIsLoaded(true)
            }
        }

        imageUrls.forEach((url) => {
            const img = new Image()
            img.src = url
            img.onload = handleImageLoad
            img.onerror = handleImageLoad // 에러가 나도 로드된 것으로 처리
        })
    }, [imageUrls])

    return isLoaded
}
