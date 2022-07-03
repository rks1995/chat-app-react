import { useState } from 'react'
import styles from '../styles/app.module.css'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const [inputText, setInputText] = useState('')

  const handleSearch = (e) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      if (!inputText) {
        toast.error('enter valid user', {
          position: 'top-right',
        })
      }
    }
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.inputField}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/54/54481.png'
          alt='search-icon'
        />
        <input
          type='text'
          placeholder='Search for conversations'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className={styles.conversation}>
        <span className={styles.text}>conversations</span>
        <button>
          <i className='fa-solid fa-plus'></i>
        </button>
      </div>
      <div className={styles.contacts}>
        <ul>
          <li className={styles.user}>
            <div className={styles.profile}>
              <img
                src='https://cdn-icons-png.flaticon.com/512/4825/4825015.png'
                alt='avatar'
                width={45}
              />
            </div>
            <div className={styles.text}>
              <p className={styles.name}>Savio Meitei</p>
              <p className={styles.someText}>Some text ....</p>
            </div>
            <div className={styles.time}>9.15Am</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
