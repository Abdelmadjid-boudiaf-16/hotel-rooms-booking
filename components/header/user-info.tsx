import { MyUser } from '@/types'
import React from 'react'
import { SheetDemo } from './sidebar';

const UserInfo = ({userInfo}:{userInfo: MyUser}) => {
  return (
    <div className='inline-flex items-center space-x-4'>
      <span>{userInfo.name}</span>
      <SheetDemo isAdmin={userInfo.admin} />
    </div>
  );
}

export default UserInfo