---
title: 'Fungible token'
description: 'Fungible token - This is the meta description'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'introduction'
  - 'fungible'
---

### Application Goals

The goal of the module is to let users create and maintain fungible tokens being something (such as money or a commodity) of such a nature that one part or quantity may be replaced by another equal part or quantity in paying a debt or settling an account.

In this section, you will learn how these simple requirements translate to application design.

### Type of Message

In this module which consists of EIGHT types of messages that users 
can send to interact with the application state: 


## 1. MsgTypeCreateFungibleToken
This is the msg type used to create the fungible token.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| name | string | true   | Token name| | 
| symbol | string | true   | Token symbol, which must be unique| | 
| decimals | int | true   | decimals value| | 
| metadata | string | true   | Metadata of token| | 
| fixedSupply | bool | true   | fixedSupply value| | 
| owner | string | true   | Token owner| | 
| maxSupply | int | true   | maxSupply value| | 
| fee | Fee | true   | Fee information| | 


#### Fee Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| to | string | true   | Fee-collector| | 
| value | string | true   | Fee amount to be paid| | 


#### Example
```
{
    "type": "token/createFungibleToken",
    "value": {
        "name": "TestToken-6",
        "symbol": "TT-6",
        "decimals": "8",
        "metadata": "",
        "fixedSupply": false,
        "owner": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73",
        "maxSupply": "100000",
        "fee": {
            "to": "mxw1g6cjz0pgtchedjyacjcsldhmxcvu2z4nrud9qt",
            "value": "100000"
        }
    }
}

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeCreateFungibleToken
 message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeCreateFungibleToken message in handleMsgCreateNonFungibleToken:

![Image-2](pic_fungible/CreateFungibleToken_02.png)


In this function, requirements need to be met before emitted by the network.  

* Token must be unique.
* Token owner must be authorised.
* A valid Fee will be charged base on this.
* Action of Re-create is not allowed.

#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_fungible/CreateFungibleToken_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using CreatedFungibleToken(string,string,string,bignumber)
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 
| to | string | Fee-collector| | 
| value | bignumber | Fee amount to be paid| | 


## 2. MsgTypeSetFungibleTokenStatus 
This is the msg type used to set the status of a fungible token.


#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| owner | string | true   | Token owner| | 
| payload | Payload | true   | Payload information| | 
| signatures | []Signature | true   | Array of Signature| | 


#### Payload Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| token | TokenData | true   | Token data| | 
| pub_key | nil | true   | crypto.PubKey| | 
| signature | []byte | true   | signature| | 


#### Token Data Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| from | string | true   | Token owner| | 
| nonce | string | true   | nonce signature| | 
| status | string | true   | status, eg. freeze or unfreeze | | 
| symbol | string | true   | Token-symbol| | 
| burnable | bool | true   | flag of burnable| | 
| tokenFees,omitempty | []TokenFee | true   | Fee Setting information| | 


#### Token Fee Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| action | string | true   | action | | 
| feeName | string | true   | fee setting| | 



#### Example
```
 {
    "type": "token/setFungibleTokenStatus",
    "value": {
        "owner": "mxw1j4duwuaqdj2na054rmlg3pdzncpmwzdjwtfqht",
        "payload": {
            "token": {
                "from": "mxw1lmym5599yja76d2s463390he22pcpng3zzpx4p",
                "nonce": "0",
                "status": "FREEZE",
                "symbol": "TT-4",
                "burnable": true
            },
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "A8I4AHjOPpkQhEFy24L8SZkwd9UxQyEyudZYcYl9f4jK"
            },
            "signature": "2rX+NvGxvB5vmEa7aeOk3nICZuUcOpv3jgRn64PtGVoT3e9Nq1mBDSUtggr5XyWJFNA6ntBzt/yvL4K+MgW+ng=="
        },
        "signatures": [
            {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A4PwoBS8fl/2W+V1HXrWQBn5jXci5gnYUTQzDZFqD0vl"
                },
                "signature": "y92hR1sSHk53B1tSbybOE0q2VQ9yzHnxW0heTk64Q9wHuk5lnQhqoztfM+IqaGOMbUYc3MGVhntkAVUVoXKw8A=="
            }
        ]
    }
}
```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeSetFungibleTokenStatus message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.

First, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-ApproveToken message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token must not be approved.
* Signer must be authorised.
* Action of Re-approved is not allowed.


Second, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-RejectToken message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_04.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token must not be approved.
* Signer must be authorised.
* Action of Re-reject is not allowed.


Thirth, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-FreezeToken message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_06.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token must not be freeze
* Signer must be authorised.
* Action of Re-freeze is not allowed.

Next, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-UnfreezeToken message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_08.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token must be freeze.
* Signer must be authorised.
* Action of Re-unfreeze is not allowed.

Next, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-ApproveTransferTokenOwnership message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_10.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token with TransferTokenOwnership flag equals to true.
* Signer must be authorised.
* Action of Re-approve transfer token-ownership is not allowed.

Last, you define the actual logic for handling the MsgTypeSetFungibleTokenStatus-RejectTransferTokenOwnership message in handleMsgSetNonFungibleTokenStatus:

![Image-2](pic_fungible/SetFungibleTokenStatus_12.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token TransferTokenOwnership flag equals to true.
* Signer must be authorised.
* Action of Re-reject transfer token-ownership is not allowed.



#### Events
#### 1.
This tutorial describes how to create maxonrow events for scanner base on approve token after emitted by a network.

![Image-1](pic_fungible/SetFungibleTokenStatus_02_2.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using ApprovedFungibleToken(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 


#### 2.
This tutorial describes how to create maxonrow events for scanner base on reject token after emitted by a network.

![Image-2](pic_fungible/SetFungibleTokenStatus_04_2.png)  

#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using RejectedFungibleToken(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 


#### 3.
This tutorial describes how to create maxonrow events for scanner base on freeze token after emitted by a network.

![Image-3](pic_fungible/SetFungibleTokenStatus_06_2.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using FrozenFungibleToken(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 


#### 4.
This tutorial describes how to create maxonrow events for scanner base on unfreeze token after emitted by a network.

![Image-4](pic_fungible/SetFungibleTokenStatus_08_2.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using UnfreezeFungibleToken(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 


#### 5.
This tutorial describes how to create maxonrow events for scanner base on approve transfer token-ownership after emitted by a network.

![Image-5](pic_fungible/SetFungibleTokenStatus_10_2.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using ApprovedTransferTokenOwnership(string,string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 
| newOwner | string | New token owner| | 


#### 6.
This tutorial describes how to create maxonrow events for scanner base on reject transfer token-ownership after emitted by a network.

![Image-6](pic_fungible/SetFungibleTokenStatus_12_2.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using RejectedTransferTokenOwnership(string,string,string)
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 
| newOwner | null | NULL| | 


## 3. MsgTypeTransferFungibleToken
This is the msg type used to transfer the item of fungible token.


#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| symbol | string | true   | Token symbol, which must be unique| | 
| from | string | true   | Item owner| | 
| to | string | true   | New Item owner| | 
| value | int | true   | value| | 


#### Example
```
{
    "type": "token/transferFungibleToken",
    "value": {
        "symbol": "TT-6",
        "value": "0",
        "from": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73",
        "to": "mxw1w0m8xqy0fpgkf6luwu666f5hhl3tm0sq53snw5"
    }
}
```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeTransferFungibleToken message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeTransferFungibleToken message in handleMsgTransferFungibleToken:

![Image-2](pic_fungible/TransferFungibleToken_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Signer must be a valid token owner.
* Current token owner's account is not in freeze condition.
* New token owner's account is not in freeze condition.
* Current token owner must have enough balance in order to do transfer amount to New token owner
* Action of Re-transfer is allowed if have enough balance.


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_fungible/TransferFungibleToken_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using TransferredFungibleToken(string,string,string,bignumber)
* Item owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| from | string | Item owner| | 
| to | string | New item owner| | 
| value | string | Value| | 



## 4. MsgTypeMintFungibleToken 
This is the message type used to mint an item of a non-fungible token.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| symbol | string | true   | Token symbol, which must be unique| | 
| owner | string | true   | Token owner| | 
| to | string | true   | Item owner| | 
| value | int | true   | value| | 
| metadata | string | true   | Metadata of item| | 



#### Example
```
{
    "type": "token/mintFungibleToken",
    "value": {
        "symbol": "TT-2b",
        "value": "100000",
        "owner": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73",
        "to": "mxw14vl7sua9jkhu0vd66eur35kzgesj5tj8pmhdjw"
    }
}

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeMintFungibleToken message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeMintFungibleToken message in handleMsgMintFungibleToken:

![Image-2](pic_fungible/MintFungibleToken_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token which Mint Flag equals to true and must be approved, and not yet be freeze.
* Token can only be minted by token-creator.
* Token with Max-Supply bigger than ZERO is known as Fixed-Supply, which need do validate between Total-Supply and Max-Supply. Else is known as Dynamic-Supply.
* Action of Re-mint is allowed if not yet reached the total-supply-limit (as Fixed-Supply).


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-3](pic_fungible/MintFungibleToken_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using MintedFungibleToken(string,string,string,bignumber)
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 
| to | string | Item owner| | 
| value | string | value| | 


## 5. MsgTypeBurnFungibleToken
This is the msg type used to burn the item of fungible token.


#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| symbol | string | true   | Token symbol, which must be unique| | 
| value | string | true   | value| | 
| itemID | string | true   | Properties of token| | 


#### Example

```
{
    "type": "token/burnFungibleToken",
    "value": {
        "symbol": "TT-2",
        "value": "200",
        "from": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73"
    }
}

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeBurnFungibleToken message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeBurnFungibleToken message in handleMsgBurnNonFungibleItem:

![Image-2](pic_fungible/BurnFungibleToken_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* A valid Token account.
* Token must be approved before this, and not be freeze. Also burnable flag must equals to true.
* Signer who is the Token owner need to be authorised to do this process.
* Action of Re-burn is allowed if the balance amount is enough to do burning.


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_fungible/BurnFungibleToken_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using BurnedFungibleToken(string,string,string,bignumber)
* Item owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Item owner| | 
| account | string | Account address| | 
| value | string | value| | 

--ntyt ???
symbol, owner.String(), "mxw000000000000000000000000000000000000000", value.String()



## 6. MsgTypeTransferFungibleTokenOwnership
MsgTypeTransferFungibleTokenOwnership
This is the msg type used to transfer the ownership of a fungible token.


#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| symbol | string | true   | Token symbol, which must be unique| | 
| from | string | true   | Token owner| | 
| to | string | true   | New token owner| | 


#### Example
```
{
    "type": "token/transferFungibleTokenOwnership",
    "value": {
        "symbol": "TT-6",
        "from": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73",
        "to": "mxw14vl7sua9jkhu0vd66eur35kzgesj5tj8pmhdjw"
    }
}

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeTransferNonFungibleTokenOwnership message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeTransferFungibleTokenOwnership message in handleMsgTransferFungibleTokenOwnership:

![Image-2](pic_fungible/TransferFungibleTokenOwnership_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* Token must be approved, and not yet be freeze.
* Signer must be valid token owner
* Action of Re-transfer-ownership is not allowed.


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_fungible/TransferFungibleTokenOwnership_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using TransferredFungibleTokenOwnership(string,string,string)
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 
| newOwner | string | New token owner| | 



## 7. MsgTypeAcceptFungibleTokenOwnership 
This is the msg type used to accept the ownership of a fungible token.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| symbol | string | true   | Token symbol, which must be unique| | 
| from | string | true   | Token owner| | 


#### Example

```
{
    "type": "token/acceptFungibleTokenOwnership",
    "value": {
        "symbol": "TT-6",
        "from": "mxw14vl7sua9jkhu0vd66eur35kzgesj5tj8pmhdjw"
    }
}
```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeAcceptFungibleTokenOwnership message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeAcceptFungibleTokenOwnership message in handleMsgTypeAcceptFungibleTokenOwnership:

![Image-2](pic_fungible/AcceptFungibleTokenOwnership_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* A valid Token owner.
* A valid New token owner.
* Token must be approved and not be freeze.
* Action of Re-accept-ownership is not allowed.


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using AcceptedFungibleTokenOwnership(string,string)
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| from | string | Token owner| | 



## 8. MsgTypeSetFungibleTokenAccountStatus
MsgTypeSetFungibleTokenAccountStatus

This is the msg type used to set the account status of a fungible token.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| owner | string | true   | Item owner| | 
| payload | TokenAccountPayload | true   | Account Payload information| | 
| signatures | []Signature | true   | Array of Signature| | 


#### Account Payload Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| tokenAccount | TokenAccount | true   | Token account| | 
| pub_key | nil | true   | crypto.PubKey| | 
| signature | []byte | true   | signature| | 


#### Token Account Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| from | string | true   | Token owner| | 
| nonce | string | true   | nonce signature| | 
| status | string | true   | status, eg. freeze or unfreeze | | 
| symbol | string | true   | Token-symbol| | 
| to | string | true   | account address| | 



#### Example
```
{
    "type": "token/setFungibleTokenAccountStatus",
    "value": {
        "owner": "mxw1j4duwuaqdj2na054rmlg3pdzncpmwzdjwtfqht",
        "payload": {
            "tokenAccount": {
                "from": "mxw1lmym5599yja76d2s463390he22pcpng3zzpx4p",
                "nonce": "0",
                "status": "FREEZE_ACCOUNT",
                "symbol": "TFT-Acc1",
                "to": "mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73"
            },
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "A8I4AHjOPpkQhEFy24L8SZkwd9UxQyEyudZYcYl9f4jK"
            },
            "signature": "XgDB/IWOX2M2gwi+1Voi4YaNhCJzAZdG00hbUTtTAFhEtnl+7i1BHi70XX5pwH9s+74y5gZunT2BFZoJXm/xzA=="
        },
        "signatures": [
            {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "A4PwoBS8fl/2W+V1HXrWQBn5jXci5gnYUTQzDZFqD0vl"
                },
                "signature": "STAuPiC0512i3HHYm6pK+k0LXwCMLr1DgAjO+bV3UAct068WnvoWNh1Jd7xcWrnaghLfdWZT8yknhEkKd9XFRA=="
            }
        ]
    }
}
```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeSetFungibleTokenAccountStatus message is received.

In the file (./x/token/fungible/handler.go) start with the following code:

![Image-1](pic_fungible/AcceptFungibleTokenOwnership_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.

First, you define the actual logic for handling the MsgTypeSetFungibleTokenAccountStatus-FreezeTokenAccount message in handleMsgSetFungibleTokenAccountStatus:

![Image-2](pic_fungible/SetFungibleTokenAccountStatus_02.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* A valid Token account which must not be freeze.
* Signer must be authorised.
* Action of Re-freeze-item is not allowed.


Last, you define the actual logic for handling the MsgTypeSetFungibleTokenAccountStatus-UnfreezeTokenAccount message in handleMsgSetFungibleTokenAccountStatus:

![Image-2](pic_fungible/SetFungibleTokenAccountStatus_03.png)


In this function, requirements need to be met before emitted by the network.  

* A valid Token.
* A valid Token account which must be freeze.
* Signer must be authorised.
* Action of Re-unfreeze-item is not allowed.



#### Events
#### 1.
This tutorial describes how to create maxonrow events for scanner base on freeze token account
after emitted by a network.

![Image-1](pic_fungible/SetFungibleTokenAccountStatus_04.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using FrozenFungibleTokenAccount(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 



#### 2.
This tutorial describes how to create maxonrow events for scanner base on unfreeze token account after emitted by a network.

![Image-4](pic_fungible/SetFungibleTokenAccountStatus_05.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using UnfreezeFungibleTokenAccount(string,string) 
* Token owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Token owner| | 

### Querier

Now you can navigate to the ./x/token/fungible/querier.go file. 
This is the place to define which queries against application state users will be able to make. 
 
Here, you will see NewQuerier been defined, and it acts as a sub-router for queries to this module (similar the NewHandler function). Note that because there isn't an interface similar to Msg for queries, we need to manually define switch statement cases (they can't be pulled off of the query .Route() function):

![Image-1](pic_fungible/QuerierFungibleToken.png)


This module will expose few queries:

## A. ListTokenSymbol
This query the available tokens list.

After the router is defined, define the inputs and responses for this queryListTokenSymbol:

![Image-2](pic_fungible/queryListTokenSymbol.png)


Notes on the above code:

The output type should be something that is both JSON marshalable and stringable (implements the Golang fmt.Stringer interface). The returned bytes should be the JSON encoding of the output result.

For the output of ListTokenSymbol, the normal ListTokenSymbol struct is already JSON marshalable, but we need to add a .String() method on it.


#### Parameters
| Name | Type | Default | Required | Description                 |
| ---- | ---- | ------- | -------- | --------------------------- |
| path | string | false | false    | Path to the data (eg. "/a/b/c") |
| data | []byte | false | true     | Data |
| height | int64 | 0 | false    | Height (0 means latest) |
| prove | bool | false | false    | Include proofs of the transactions inclusion in the block, if true |


#### Example
In this example, we will explain how to query token list with abci_query. 

Run the command with the JSON request body:
```
curl 'http://localhost:26657/'
```

```
{
    "method": "abci_query",
    "params": [
    	"/custom/token/list_token_symbol",
    	"",
    	"0",
    	false
    	],
    "id": 0,
    "jsonrpc": "2.0"
}

```

The above command returns JSON structured like this: 
```
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "response": {
      "code": 0,
      "log": "",
      "info": "",
      "index": "0",
      "key": null,
      "value": "WyJUVCIsIlRULTEiLCJUVC0yIiwiVFQtMmIiLCJUVC00IiwiVFQtNSIsIlRULTYiLCJUb1QiXQ==",
      "proof": null,
      "height": "562",
      "codespace": ""
    }
  }
}
```

## B. TokenData
This takes a symbol and returns token data base on it.

After the router is defined, define the inputs and responses for this queryTokenData:

![Image-2](pic_fungible/queryTokenData.png)


Notes on the above code:

This query request ONE path-parameter which refer to token-symbol. 
The output type should be something that is both JSON marshalable and stringable (implements the Golang fmt.Stringer interface). The returned bytes should be the JSON encoding of the output result.

For the output of Token, the normal Token struct is already JSON marshalable, but we need to add a .String() method on it.


#### Parameters
| Name | Type | Default | Required | Description                 |
| ---- | ---- | ------- | -------- | --------------------------- |
| path | string | false | false    | Path to the data (eg. "/a/b/c") |
| data | []byte | false | true     | Data |
| height | int64 | 0 | false    | Height (0 means latest) |
| prove | bool | false | false    | Include proofs of the transactions inclusion in the block, if true |


#### Example
In this example, we will explain how to query token data with abci_query. 

Run the command with the JSON request body:
```
curl 'http://localhost:26657/'
```

```
{
    "method": "abci_query",
    "params": [
    	"/custom/token/token_data/TT-2b",
    	"",
    	"0",
    	false
    	],
    "id": 0,
    "jsonrpc": "2.0"
}

```

The above command returns JSON structured like this: 
```
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "response": {
      "code": 0,
      "log": "",
      "info": "",
      "index": "0",
      "key": null,
      "value": "eyJGbGFncyI6MzEsIk5hbWUiOiJUZXN0VG9rZW4tMmIiLCJTeW1ib2wiOiJUVC0yYiIsIkRlY2ltYWxzIjoiOCIsIk93bmVyIjoibXh3MXg1Y2Y4eTk5bnRqYzhjam0wMHo2MDN5ZnF3enh3Mm1hd2VtZjczIiwiTmV3T3duZXIiOiIiLCJNZXRhZGF0YSI6IiIsIlRvdGFsU3VwcGx5IjoiMTAwMDAwIiwiTWF4U3VwcGx5IjoiMTAwMDAwIn0=",
      "proof": null,
      "height": "639",
      "codespace": ""
    }
  }
}
```



## C. Account
This takes a account and symbol then returns account data.

After the router is defined, define the inputs and responses for this queryItemData:

![Image-2](pic_fungible/queryAccount.png)


Notes on the above code:

This query request TWO path-parameters which refer to token-symbol and item-id. 
The output type should be something that is both JSON marshalable and stringable (implements the Golang fmt.Stringer interface). The returned bytes should be the JSON encoding of the output result.

For the output of Item, the normal Item struct is already JSON marshalable, but we need to add a .String() method on it.

#### Parameters
| Name | Type | Default | Required | Description                 |
| ---- | ---- | ------- | -------- | --------------------------- |
| path | string | false | false    | Path to the data (eg. "/a/b/c") |
| data | []byte | false | true     | Data |
| height | int64 | 0 | false    | Height (0 means latest) |
| prove | bool | false | false    | Include proofs of the transactions inclusion in the block, if true |


#### Example
In this example, we will explain how to query item data with abci_query. 

Run the command with the JSON request body:
```
curl 'http://localhost:26657/'
```

```
{
    "method": "abci_query",
    "params": [
    	"/custom/token/account/TT-2b/mxw1x5cf8y99ntjc8cjm00z603yfqwzxw2mawemf73",
    	"",
    	"0",
    	false
    	],
    "id": 0,
    "jsonrpc": "2.0"
}

```

The above command returns JSON structured like this: 
```
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "response": {
      "code": 0,
      "log": "",
      "info": "",
      "index": "0",
      "key": null,
      "value": "eyJPd25lciI6Im14dzF4NWNmOHk5OW50amM4Y2ptMDB6NjAzeWZxd3p4dzJtYXdlbWY3MyIsIkZyb3plbiI6ZmFsc2UsIk1ldGFkYXRhIjoiIiwiQmFsYW5jZSI6IjAifQ==",
      "proof": null,
      "height": "844",
      "codespace": ""
    }
  }
}
```

