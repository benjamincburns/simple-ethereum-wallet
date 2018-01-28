const QR = require('qrcode-terminal')

const defaultSilent = false
const defaultAccountPrintCount = 1
const defaultPrintPublicKey = false
const defaultPrintPrivateKey = false
const defaultPrintQrCode = true
const defaultSmallQrCode = true
const defaultLog = console.log

class WalletWriter {
  constructor(options) {
    this.silent = options.silent !== undefined ? options.silent : defaultSilent
    this.accountPrintCount = options.accountPrintCount !== undefined ? options.accountPrintCount : defaultAccountPrintCount
    this.printPublicKey = options.printPublicKey !== undefined ? options.printPublicKey : defaultPrintPublicKey
    this.printPrivateKey = options.printPrivateKey !== undefined ? options.printPrivateKey : defaultPrintPrivateKey
    this.printQrCode = options.printQrCode !== undefined ? options.printQrCode : defaultPrintQrCode
    this.smallQrCode = options.smallQrCode !== undefined ? options.smallQrCode : defaultSmallQrCode
    this.log = options.log || defaultLog
  }

  writeAccount(account) {
    if(this.silent) return

    if (this.printQrCode) {
      this.log('')
      let qrOpts = { small: this.smallQrCode }

      // prints to stdout unless callback provided as final arg
      QR.generate(account.address, qrOpts, this.log)
      this.log('')
    }

    this.log(`Address: ${account.address}`)
    if (this.printPublicKey) {
      this.log(`Public Key: ${account.publicKey}`)
    }

    if (this.printPrivateKey) {
      this.log(`Private Key: ${account.privateKey}`)
    }
  }

  writeDetails(wallet) {
    if(this.silent) return

    this.log(`HD Path: ${wallet.hdPath}$index`)
    this.log(`Mnemonic: ${wallet.mnemonic}`)
    let count = this.accountPrintCount
    for (let i = 0; i < count; i++) {
      this.writeAccount(wallet.getAccount(i))
    }
    this.log('')
  }
}

module.exports = exports = WalletWriter