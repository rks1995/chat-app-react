import styles from '../styles/modal.module.css'

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalSearch}>
        <input type='text' placeholder='search' />
        <a href='/' type='button'>
          <i class='fa-solid fa-xmark'></i>
        </a>
      </div>
      <div className={styles.modalContacts}>
        <ul>modalContacts</ul>
      </div>
    </div>
  )
}

export default Modal
