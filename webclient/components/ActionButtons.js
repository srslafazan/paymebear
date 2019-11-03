import Button from '@material-ui/core/Button'
import Link from 'next/link'
import { withRouter } from 'next/router'


const ActionButtons = ({ router }) => {
  console.log('router ', router)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Button
        children={'Add Money'}
        onClick={() => router.push('/deposit')}
        color="primary"
        variant="contained"
        size={'small'}
      />
      <Button
        children={'Scan QR Code'}
        color="primary"
        variant="contained"
        size={'small'}
      />
      <Button
        children={'Pay Now'}
        onClick={() => router.push('/pay')}
        color="primary"
        variant="contained"
        size={'small'}
      />
    </div>
  )
}


export default withRouter(ActionButtons)
