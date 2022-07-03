import Sidebar from './Sidebar'
import styles from '../styles/app.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.chatBody}>
        {/* sidebar */}
        <Sidebar />
        {/* chat */}
      </div>
    </div>
  )
}

export default App
