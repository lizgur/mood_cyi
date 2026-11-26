---
title: "Bitcoin's First Difficulty Adjustment: Block 32,256 (30 December 2009)"
meta_title: "First Bitcoin Difficulty Adjustment: Block 32,256, Dec 2009 | MOOD"
description: "Bitcoin's difficulty rose above 1 for the first time on 30 Dec 2009 at block 32,256, from 1.00 to 1.18 (+18%). What happened, why, and how to check it on-chain."
date: "2026-11-15"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "First Bitcoin difficulty adjustment: quick facts"
faqs:
  - title: "When was Bitcoin's first difficulty adjustment?"
    content: "On 30 December 2009. Block 32,256, mined at 06:11:04 UTC, was the first block at the new difficulty."
  - title: "How much did the difficulty change?"
    content: "From 1.00 to about 1.18, an increase of roughly 18%."
  - title: "Why didn't the difficulty change earlier in 2009?"
    content: "It was already at the minimum, difficulty 1. Blocks were slower than ten minutes, but the protocol cannot go below difficulty 1, so it stayed there."
  - title: "How often does Bitcoin's difficulty adjust?"
    content: "Every 2,016 blocks, which is about two weeks at one block every ten minutes."
  - title: "When did Bitcoin's difficulty first go down?"
    content: "On 19 May 2010, from 12.85 to 11.85."
after_faq: |
  ## Wear the history

  At MOOD we print Bitcoin moments you can verify on-chain. The [Genesis T-shirt](/products/genesis-t-shirt) carries the block that started it all, back when difficulty was still 1. See every design in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  - [Block 32,256](https://www.blockchain.com/explorer/blocks/btc/000000004f2886a170adb7204cb0c7a824217dd24d11a74423d564c4e0904967) (hash `000000004f2886a170adb7204cb0c7a824217dd24d11a74423d564c4e0904967`), Blockchain.com notable-block note
  - Bitcoin Wiki, ["2009"](https://en.bitcoin.it/wiki/2009) (30 Dec: "The difficulty adjusts for the first time, rising from 1 to 1.18 on block 32256")
  - Satoshi Nakamoto, ["Re: Proof-of-work difficulty increasing"](http://satoshinakamoto.me/2010/02/15/re-proof-of-work-difficulty-increasing/), Bitcointalk, 15 Feb 2010 (with his difficulty table); [original thread](https://bitcointalk.org/index.php?topic=43.0)
  - Block headers checked via mempool.space API: [block 30,240](https://mempool.space/block/000000000fa8bfa0f0dd32f956b874b2c7f1772c5fbedcb1b35e03335c7fb0a8); [block 32,255](https://mempool.space/block/00000000984f962134a7291e3693075ae03e521f0ee33378ec30a334d860034b); [block 32,256](https://mempool.space/block/000000004f2886a170adb7204cb0c7a824217dd24d11a74423d564c4e0904967)
  - Bitcoin Wiki, ["Difficulty"](https://en.bitcoin.it/wiki/Difficulty)
  - Satoshi Nakamoto, ["Bitcoin: A Peer-to-Peer Electronic Cash System"](https://bitcoin.org/bitcoin.pdf), section 4 (Proof-of-Work)
  - Bitcoin.com, ["Notable Bitcoin transactions, blocks and addresses"](https://www.bitcoin.com/explorer/btc/notable/) (first difficulty decrease, 19 May 2010)
---

**Bitcoin's mining difficulty went up for the first time on 30 December 2009.** At block 32,256, mined at 06:11:04 UTC, the difficulty rose from 1.00 to about 1.18, an increase of roughly 18%. Satoshi Nakamoto later wrote: "We had our first automatic adjustment of the proof-of-work difficulty on 30 Dec 2009." It was the first time the rule in the Whitepaper actually made mining harder.

## The first difficulty adjustment at a glance

| Fact | Value | Source |
|---|---|---|
| Date | 30 December 2009 | Satoshi, Bitcointalk; Bitcoin Wiki |
| First block at the new difficulty | 32,256 | Block 32,256 on-chain |
| Block time | 2009-12-30 06:11:04 UTC | Block header |
| Difficulty before | 1.00 (the minimum) | Block 32,255 on-chain |
| Difficulty after | 1.18 (exactly 1.1829) | Block 32,256 on-chain |
| Change | about +18% | Satoshi's table |
| Block reward | 50 BTC | Block 32,256 coinbase |

## What is Bitcoin mining difficulty?

Difficulty is a number that says how hard it is to find a valid block. A block's hash has to be below a target; the lower the target, the higher the difficulty. Difficulty 1 is the easiest setting the protocol allows.

The Whitepaper sets out the idea in one line: "the proof-of-work difficulty is determined by a moving average targeting an average number of blocks per hour. If they're generated too fast, the difficulty increases." In the software, the network looks back every **2,016 blocks**. At one block every ten minutes, 2,016 blocks take exactly two weeks. If they came faster, difficulty goes up. If slower, it goes down, in proportion.

You can read the whole Whitepaper section by section in our [Bitcoin Whitepaper explained](/blog/bitcoin-whitepaper-explained) guide.

## Why nothing changed for almost a year

Bitcoin launched with the [Genesis Block](/blog/genesis-block-message-chancellor-on-brink) on 3 January 2009 and the [v0.1 software](/blog/bitcoin-v0-1-release-2009) a few days later. Through most of 2009 only a handful of people mined, and blocks came slower than one every ten minutes.

Under the rule, the network should have made mining *easier*. It couldn't. Satoshi explained: "The minimum difficulty is 32 zero bits, so even if only one person was running a node, the difficulty doesn't get any easier than that. For most of last year, we were hovering below the minimum." So every retarget in 2009 before December left the difficulty at 1.

## What happened on 30 December 2009

By late 2009 enough miners had joined that blocks were finally coming faster than ten minutes. The 2,016-block window that ended at block 32,255 ran from block 30,240 (18 December 2009, 09:56:01 UTC) to block 32,255 (30 December 2009, 05:58:59 UTC). That is about **11.8 days instead of 14**, or one block roughly every 8.5 minutes.

Divide two weeks by 11.8 days and you get about 1.18. That is exactly where the network set the new difficulty. Block 32,256 carries the new target (compact "bits" `0x1d00d86a`, up from `0x1d00ffff`), which works out to difficulty 1.1829. Satoshi listed the same new target, `00000000d86a…`, against the date 30/12/2009 in his own notes.

The block itself is ordinary. It has a single coinbase transaction paying 50 BTC. Blockchain.com tags it as "the first to be mined following the networks first ever difficulty adjustment from 1 to 1.18."

## What happened after the first adjustment

Satoshi posted about it on Bitcointalk on 15 February 2010, in a thread titled *Proof-of-work difficulty increasing*. He shared a table of every adjustment so far:

| Date | Difficulty | Change |
|---|---|---|
| 2009 | 1.00 | — |
| 30 Dec 2009 | 1.18 | +18% |
| 11 Jan 2010 | 1.31 | +11% |
| 25 Jan 2010 | 1.34 | +2% |
| 4 Feb 2010 | 1.82 | +36% |
| 14 Feb 2010 | 2.53 | +39% |

He also spelled out what it meant for miners: the 4 February adjustment took difficulty "up from 1.34 times last year's difficulty to 1.82 times more difficult than last year. That means you generate only 55% as many coins for the same amount of work." And the core idea: "If the number of nodes doubles, the difficulty will also double, returning the total generated to the target rate."

The thread kept being updated through 2010. By 26 August 2010 his table showed difficulty 623.39.

## The first decrease came in May 2010

The rule works both ways. On 19 May 2010 the difficulty fell for the first time, from 12.85 to 11.85 (−8%), because the previous 2,016 blocks had taken longer than two weeks.

## Why this small change matters

An 18% bump from 1.00 to 1.18 looks tiny next to today's numbers. But it was the first live proof that Bitcoin's issuance schedule defends itself. Nobody voted on it and nobody pressed a button: more computers joined, and the code made mining harder so blocks kept their ten-minute pace. That same mechanism is why, later, CPU miners started pooling their work, which led to the [first Bitcoin mining pool in 2010](/blog/first-bitcoin-mining-pool-slush-2010).

## How to check block 32,256 yourself

Open any block explorer and search the height **32256**. Look at the difficulty (1.18) and the timestamp (30 Dec 2009, 06:11:04 UTC). Then open block 32,255 and see difficulty 1. Our guide to [finding the Genesis Block and the Pizza transaction on a block explorer](/blog/find-genesis-block-pizza-transaction-explorer) walks through the steps.

## Where it fits in Bitcoin's early timeline

The first difficulty increase came less than three months after Bitcoin got its [first price in October 2009](/blog/first-bitcoin-price-2009), and about four days before Bitcoin's first birthday. Our [Bitcoin history timeline for 2008–2010](/blog/bitcoin-history-timeline-2008-2010) puts it in order with everything else.
