import { useState, useEffect, useContext } from 'react'
import { data } from '../data'
import { ContactsContext } from '../providers/Provider'
import toast from 'react-hot-toast'

const useContacts = () => {
  return useContext(ContactsContext)
}

const useContactsProvider = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUsers = () => {
      setUsers(data.users)
      setTimeout(() => {
        setLoading(false) // inorder to show loader
      }, 500)
    }
    getUsers()
  }, [])

  const handleSearch = (e) => {
    if (!e.target.value) {
      setUsers(data.users)
      return
    }

    console.log('change')
    if (e.key === 'Enter') {
      if (!e.target.value) {
        toast.error('enter valid user', {
          position: 'top-right',
        })
        return
      }
    }

    let newUser = data.users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(e.target.value)
    })

    setUsers(newUser)
  }

  return {
    users,
    loading,
    handleSearch,
  }
}

export { useContactsProvider, useContacts }
