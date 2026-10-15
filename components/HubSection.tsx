'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './HubSection.module.css'
import { urlForImage } from '../sanity/lib/image'
import ScrollReveal from './ScrollReveal'

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
    processSteps?: ProcessStep[]
    backgroundImage?: any
  }
}

export default function HubSection({ data }: HubProps) {
  if (!data) return null;
  const nodes = data.hubNodes || []
  const steps = data.processSteps || []
  const tower = data.centerTower

  // Default to first step open
  const [openStep, setOpenStep] = useState<number | null>(0)

  const toggleStep = (index: number) => {
    setOpenStep(prev => prev === index ? null : index)
  }

  const nodeCount = nodes.length

  const hubBgUrl = data.backgroundImage
    ? urlForImage(data.backgroundImage)?.url()
    : 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'

  return (
    <section className={styles.section} id="how-it-works" aria-label="Supply Chain Control Tower Hub">
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.header}>
            {data.headerTitle && <h2 className={styles.title}>{data.headerTitle}</h2>}
            {data.headerDescription && <p className={styles.subtitle}>{data.headerDescription}</p>}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={100}>
          {/* ─── Control Tower Diagram ─── */}
          <div className={styles.diagramContainer}>
          <div className={styles.diagramBg}>
            <Image
              src={hubBgUrl || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'}
              alt="LET INT US Connected Network of Carriers, Warehouses and Customs Brokers"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={75}
              loading="lazy"
              className={styles.diagramImg}
            />
          </div>

          {/* Desktop Radial Orbital Diagram (min-width: 769px) */}
          <div className={styles.desktopDiagram}>
            {/* Connecting dashed lines and radar rings */}
            {nodeCount > 0 && (
              <svg className={styles.connectionsSvg} aria-hidden="true">
                <circle cx="50%" cy="50%" r="18%" className={styles.orbitRing} />
                <circle cx="50%" cy="50%" r="30%" className={styles.orbitRingDashed} />
                <circle cx="50%" cy="50%" r="42%" className={styles.orbitRing} />
                
                {nodes.map((_, i) => {
                  const angle = (i / nodeCount) * 2 * Math.PI - (Math.PI / 2)
                  const rx = 31
                  const ry = 29
                  const x = 50 + rx * Math.cos(angle)
                  const y = 50 + ry * Math.sin(angle)
                  
                  return (
                    <g key={i}>
                      <line 
                        x1="50%" 
                        y1="50%" 
                        x2={`${x}%`} 
                        y2={`${y}%`} 
                        className={styles.connectionLine}
                      />
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        className={styles.connectionDot}
                      />
                    </g>
                  )
                })}
              </svg>
            )}

            {/* Orbiting Satellite Nodes */}
            {nodeCount > 0 && (
              <div className={styles.nodesWrapper}>
                {nodes.map((node, i) => {
                  const angle = (i / nodeCount) * 2 * Math.PI - (Math.PI / 2)
                  const rx = 31
                  const ry = 29
                  const x = 50 + rx * Math.cos(angle)
                  const y = 50 + ry * Math.sin(angle)

                  return (
                    <div 
                      key={i} 
                      className={styles.orbitNode}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span className={styles.nodeIndicator} />
                      <span className={styles.nodeText}>{node}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Center Control Tower */}
            <div className={styles.centerTower}>
              <div className={styles.towerPulseGlow} />
              <div className={styles.towerInner}>
                <div className={styles.towerRadarIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.4" />
                    <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 0 1 12 4v-2z" />
                    <path d="M12 6a6 6 0 0 0-4.24 10.24l1.41-1.41A4 4 0 0 1 12 8V6z" />
                    <path d="M12 22a10 10 0 0 0 7.07-17.07l-1.41 1.41A8 8 0 0 1 12 20v2z" />
                    <path d="M12 18a6 6 0 0 0 4.24-10.24l-1.41 1.41A4 4 0 0 1 12 16v2z" />
                  </svg>
                </div>
                <span className={styles.towerLabel}>{tower?.label || 'LET INT US'}</span>
                <span className={styles.towerSub}>{tower?.subtitle || 'CONTROL TOWER'}</span>
              </div>
            </div>
          </div>

          {/* Mobile High-Tech Ecosystem View (max-width: 768px) */}
          <div className={styles.mobileDiagram}>
            {/* Top Control Tower Card */}
            <div className={styles.mobileTower}>
              <div className={styles.mobileTowerInner}>
                <span className={styles.mobileTowerLabel}>{tower?.label || 'LET INT US'}</span>
                <span className={styles.mobileTowerSub}>{tower?.subtitle || 'CONTROL TOWER'}</span>
              </div>
            </div>

            {/* Satellite Grid: clean, 100% visible, zero truncation */}
            <div className={styles.mobileNodesGrid}>
              {nodes.map((node, i) => (
                <div key={i} className={styles.mobileNodeCard}>
                  <div className={styles.mobileNodeIconWrap}>
                    <span className={styles.mobileNodeBeacon} />
                  </div>
                  <span className={styles.mobileNodeTitle}>{node}</span>
                </div>
              ))}
            </div>
          </div>
          </div>
        </ScrollReveal>

        {/* ─── Process Steps (Desplegables / Accordion) ─── */}
        {steps.length > 0 && (
          <ScrollReveal variant="up" delay={150}>
            <div className={styles.accordionContainer} role="region" aria-label="Process Steps">
            <div className={styles.accordionList}>
              {steps.map((step, i) => {
                const isOpen = openStep === i
                return (
                  <div 
                    key={i} 
                    className={`${styles.accordionItem}${isOpen ? ` ${styles.itemOpen}` : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.accordionHeader}
                      onClick={() => toggleStep(i)}
                      aria-expanded={isOpen}
                      aria-controls={`step-content-${i}`}
                      id={`step-header-${i}`}
                    >
                      <div className={styles.headerLeft}>
                        <div className={`${styles.stepNumberBadge} ${isOpen ? styles.badgeActive : (i % 2 !== 0 ? styles.badgeCyan : styles.badgeDark)}`}>
                          {step.stepNumber || String(i + 1).padStart(2, '0')}
                        </div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                      </div>

                      <div className={styles.chevronWrap}>
                        <svg
                          className={`${styles.chevronIcon}${isOpen ? ` ${styles.chevronOpen}` : ''}`}
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    <div
                      id={`step-content-${i}`}
                      role="region"
                      aria-labelledby={`step-header-${i}`}
                      className={`${styles.accordionBody}${isOpen ? ` ${styles.bodyOpen}` : ''}`}
                    >
                      <div className={styles.accordionInner}>
                        <div className={styles.descWrapper}>
                          <p className={styles.stepDesc}>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
