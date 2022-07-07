import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../styles/chat.module.css'
import { data } from '../data'

const Chat = (props) => {
  const [userDetails, setUserDetails] = useState([])
  const { chatId } = useParams()

  useEffect(() => {
    const handleOpenChats = () => {
      let user = data.users.filter((user) => {
        return Number(user.id) === Number(chatId)
      })
      console.log(user)
      setUserDetails(user[0])
    }
    handleOpenChats()
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
            <li>
              Hi there!Hi there! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Sint ut magni repellendus possimus animi ipsa
              porro eius ipsum?
            </li>
            <div className={styles.user}>
              {userDetails && (
                <img src={userDetails.img_url} alt='' width={30} />
              )}
              <span>Name</span> 9.01
            </div>
            <li>
              Hi there!Hi there! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Sint ut magni repellendus possimus animi ipsa
              porro eius ipsum?
            </li>
            <div className={styles.user}>
              {userDetails && (
                <img src={userDetails.img_url} alt='' width={30} />
              )}
              <span>Name</span> 9.01
            </div>
            <li>
              Hi there!Hi there! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Sint ut magni repellendus possimus animi ipsa
              porro eius ipsum?
            </li>
            <div className={styles.user}>
              {userDetails && (
                <img src={userDetails.img_url} alt='' width={30} />
              )}
              <span>Name</span> 9.01
            </div>
          </ul>
        </div>
        <div className={styles.yourMessage}>
          <ul>
            <li>
              Hi there! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Sint ut magni repellendus possimus animi ipsa porro eius
              ipsum?
            </li>
            <div className={styles.user}>
              <span>Name</span> 9.01
              {userDetails && (
                <img src={userDetails.img_url} alt='' width={30} />
              )}
            </div>
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
