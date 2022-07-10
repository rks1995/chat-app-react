import { createContext } from 'react'
import { useContactsProvider } from '../hooks/useContacts'

// global state
let initialState = {
  users: [],
  loading: true,
  addUser: () => {},
  handleSearch: () => {},
  getUsers: () => {},
}

const ContactsContext = createContext(initialState)

const ContactsProvider = ({ children }) => {
  const contacts = useContactsProvider()
  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  )
}

export { ContactsContext, ContactsProvider }
