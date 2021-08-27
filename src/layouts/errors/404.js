import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFoundPage = () => {
  const history = useHistory()

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className="default-layout">

      <div className="contents-wrapper">
        <div className="notfound-page">
          
          
          <div className="viewback">
            Page Not found
            {' '}
            <div className="btn-back" onClick={() => goHome()} onKeyPress={() => goHome()}>back to home</div>
          </div>

        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}

export default NotFoundPage
