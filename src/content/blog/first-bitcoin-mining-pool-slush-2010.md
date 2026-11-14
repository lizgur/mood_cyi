---
title: "The First Bitcoin Mining Pool: Slush Pool and Block 97,834 (2010)"
meta_title: "First Bitcoin Mining Pool: Slush Pool, Block 97,834 (2010) | MOOD"
description: "Slush Pool was the first publicly known Bitcoin mining pool. Announced 27 Nov 2010, it found its first block, 97,834, on 16 Dec 2010. The full story, sourced."
date: "2026-11-14"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "First Bitcoin mining pool: quick facts"
faqs:
  - title: "What was the first Bitcoin mining pool?"
    content: "Slush Pool, created by slush (Marek Palatinus). It was proposed on Bitcointalk on 27 November 2010 and is the first publicly known Bitcoin mining pool."
  - title: "What was the first block mined by a pool?"
    content: "Block 97,834, mined by Slush Pool on 16 December 2010 at 07:16:08 UTC."
  - title: "How much was the first pool block worth?"
    content: "It paid the standard reward of the time, 50 BTC, which the pool split among members by the work they contributed."
  - title: "Is Slush Pool still running?"
    content: "Yes, as Braiins Pool. It was renamed in September 2022, and its operators said mining operations did not change."
  - title: "Did Slush Pool mine the first halving block?"
    content: "Yes. Block 210,000 (28 November 2012) has the `/slush/` signature in its coinbase."
after_faq: |
  ## Wear the history

  At MOOD we print Bitcoin moments you can verify on-chain. The [Genesis T-shirt](/products/genesis-t-shirt) carries the block that started it all, and the [Pizza T-shirt](/products/pizza-t-shirt) marks the first real-world purchase. See every design in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  - slush, ["Cooperative mining" (now titled "Slush Pool ... World First Mining Pool")](https://bitcointalk.org/index.php?topic=1976.0), Bitcointalk topic 1976, 27 Nov 2010, with replies
  - Bitcoin Wiki, [Slush Pool](https://en.bitcoin.it/wiki/Slush_Pool); slush's name per [Bitcoin Institute archive](https://bitcoin-institute.pages.dev/entries/forum/bitcointalk/topic-1976/2010-12-16-slush-msg30655/)
  - [Block 97,834](https://www.blockchain.com/explorer/blocks/btc/97834) (hash `000000000000dcaab612dcfd2a7b281c794a6da9006773dab55141ac608bfc86`); timestamp also checked via [mempool.space](https://mempool.space/block/000000000000dcaab612dcfd2a7b281c794a6da9006773dab55141ac608bfc86)
  - slush, Bitcointalk, 16 Dec 2010 07:52 UTC (["First block found at 8:16 CET! ... 4898 shares was needed"](https://bitcoin-institute.pages.dev/entries/forum/bitcointalk/topic-1976/2010-12-16-slush-msg30655/))
  - Bitcoin Wiki, ["Rebrand to Braiins Pool"](https://en.bitcoin.it/wiki/Slush_Pool), citing Braiins, "Goodbye Slush Pool… hello Braiins Pool" (21 Jul 2022)
  - Braiins, [Hashrate as a commodity: the endgame of bitcoin mining pools](https://braiins.com/blog/hashrate-as-a-commodity-bitcoin-mining-pools)
  - slush, [Bitcointalk, 16 Dec 2010 16:07 UTC](https://bitcoin-institute.pages.dev/entries/forum/bitcointalk/topic-1976/2010-12-16-slush-msg30769/)
  - [Block 210,000](https://mempool.space/block/000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e) coinbase containing "/slush/"
---

**The first publicly known Bitcoin mining pool was Slush Pool.** Its creator, the forum user slush (Marek Palatinus), proposed it on Bitcointalk on 27 November 2010 in a thread called *Cooperative mining*. The pool found its first block, **block 97,834, on 16 December 2010 at 07:16:08 UTC**, and paid the 50 BTC reward out to everyone who had contributed work. The pool still runs today under the name Braiins Pool.

## Slush Pool at a glance

| Date | What happened | Source |
|---|---|---|
| 27 Nov 2010, 13:45 forum time | slush posts *Cooperative mining*, proposing a shared mining server | Bitcointalk topic 1976 |
| 1 Dec 2010 | slush tweets that he mined his first solo block, 94,933 | Braiins blog, quoting @slush |
| 16 Dec 2010, 07:16:08 UTC | Pool finds its first block, 97,834 (difficulty 12,252) | Block 97,834 on-chain; slush's forum post |
| 16 Dec 2010 | Pool finds its second block, 97,886, the same day | slush's forum post |
| 28 Nov 2012 | Block 210,000, the first halving block, carries the `/slush/` coinbase tag | Block 210,000 on-chain |
| Sep 2022 | Slush Pool is renamed Braiins Pool | Bitcoin Wiki, citing Braiins (21 Jul 2022) |

## Why a mining pool was needed in 2010

In late 2010 mining moved from CPUs to GPUs, and solo mining on a normal computer became a lottery you almost never won. slush described it in his first post: "I'm on bitcoin for few weeks and didn't find block yet (I'm mining on three CPUs)."

At that time a block paid 50 BTC to whoever found it. If you had a small share of the network's hashrate, your expected income was fine on paper, but you could wait weeks or months for a single payout. slush's idea was to smooth that out: "Join poor CPU miners to one cluster and increase their chance to find a block!"

Two pieces of software made it possible, and he named both: a new `getwork` feature in the official Bitcoin client, and a standalone CPU miner by jgarzik.

## How the first pool worked

slush's original plan was simple:

- You register on a web page and enter your wallet address.
- You point your miner at the pool's server with your own login.
- The server hands out work that no other member is already doing.
- When the pool finds a block, the reward is split by how much work each person did.

He even gave the math in his post. If you contribute 1,000 khash/s for one day, the whole pool runs at 20,000 khash/s, and the pool takes two days to find a block, your share is 50 / 20 / 2 = **1.25 BTC**.

He was also honest about the trade-off: "You need to trust in central authority (me) that I don't steal block for myself."

### The cheating problem, and the fix

Forum members quickly asked the obvious question: what stops someone from taking work and pretending to do it? The answer that stuck, later added to slush's own post, was to have miners prove their work with **shares**: hashes that meet a much lower difficulty than the real network target.

One reply in the thread explains why this works. A winning hash for a pool block includes the transaction that pays the pool, so a miner cannot keep it for themselves. And you cannot look for easy shares without also, now and then, hitting a real block. slush noted that his first block took **4,898 shares** to find.

## Block 97,834: the first pool-mined block

On the morning of 16 December 2010, slush posted: "First block found at 8:16 CET!" That is 07:16 UTC, matching the timestamp in the block header of block 97,834: **2010-12-16 07:16:08 UTC**. Blockchain.com labels it "the first block known to be pool mined."

The block is tiny by today's standards. It holds one transaction, the coinbase, which pays **50 BTC** to a single output: the pool's wallet, which then paid members. The network difficulty was 12,252.

Later that day slush confirmed the second block: "we found second block at 16:10, see ...h=97886. First one from 07:16 is ...h=97834."

You can check block 97,834 yourself on any block explorer. Our guide to [finding the Genesis Block and the Pizza transaction on a block explorer](/blog/find-genesis-block-pizza-transaction-explorer) shows how; just search the height 97834.

## Was Slush Pool really first?

It is the first **publicly known** pool, which is how the Bitcoin Wiki puts it. Someone in the original thread linked an earlier pooled-mining client by puddinpop, so the idea was being tried before. But Slush Pool is the first pool with a documented, public first block, and the first to keep running for years.

## Slush Pool and the first halving

Two years later, on 28 November 2012, block 210,000 cut the block reward from 50 BTC to 25 BTC. Its coinbase carries the text `/slush/`, the pool's signature. So the first mining pool also mined the block that triggered the [first Bitcoin halving](/blog/first-bitcoin-halving-2012).

## From Slush Pool to Braiins Pool

On 21 July 2022 the operators announced that Slush Pool would be renamed **Braiins Pool** in September 2022, to put their mining products under one brand. They said mining would not change and the old connection URLs would keep working. Braiins still calls the pool's launch "December 16, 2010."

## Where it fits in Bitcoin's early timeline

Slush Pool's first block came in a busy month. Five days earlier, on 11 December 2010, Satoshi had written that [WikiLeaks "kicked the hornet's nest"](/blog/satoshi-wikileaks-hornets-nest-2010). Pizza Day was seven months behind it, and the Genesis Block almost two years. Our [Bitcoin history timeline for 2008–2010](/blog/bitcoin-history-timeline-2008-2010) puts all of it in order.
