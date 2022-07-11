import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from '../styles/modal.module.css'
import { data } from '../data'
import { useContacts } from '../hooks/useContacts'

const Modal = (props) => {
  const [modalUsers, setModalUsers] = useState(data.users)
  const [inputText, setInputText] = useState('')
  const contacts = useContacts()

  const handleModalSearch = (e) => {
    if (e.key === 'Enter') {
      if (!inputText) {
        toast.error('Invalid User')
        return
      }
    }
    let newUser = data.users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(e.target.value)
    })
    setModalUsers(newUser)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalSearch}>
        <input
          type='text'
          placeholder='search'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyUp={handleModalSearch}
        />
        <a href='/' type='button' {...props}>
          <i className='fa-solid fa-xmark'></i>
        </a>
      </div>
      <div className={styles.modalContacts}>
        <ul>
          {modalUsers.map((user) => {
            return (
              <li key={user.id} onClick={() => contacts.addUser(user.id)}>
                {user.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Modal
