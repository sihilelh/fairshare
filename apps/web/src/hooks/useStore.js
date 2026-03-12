import { useState, useCallback } from 'react'
import {
  CURRENT_USER, INITIAL_FRIENDS, INITIAL_GROUPS, INITIAL_EXPENSES
} from '../data/mockData.js'

export function useStore() {
  const [friends,  setFriends]  = useState(INITIAL_FRIENDS)
  const [groups,   setGroups]   = useState(INITIAL_GROUPS)
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES)

  const addExpense = useCallback((exp) => {
    const newExp = { ...exp, id: `e_${Date.now()}`, date: new Date().toISOString().slice(0, 10) }

    setExpenses(prev => [newExp, ...prev])

    // Update friend balances
    if (exp.paidBy === CURRENT_USER.id) {
      const share = exp.amount / (exp.splitWith.length + 1)
      setFriends(prev => prev.map(f =>
        exp.splitWith.includes(f.id)
          ? { ...f, balance: parseFloat((f.balance + share).toFixed(2)) }
          : f
      ))
    } else if (exp.splitWith.includes(CURRENT_USER.id)) {
      const share = exp.amount / (exp.splitWith.length + 1)
      setFriends(prev => prev.map(f =>
        f.id === exp.paidBy
          ? { ...f, balance: parseFloat((f.balance - share).toFixed(2)) }
          : f
      ))
    }

    // Update group balance
    if (exp.groupId) {
      setGroups(prev => prev.map(g => {
        if (g.id !== exp.groupId) return g
        const share = exp.amount / (exp.splitWith.length + 1)
        const delta = exp.paidBy === CURRENT_USER.id ? share * exp.splitWith.length : -share
        return { ...g, balance: parseFloat((g.balance + delta).toFixed(2)) }
      }))
    }

    return newExp
  }, [])

  const settleWithFriend = useCallback((friendId) => {
    setFriends(prev => prev.map(f => f.id === friendId ? { ...f, balance: 0 } : f))
  }, [])

  const addFriend = useCallback((friend) => {
    setFriends(prev => [...prev, { ...friend, id: `u_${Date.now()}`, balance: 0 }])
  }, [])

  const addGroup = useCallback((group) => {
    setGroups(prev => [...prev, { ...group, id: `g_${Date.now()}`, balance: 0, members: [CURRENT_USER.id] }])
  }, [])

  const totalOwed = friends.reduce((s, f) => f.balance > 0 ? s + f.balance : s, 0)
  const totalOwe  = friends.reduce((s, f) => f.balance < 0 ? s + Math.abs(f.balance) : s, 0)
  const netBalance = totalOwed - totalOwe

  return {
    currentUser: CURRENT_USER,
    friends, groups, expenses,
    addExpense, settleWithFriend, addFriend, addGroup,
    totalOwed, totalOwe, netBalance,
  }
}
