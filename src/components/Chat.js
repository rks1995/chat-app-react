import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContacts } from '../hooks/useContacts'
import styles from '../styles/chat.module.css'

const Chat = (props) => {
  const [userDetails, setUserDetails] = useState({})
  const contacts = useContacts()
  const { chatId } = useParams()

  const handleOpenChats = () => {
    let user = contacts.users.filter((user) => {
      return Number(user.id) === Number(chatId)
    })
    setUserDetails(user[0])
  }

  useEffect(() => {
    if (chatId) {
      handleOpenChats()
    }
  }, [chatId, []]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.chat}>
      <header className={styles.chatHeader}>
        <div className={styles.avatar}>
          {userDetails && <img src={userDetails.img_url} alt='' width={40} />}
        </div>
        <div className={styles.userName}>
          {userDetails && <p>{userDetails.name}</p>}
        </div>
        <div
          className={styles.addConversationIcon}
          onClick={props.handleOpenConversation}
        >
          <i className='fa-solid fa-plus'></i>
        </div>
      </header>
      <div className={styles.message}>
        <div className={styles.peoplesMessage}>
          <ul>
            {userDetails &&
              userDetails.chats &&
              userDetails.chats[0].friend_message.map((fm, index) => {
                return (
                  <div key={index}>
                    <li key={userDetails.id}>{fm.content}</li>
                    <div className={styles.user}>
                      <img src={fm.img_url} alt='' width={30} />
                      <span>{fm.name}</span> 9.01
                    </div>
                  </div>
                )
              })}
          </ul>
        </div>
        <div className={styles.yourMessage}>
          <ul>
            {userDetails &&
              userDetails.chats &&
              userDetails.chats[0].my_message.map((message, index) => {
                return (
                  <div key={index}>
                    <li key={userDetails.id}>{message.content}</li>
                    <div className={styles.user}>
                      9.01<span>{message.name}</span>
                      <img src={message.img_url} alt='' width={20} />
                    </div>
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
      <footer className={styles.chatFooter}>
        <div className={styles.attachment}>
          <i className='fa-solid fa-link'></i>
        </div>
        <input type='text' placeholder='Send Message' />
        <div className={styles.emoji}>
          <span>🙂</span>
          <span>
            <i className='fa-solid fa-angle-down'></i>
          </span>
        </div>
        <button>Send</button>
      </footer>
    </div>
  )
}

export default Chat
