import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import {Transaction as Tx} from 'ethereumjs-tx'

import ERC20ABI from '../contracts/ERC20.abi.json'

import Zabo from 'zabo-sdk-js'
import zabo from '../constructors/zabo'
import { useZaboValue } from '../context/Zabo'
import { useLocalEthValue } from '../context/LocalEth'

import constructERC20Contract from '../constructors/constructERC20Contract'
import {
  getContractAddressForAsset,
} from '../utils'


// function sendERC20(contractAddress, fromAddr, toAddr) {
//   // var count = web3.eth.getTransactionCount(fromAddr);
//   var contract = web3.eth.contract(ERC20ABI).at(contractAddress);
//   var rawTransaction = {
//       "from": fromAddr,
//       // "nonce": web3.toHex(count),
//       "gasPrice": "0x04e3b29200",
//       "gasLimit": "0x7458",
//       "to": contractAddress,
//       "value": "0x0",
//       "data": contract.transfer.getData(toAddr, 10, {from: fromAddr}),
//       "chainId": '42'
//   };

//   // var privKey = new Buffer('fc3...', 'hex');
//   var tx = new Tx(rawTransaction);

//   // tx.sign(privKey);
//   var serializedTx = tx.serialize();

//   web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
//       if (!err)
//           console.log(hash);
//       else
//           console.log(err);
//   });

// }



const Deposit = ({ router }) => {
  const [wallet, setWallet] = useState('zabo')
  const [zaboContext] = useZaboValue()
  const { account, ...rest } = zaboContext
  const [localEthContext] = useLocalEthValue()

  const [currency, setCurrency] = useState(account && account.currencies && account.currencies[0])
  const [reloadAmount, setReloadAmount] = useState('25.00')


  // const contract = constructERC20Contract(getContractAddressForAsset('DAI'))
  // console.log('contract', contract)
  // console.log('localEthContext', localEthContext)
  // if (typeof ethereum !== 'undefined' && ethereum.selectedAddress) {
  //   contract.balanceOf(ethereum.selectedAddress, (e, r) => {
  //     if (e) return console.error(e)
  //     console.log(r.toString())
  //   })
  // }

  return (
    <div>
      <Link children={<a>Back</a>} href={'/'} />
      <h2>Add money to your bear</h2>
      <Grid container>
        <Grid item xs={12}>
          Current Balance <br />
          ${localEthContext['DAI'] || '0.00'}
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Wallet</InputLabel>
            <Select
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              inputProps={{
                name: 'Select Wallet',
                id: 'SelectWallet',
              }}
            >
              {[
                { name: 'Zabo', key: 'zabo' },
                { name: 'MetaMask', key: 'metamask' },
              ].map((val, i) => <MenuItem key={i} value={val.key}>{val.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              inputProps={{
                name: 'Select Currency',
                id: 'SelectCurrency',
              }}
            >
              {(account && account.currencies || []).map((val, i) => <MenuItem key={i} value={val.currency}>{val.currency} ({val.balance})</MenuItem>)}
            </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Reload Amount</InputLabel>
            <Select
              value={reloadAmount}
              onChange={(e) => setReloadAmount(e.target.value)}
              inputProps={{
                name: 'Reload Amount',
                id: 'ReloadAmount',
              }}
            >
              {['15.00', '25.00', '50.00'].map((val) => <MenuItem key={val} value={val}>${val}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            children={`Add $${reloadAmount}`}
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log('deposit')
              {/*return await axios.post('/api/v1/send', {
                currency,
                toAddress: localEthContext.account.address,
                amount: 0.05,
                accountId: account.id,
              })*/}

              try {
                let tx = await Zabo.transactions.send({
                  currency: 'DAI',
                  toAddress: localEthContext.account.address,
                  amount: web3.fromWei(reloadAmount.toString()),
                })
                if (tx.request_link) {
                  let qrCode = Zabo.utils.getQRCode(tx.request_link)
                  document.getElementById('placeHolder').innerHTML = qrCode
                } else {
                  console.log(tx)
                }
              } catch (error) {
                console.log(error)
              }


              {/*const contract = constructERC20Contract(getContractAddressForAsset('DAI'))
              console.log('contract', contract)
              console.log('localEthContext', localEthContext)
              contract.balanceOf(ethereum.selectedAddress, (e, r) => {
                if (e) return console.error(e)
                console.log(r.toString())
              })*/}

{/*
              await ethereum.enable()
              const contract = constructERC20Contract(getContractAddressForAsset('DAI'))
              contract.balanceOf(ethereum.selectedAddress, (err, res) => {
                if (err) {
                  console.error(err)
                  return
                }
                return console.log('dai: ', res.toString())
              })
              sendERC20(getContractAddressForAsset('DAI'), account.address, localEthContext.account.address)
*/}
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(Deposit)
