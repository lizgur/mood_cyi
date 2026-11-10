---
title: "Bitcoin v0.1: The January 2009 Release That Turned the Whitepaper Into Software"
meta_title: "Bitcoin v0.1 Release, January 2009: What Satoshi Shipped | MOOD"
description: "On 8–9 Jan 2009 Satoshi released Bitcoin v0.1: a Windows-only download with C++ source. What the announcement said, block 1, and how to read it today."
date: "2026-11-10"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Bitcoin v0.1 release: quick facts"
faqs:
  - title: "When was Bitcoin v0.1 released?"
    content: "Satoshi's announcement email is dated 8 January 2009 at 19:27 UTC. Wikipedia and many histories give 9 January 2009, when the client was on SourceForge and block 1 was mined."
  - title: "Where was Bitcoin v0.1 announced?"
    content: "On the Cryptography mailing list (metzdowd.com), the same list where the whitepaper appeared on 31 October 2008."
  - title: "What operating system did Bitcoin v0.1 run on?"
    content: "Windows only. The download included the open-source C++ code."
  - title: "Was the 21 million cap in the original software?"
    content: "Yes. The v0.1 announcement states \"Total circulation will be 21,000,000 coins,\" halving roughly every four years."
  - title: "When was block 1 mined?"
    content: "9 January 2009 at 02:54:25 UTC, six days after the genesis block."
  - title: "Who was the first person to run Bitcoin besides Satoshi?"
    content: "Hal Finney is the best documented. He tweeted \"Running bitcoin\" on 11 January 2009 and received the first person-to-person payment in block 170 on 12 January."
after_faq: |
  ## Wear the history

  MOOD prints moments you can date and verify, from the whitepaper to the genesis block. Browse the range in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/bitcoin-t-shirts" className="btn btn-primary">Shop Bitcoin T-shirts</a>

  ## Sources

  - Satoshi Nakamoto, ["Bitcoin v0.1 released"](https://www.metzdowd.com/pipermail/cryptography/2009-January/014994.html), Cryptography mailing list (Thu 8 Jan 2009 14:27:40 EST)
  - Satoshi Nakamoto Institute, [same email](https://satoshi.nakamotoinstitute.org/emails/cryptography/16/) (8 Jan 2009 19:27:40 UTC)
  - Wikipedia, [History of bitcoin](https://en.wikipedia.org/wiki/History_of_bitcoin) (first client released 9 Jan 2009 on SourceForge; Hal Finney downloaded it on release day; block 170 on 12 Jan)
  - Blockstream explorer, [block 1](https://blockstream.info/block/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048) (timestamp 1231469665 = 9 Jan 2009 02:54:25 UTC)
  - GitHub, bitcoin/bitcoin ["First commit"](https://github.com/bitcoin/bitcoin/commit/4405b78d6059e536c36974088a8ed4d9f0f29898) by sirius-m, 30 Aug 2009
---

**Bitcoin went from paper to working software in January 2009. Satoshi Nakamoto announced "Bitcoin v0.1 released" to the Cryptography mailing list in an email dated 8 January 2009 (19:27 UTC), and most histories, including Wikipedia, give 9 January 2009 as the release date. It was a Windows-only download from SourceForge with the C++ source included. Block 1, the first block after the genesis block, was mined at 02:54:25 UTC on 9 January.**

Ten weeks earlier the idea existed only as a [9-page whitepaper](/blog/bitcoin-whitepaper-explained). Six days earlier the [genesis block](/blog/genesis-block-message-chancellor-on-brink) had been created. v0.1 is the moment anyone else could join in.

## The v0.1 release at a glance

| Date (UTC) | Event |
|---|---|
| 31 Oct 2008 | Whitepaper sent to the Cryptography mailing list |
| 3 Jan 2009 | Genesis block (block 0) created |
| 8 Jan 2009, 19:27 | Satoshi emails "Bitcoin v0.1 released" |
| 9 Jan 2009 | Release date given by Wikipedia; client hosted on SourceForge |
| 9 Jan 2009, 02:54:25 | Block 1 mined |
| 11 Jan 2009 | Hal Finney tweets "Running bitcoin" |
| 12 Jan 2009 | Block 170: Satoshi sends Hal 10 BTC, the first person-to-person payment |

## Why two dates: 8 or 9 January?

The archived email carries a date of Thursday 8 January 2009, 14:27 EST, which is 19:27 UTC. The Satoshi Nakamoto Institute archive shows the same time. Wikipedia's History of bitcoin article dates the release of the first open-source client to 9 January 2009 on SourceForge, and block 1 is timestamped early on 9 January UTC. Both dates show up in good sources, so we give both rather than pick one.

## What Satoshi actually announced

The email is short and practical. In his words, Bitcoin was "a new electronic cash system that uses a peer-to-peer network to prevent double-spending. It's completely decentralized with no server or central authority."

The setup was three lines: unpack the files, run `BITCOIN.EXE`, and it "automatically connects to other nodes." He added:

- **Windows only for now.** Open-source C++ code was included in the download (`bitcoin-0.1.0.rar`).
- **Port 8333.** Users who could accept incoming connections on port 8333 would be "helping the network a lot." Bitcoin still uses 8333 today.
- **Alpha software.** "There's no guarantee the system's state won't have to be restarted at some point."
- **Mining was a menu option.** Options, then Generate Coins. Difficulty was "ridiculously easy to start with," so "a typical PC will be able to generate coins in just a few hours."
- **120-block maturity.** Newly generated coins had to wait 120 blocks before they could be spent.

## Two ways to send money in v0.1

v0.1 let you pay someone by **IP address**: if the recipient was online, your client connected to theirs, got a fresh public key and sent the transaction with a comment. The alternative was paying to a **Bitcoin address**, "a hash of their public key." Satoshi noted the trade-off: no comment travels with the payment, and "a bit of privacy may be lost if the address is used multiple times." Pay-to-IP has long since been removed; addresses won.

## The 21 million schedule, in the first email

The supply cap was in the very first release note: "Total circulation will be 21,000,000 coins," handed out to nodes that make blocks, "with the amount cut in half every 4 years":

- first 4 years: 10,500,000 coins
- next 4 years: 5,250,000 coins
- next 4 years: 2,625,000 coins
- next 4 years: 1,312,500 coins

In the code the cut happens every 210,000 blocks rather than on a calendar date, which is why the [first halving](/blog/first-bitcoin-halving-2012) landed on 28 November 2012. Satoshi also wrote that once new coins run out, "the system can support transaction fees if needed."

## Who ran it first

Hal Finney is the best-known early user. Wikipedia records that he downloaded the software the day it was released. On 11 January he tweeted "Running bitcoin," and on 12 January he received 10 BTC from Satoshi in block 170. That story, with the transaction ID, is in our [Hal Finney and block 170 post](/blog/hal-finney-first-bitcoin-transaction).

## Can you see the v0.1 code today?

The original release was distributed as a download on SourceForge, not on GitHub. The oldest commit in today's `bitcoin/bitcoin` GitHub history is titled "First commit" and dated 30 August 2009, months after v0.1, so the January 2009 files predate the repository's history there. Copies of the original source have been preserved by researchers, but treat any unofficial copy as a historical artifact, not software to run.

## How to check block 1 yourself

Open any public block explorer and search for height **1**. You should see:

- Timestamp: 9 January 2009, 02:54:25 UTC
- Hash: `00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048`
- Previous block: the genesis block, `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`

Step-by-step explorer instructions are in our guide to [finding the genesis block and the pizza transaction](/blog/find-genesis-block-pizza-transaction-explorer).

## Where this sits on the timeline

- 31 Oct 2008: the whitepaper, printed on our [Whitepaper T-shirt](/products/whitepaper-t-shirt)
- 3 Jan 2009: genesis block, on our [Genesis T-shirt](/products/genesis-t-shirt)
- 8–9 Jan 2009: Bitcoin v0.1 released
- 12 Jan 2009: [block 170, Satoshi to Hal](/blog/hal-finney-first-bitcoin-transaction)

More dates in our [2008–2010 Bitcoin history timeline](/blog/bitcoin-history-timeline-2008-2010).
