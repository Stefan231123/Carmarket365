import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0yOCAyOCAxNiAxNm0wLTE2LTE2IDE2Ii8+PC9zdmc+'

const LOADING_IMG_SRC = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9IiMwMDAiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj48Y2lyY2xlIGN4PSIyMiIgY3k9IjIyIiByPSI2IiBzdHJva2Utb3BhY2l0eT0iMCI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjEuNXMiIGR1cj0iM3MiIHZhbHVlcz0iNjsyMiIgY2FsY01vZGU9ImxpbmVhciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utb3BhY2l0eSIgYmVnaW49IjEuNXMiIGR1cj0iM3MiIHZhbHVlcz0iMTswIiBjYWxjTW9kZT0ibGluZWFyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS13aWR0aCIgYmVnaW49IjEuNXMiIGR1cj0iM3MiIHZhbHVlcz0iMjswIiBjYWxjTW9kZT0ibGluZWFyIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjIyIiBjeT0iMjIiIHI9IjYiIHN0cm9rZS1vcGFjaXR5PSIwIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBiZWdpbj0iM3MiIGR1cj0iM3MiIHZhbHVlcz0iNjsyMiIgY2FsY01vZGU9ImxpbmVhciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utb3BhY2l0eSIgYmVnaW49IjNzIiBkdXI9IjNzIiB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9ImxpbmVhciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJzdHJva2Utd2lkdGgiIGJlZ2luPSIzcyIgZHVyPSIzcyIgdmFsdWVzPSIyOzAiIGNhbGNNb2RlPSJsaW5lYXIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMjIiIGN5PSIyMiIgcj0iOCI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgYmVnaW49IjBzIiBkdXI9IjEuNXMiIHZhbHVlcz0iNjs2OzE7MSIgY2FsY01vZGU9ImxpbmVhciIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT48L2c+PC9nPjwvc3ZnPg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lazy?: boolean;
  placeholderSrc?: string;
  rootMargin?: string;
  threshold?: number;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { t } = useTranslation()
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!props.lazy)
  const imgRef = useRef<HTMLImageElement>(null)
  const [actualSrc, setActualSrc] = useState<string | undefined>(props.lazy ? undefined : props.src)

  const { src, alt, style, className, lazy = false, placeholderSrc, rootMargin = '50px', threshold = 0.1, ...rest } = props

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setActualSrc(src)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold
      }
    )

    const currentImg = imgRef.current
    if (currentImg) {
      observer.observe(currentImg)
    }

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg)
      }
      observer.disconnect()
    }
  }, [lazy, src, isInView, rootMargin, threshold])

  // Set actualSrc immediately if not lazy loading
  useEffect(() => {
    if (!lazy) {
      setActualSrc(src)
    }
  }, [src, lazy])

  const handleError = () => {
    setDidError(true)
    setIsLoaded(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Show error state
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt={t('common.errorLoadingImage')} {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  // Show loading state for lazy images
  if (lazy && !isInView) {
    return (
      <div
        ref={imgRef}
        className={`inline-block bg-gray-50 text-center align-middle flex items-center justify-center ${className ?? ''}`}
        style={style}
      >
        {placeholderSrc ? (
          <img src={placeholderSrc} alt={t('common.loading')} {...rest} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img src={LOADING_IMG_SRC} alt={t('common.loading')} className="opacity-50" width="40" height="40" />
          </div>
        )}
      </div>
    )
  }

  // Show main image with loading state
  return (
    <div className="relative inline-block">
      {!isLoaded && lazy && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-50 ${className ?? ''}`} style={style}>
          <img src={LOADING_IMG_SRC} alt="Loading..." className="opacity-50" width="40" height="40" />
        </div>
      )}
      <img
        ref={imgRef}
        src={actualSrc}
        alt={alt}
        className={`${className ?? ''} ${!isLoaded && lazy ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        {...rest}
      />
    </div>
  )
}
