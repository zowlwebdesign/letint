'use client'

import { useEffect, useState } from 'react'
import styles from './HubSection.module.css'

interface ProcessStep {
  stepNumber?: string
  title?: string
  description?: string
}

interface HubProps {
  data?: {
    headerTitle?: string
    headerDescription?: string
    centerTower?: { label?: string; subtitle?: string; badge?: string }
    hubNodes?: string[]
    processSteps?: ProcessStep[] // Still in schema, though not visible in this specific crop, we keep it just in case
  }
}

export default function HubSection({ data }: HubProps) {
  if (!data) return null;
  const nodes = data.hubNodes || []
  const steps = data.processSteps || []
  const tower = data.centerTower

  // State to track if we are mounted (for hydration safety if we were using window)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Calculate positions for dynamic nodes
  const nodeCount = nodes.length

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <div className={styles.header}>
          {data.headerTitle && <h2 className={styles.title}>{data.headerTitle}</h2>}
          {data.headerDescription && <p className={styles.subtitle}>{data.headerDescription}</p>}
        </div>

        {/* Hub diagram */}
        <div className={styles.diagramContainer}>
          <div className={styles.diagramBg} />
          
          <div className={styles.diagramContent}>
            
            {/* Connecting dashed lines using SVG */}
            {mounted && nodeCount > 0 && (
              <svg className={styles.connectionsSvg}>
                {/* Optional subtle background circles like in the previous design, or just lines */}
                <circle cx="50%" cy="50%" r="20%" className={styles.orbitRing} />
                <circle cx="50%" cy="50%" r="35%" className={styles.orbitRing} />
                
                {nodes.map((_, i) => {
                  const angle = (i / nodeCount) * 2 * Math.PI - (Math.PI / 1.5)
                  const rx = 38
                  const ry = 35
                  const x = 50 + rx * Math.cos(angle)
                  const y = 50 + ry * Math.sin(angle)
                  
                  return (
                    <line 
                      key={i} 
                      x1="50%" 
                      y1="50%" 
                      x2={`${x}%`} 
                      y2={`${y}%`} 
                      className={styles.connectionLine}
                    />
                  )
                })}
              </svg>
            )}

            {/* Orbiting Nodes */}
            {nodeCount > 0 && (
              <div className={styles.nodesWrapper}>
                {nodes.map((node, i) => {
                  const angle = (i / nodeCount) * 2 * Math.PI - (Math.PI / 1.5)
                  const rx = 38
                  const ry = 35
                  const x = 50 + rx * Math.cos(angle)
                  const y = 50 + ry * Math.sin(angle)

                  return (
                    <div 
                      key={i} 
                      className={styles.orbitNode}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {node}
                    </div>
                  )
                })}
              </div>
            )}

            {/* Center Tower */}
            <div className={styles.centerTower}>
              <div className={styles.towerInner}>
                {tower?.label && <span className={styles.towerLabel}>{tower.label}</span>}
                {tower?.subtitle && <span className={styles.towerSub}>{tower.subtitle}</span>}
                {tower?.badge && <span className={styles.towerBadge}>{tower.badge}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        {steps.length > 0 && (
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={`${styles.stepNumberBox} ${i % 2 !== 0 ? styles.stepCyan : styles.stepDark}`}>
                  {step.stepNumber || String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
