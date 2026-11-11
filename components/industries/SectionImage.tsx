import Image from 'next/image'
import ScrollReveal from '../ScrollReveal'
import styles from './SectionImage.module.css'
import type { SectionImageData } from '../../lib/solar-data'

interface SectionImageProps {
  image?: SectionImageData
  /** Aspect ratio of the frame. `wide` is a 21:9 banner, `card` is 4:3. */
  ratio?: 'wide' | 'card' | 'tall'
  sizes?: string
}

/**
 * Photo frame used across the industry page. Images are editable from Sanity
 * (Industry page > "Section images"); a provisional local image is the fallback.
 */
export default function SectionImage({ image, ratio = 'wide', sizes = '(max-width: 1240px) 100vw, 1240px' }: SectionImageProps) {
  if (!image?.src) return null
  return (
    <ScrollReveal variant="up">
      <figure className={`${styles.frame} ${ratio === 'card' ? styles.card : ratio === 'tall' ? styles.tall : styles.wide}`}>
        <Image src={image.src} alt={image.alt || ''} fill sizes={sizes} className={styles.img} />
      </figure>
    </ScrollReveal>
  )
}
