import './page.css'
import '../../styles.css'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { FaUserPlus } from "react-icons/fa6"
import { Card, Section } from '../../../components/generic/card'
import { Row } from '../../../components/generic/common'
import { BottomMenu, BottomMenuItem } from '@/components/navigation/bottommenu'

async function getUsers(){
  const users = await prisma.user.findMany({
  })
  return users
}

export default async function Users() {

  const users = await getUsers()

  const usersList = users.map(user => 
  <Section key={user.id} className="section cursor-pointer">
    <Link href={`/admin/users/${user.id}`}>
      <Row>
        <div className="bold center-all users" style={{flex: 2}}>{user.name}</div>
        <div className="center-all users" style={{flex: 4}}>{user.email}</div>
        <div className="center-all users" style={{flex: 2}}>{user.position}</div>
        <div className="center-all users" style={{flex: 1}}>{user.role}</div>
        <div className="center-all users" style={{flex: 4}}>{user.id}</div>
      </Row>
    </Link>
  </Section>  
  )

  return (
    <>
      <div className="page">
        <Card title="Users">
          <Row>
            <div className="t-small bold center-all" style={{flex: 2}}>Name</div>
            <div className="t-small bold center-all" style={{flex: 4}}>Email</div>
            <div className="t-small bold center-all" style={{flex: 2}}>Title</div>
            <div className="t-small bold center-all" style={{flex: 1}}>Permissions</div>
            <div className="t-small bold center-all" style={{flex: 4}}>ID</div>
          </Row>

          {usersList}

        </Card>

        <BottomMenu>
          <BottomMenuItem title="Add User" href="/admin/users/add-user" className="center-all">
            <FaUserPlus size={20} className="admin-menu-item-icon center-all flex" />
          </BottomMenuItem>
        </BottomMenu>

      </div>
    </>
  )
}