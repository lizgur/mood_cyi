---
title: "The 184 Billion Bitcoin Bug: Bitcoin's 2010 Value Overflow Incident"
meta_title: "The 184 Billion Bitcoin Bug (Block 74638, 2010) | MOOD"
description: "On 15 Aug 2010 block 74638 created 184 billion BTC out of thin air. How the overflow bug worked, how Satoshi fixed it in hours, and why the coins vanished."
date: "2026-11-04"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Value overflow incident: quick facts"
faqs:
  - title: "What was the Bitcoin value overflow incident?"
    content: "On 15 August 2010, block 74638 included a transaction that created about 184.5 billion BTC by exploiting an integer overflow in how Bitcoin added up output values."
  - title: "How many bitcoins were created?"
    content: "Two outputs of 92,233,720,368.54275808 BTC each, about 184,467,440,737 BTC in total, from a 0.5 BTC input."
  - title: "How fast was it fixed?"
    content: "Satoshi committed the fix about five hours after the block was mined and released it as Bitcoin v0.3.10. The clean chain overtook the bad one at block 74691."
  - title: "Do the 184 billion bitcoins still exist?"
    content: "No. The transaction isn't part of the longest valid chain, so the coins don't exist on Bitcoin today."
  - title: "Was it a hard fork?"
    content: "No. The fix made the rules stricter, which is a soft fork. Old nodes followed the clean chain once it became longer."
  - title: "Has Bitcoin's supply been broken since?"
    content: "The 21 million limit has been enforced in code as `MAX_MONEY` since this fix. A different inflation bug, CVE-2018-17144, was found and patched in 2018 before anyone exploited it."
after_faq: |
  ## Wear the rules, not the bug

  We make shirts about Bitcoin moments you can verify. The rules that caught this bug go back to nine pages from 2008, which you can wear as the [Whitepaper T-shirt](/products/whitepaper-t-shirt). The block that started it all is on the [Genesis T-shirt](/products/genesis-t-shirt), and the full range is in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/products/whitepaper-t-shirt" className="btn btn-primary">Shop the Whitepaper T-shirt</a>

  ## Sources

  - Bitcoin Wiki, [Value overflow incident](https://en.bitcoin.it/wiki/Value_overflow_incident)
  - Bitcointalk, ["Strange block 74638"](https://bitcointalk.org/index.php?topic=822.0) (15 Aug 2010)
  - Bitcointalk, Satoshi, ["Version 0.3.10 - block 74638 overflow PATCH!"](https://bitcointalk.org/index.php?topic=827.0)
  - [Fix commit, bitcoin/bitcoin d4c6b90](https://github.com/bitcoin/bitcoin/commit/d4c6b90ca3f9b47adb1b2724a0c3514f80635c84)
  - NVD, [CVE-2010-5139](https://nvd.nist.gov/vuln/detail/CVE-2010-5139)
  - Bitcoin Core, [CVE-2018-17144 disclosure](https://bitcoincore.org/en/2018/09/20/notice/)
---

**On 15 August 2010, block 74638 contained a transaction that created about 184.5 billion bitcoins out of nothing.** A bug let two huge outputs "wrap around" when added together, so the network accepted them. Within about five hours Satoshi Nakamoto had pushed a fix, miners restarted on a clean chain, and by block 74691 the bad coins were gone from Bitcoin's history for good.

It's the only time Bitcoin's supply was ever broken this badly, and it's also the moment the 21 million cap was first written into the code as a hard rule.

## The incident at a glance

| | |
|---|---|
| Date | 15 Aug 2010 |
| Bad block | 74638 (timestamp 17:05:57 UTC) |
| Bad transaction | 1d5e51… (full txid 4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b per the Bitcoin Wiki) |
| Input | 0.5 BTC |
| Outputs | 2 × 92,233,720,368.54275808 BTC |
| Total created | about 184,467,440,737 BTC |
| Spotted | 18:08 UTC, Bitcointalk thread "Strange block 74638" |
| Fix committed | 21:35 UTC, "fix for block 74638 overflow output transaction" |
| Release | Bitcoin v0.3.10 |
| Good chain took over | Block 74691 |
| Tracked as | CVE-2010-5139 |

## What happened

Bitcoin was about 19 months old. [Pizza Day](/blog/bitcoin-pizza-day-transaction) had happened less than three months earlier, and the community was still small enough to fit on one forum.

At 18:08 UTC on 15 August, Jeff Garzik (jgarzik) posted a thread titled "Strange block 74638." The "value out" of the block was **92,233,720,368.54 BTC**. He asked if it was UINT64_MAX. Another user replied that it was 2^63 / 10^8, so it looked like INT64_MAX, the largest number a signed 64-bit integer can hold.

That was the clue. Someone had built a transaction that:

- spent **0.5 BTC**, and
- sent **92,233,720,368.54 BTC** to each of two addresses.

The miner of the block also picked up a reward of 50.51 BTC: the normal 50 BTC, plus what the software read as a 0.51 BTC fee. That's 0.01 BTC more than the input could pay for.

## How the bug worked

Bitcoin counts value in satoshis (1 BTC = 100,000,000 sats) and stores amounts as signed 64-bit integers. The biggest such number is 9,223,372,036,854,775,807, or about 92.2 billion BTC.

In 2010 the code checked each output on its own: "is this value negative?" Each of the two giant outputs was positive, so each one passed.

The problem was the sum. Adding two numbers that size goes past the 64-bit limit and wraps around to a tiny negative number. So when the software compared total outputs to total inputs, the outputs looked *smaller* than the 0.5 BTC input. The difference looked like an ordinary fee. Every check passed.

The fix is easy to read even if you don't code. Satoshi's commit added one new constant:

```
static const int64 MAX_MONEY = 21000000 * COIN;
```

and new checks that reject any output above 21 million BTC, any transaction whose outputs add up to more than 21 million BTC, and the same limits on inputs. The 21 million cap described in the [whitepaper era](/blog/bitcoin-whitepaper-explained) had always been the emission schedule. After this commit it was also a validity rule.

## The five-hour fix

The timeline, using the forum and commit timestamps:

1. **17:05 UTC:** block 74638 is mined.
2. **18:08 UTC:** "Strange block 74638" goes up on Bitcointalk.
3. **About 20:40 UTC:** a first patch is posted in the development thread, per a later forum recap.
4. **21:35 UTC:** Satoshi commits the fix to the project's code repository.
5. **Shortly after:** Satoshi announces v0.3.10 as the "block 74638 overflow PATCH!" and tells users to upgrade.

Miners who upgraded rejected block 74638 and started building a new chain from the block before it. Unpatched nodes kept extending the bad chain for a while. Because a soft fork only *tightens* the rules, the old software would still follow the new chain once it got longer.

It did, at **block 74691**. Satoshi then updated his announcement: "The good block chain has overtaken the bad block chain, so you can just upgrade and it'll automatically reorg away the bad block chain."

## Where did the 184 billion BTC go?

Nowhere, because on the chain everyone uses today they never existed. The bad transaction is not in Bitcoin's history. The 0.5 BTC it tried to spend is still there, unspent since 2010, according to the Bitcoin Wiki.

That's the part worth remembering. Nobody "deleted" the coins by decree. Nodes ran stricter rules, miners did the work, and the longest valid chain won, which is the same way the whitepaper says Bitcoin settles every dispute.

## Check it yourself

1. Open [block 74638 on mempool.space](https://mempool.space/block-height/74638). You'll see the block that replaced the bad one, with no 92-billion outputs in it.
2. Search the bad txid. It won't be found on the main chain.
3. Look up the [fix commit on GitHub](https://github.com/bitcoin/bitcoin/commit/d4c6b90ca3f9b47adb1b2724a0c3514f80635c84) and find `MAX_MONEY`.

Our [block explorer guide](/blog/find-genesis-block-pizza-transaction-explorer) explains how to read blocks and transactions if you're new to explorers.

## Where it sits in Bitcoin's early history

- 31 Oct 2008: the whitepaper
- 3 Jan 2009: the genesis block
- 12 Jan 2009: [block 170, Satoshi sends Hal Finney 10 BTC](/blog/hal-finney-first-bitcoin-transaction)
- 22 May 2010: Pizza Day
- **15 Aug 2010: the value overflow incident**

The full story is in our [Bitcoin history timeline 2008–2010](/blog/bitcoin-history-timeline-2008-2010), and 15 August is on our [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar).
