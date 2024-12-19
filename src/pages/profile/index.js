import {memo} from 'react'
import UserInformation from './userInformation'
import PostProfile from '../../components/postProfile'
import ProfilImaga from '../../components/ProfilImage'

function Index() {
  return (
    <div>
      {/* <UserInformation /> */}
      <ProfilImaga />
      <PostProfile />
    </div>
  )
}

export default memo(Index)