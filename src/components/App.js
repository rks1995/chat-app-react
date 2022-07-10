import Sidebar from './Sidebar'
import Modal from './Modal'
import styles from '../styles/app.module.css'
import { useState } from 'react'
import Chat from './Chat'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenConversation = () => {
    setShowModal(true)
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div className={styles.app}>
      <div className={styles.chatBody}>
        {showModal && <Modal onClick={handleCloseModal} />}
        <Sidebar handleOpenConversation={handleOpenConversation} />
        <Routes>
          <Route
            path='chat/:chatId'
            element={
              <Chat
                handleCloseModal={handleCloseModal}
                handleOpenConversation={handleOpenConversation}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
