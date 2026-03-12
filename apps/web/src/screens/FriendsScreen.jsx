import React, { useState } from 'react'
import { Card, SectionLabel, Avatar, BalanceBadge, Button, EmptyState, BottomSheet, Input } from '../components/UI.jsx'

const COLORS = ['#1FD888','#e8a820','#3b82f6','#a78bfa','#f97316','#ec4899','#06b6d4']

export default function FriendsScreen({ friends, expenses, onSettle, onAddFriend }) {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd]   = useState(false)
  const [newName, setNewName]   = useState('')

  const sf = selected ? friends.find(f=>f.id===selected) : null
  const friendExps = selected ? expenses.filter(e=>e.paidBy===selected||e.splitWith.includes(selected)) : []

  if(selected && sf) {
    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:90, position:'relative', zIndex:1 }}>
        <div className="a1" style={{ padding:'52px 20px 16px' }}>
          <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none',
            color:'var(--accent)', fontSize:14, fontWeight:700, cursor:'pointer',
            padding:'0 0 12px', fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:4 }}>
            ← Back
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <Avatar initials={sf.initials} color={sf.color} size={58}/>
            <div>
              <h1 style={{ fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-0.02em', marginBottom:5 }}>{sf.name}</h1>
              <BalanceBadge value={sf.balance}/>
            </div>
          </div>
        </div>

        <div style={{ padding:'0 16px' }}>
          {sf.balance!==0 && (
            <div className="a2" style={{
              padding:'18px 18px',
              background: sf.balance>0
                ? 'linear-gradient(135deg, rgba(31,216,136,0.15), rgba(31,216,136,0.10))'
                : 'linear-gradient(135deg, rgba(210,50,20,0.12), rgba(255,100,60,0.08))',
              border:`1.5px solid ${sf.balance>0?'rgba(31,216,136,0.25)':'rgba(210,50,20,0.22)'}`,
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              borderRadius:'var(--r-lg)',
              display:'flex', justifyContent:'space-between', alignItems:'center',
              marginBottom:12,
              boxShadow:`0 6px 20px ${sf.balance>0?'rgba(31,216,136,0.12)':'rgba(210,50,20,0.10)'}`,
            }}>
              <div>
                <div style={{ fontSize:13, color:'var(--text2)', marginBottom:3, fontWeight:600 }}>
                  {sf.balance>0?`${sf.name} owes you`:`You owe ${sf.name}`}
                </div>
                <div style={{ fontSize:32, fontWeight:800, color:sf.balance>0?'var(--positive)':'var(--negative)',
                  letterSpacing:'-0.03em' }}>
                  ${Math.abs(sf.balance).toFixed(2)}
                </div>
              </div>
              <Button onClick={()=>{onSettle(sf.id);setSelected(null)}}
                variant={sf.balance>0?'primary':'danger'}
                style={{ width:'auto', padding:'10px 18px' }} size="sm">
                Settle Up ✓
              </Button>
            </div>
          )}
          {sf.balance===0 && (
            <div className="a2" style={{ textAlign:'center', padding:'12px', color:'var(--positive)',
              fontSize:14, fontWeight:700, marginBottom:12,
              background:'rgba(31,216,136,0.10)', borderRadius:'var(--r-md)',
              border:'1px solid rgba(31,216,136,0.20)' }}>
              🎉 All settled up!
            </div>
          )}

          <SectionLabel>Shared Expenses · {friendExps.length}</SectionLabel>
          {friendExps.length===0
            ? <EmptyState emoji="🤝" title="No shared expenses" subtitle="Add an expense to split with this friend"/>
            : friendExps.map(e=>{
              const youPaid = e.paidBy==='u1'
              const share = (e.amount/(e.splitWith.length+1)).toFixed(2)
              return (
                <Card key={e.id}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, marginBottom:2, color:'var(--text)' }}>{e.title}</div>
                      <div style={{ fontSize:12, color:'var(--text3)' }}>{e.date}</div>
                      <div style={{ fontSize:12, color:'var(--text2)', marginTop:2 }}>
                        {youPaid?'You paid':e.paidBy===sf.id?`${sf.name} paid`:'Someone paid'} · ${e.amount.toFixed(2)} total
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:800, fontSize:16,
                        color:youPaid?'var(--positive)':'var(--negative)' }}>
                        {youPaid?`+Rs.${(e.amount-parseFloat(share)).toFixed(2)}`:`-Rs.${share}`}
                      </div>
                      <div style={{ fontSize:11, color:'var(--text3)' }}>{youPaid?'lent':'borrowed'}</div>
                    </div>
                  </div>
                </Card>
              )
            })
          }
        </div>
      </div>
    )
  }

  const owed    = friends.filter(f=>f.balance>0)
  const owing   = friends.filter(f=>f.balance<0)
  const settled = friends.filter(f=>f.balance===0)

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:90, position:'relative', zIndex:1 }}>
      <div className="a1" style={{ padding:'52px 20px 12px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <h1 style={{ fontSize:28, fontWeight:800, color:'var(--text)', letterSpacing:'-0.03em' }}>Friends</h1>
          <button onClick={()=>setShowAdd(true)} style={{
            background:'linear-gradient(135deg,rgba(31,216,136,0.18),rgba(31,216,136,0.12))',
            backdropFilter:'blur(10px)',
            WebkitBackdropFilter:'blur(10px)',
            border:'1.5px solid rgba(31,216,136,0.30)',
            borderRadius:12, color:'var(--accent)',
            padding:'8px 14px', fontSize:13, fontWeight:800,
            cursor:'pointer', fontFamily:'var(--font-body)',
            boxShadow:'0 3px 10px rgba(31,216,136,0.20)',
            transition:'transform .12s',
          }}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.93)'}
          onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
          >+ Add</button>
        </div>
      </div>

      <div style={{ padding:'0 16px' }}>
        <div className="a2">
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍  Search friends…"
            style={{
              width:'100%',
              background:'rgba(255,255,255,0.55)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              border:'1.5px solid rgba(255,255,255,0.82)',
              borderRadius:'var(--r-md)',
              color:'var(--text)', padding:'11px 14px',
              fontSize:14, outline:'none', marginBottom:14,
              fontFamily:'var(--font-body)',
              boxShadow:'0 2px 8px rgba(0,0,0,0.05)',
              transition:'border-color .2s, box-shadow .2s',
            }}
            onFocus={e=>{e.target.style.borderColor='#1FD888';e.target.style.boxShadow='0 0 0 3px rgba(31,216,136,.25)'}}
            onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.82)';e.target.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'}}
          />
        </div>

        {owed.length>0 && (<>
          <SectionLabel className="a3">Owe You · Rs.{owed.reduce((s,f)=>s+f.balance,0).toFixed(2)}</SectionLabel>
          {owed.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).map(f=>(
            <Card key={f.id} className="a4" onClick={()=>setSelected(f.id)}>
              <FriendRow friend={f}/>
            </Card>
          ))}
        </>)}

        {owing.length>0 && (<>
          <SectionLabel>You Owe · Rs.{owing.reduce((s,f)=>s+Math.abs(f.balance),0).toFixed(2)}</SectionLabel>
          {owing.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).map(f=>(
            <Card key={f.id} onClick={()=>setSelected(f.id)}>
              <FriendRow friend={f}/>
            </Card>
          ))}
        </>)}

        {settled.length>0 && (<>
          <SectionLabel>Settled Up ✓</SectionLabel>
          {settled.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).map(f=>(
            <Card key={f.id} onClick={()=>setSelected(f.id)}>
              <FriendRow friend={f}/>
            </Card>
          ))}
        </>)}

        {friends.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())).length===0 && search && (
          <EmptyState emoji="🔍" title="No results" subtitle={`No friend named "${search}"`}/>
        )}
      </div>

      <BottomSheet open={showAdd} onClose={()=>setShowAdd(false)} title="Add Friend">
        <Input label="Full Name" placeholder="e.g. Sara Ali" value={newName} onChange={e=>setNewName(e.target.value)}/>
        <Button onClick={()=>{
          const initials=newName.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
          const color=COLORS[Math.floor(Math.random()*COLORS.length)]
          onAddFriend({name:newName.trim(),initials,color})
          setNewName('');setShowAdd(false)
        }} disabled={!newName.trim()}>Add Friend</Button>
      </BottomSheet>
    </div>
  )
}

function FriendRow({ friend:f }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
      <Avatar initials={f.initials} color={f.color} size={44}/>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:700, fontSize:15, color:'var(--text)' }}>{f.name}</div>
        <div style={{ fontSize:12, color:'var(--text3)', marginTop:1 }}>
          {f.balance===0?'All settled up ✓':f.balance>0?`Owes you Rs.${f.balance.toFixed(2)}`:`You owe Rs.${Math.abs(f.balance).toFixed(2)}`}
        </div>
      </div>
      <BalanceBadge value={f.balance}/>
    </div>
  )
}
