import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.author}>
          Created by{' '}
          <a
            className={styles.link}
            href="https://polurus.com"
            target="_blank"
            rel="noreferrer"
          >
            Subrahmanyam Poluru
          </a>
        </p>
        <a
          className={styles.link}
          href="https://polurus.com"
          target="_blank"
          rel="noreferrer"
        >
          polurus.com
        </a>
      </div>
    </footer>
  )
}
