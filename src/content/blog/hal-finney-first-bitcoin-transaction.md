---
title: "Hal Finney, “Running bitcoin” and Block 170: The First Bitcoin Transaction"
meta_title: "Hal Finney & Block 170: The First Bitcoin Transaction | MOOD"
description: "On 12 Jan 2009 Satoshi sent Hal Finney 10 BTC in block 170, the first bitcoin payment between two people. The tweet, the txid and how to check it yourself."
date: "2026-11-03"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Hal Finney & Block 170: quick facts"
faqs:
  - title: "What was the first bitcoin transaction?"
    content: "The first transaction between two people was Satoshi Nakamoto sending 10 BTC to Hal Finney in block 170 on 12 January 2009. Txid: f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16."
  - title: "When did Hal Finney tweet “Running bitcoin”?"
    content: "At 03:33 UTC on 11 January 2009, which was the evening of 10 January in California, where he lived."
  - title: "How much bitcoin did Satoshi send Hal Finney?"
    content: "10 BTC. The other 40 BTC from the 50 BTC input went back to Satoshi as change, with no fee."
  - title: "Where did the coins come from?"
    content: "From the mining reward of block 9."
  - title: "Was Hal Finney Satoshi?"
    content: "There is no proof of that. The blockchain shows them as two parties, and Hal himself wrote about emailing Satoshi as someone else."
after_faq: |
  ## Wear the first days

  We design MOOD shirts around moments you can verify. Block 170 sits right after the block that started it all, which you can wear as the [Genesis T-shirt](/products/genesis-t-shirt). The rest of the range is in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  - Hal Finney, [“Running bitcoin” on X](https://x.com/halfin/status/1110302988) ([archived](https://web.archive.org/web/2026/https://twitter.com/halfin/status/1110302988))
  - Hal Finney, [“Bitcoin and me (Hal Finney),”](https://bitcointalk.org/index.php?topic=155054.0) Bitcointalk, 2013
  - [Block 170 on mempool.space](https://mempool.space/block/00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee)
  - [Transaction f4184fc5… on mempool.space](https://mempool.space/tx/f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16)
  - [Block 170 on blockstream.info](https://blockstream.info/block-height/170)
  - Bitcoin Casual, [first bitcoin transaction](https://www.bitcoincasual.com/guides/first-bitcoin-transaction-block-170)
---

**The first bitcoin transaction between two people was Satoshi Nakamoto sending 10 BTC to Hal Finney, confirmed in block 170 on 12 January 2009 (03:30 UTC).** A day earlier Hal had posted two words on Twitter that are now part of Bitcoin folklore: “Running bitcoin.” Both are still checkable today, one on X and one on the blockchain itself.

Bitcoin’s [genesis block](/blog/genesis-block-message-chancellor-on-brink) was mined on 3 January 2009 and the software was released on 9 January. Hal was there within days. This post covers what he did, what block 170 actually contains, and why it matters.

## Block 170 at a glance

| | |
|---|---|
| Block height | 170 |
| Block hash | 00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee |
| Time | 12 Jan 2009, 03:30:25 UTC (still the evening of 11 Jan in California) |
| Transactions | 2 (the coinbase reward + the payment) |
| Payment txid | f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16 |
| Sent to Hal | 10 BTC |
| Change back to Satoshi | 40 BTC |
| Fee | 0 BTC |
| Coins came from | The 50 BTC mining reward of block 9 |

## Who was Hal Finney?

Hal Finney was a cryptographer and programmer who had long been interested in digital cash. In his own words, in a 2013 Bitcointalk post titled “Bitcoin and me,” he had “always loved crypto” and “had long been interested in cryptographic payment schemes.” When Satoshi announced Bitcoin on the cryptography mailing list, many experts were skeptical. Hal wrote that he “was more positive.”

That attitude made him one of the very first people outside Satoshi to take the software seriously, and to actually run it.

## “Running bitcoin”: the tweet

Hal’s tweet went out from his account @halfin at **03:33:52 UTC on 11 January 2009**. Hal lived in California, so on his clock it was still the evening of 10 January. That is why you will see both dates quoted online; they are the same moment.

The text is just “Running bitcoin.” No link, no hashtag. It is still live on X and has been archived by the Wayback Machine. Today it is one of the most-quoted posts in crypto history, mostly because of what it represented: someone besides Satoshi had downloaded version 0.1 and was mining on the network.

In “Bitcoin and me” he put it plainly: “I think I was the first person besides Satoshi to run bitcoin.”

## Block 170: the first payment

The next day, Satoshi tested the network by sending Hal coins. Hal described it this way: “I was the recipient of the first bitcoin transaction, when Satoshi sent ten coins to me as a test.”

Here’s what the blockchain shows:

- **The input:** the 50 BTC mining reward from **block 9**, mined by Satoshi in the first days of the network.
- **Output 1:** 10 BTC to Hal’s public key.
- **Output 2:** 40 BTC back to Satoshi as change.
- **Fee:** zero. In 2009 blocks were nearly empty, and fees weren’t needed to get a transaction confirmed.

Block 170 has only two transactions: the usual coinbase reward for whoever mined the block, and this payment. Every earlier block contained only coinbase rewards, so block 170 is the first block where bitcoin moves from one person to another.

Both outputs use an old format called pay-to-public-key (P2PK). Instead of a modern address, the coins are locked straight to a public key. Explorers usually still display a legacy “1…” address for convenience.

## Why it matters

Mining creates coins. But money only becomes money when it moves between people. Block 170 is the first proof that the system Satoshi described in the whitepaper worked between two separate parties: Hal could receive coins, and the network agreed the payment was valid.

It also fixes the timeline. The usual early sequence goes:

1. 31 Oct 2008: whitepaper
2. 3 Jan 2009: genesis block
3. 9 Jan 2009: v0.1 released
4. 11 Jan 2009 (UTC): “Running bitcoin”
5. 12 Jan 2009: block 170, Satoshi → Hal
6. 22 May 2010: Bitcoin Pizza Day

We walk through each date in our [Bitcoin history timeline 2008–2010](/blog/bitcoin-history-timeline-2008-2010), and 12 January is on our [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar).

Hal also spent those first days emailing Satoshi bug reports, which Satoshi then fixed. Bitcoin had real testers before it had a price.

## Check it yourself

You don’t need to trust anyone here, including us.

1. Open [mempool.space/block/170](https://mempool.space/block/00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee) or search “170” on [blockstream.info](https://blockstream.info/block-height/170).
2. Look for the second transaction, starting **f4184fc5**.
3. Check the outputs: 10 BTC and 40 BTC.
4. Click the input. It leads to the coinbase transaction of block 9.

Our [block explorer guide](/blog/find-genesis-block-pizza-transaction-explorer) shows the same method for the genesis block and the pizza transaction.

## After 2009

Later in 2009 Hal was diagnosed with ALS, which he wrote about openly in “Bitcoin and me.” He kept writing code and posting for years after his diagnosis. His tweet and his 10 BTC are a permanent part of the record, and many Bitcoiners still mark 11 January as “Running bitcoin” day.
