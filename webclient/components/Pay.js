import Link from 'next/link'
import { withRouter } from 'next/router'

const Pay = ({ router }) => {
  return (
    <div>
      <Link children={<a>Back</a>} href={'/'} />
      <img src={'/paymebear.png'} style={{ maxWidth: '100%' }} />
    </div>
  )
}

export default withRouter(Pay)
