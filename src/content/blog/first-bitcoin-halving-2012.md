---
title: "The First Bitcoin Halving: Block 210,000 on 28 November 2012"
meta_title: "First Bitcoin Halving 2012: Block 210000, 50 to 25 BTC | MOOD"
description: "On 28 Nov 2012 block 210000 cut the miner subsidy from 50 to 25 BTC. How the rule works, what happened that day, and how to check it yourself."
date: "2026-11-06"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "First Bitcoin halving: quick facts"
faqs:
  - title: "When was the first Bitcoin halving?"
    content: "28 November 2012, when block 210,000 was mined at 15:24:38 UTC."
  - title: "What changed at the first halving?"
    content: "The block subsidy paid to miners dropped from 50 BTC to 25 BTC. Transaction fees were unchanged; they simply sat on top of the new lower subsidy."
  - title: "Why block 210,000?"
    content: "Bitcoin Core sets `nSubsidyHalvingInterval = 210000`. The subsidy is right-shifted once for every completed interval of that length."
  - title: "Who mined block 210,000?"
    content: "Slush's Pool. The contributing miner posted on Bitcointalk as laughingbear. Modern explorers may label the same pool Braiins."
  - title: "How much of the supply existed at the first halving?"
    content: "Exactly half of the 21 million target by schedule: 10,500,000 BTC had been issued across the first 210,000 blocks at 50 BTC each (ignoring rare underpays elsewhere on the chain)."
  - title: "How can I verify this myself?"
    content: "Look up height 210000 on mempool.space or blockstream.info. Match the hash, the UTC timestamp, and the 25 BTC-era coinbase."
after_faq: |
  ## Wear the moments you can date

  We print Bitcoin history you can verify. The [Genesis T-shirt](/products/genesis-t-shirt) carries the Times headline from the block that started the 50 BTC era. The first halving is the other end of that opening chapter: the day the subsidy actually cut in half on schedule. More dated designs are in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  - mempool.space API, [block 210000](https://mempool.space/api/block/000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e) (hash, timestamp 1354116278, tx_count 457)
  - mempool.space API, [block-height 210000](https://mempool.space/api/block-height/210000) → same hash
  - blockstream.info API, [same block header fields](https://blockstream.info/api/block/000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e)
  - mempool.space [coinbase of block 210000](https://mempool.space/api/block/000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e/txs) (txid 76a30f7e…7ce9, value 3856295554 sats = 38.56295554 BTC, `/slush/` tag)
  - Bitcoin Wiki, [Halving day 2012](https://en.bitcoin.it/wiki/Halving_day_2012)
  - Bitcoin Wiki, [Controlled supply](https://en.bitcoin.it/wiki/Controlled_supply) (210,000-block / 50% schedule)
  - Bitcoin Core, [`nSubsidyHalvingInterval = 210000` in chainparams](https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp)
  - [GetBlockSubsidy explanation](https://bitcoin.stackexchange.com/questions/41994/where-is-the-source-code-that-allows-new-coins-to-be-generated) (50 * COIN, right-shift by halvings)
  - Bitcointalk, ["210000 block found"](https://bitcointalk.org/index.php?topic=128200.0) (28 Nov 2012, stats + Slush + fees)
  - Bitcointalk, ["Block 210000 found"](https://bitcointalk.org/index.php?topic=128221.0) (laughingbear, Slush confirmation)
  - Bitcointalk, ["Happyhalving day"](https://bitcointalk.org/index.php?topic=119168.0) contemporary thread
---

**On 28 November 2012 at 15:24:38 UTC, Bitcoin mined block 210,000 and the miner subsidy dropped from 50 BTC to 25 BTC.** That was the first subsidy halving — the moment the issuance schedule written into the protocol actually cut new-coin creation in half. The anniversary falls every 28 November. This year it is three weeks from publication day.

No soft fork, no vote, no central bank. Every full node already knew the rule: after every 210,000 blocks, right-shift the subsidy.

## The first halving at a glance

| | |
|---|---|
| Date | 28 Nov 2012 |
| Block height | 210,000 |
| Block hash | `000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e` |
| Header timestamp | 15:24:38 UTC (Unix 1354116278) |
| Subsidy before | 50 BTC per block |
| Subsidy after | 25 BTC per block |
| Transactions in the block | 457 |
| Coinbase total | 38.56295554 BTC (25 BTC subsidy + ~13.56 BTC fees) |
| Pool / finder | Slush's Pool; miner handle laughingbear |
| Supply just before | 10,500,000 BTC — 50% of the 21 million target |
| Interval in the code | `nSubsidyHalvingInterval = 210000` |

## What a halving actually is

Bitcoin creates new coins only in the coinbase of each block. The function that sets that amount starts at 50 BTC and halves it every 210,000 blocks:

```
int halvings = nHeight / consensusParams.nSubsidyHalvingInterval;
CAmount nSubsidy = 50 * COIN;
nSubsidy >>= halvings;
```

`nSubsidyHalvingInterval` is hard-coded to **210,000** in Bitcoin Core's consensus parameters (`src/kernel/chainparams.cpp`). Integer height division means block 209,999 was still in era 0 (50 BTC). Block 210,000 is the first block of era 1 (25 BTC). Later eras follow the same math: 420,000 → 12.5, 630,000 → 6.25, 840,000 → 3.125.

At roughly one block every ten minutes, 210,000 blocks is about four years. The first era ran longer in calendar time than a neat four-year mark — about 1,425 days from genesis to block 210,000 — because early hashrate and difficulty did not match today's cadence.

The controlled-supply schedule is why Bitcoin approaches, but never quite reaches, 21 million coins. Each era issues half as many new coins as the one before: 10.5M, then 5.25M, then 2.625M, and so on.

## What happened on 28 November 2012

Bitcointalk was already running a long "Happy halving day" thread when the block landed. Within minutes a separate thread titled **210000 block found** posted the explorer stats: height 210000, timestamp 2012-11-28 15:24:38, relayed by Slush, block reward **25 BTC**, and unusually large fees of about **13.56 BTC**.

Forum users noticed the fee spike immediately. People had been stuffing transactions into the mempool to get into the historic block — some with fees of 0.1, 0.5, even 1 BTC or more. One reply summed it up: people wanted to be part of the glory. Blockchain.info put fireworks on the block page. Another poster wrote that it felt weird seeing the coin totals end in a 5 instead of a 0.

Slush's Pool found the block. The contributing miner posted as **laughingbear**: new to the forums, mining for less than a week on an average GPU, and calling it the first block they had ever found. The Bitcoin Wiki records the hardware as a Radeon HD 5800-series card. Slush confirmed the find on the pool and sent a small bonus. Contemporary explorers still show the coinbase tagged `/slush/`; modern explorers often attribute the same pool under its later Braiins name.

The network did not stall. Hashrate did not collapse on the spot. The rule that had lived in the source since day one simply executed.

## How to check block 210,000 yourself

You do not have to take our word for it. Open a public explorer and look up the height or the hash.

1. Go to [mempool.space/block/210000](https://mempool.space/block/210000) or [blockstream.info/block/210000](https://blockstream.info/block/210000).
2. Confirm the hash starts with `000000000000048b95347e83192f69cf…1342e`.
3. Confirm the timestamp: **2012-11-28 15:24:38 UTC**.
4. Open the coinbase (first transaction). The output value is **38.56295554 BTC** — that is the 25 BTC subsidy plus the fees collected in that block, not a 50 BTC reward.
5. Optionally open block **209999** next door. Its coinbase still reflects the 50 BTC subsidy era.

Same habit as looking up genesis or the pizza transaction: [see Bitcoin history yourself on a block explorer](/blog/find-genesis-block-pizza-transaction-explorer). Dated moments belong on a chain you can re-check.

## Where the first halving sits on the early timeline

The first halving is the first big supply event after Bitcoin's chaotic opening years:

- 3 Jan 2009 — genesis block (50 BTC subsidy begins)
- 12 Jan 2009 — first person-to-person payment in [block 170](/blog/hal-finney-first-bitcoin-transaction)
- 22 May 2010 — [Pizza Day](/blog/bitcoin-pizza-day-transaction)
- 15 Aug 2010 — the [value overflow incident](/blog/bitcoin-value-overflow-incident-2010), when the 21 million sanity check was hardened in code
- **28 Nov 2012 — first subsidy halving at block 210,000**

The early stretch through 2010 is covered in our [Bitcoin history timeline 2008–2010](/blog/bitcoin-history-timeline-2008-2010). **28 November** belongs on the recurring list in our [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar) alongside Whitepaper Day (31 Oct), Genesis Day (3 Jan), and Pizza Day (22 May).

Later halvings followed the same 210,000-block clock: 9 Jul 2016 (block 420,000), 11 May 2020 (block 630,000), and 20 Apr 2024 (block 840,000). The first one proved the schedule was real.
