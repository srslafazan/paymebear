import Link from 'next/link'
import { withRouter } from 'next/router'
import ZaboConnector from './ZaboConnector'


const Header = ({ router: { pathname } }) => {

  return (
    <header>
      <div>
        <span>Payme Bear</span>
      </div>
      <ZaboConnector />
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}

export default withRouter(Header)
