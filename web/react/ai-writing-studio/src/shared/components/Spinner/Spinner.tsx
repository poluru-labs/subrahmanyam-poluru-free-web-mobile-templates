import styles from './Spinner.module.scss'

type SpinnerProps = {
  label?: string
}

export function Spinner({ label = 'Loading' }: SpinnerProps) {
  return <span className={styles.spinner} role="status" aria-label={label} />
}
