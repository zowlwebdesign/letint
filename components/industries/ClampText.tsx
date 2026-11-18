'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './SolutionsSection.module.css'

interface ClampTextProps {
  text: string
  moreLabel: string
  lessLabel: string
}

/**
 * Long paragraph cut to a few lines on phones (see .clamp in the CSS),
 * with a "Read more" toggle that only appears when the text is actually cut.
 */
export default function ClampText({ text, moreLabel, lessLabel }: ClampTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [cut, setCut] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      if (expanded) return
      setCut(el.scrollHeight > el.clientHeight + 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [expanded, text])

  return (
    <>
      <p ref={ref} className={`${styles.factText} ${expanded ? '' : styles.clamp}`}>
        {text}
      </p>
      {(cut || expanded) && (
        <button type="button" className={styles.moreBtn} aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? lessLabel : moreLabel}
        </button>
      )}
    </>
  )
}
