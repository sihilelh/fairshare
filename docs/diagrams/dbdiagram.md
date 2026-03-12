```
Table users {
  id int [pk, increment]
  name varchar
  email varchar [unique]
  password_hash varchar
  created_at timestamp
}

Table friends {
  id int [pk, increment]
  user_id int
  friend_id int
  status varchar  // pending, accepted, blocked
  created_at timestamp
}

Table groups {
  id int [pk, increment]
  name varchar
  description varchar
  created_by int
  created_at timestamp
}

Table group_participants {
  id int [pk, increment]
  group_id int
  user_id int
  joined_at timestamp
}

Table records {
  id int [pk, increment]
  group_id int [null] // null if personal expense
  paid_by int
  description varchar
  amount decimal
  created_at timestamp
}

Table record_splits {
  id int [pk, increment]
  record_id int
  user_id int
  amount decimal
}

Ref: friends.user_id > users.id
Ref: friends.friend_id > users.id

Ref: groups.created_by > users.id

Ref: group_participants.group_id > groups.id
Ref: group_participants.user_id > users.id

Ref: records.group_id > groups.id
Ref: records.paid_by > users.id

Ref: record_splits.record_id > records.id
Ref: record_splits.user_id > users.id

```