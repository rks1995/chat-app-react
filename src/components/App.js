import Sidebar from './Sidebar'
import Modal from './Modal'
import styles from '../styles/app.module.css'
import { useState } from 'react'

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
        {/* sidebar */}
        <Sidebar onClick={handleOpenConversation} />
        {showModal && <Modal onClick={handleCloseModal} />}
        {/* chat */}
      </div>
    </div>
  )
}

export default App
