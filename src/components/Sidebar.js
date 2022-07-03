import { useEffect, useState } from 'react'
import styles from '../styles/app.module.css'
import toast from 'react-hot-toast'
import { data } from '../data'
import Spinner from './Spinner'

const Sidebar = () => {
  const [inputText, setInputText] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUsers = () => {
      setUsers(data.users)
      setTimeout(() => {
        setLoading(false) // inorder to show loader
      }, 1000)
    }
    getUsers()
  }, [])

  const handleSearch = (e) => {
    console.log('change')
    if (e.key === 'Enter') {
      if (!inputText) {
        toast.error('enter valid user', {
          position: 'top-right',
        })
      }
    }

    let newUser = data.users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(inputText)
    })

    setUsers(newUser)
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
          {loading ? (
            <Spinner />
          ) : (
            users.map((user) => {
              return (
                <li className={styles.user} key={user.id}>
                  <div className={styles.profile}>
                    <img src={user.img_url} alt='avatar' width={45} />
                  </div>
                  <div className={styles.text}>
                    <p className={styles.name}>{user.name}</p>
                    <p className={styles.someText}>Some text ....</p>
                  </div>
                  <div className={styles.time}>9.15Am</div>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
