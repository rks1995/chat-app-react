import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContacts } from '../hooks/useContacts'
import EmojiPicker from 'emoji-picker-react'
import styles from '../styles/chat.module.css'
import toast from 'react-hot-toast'

const Chat = (props) => {
  const [userDetails, setUserDetails] = useState({})
  const [message, setMessage] = useState('') // message to be send between users
  const [showEmoji, setShowEmoji] = useState(false)
  const inputFile = useRef(null) // for file upload
  const contacts = useContacts()
  const { chatId } = useParams()

  useEffect(() => {
    if (chatId) {
      handleOpenChats()
    }
  }, [chatId, []]) // eslint-disable-line react-hooks/exhaustive-deps

  const fileUploadOnChange = () => {
    if (inputFile.current.files && inputFile.current.files[0]) {
      const fileList = inputFile.current.files[0]
      if (fileList.type !== 'image/jpeg') {
        toast.error('invalid file type, please upload jpeg format')
        return
      }
      let imgObj = URL.createObjectURL(fileList)
      let chats = userDetails.chats[0].my_message
      let img_url = chats[0].img_url
      let name = chats[0].name
      //create new chat object
      let chat = {
        file: imgObj,
        img_url,
        name,
      }

      chats.push(chat)
      console.log(chats)
      setUserDetails({})
    }
  }

  // this function will allow user to browse image on his local machine
  const handleOpenDialogue = () => {
    inputFile.current.click()
  }

  // this function will trigger on pressing enter as well as on clicking send button
  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.target.id === 'send-btn') {
      if (message === '') {
        toast.error('Message cannot be empty..')
        return
      }
      let chats = userDetails.chats[0].my_message
      let img_url = chats[0].img_url
      let name = chats[0].name
      //create new chat object
      let chat = {
        content: message,
        img_url,
        name,
      }

      chats.push(chat)
      setMessage('')
      setUserDetails({})
    }
  }

  const handleOpenChats = () => {
    let user = contacts.users.filter((user) => {
      return Number(user.id) === Number(chatId)
    })
    setUserDetails(user[0])
  }

  const handleEmoji = (e) => {
    setMessage(e.target.innerText)
  }

  const onEmojiClick = (event, emojiObject) => {
    setMessage(emojiObject.emoji)
    setShowEmoji(false)
  }

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
                  <div className={styles.list} key={index}>
                    {fm.content && <li>{fm.content}</li>}
                    {fm.file && <img src={fm.file} alt='file' width={200} />}
                    {(fm.content || fm.file) && (
                      <div className={styles.user}>
                        <img src={fm.img_url} alt='' width={20} />
                        <span>{fm.name}</span> 9.01
                      </div>
                    )}
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
                  <div className={styles.list} key={index}>
                    {message.content && <li>{message.content}</li>}
                    {message.file && (
                      <img src={message.file} alt='file' width={200} />
                    )}
                    {(message.content || message.file) && (
                      <div className={styles.user}>
                        9.01<span>{message.name}</span>
                        <img src={message.img_url} alt='' width={20} />
                      </div>
                    )}
                  </div>
                )
              })}
          </ul>
        </div>
      </div>
      <footer className={styles.chatFooter}>
        <div className={styles.attachment} onClick={handleOpenDialogue}>
          <input
            type='file'
            onChange={(e) => fileUploadOnChange(e)}
            ref={inputFile}
            style={inputStyle.hidden}
            multiple
          />
          <i className='fa-solid fa-link'></i>
        </div>
        <input
          type='text'
          placeholder='Send Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => sendMessage(e)}
        />
        <div className={styles.emoji}>
          <span onClick={handleEmoji}>🙂</span>
          <span>
            <i
              className='fa-solid fa-angle-down'
              onClick={() => setShowEmoji(!showEmoji)}
            ></i>
            {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
          </span>
        </div>
        <button id='send-btn' onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </footer>
    </div>
  )
}

var inputStyle = {
  hidden: {
    display: 'none',
  },
}

export default Chat
