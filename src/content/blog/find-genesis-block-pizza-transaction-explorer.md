---
title: "How to Find the Genesis Block and the Pizza Transaction on a Block Explorer"
meta_title: "See Bitcoin History Yourself: Genesis Block & Pizza Tx | MOOD"
description: "A 5-minute guide to viewing block 0's hidden Times headline and the 10,000 BTC pizza transaction on a free public block explorer, step by step."
date: "2026-11-01"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Genesis block and pizza transaction: quick facts"
faqs:
  - title: "What is the genesis block hash?"
    content: "`000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`. It identifies block 0, mined on 3 January 2009."
  - title: "How do I view the genesis block?"
    content: "Search for block `0` (or the hash above) on a public explorer such as mempool.space or blockstream.info. No account is needed."
  - title: "Where is the Times headline stored?"
    content: "In the scriptsig of the genesis block's only transaction, the coinbase input, as hex. Decoding the bytes after `45` to ASCII gives \"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.\""
  - title: "Can the 50 BTC in the genesis block be spent?"
    content: "No. Because of how the genesis block is hard-coded into Bitcoin's software, its 50 BTC reward is not in the set of spendable coins."
  - title: "What block is the pizza transaction in?"
    content: "Block 57,043, timestamped 22 May 2010 at 18:16:31 UTC."
  - title: "How much was the fee on the pizza transaction?"
    content: "0.99 BTC. The 131 inputs totalled 10,000.99 BTC, and the single output was 10,000 BTC."
after_faq: |
  ## Wear what you verified

  Both of these lines of data are printed on MOOD shirts, made in Paphos, Cyprus: the headline on the [Genesis T-shirt](/products/genesis-t-shirt) and the txid on the [Pizza T-shirt](/products/pizza-t-shirt). See the full range on our [Bitcoin T-shirts page](/bitcoin-t-shirts).

  <a href="/bitcoin-t-shirts" className="btn btn-primary">Shop Bitcoin T-shirts</a>

  ## Sources

  - mempool.space, [genesis block (block 0)](https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f) and API: [block-height/0](https://mempool.space/api/block-height/0), [genesis coinbase tx](https://mempool.space/api/tx/4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b)
  - mempool.space, [pizza transaction](https://mempool.space/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d) and API: [tx](https://mempool.space/api/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d), [outspends](https://mempool.space/api/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d/outspends)
  - Blockstream explorer, [block 0](https://blockstream.info/block-height/0) and [pizza transaction](https://blockstream.info/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d)
  - Bitcoin Wiki, [Genesis block](https://en.bitcoin.it/wiki/Genesis_block): the embedded headline and the unspendable reward
  - Bitcointalk, [Laszlo Hanyecz's "Pizza for bitcoins?" thread](https://bitcointalk.org/index.php?topic=137.0)
---

**You can see Bitcoin's two most famous moments yourself in about five minutes, for free, with no wallet or account.** Open a public block explorer such as mempool.space, search for block `0` to find the genesis block and its hidden Times headline, then paste the pizza transaction ID `a1075db5…d48d` to see the 10,000 BTC payment in block 57,043.

This is the hands-on companion to our posts on [what the Genesis Block message means](/blog/genesis-block-message-chancellor-on-brink) and [the Bitcoin Pizza Day transaction](/blog/bitcoin-pizza-day-transaction). Those tell the stories. This one shows you where to click.

## What you need

- A browser.
- A public block explorer. We use [mempool.space](https://mempool.space); [blockstream.info](https://blockstream.info) works the same way.
- Optionally, any hex-to-text converter (or one line of Python) for decoding the headline.

## Part 1: Find the genesis block

### Step 1: Search for block 0

Type `0` into the explorer's search bar and choose the block result. On Blockstream you can also go straight to [blockstream.info/block-height/0](https://blockstream.info/block-height/0).

### Step 2: Check the genesis block hash

The block's identifier, its hash, is:

`000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`

Every full Bitcoin node has this exact value built in. If your explorer shows something else, you're not looking at Bitcoin. The page also shows:

| Field | Value |
|---|---|
| Height | 0 |
| Timestamp | 3 January 2009, 18:15:05 UTC |
| Previous block | none (it's the first) |
| Transactions | 1 |
| Size | 285 bytes |
| Nonce | 2,083,236,893 |
| Difficulty | 1 |

### Step 3: Open the coinbase transaction

The block has one transaction, the coinbase, with ID `4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b`. Click it. Its input says "coinbase" instead of pointing to an earlier payment, because new coins were being created.

### Step 4: Find the hidden headline

Expand the input details and look for the field called **ScriptSig** (on mempool.space you may need to click "Details"). You'll see this hex:

```
04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73
```

The first part (`04ffff001d 01 04`) is technical data. Then `45` (69 in decimal) announces that 69 bytes of data follow, and those bytes are plain text.

### Step 5: Decode the hex to text

Copy everything after `45` (starting `5468652054...`) into any hex-to-ASCII converter, or run:

```python
print(bytes.fromhex("5468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73").decode())
```

The output:

> The Times 03/Jan/2009 Chancellor on brink of second bailout for banks

Each pair of hex characters is one letter: `54` is "T", `68` is "h", `65` is "e". Some explorers also show an ASCII view of the scriptsig, so you may spot the sentence without decoding at all. It's the same line printed on the chest of the [MOOD Genesis T-shirt](/products/genesis-t-shirt).

### Step 6: Look at the 50 BTC that can never move

The coinbase has one output of 50 BTC, paid to a public key that explorers display as the address `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`. The explorer marks it **unspent**, and it always will be: the genesis block is hard-coded into the software in a way that leaves its reward out of the set of spendable coins, so those 50 BTC can never be spent. If you click the address, you'll see thousands of later transactions. Those are people sending small tributes to Satoshi's first address, and none of it has ever been spent.

## Part 2: Find the Pizza transaction

### Step 1: Paste the transaction ID

Paste this into the search bar:

`a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d`

It starts `a1075db5` and ends `d48d`, the same hash printed around the sleeve cuffs of the [MOOD Pizza T-shirt](/products/pizza-t-shirt).

### Step 2: Check the confirmation

The transaction page shows:

| Field | Value |
|---|---|
| Block | 57,043 |
| Block time | 22 May 2010, 18:16:31 UTC |
| Inputs | 131 |
| Outputs | 1 |
| Amount sent | 10,000 BTC |
| Fee | 0.99 BTC |
| Size | 23,620 bytes |

Click the block number to see block 57,043 itself (hash `00000000152340ca42227603908689183edc47355204e7aca59383b0aaac1fd8`). It holds just two transactions: the miner's coinbase and the pizza payment.

### Step 3: Read the inputs and output

The 131 inputs are many smaller earlier payments from Laszlo Hanyecz's wallet, gathered together to add up to 10,000.99 BTC. The single output sends exactly 10,000 BTC to `17SkEw2md5avVNyYgj6RiXuQKNwkXaxFyQ`, the payment to jercos, the forum user who had the two pizzas delivered. The remaining 0.99 BTC went to the miner as the fee.

### Step 4: Follow the money (optional)

Click the output and the explorer shows it was spent in the very next block, 57,044. The 10,000 BTC didn't sit still for long.

## What you're looking at

A block explorer is a website that reads the public Bitcoin blockchain and shows it in a readable form. It isn't a source of truth itself; it displays data that any node can check independently. That's why comparing two explorers, like mempool.space and blockstream.info, and getting the same hashes is meaningful.

- **Block hash:** a fingerprint of the block's header. The leading zeros are the visible result of proof-of-work.
- **Transaction ID (txid):** a fingerprint of one transaction. Change one byte and the ID changes completely.
- **Coinbase:** the first transaction in every block, where new bitcoin is created. Miners can put arbitrary data in its input, which is how Satoshi embedded the headline.
- **Inputs and outputs:** inputs are earlier coins being spent; outputs are where they go. Inputs minus outputs equals the fee.

Want the context around these two blocks? Our [Bitcoin history timeline 2008–2010](/blog/bitcoin-history-timeline-2008-2010) fills in what happened between them, and the [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar) tells you when to come back and look again: 3 January and 22 May.
