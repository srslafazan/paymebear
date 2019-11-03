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
import { Marketplace } from "aave-js";

import ERC20ABI from '../contracts/ERC20.abi.json'
import cDAIABI from '../contracts/cDAI.abi.json'

import Zabo from 'zabo-sdk-js'
import zabo from '../constructors/zabo'
import { useZaboValue } from '../context/Zabo'
import { useLocalEthValue } from '../context/LocalEth'

import constructERC20Contract from '../constructors/constructERC20Contract'
import constructContract from '../constructors/constructContract'
import {
  getContractAddressForAsset,
} from '../utils'



// const signupParams = [
//   "srslafazan@gmail.com",
//   "Frankie",
//   "a-super-random-password",
//   "Titans"
// ]
// const API_SECRET_KEY = await marketplace.utils.signup(...signupParams)

// const marketplace = new Marketplace("");


const Deposit = ({ router }) => {
  const [wallet, setWallet] = useState('zabo')
  const [zaboContext] = useZaboValue()
  const { account, ...rest } = zaboContext
  const [localEthContext] = useLocalEthValue()

  const [currency, setCurrency] = useState(account && account.currencies && account.currencies[0] || 'DAI')
  const [reloadAmount, setReloadAmount] = useState('25.00')

  return (
    <div>
      <Link children={<a>Back</a>} href={'/'} />
      <h2>Add money to your bear</h2>
      <Grid container>
        <Grid item xs={12}>
          Current Balance <br />
          ${typeof web3 !== 'undefined' && web3.fromWei(localEthContext['DAI']) || '0.00'}
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
              {(account && account.currencies || [{ currency: 'DAI' }]).map((val, i) => <MenuItem key={i} value={val.currency}>{val.currency}</MenuItem>)}
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
          <br />
          <Button
            children={`Add $${reloadAmount}`}
            variant="contained"
            color="primary"
            onClick={async () => {
              console.log('deposit')

              // async
              // use zabo to fund wallet
              try {
                console.log('sending zabo')
                let tx = await Zabo.transactions.send({
                  currency,
                  toAddress: localEthContext.account.address,
                  amount: web3.fromWei(reloadAmount.toString()),
                })
                console.log('done: tx: ', tx)
                {/*if (tx.request_link) {
                  let qrCode = Zabo.utils.getQRCode(tx.request_link)
                  document.getElementById('placeHolder').innerHTML = qrCode
                } else {
                  console.log(tx)
                }*/}
              } catch (error) {
                console.log(error)
              }

              // async
              // use aave to provide interest product
              {/*const lenderAddress = localEthContext.account.address
              console.log('lenderAddress', lenderAddress)
              const loanOfferParams = {
                  minimumLoanAmount: 1000,
                  maximumLoanAmount: 10000,
                  moe: "LEND",
                  collaterals: { id: 0, symbol: "LEND", mpr: 0.25, ltv: 50, valid: true },
                  durationRange: { min: 1, max: 12 },
              };
              const tx = await marketplace.offers.create(lenderAddress, loanOfferParams);
              console.log('aave tx: ', tx)
              await web3.eth.sendTransaction(tx);*/}

              // async
              // use compound finance to provide interest product

              {/*const contract = web3.eth.contract(cDAIABI).at(getContractAddressForAsset('cDai'))*/}
//
{/*              const method = contract.methods.mint(1)
//
              const txObject = {
                data: method.encodeABI(),
                from: localEthContext.account.address,
                to: contract._address,
                // nonce,
              }

*/}

              {/*console.log('contract: ', contract)*/}

              // contract.mint(web3.toWei( web3.toHex( Math.floor(reloadAmount / 2).toString() ) ), (err, res) => {
              //   if (err) {
              //     console.error(err)
              //     return
              //   }
              //   console.log('result, compound cdai mint: ', res.toString())
              //   return res.toString()
              // })

{/*              contract
                .supplyRatePerBlock()
                .call()
                .then((result) => {
                  console.log(`Supply Rate PerBlock 為: ${result / 1e18}`);
                })
                .catch(console.error);
*/}
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default withRouter(Deposit)
