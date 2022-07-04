import { useState } from 'react'
import toast from 'react-hot-toast'
import { useContacts } from '../hooks/useContacts'
import styles from '../styles/modal.module.css'

const Modal = (props) => {
  const contacts = useContacts()
  const [modalUsers, setModalUsers] = useState(contacts.users)
  const [inputText, setInputText] = useState('')

  const handleModalSearch = (e) => {
    console.log('change')
    if (e.key === 'Enter') {
      if (!inputText) {
        toast.error('Invalid User', {
          position: 'top-right',
        })
        return
      }
    }
    let newUser = contacts.users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(e.target.value)
    })
    console.log(newUser)
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
          onKeyDown={handleModalSearch}
        />
        <a href='/' type='button' {...props}>
          <i className='fa-solid fa-xmark'></i>
        </a>
      </div>
      <div className={styles.modalContacts}>
        <ul>
          {modalUsers.map((user) => {
            return (
              <li key={user.id}>
                <input type='checkbox' name='' id='' />
                <p>{user.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.startConversation}>
        <i className='fa-solid fa-arrow-up-right-from-square'></i>
      </div>
    </div>
  )
}

export default Modal
