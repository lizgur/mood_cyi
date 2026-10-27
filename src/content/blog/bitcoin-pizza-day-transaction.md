---
title: "Bitcoin Pizza Day: The 10,000 BTC Pizza Transaction, Verified On-Chain"
meta_title: "Bitcoin Pizza Day: The 10,000 BTC Transaction On-Chain"
description: "On 22 May 2010 Laszlo Hanyecz paid 10,000 BTC for two pizzas. Here's the transaction hash, block 57043, and how to verify it yourself."
date: "2026-10-27"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "Pizza Day"
faq_section_title: "Bitcoin Pizza Day: quick facts"
faqs:
  - title: "When is Bitcoin Pizza Day?"
    content: "Every year on 22 May, the date of the 2010 pizza purchase."
  - title: "Who bought the Bitcoin pizzas?"
    content: "Laszlo Hanyecz, an early Bitcoin miner and developer. The forum user jercos accepted the 10,000 BTC and arranged the delivery."
  - title: "What is the Bitcoin pizza transaction hash?"
    content: "`a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d`, in block 57,043."
  - title: "How many bitcoins were the pizzas?"
    content: "10,000 BTC for two pizzas, plus a 0.99 BTC network fee."
  - title: "How much would the pizzas be worth now?"
    content: "Multiply 10,000 by today's BTC price."
after_faq: |
  ## Wear the hash

  We made the [Mood Pizza T-shirt](/products/pizza-t-shirt) for people who like that kind of detail. It prints the pizza transaction hash on the cuffs, so the most expensive delivery in history goes everywhere with you. The rest of our [Bitcoin T-shirts](/bitcoin-t-shirts) follow the same idea: real moments from Bitcoin history, kept simple.

  <a href="/products/pizza-t-shirt" className="btn btn-primary">Shop the Pizza T-shirt</a>

  ## Sources

  - [Bitcointalk, "Pizza for bitcoins?" thread (offer on 18 May 2010, confirmation on 22 May 2010)](https://bitcointalk.org/index.php?topic=137.0)
  - [mempool.space transaction data](https://mempool.space/tx/a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d)
---

**Bitcoin Pizza Day is 22 May.** On that day in 2010, programmer Laszlo Hanyecz paid 10,000 BTC for two pizzas, the first widely known purchase of a real-world good with bitcoin. The payment is still on the blockchain: transaction `a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d`, confirmed in block 57,043. Anyone can look it up.

Here's the story, the on-chain details, and how to check them yourself.

## The offer: "10,000 bitcoins for a couple of pizzas"

On 18 May 2010, Laszlo posted on the Bitcointalk forum asking for pizza in exchange for bitcoin. His words:

> "I'll pay 10,000 bitcoins for a couple of pizzas.. like maybe 2 large ones so I have some left over for the next day. I like having left over pizza to nibble on later."

He didn't care whether someone baked them or ordered them for delivery. He just wanted food to arrive in exchange for bitcoin. At the time, bitcoin had no real market price, so nobody quite knew what 10,000 coins were worth. A few days passed with no deal.

## The deal: 22 May 2010

On 22 May 2010, Laszlo posted again in the same thread:

> "I just want to report that I successfully traded 10,000 bitcoins for pizza."

He shared photos and thanked **jercos**, the forum user who took the deal and had two pizzas delivered. They're widely reported to have been from Papa John's.

## The pizza transaction hash, verified

Here's what a public block explorer shows for the pizza transaction (we checked it on mempool.space):

| Field | Value |
|---|---|
| Transaction ID (txid) | `a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d` |
| Block height | 57,043 |
| Block time | 22 May 2010, 18:16:31 UTC |
| Inputs | 131 |
| Outputs | 1, paying exactly 10,000 BTC to `17SkEw2md5avVNyYgj6RiXuQKNwkXaxFyQ` |
| Fee | 0.99 BTC |

Why 131 inputs? Laszlo was an early miner, and his coins were spread across lots of small chunks. In 2010, a block reward was 50 BTC, so it took many pieces to add up to 10,000. A wallet gathers those pieces into one payment.

### How to check it yourself

1. Open any Bitcoin block explorer, such as [mempool.space](https://mempool.space).
2. Paste the txid above into the search box.
3. Look for block 57,043, the single 10,000 BTC output, and the 131 inputs.

That's the nice thing about Bitcoin history: you don't have to trust a blog post (this one included). You can verify it.

## What is 10,000 BTC worth today?

We're not putting a dollar figure here, because it would be out of date in a day. Take the current BTC price and multiply by 10,000. That's what those two pizzas would cost now, and it's why the story gets retold every May.

## Why Bitcoin Pizza Day matters

Before May 2010, bitcoin was mostly mined, sent between enthusiasts, and talked about. The pizza trade showed that someone would hand over a real thing for it. That's why the community still marks 22 May every year, often by buying pizza with bitcoin.

It also fits a pattern in early Bitcoin history: the important moments are written into the chain itself. The [Genesis Block message](/blog/genesis-block-message-chancellor-on-brink) is the first; the pizza transaction is one of the most loved.
