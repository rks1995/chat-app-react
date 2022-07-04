import Sidebar from './Sidebar'
import Modal from './Modal'
import styles from '../styles/app.module.css'
import { useState } from 'react'

function App() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenConversation = () => {
    setShowModal(true)
  }

  return (
    <div className={styles.app}>
      <div className={styles.chatBody}>
        {/* sidebar */}
        <Sidebar onClick={handleOpenConversation} />
        {showModal && <Modal />}
        {/* chat */}
      </div>
    </div>
  )
}

export default App
