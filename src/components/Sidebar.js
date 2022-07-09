import { useState } from 'react'
import styles from '../styles/app.module.css'

import Spinner from './Spinner'
import { useContacts } from '../hooks/useContacts'
import { Link } from 'react-router-dom'

const Sidebar = (props) => {
  const [inputText, setInputText] = useState('')
  const contacts = useContacts()
  const { users, loading, handleSearch } = contacts
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
          onKeyUp={handleSearch}
        />
      </div>
      <div className={styles.conversation}>
        <span className={styles.text}>conversations</span>
        <button onClick={props.handleOpenConversation}>
          <i className='fa-solid fa-plus'></i>
        </button>
      </div>
      <div className={styles.contacts}>
        <ul>
          {loading ? (
            <Spinner />
          ) : (
            users.map((user) => {
              return (
                <Link to={`/chat/${user.id}`} key={user.id}>
                  <li className={styles.user}>
                    <div className={styles.profile}>
                      <img src={user.img_url} alt='avatar' width={45} />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.someText}>Some text ....</p>
                    </div>
                    <div className={styles.time}>9.15Am</div>
                  </li>
                </Link>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
