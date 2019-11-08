const crypto = require('crypto')
const _ = require('lodash')

class HandlehashKey {
    constructor(hashKey){
        if(typeof hashKey !== "undefined"){
            this._hashKey = typeof hashKey === "string" ? hashKey : hashKey.hashKey()
        }
    }

    convertHexToBinary(hashKey) {
        let hashKeyBinary
        hashKey =  this._hashKey || hashKey;
        const charshashKey = hashKey.split('')
        hashKeyBinary = Array(hashKey.length/2).fill().map((_,index) => parseInt((charshashKey[index] + charshashKey[index + 1]), 16)).join('')
        console.log("hashKey transformed to Binary: ", hashKeyBinary)
        this._hashKeyBinary = hashKeyBinary
        return this
    }

    createMacFromhashKeyBinary(hashKeyBinary) {
        let indexKeyRotate = 0;
        let macStr = ""
        hashKeyBinary = this._hashKeyBinary || hashKeyBinary
        const keyRotate = Array(6).fill().map((_,index) => index+1)
        const numbershashKeyBinary = Array(hashKeyBinary.length).fill().map((_,index) => parseInt(hashKeyBinary.split('')[index]))
        for(let i=0; i < numbershashKeyBinary.length; i++){
            console.log('transformed: ',numbershashKeyBinary[i],"->",(numbershashKeyBinary[i]^keyRotate[indexKeyRotate]).toString(16))
            macStr += (numbershashKeyBinary[i]^keyRotate[indexKeyRotate]).toString(16)
            if(indexKeyRotate > keyRotate.length-1){
                indexKeyRotate = 0
            }else{
                indexKeyRotate++
            }
            console.log('indexKeyRotate: ',indexKeyRotate)
        }

        console.log('numbershashKeyBinary:', numbershashKeyBinary.length)
        console.log('keyRotate: ', keyRotate)
        console.log('macStr: ', macStr)
        console.log('macStr length: ', macStr.length)
        return this
    }

    verifyhashKeyHex(macStr){
    }
        /** TODO get hashKey into database then compare with macStr*/
}

class hashKey {
    constructor(){
        this.timestamp = Date.now();
    }

    create(payload) {
        const hash = crypto.createHash("sha1")
        const hashKey = hash.update(this.timestamp+JSON.stringify(payload)).digest('hex');
        /** TODO  INSERT INTO BDD */
        this._hashKey = hashKey
        return this;
    }

    update(){} /** TODO if key session can expire */

    hashKey(){
        return this._hashKey
    }

}

userhashKey = new hashKey()
userhashKey.create({"email":"email","name":"name"})
handlehashKey = new HandlehashKey()
handlehashKey
.convertHexToBinary("2f84fd03de410794c4d6e71e28fc07daa537404f")
.createMacFromhashKeyBinary()