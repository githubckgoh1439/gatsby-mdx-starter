---
title: 'KYC'
description: 'KYC - This is the meta description'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'introduction'
  - 'kyc'
---

### Application Goals

The goal of the module is to let users do KYC whitelisting or revoke base on the existing whitelist. 

In this section, you will learn how these simple requirements translate to application design.

### Type of Message

In this module which consists of FOUR types of messages that users 
can send to interact with the application state: 

## 1. MsgWhitelist 
This is the message type used to do KYC whitelisting.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| owner | string | true   | Token owner| | 
| kycData| KycData | true   | Data of KYC | | 


#### KycData Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| payload | Payload | true   | Payload| | 
| signatures | []Signature | true   | signatures | |


#### Payload Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| kyc | Kyc | true   | kyc data| | 
| pub_key | crypto.PubKey | true   | pub_key| | 
| signature | []byte | true   | signatures| | 



#### Example
```
{
    "type": "kyc/whitelist",
    "value": {
        "owner": "mxw1y0j6xqc8dsafx2tfv4m8765mw7wrvlespzfyfq",
        "kycData": {
            "payload": {
                "kyc": {
                    "from": "mxw1nyk9r6347l3a6l2t0yk0mczqgumsnfuqjqwda4",
                    "nonce": "0",
                    "kycAddress": "testKyc1234"
                },
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "AhFwNoY/JtmaQnkwPSGGXTqmZnw5izkGEzDBbZ11PCD0"
                },
                "signature": "XhyQbVGeS5KmVUIGWuUkA3Mz7nFhpSFeT5nO5XskC15kdRRBDi6Z3pqRm2c9bRCa3j9QWhG+MurOHnI6/QS9GA=="
            },
            "signatures": [
                {
                    "pub_key": {
                        "type": "tendermint/PubKeySecp256k1",
                        "value": "Aw96JCN8YXpQqxolKEeMDgpSdYMdgVgOWEdfi96+zo+p"
                    },
                    "signature": "xh4OzyV6B7ES0b3jcuIPqpn3lVw7HD3IUgts6E19wPdr6sdS/sb9wvWp2afN1nXzBHwaRwDmsU1oujhrqRErzg=="
                },
                {
                    "pub_key": {
                        "type": "tendermint/PubKeySecp256k1",
                        "value": "AxPt3o4lK81VNI5XZZ9ik0HZ0saiEwFXDVbmU/NUhV7V"
                    },
                    "signature": "HPB4aC1XuL/zYsQiPa+Stq5b1FPsXJ9LlBeA8iALl191w/kM5lvFAT5J6UUHmKivpzDknoXuxtyjDkallZYY/w=="
                }
            ]
        }
    }
}

```

-dx
#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeBurnNonFungibleItem message is received.

In the file (./x/kyc/handler.go) start with the following code:

![Image-1](pic_kyc/Whitelist_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeBurnNonFungibleItem message in handleMsgBurnNonFungibleItem:

![Image-2](pic_kyc/Whitelist_02.png)


In this function, requirements need to be met before emitted by the network.  

* Authoriser, Issuer, provider must be authorised users.
* User with valid account only can proceed for KYC process.  


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_kyc/Whitelist_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using xxBurnedFungibleToken(string,string,string,bignumber)
* Item owner
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| symbol | string | Token symbol, which must be unique| | 
| owner | string | Item owner| | 
| account | string | Account address| |
| value | string | value| | 


## 2. MsgRevokeWhitelist 
This is the message type used to revoke base on the existing whitelist.

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| owner | string | true   | Owner account address| | 
| payload | RevokePayload | true   | RevokePayload data| | 
| signatures | []Signature | true   | Signatures| | 


#### RevokePayload Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| kyc | RevokeKycData | true   | KYC data| | 
| pub_key | crypto.PubKey | true   | PubKey | |
| signature | []byte | true   | signatures | |


#### Payload Information
| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| from | string | true   | account address| | 
| nonce | string | true   | nonce| | 
| to | string | true   | account address| | 


#### Example

```
{
    "type": "kyc/revokeWhitelist",
    "value": {
        "owner": "mxw1y0j6xqc8dsafx2tfv4m8765mw7wrvlespzfyfq",
        "payload": {
            "kyc": {
                "from": "mxw126l5vx5s478khryv5l597lhdsfvnq9tmvmzfsl",
                "nonce": "0",
                "to": "mxw1nyk9r6347l3a6l2t0yk0mczqgumsnfuqjqwda4"
            },
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "AxPt3o4lK81VNI5XZZ9ik0HZ0saiEwFXDVbmU/NUhV7V"
            },
            "signature": "vA7SVyE2Nap8Ni8UbW/J/CJztU4wM4RVjAXluHt+8jhonzFZEpC2lQHYO0RAcGR/lou7k1HwZ9jGkouUULeIUw=="
        },
        "signatures": [
            {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "Aw96JCN8YXpQqxolKEeMDgpSdYMdgVgOWEdfi96+zo+p"
                },
                "signature": "ZwGjv5XPrHVMv9RhcretrKz7PGsCMzgdKJQWQQqZc9htEVeHWfzi9k+263YCSSSYpiumymdULudzRRFicJYlqQ=="
            }
        ]
    }
}

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgRevokeWhitelist message is received.

In the file (./x/kyc/handler.go) start with the following code:

![Image-1](pic_kyc/Whitelist_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgRevokeWhitelist message in handleMsgBurnNonFungibleItem:

![Image-2](pic_kyc/RevokeWhitelist_02.png)


In this function, requirements need to be met before emitted by the network.  

* Authoriser, Issuer, provider must be authorised users.
* User with valid account and KYC completed only can proceed this.

#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_kyc/RevokeWhitelist_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using RevokedWhitelist(string,string)
* Owner address
* Event Parameters as below: 


| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| address | string | Targeted address| | 
| value | string | value| | 


## 3. MsgKycBind
This is the message type used to do KYC whitelisting (by Bussiness users).

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| from | string | true   | Account address| | 
| to | string | true   | Account address| | 
| kycAddress | string | true   | KYC address| | 


-dx
#### Example

```

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgKycBind message is received.

In the file (./x/kyc/handler.go) start with the following code:

![Image-1](pic_kyc/Whitelist_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgKycBind message in handleMsgBurnNonFungibleItem:

![Image-2](pic_kyc/KycBind_02.png)


In this function, requirements need to be met before emitted by the network.  

* Authoriser, Issuer, provider must be authorised users.
* Business Entity with valid account only can proceed for Corporate-KYC process.  


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_kyc/KycBind_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using KycBinded(string,string,string)
* Signer
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| from | string | Account address| | 
| to | string | Account address| | 
| value | string | KYC address| | 



## 4. MsgKycUnbind
This is the message type used to revoke base on the existing whitelist (by Bussiness users).

#### Parameters

The message type contains the following parameters:

| Name | Type | Required | Description                 |
| ---- | ---- | -------- | --------------------------- |
| from | string | true   | Account address| | 
| to | string | true   | Account address| | 
| kycAddress | string | true   | KYC address| | 


-dx
#### Example

```

```

#### Handler

The role of the handler is to define what action(s) needs to be taken when this MsgTypeBurnNonFungibleItem message is received.

In the file (./x/kyc/handler.go) start with the following code:

![Image-1](pic_kyc/Whitelist_01.png)


NewHandler is essentially a sub-router that directs messages coming into this module to the proper handler.
Now, you need to define the actual logic for handling the MsgTypeBurnNonFungibleItem message in handleMsgBurnNonFungibleItem:

![Image-2](pic_kyc/KycUnbind_02.png)


In this function, requirements need to be met before emitted by the network.  

* Authoriser, Issuer, provider must be authorised users.
* Business Entity with valid account and Corporate-KYC completed only can proceed this.


#### Events
This tutorial describes how to create maxonrow events for scanner on this after emitted by a network.

![Image-1](pic_kyc/KycUnbind_03.png)  


#### Usage
This MakeMxwEvents create maxonrow events, by accepting :

* Custom Event Signature : using KycUnbinded(string,string,string)
* Signer
* Event Parameters as below: 

| Name | Type | Description                 |
| ---- | ---- | --------------------------- |
| from | string | Account address| | 
| to | string | Account address| | 
| value | string | KYC address| | 


### Querier

Now you can navigate to the ./x/kyc/querier.go file. 
This is the place to define which queries against application state users will be able to make. 
 
Here, you will see NewQuerier been defined, and it acts as a sub-router for queries to this module (similar the NewHandler function). Note that because there isn't an interface similar to Msg for queries, we need to manually define switch statement cases (they can't be pulled off of the query .Route() function):

![Image-1](pic/QuerierKYC.png)


This module will expose few queries:

## A. IsWhitelisted
This takes an account address and returns whether been whitelisted.

After the router is defined, define the inputs and responses for this queryTokenData:

![Image-2](pic_kyc/queryIsWhitelisted.png)


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
    	"/custom/kyc/is_whitelisted/mxw1md4u2zxz2ne5vsf9t4uun7q2k0nc3ly5g22dne",
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
            "value": "VHJ1ZQ==",
            "proof": null,
            "height": "36",
            "codespace": ""
        }
    }
}
```


## B. IsAuthorised
This takes an account address and returns whether been authorised.

After the router is defined, define the inputs and responses for this queryTokenData:

![Image-2](pic_kyc/queryIsAuthorised.png)


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
    	"/custom/kyc/is_authorised/mxw1fd6659xn28vrtt6a60hlfcqkfmf2asu4vy4sd6",
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
            "value": "VHJ1ZQ==",
            "proof": null,
            "height": "36",
            "codespace": ""
        }
    }
}
```

## C. GetKycAddress
This takes an account address and returns the KYC address.

After the router is defined, define the inputs and responses for this queryTokenData:

![Image-2](pic_kyc/queryGetKycAddress.png)


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
    	"/custom/kyc/get_kyc_address/mxw1md4u2zxz2ne5vsf9t4uun7q2k0nc3ly5g22dne",
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
            "value": "dGVzdEt5YzEyMzQ1MjIyMg==",
            "proof": null,
            "height": "36",
            "codespace": ""
        }
    }
}
```


## D. GetFee
This takes a fee setting and returns the fee setting info.

After the router is defined, define the inputs and responses for this queryTokenData:

![Image-2](pic_kyc/queryGetFee.png)


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


-dx
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
    	"/custom/kyc/get_fee/zero",
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
            "code": 1,
            "log": "{\"codespace\":\"sdk\",\"code\":1,\"message\":\"Invalid percentage: 0.05\"}",
            "info": "",
            "index": "0",
            "key": null,
            "value": null,
            "proof": null,
            "height": "36",
            "codespace": "sdk"
        }
    }
}
```
