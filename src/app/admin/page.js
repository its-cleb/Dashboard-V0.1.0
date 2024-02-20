
import '../styles.css'
import './page.css'
import { IconButton } from "../../components/generic/common"
import { FaUsersGear } from "react-icons/fa6"
import { BsBuildingFillGear } from "react-icons/bs"

export default function Admin() {

  return (
    <>
      <div className="page">
        <h1>Admin Panel</h1>
          <div className="admin-menu center-all flex-column gap-10">
            <IconButton href="/admin/users" className="admin-menu-button">
              <div className="admin-menu-item-icon"><FaUsersGear size={25} /></div>
              <div className="admin-menu-item-text">Edit Users</div>
            </IconButton>
            <IconButton href="/admin/plants" className="admin-menu-button">
              <div className="admin-menu-item-icon"><BsBuildingFillGear  size={25} /></div>
              <div className="admin-menu-item-text">Edit Plants</div>
            </IconButton>
          </div>
      </div>
    </>
  )
}