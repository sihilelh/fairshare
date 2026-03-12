import React, { useState } from 'react'
import { BottomSheet, Input, Button, Avatar, Pill } from './UI.jsx'
import { CATEGORY_META } from '../data/mockData.js'

export default function AddExpenseModal({ open, onClose, friends, groups, onAdd }) {
  const [step, setStep]         = useState(1)
  const [title, setTitle]       = useState('')
  const [amount, setAmount]     = useState('')
  const [category, setCategory] = useState('food')
  const [groupId, setGroupId]   = useState(null)
  const [splitWith, setSplitWith] = useState([])

  const reset = () => { setStep(1);setTitle('');setAmount('');setCategory('food');setGroupId(null);setSplitWith([]) }
  const handleClose = () => { reset(); onClose() }
  const toggleFriend = id => setSplitWith(p => p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const perPerson = amount && splitWith.length>0
    ? (parseFloat(amount)/(splitWith.length+1)).toFixed(2) : null
  const canNext = title.trim() && parseFloat(amount)>0

  return (
    <BottomSheet open={open} onClose={handleClose} title={step===1?'Add Expense':'Split With'}>
      {/* Progress bar */}
      <div style={{ display:'flex', gap:6, marginBottom:22 }}>
        {[1,2].map(s=>(
          <div key={s} style={{
            flex:1, height:4, borderRadius:4,
            background: s<=step
              ? 'linear-gradient(90deg,#1FD888,#4BE5A0)'
              : 'rgba(31,216,136,0.12)',
            transition:'background .35s',
            boxShadow: s<=step ? '0 2px 8px rgba(31,216,136,0.35)' : 'none',
          }}/>
        ))}
      </div>

      {step===1 ? (
        <>
          <Input label="What was it for?" placeholder="e.g. Pizza Night"
            value={title} onChange={e=>setTitle(e.target.value)} autoFocus />

          {/* Amount */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--text3)',
              textTransform:'uppercase', letterSpacing:'1px', marginBottom:6 }}>Amount (LKR)</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-52%)',
                color:'var(--text3)', fontSize:20, fontWeight:800 }}>Rs.</span>
              <input type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}
                style={{
                  width:'100%',
                  background:'rgba(255,255,255,0.60)',
                  backdropFilter:'blur(12px)',
                  WebkitBackdropFilter:'blur(12px)',
                  border:'1.5px solid rgba(255,255,255,0.80)',
                  borderRadius:'var(--r-md)',
                  color:'var(--text)', padding:'13px 14px 13px 34px',
                  fontSize:26, fontWeight:800, outline:'none',
                  fontFamily:'var(--font-body)',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
                  transition:'border-color .2s, box-shadow .2s',
                }}
                onFocus={e=>{e.target.style.borderColor='#1FD888';e.target.style.boxShadow='0 0 0 3px rgba(31,216,136,.25)'}}
                onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.80)';e.target.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'}}
              />
            </div>
          </div>

          {/* Category */}
          <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--text3)',
            textTransform:'uppercase', letterSpacing:'1px', marginBottom:8 }}>Category</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
            {Object.entries(CATEGORY_META).map(([key,meta])=>(
              <Pill key={key} active={category===key} color={meta.color} onClick={()=>setCategory(key)}>
                {meta.emoji} {meta.label}
              </Pill>
            ))}
          </div>

          {/* Group */}
          <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--text3)',
            textTransform:'uppercase', letterSpacing:'1px', marginBottom:8 }}>Group (optional)</label>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:22 }}>
            <Pill active={!groupId} onClick={()=>setGroupId(null)}>None</Pill>
            {groups.map(g=>(
              <Pill key={g.id} active={groupId===g.id} color={g.color} onClick={()=>setGroupId(g.id)}>
                {g.emoji} {g.name}
              </Pill>
            ))}
          </div>

          <Button onClick={()=>setStep(2)} disabled={!canNext}>
            Next → Choose Split
          </Button>
        </>
      ) : (
        <>
          {/* Expense summary chip */}
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'13px 16px', marginBottom:16,
            background:'rgba(255,255,255,0.55)',
            backdropFilter:'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',
            border:'1.5px solid rgba(255,255,255,0.80)',
            borderRadius:'var(--r-md)',
            boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ color:'var(--text2)', fontSize:14, fontWeight:600 }}>{title}</span>
            <span style={{ fontSize:22, fontWeight:800, color:'var(--text)',
              letterSpacing:'-0.02em' }}>Rs.{parseFloat(amount).toFixed(2)}</span>
          </div>

          <label style={{ display:'block', fontSize:11, fontWeight:700, color:'var(--text3)',
            textTransform:'uppercase', letterSpacing:'1px', marginBottom:10 }}>Split with</label>

          {friends.map(f=>{
            const sel = splitWith.includes(f.id)
            return (
              <div key={f.id} onClick={()=>toggleFriend(f.id)}
                style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'12px 14px', borderRadius:'var(--r-md)',
                  border:`1.5px solid ${sel ? f.color+'80' : 'rgba(255,255,255,0.75)'}`,
                  background: sel
                    ? `linear-gradient(135deg, ${f.color}18, ${f.color}08)`
                    : 'rgba(255,255,255,0.50)',
                  backdropFilter:'blur(14px)',
                  WebkitBackdropFilter:'blur(14px)',
                  marginBottom:8, cursor:'pointer',
                  transition:'all .18s',
                  boxShadow: sel ? `0 4px 16px ${f.color}25` : '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <Avatar initials={f.initials} color={f.color} size={38}/>
                <span style={{ flex:1, fontWeight:700, fontSize:15, color:'var(--text)' }}>{f.name}</span>
                <div style={{
                  width:24, height:24, borderRadius:'50%',
                  border:`2px solid ${sel?f.color:'rgba(31,216,136,0.25)'}`,
                  background: sel ? f.color : 'rgba(255,255,255,0.50)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#0a0a0a', fontSize:13, fontWeight:900,
                  transition:'all .18s',
                  boxShadow: sel ? `0 2px 8px ${f.color}40` : 'none',
                }}>{sel?'✓':''}</div>
              </div>
            )
          })}

          {splitWith.length>0 && (
            <div style={{
              background:'linear-gradient(135deg, rgba(31,216,136,0.15), rgba(31,216,136,0.10))',
              border:'1.5px solid rgba(31,216,136,0.30)',
              borderRadius:'var(--r-md)', padding:'13px 16px',
              display:'flex', justifyContent:'space-between', alignItems:'center',
              marginTop:8, marginBottom:16,
              boxShadow:'0 4px 14px rgba(31,216,136,0.15)',
              animation:'popIn .3s cubic-bezier(.22,1,.36,1)',
            }}>
              <span style={{ color:'var(--accent)', fontSize:14, fontWeight:700 }}>
                {splitWith.length+1} people · each pays
              </span>
              <span style={{ fontSize:22, fontWeight:800, color:'var(--accent)',
                letterSpacing:'-0.02em' }}>Rs.{perPerson}</span>
            </div>
          )}

          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <Button variant="secondary" onClick={()=>setStep(1)} style={{flex:1}}>← Back</Button>
            <Button onClick={()=>{
              if(!title.trim()||!amount||splitWith.length===0) return
              onAdd({title:title.trim(),amount:parseFloat(amount),category,groupId,splitWith,paidBy:'u1'})
              handleClose()
            }} disabled={splitWith.length===0} style={{flex:2}}>Add Expense ✓</Button>
          </div>
        </>
      )}
    </BottomSheet>
  )
}
