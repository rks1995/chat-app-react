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
    getUsers()
  }, [])

  const getUsers = () => {
    // if local storage is not empty then retrieve the user
    if (localStorage.getItem('userIds')) {
      let ids = JSON.parse(localStorage.getItem('userIds'))
      let localStorageUsers = []
      ids.forEach((id) => {
        data.users.forEach((user) => {
          if (user.id === id) {
            localStorageUsers.push(user)
          }
        })
      })
      setUsers(localStorageUsers)
      setTimeout(() => {
        setLoading(false) // inorder to show spinner
      }, 500)
    } else {
      setLoading(false)
    }
  }

  //  this function add user for starting conversation
  const addUser = (userId) => {
    // add the userId into local storage to make data persistent
    if (localStorage.getItem('userIds')) {
      let ids = JSON.parse(localStorage.getItem('userIds'))
      let isIdAlreadyPresent = ids.indexOf(userId)
      if (isIdAlreadyPresent === -1) {
        // add id to localStorage
        localStorage.setItem('userIds', JSON.stringify([...ids, userId]))
      }
    } else {
      localStorage.setItem('userIds', JSON.stringify([userId]))
    }

    let toUser = data.users.filter((user) => user.id === userId)

    let index = users.indexOf(toUser[0])

    if (index !== -1) {
      // conversation of user has been already started
      toast.error('User already added')
      return
    }
    toast.success('Added New Conversation')
    setUsers([...users, toUser[0]])
  }

  // this function will search for conversation
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        toast.error('enter valid user', {
          position: 'top-right',
        })
        return
      }
    }
    // every time the input field is empty then grab the user from local storage to make search convenient
    if (!e.target.value) {
      getUsers()
      return
    }

    let newUser = users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(e.target.value)
    })

    setUsers(newUser)
  }

  return {
    users,
    loading,
    handleSearch,
    addUser,
  }
}

export { useContactsProvider, useContacts }
