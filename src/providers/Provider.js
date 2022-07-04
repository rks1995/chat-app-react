import { createContext } from 'react'
import { useContactsProvider } from '../hooks/useContacts'

let initialState = {
  users: [],
  loading: true,
  handleSearch: () => {},
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
