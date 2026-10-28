---
title: "The Bitcoin Whitepaper Explained, Section by Section"
meta_title: "The Bitcoin Whitepaper Explained, Section by Section | MOOD"
description: "Satoshi's 9-page paper in plain English: double-spending, proof-of-work, incentives and privacy, all 12 sections. Read it, then wear it."
date: "2026-10-28"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "Whitepaper"
faq_section_title: "Bitcoin Whitepaper: quick facts"
faqs:
  - title: "What is the Bitcoin Whitepaper about?"
    content: "It proposes peer-to-peer electronic cash: online payments sent directly between people without a bank. It solves double-spending with a public chain of proof-of-work blocks that is impractical to rewrite."
  - title: "How long is the Bitcoin Whitepaper?"
    content: "Nine pages: an abstract, 12 numbered sections, and a page of references."
  - title: "Who wrote the Bitcoin Whitepaper?"
    content: "It is signed \"Satoshi Nakamoto,\" a pseudonym. The author's real identity has never been confirmed."
  - title: "When was the Bitcoin Whitepaper published?"
    content: "On 31 October 2008, sent to a cryptography mailing list. The network itself launched with the Genesis Block on 3 January 2009."
  - title: "What is the double-spending problem?"
    content: "Digital money can be copied, so without a central ledger nothing stops someone spending the same coin twice. Bitcoin solves this by making every transaction public and agreeing on their order through proof-of-work."
  - title: "Does the whitepaper mention the 21 million coin limit or the word \"blockchain\"?"
    content: "No. It speaks of \"a predetermined number of coins\" without giving the figure, and it describes a \"chain\" of blocks but never uses the single word \"blockchain.\""
after_faq: |
  ## Wear the nine pages

  Our [Whitepaper T-shirt](/products/whitepaper-t-shirt) prints all nine pages across a white, 100% cotton oversized tee, so the whole paper is on the shirt. It's part of our [Bitcoin T-shirts](/bitcoin-t-shirts) collection alongside the Genesis and Pizza designs.

  <a href="/products/whitepaper-t-shirt" className="btn btn-primary">Shop the Whitepaper T-shirt</a>

  ## Sources

  - [Satoshi Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System* (2008)](https://bitcoin.org/bitcoin.pdf)
---

**The Bitcoin Whitepaper describes a way to send money online directly from one person to another, with no bank in the middle, by solving the "double-spending" problem with a public, proof-of-work chain of blocks.** Its title is *Bitcoin: A Peer-to-Peer Electronic Cash System*. Satoshi Nakamoto published it on 31 October 2008. It runs nine pages: an abstract, 12 numbered sections and a short list of references.

You don't need a computer science degree to follow it. Below is every section in plain words, with the key line from each, so you can read the original alongside and see what it actually says.

If you want the backstory of how the paper was released (the mailing list, the date, what happened next), read our post on [the Bitcoin Whitepaper anniversary](/blog/bitcoin-whitepaper-anniversary). This one is about what's inside.

## The one-paragraph summary

Digital money has always had one problem: a file can be copied, so what stops someone spending the same coin twice? The usual answer is a trusted company that keeps the ledger. Satoshi's answer is to publish every transaction, bundle them into blocks, and make each block costly to produce through proof-of-work. Blocks link to the one before, so rewriting history means redoing all the work that came after. Honest participants who control most of the computing power will always build the longest chain, and that chain is the record everyone accepts.

## Abstract: the whole idea in 10 sentences

The abstract opens with the goal: "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution."

It admits that digital signatures alone aren't enough, because "the main benefits are lost if a trusted third party is still required to prevent double-spending." Then it states the fix: a network that timestamps transactions "by hashing them into an ongoing chain of hash-based proof-of-work."

## 1. Introduction: the problem with trust

Online payments rely on banks and card companies acting as "trusted third parties." Satoshi points out the costs that brings. Payments can be reversed, so merchants have to be wary of customers, fraud is accepted as normal, and mediation makes small, casual payments impractical.

Cash solves this in person, but "no mechanism exists to make payments over a communications channel without a trusted party." The paper's goal: "an electronic payment system based on cryptographic proof instead of trust."

## 2. Transactions: a coin is a chain of signatures

Satoshi defines an electronic coin as "a chain of digital signatures." To pay someone, the current owner signs a hash of the previous transaction plus the next owner's public key. Anyone can check the signatures and follow the chain of ownership.

The catch is that signatures prove who owned the coin, not that they didn't also sign it over to someone else. The traditional fix is a central "mint" that checks every payment, which makes the whole system depend on that one company, "just like a bank." So the network itself has to know about every transaction and agree on which came first.

## 3. Timestamp server: proving the order of events

The building block is a timestamp server. It takes a hash of a batch of items and publishes it widely, "such as in a newspaper or Usenet post." Each timestamp includes the previous one, forming a chain.

That newspaper idea echoes in Bitcoin's very first block, which carries a real Times headline from 3 January 2009. We cover it in [what the Genesis Block message means](/blog/genesis-block-message-chancellor-on-brink).

## 4. Proof-of-work: making history expensive to rewrite

To run that timestamp server without a central publisher, Bitcoin uses proof-of-work "similar to Adam Back's Hashcash." Miners change a number in the block (the nonce) until the block's SHA-256 hash starts with enough zero bits. Finding it takes a lot of attempts; checking it takes one.

Two consequences follow:

- **Rewriting is costly.** Changing an old block means redoing its work and the work of every block after it.
- **Voting is by computing power, not identity.** "Proof-of-work is essentially one-CPU-one-vote." The longest chain, the one with the most work behind it, wins.

The difficulty also adjusts over time to target a steady number of blocks per hour.

## 5. Network: six steps

Satoshi lists how the network runs:

1. New transactions are broadcast to all nodes.
2. Each node collects them into a block.
3. Each node works on the proof-of-work for its block.
4. The node that finds it broadcasts the block.
5. Other nodes accept it only if every transaction is valid and not already spent.
6. They show acceptance by building the next block on top of it.

If two blocks appear at once, nodes work on whichever they saw first and switch when one branch gets longer.

## 6. Incentive: why anyone would mine

The first transaction in each block creates new coins for whoever made the block. That rewards people for securing the network and is how coins enter circulation "since there is no central authority to issue them." Satoshi compares it to gold miners spending resources to add gold to circulation.

Transaction fees can fund the reward too, and "once a predetermined number of coins have entered circulation, the incentive can transition entirely to transaction fees." The paper also argues an attacker with huge computing power "ought to find it more profitable to play by the rules."

## 7. Reclaiming disk space: Merkle trees

Transactions in a block are hashed into a Merkle tree, with only the root stored in the block header. Old, spent transactions can then be pruned without breaking the chain. Satoshi estimates headers alone would grow by about 4.2 MB a year (80 bytes every 10 minutes).

## 8. Simplified Payment Verification: checking without a full node

You don't need to run a full node to check a payment. Keep the block headers of the longest chain, then fetch the Merkle branch that links your transaction to a block. This is the idea behind lightweight wallets. Satoshi notes it is weaker if an attacker overpowers the network, and that businesses receiving frequent payments "will probably still want to run their own nodes."

## 9. Combining and splitting value: inputs and outputs

Rather than handle every coin separately, transactions have multiple inputs and outputs. Usually there's one payment output and one returning change to the sender.

You can see this in a real transaction: the famous 10,000 BTC pizza payment gathered many small inputs into one output. Details are in our post on [Bitcoin Pizza Day](/blog/bitcoin-pizza-day-transaction).

## 10. Privacy: public transactions, anonymous keys

Banks keep transactions private by limiting who sees them. Bitcoin can't, because every transaction is public. Instead, privacy comes from "keeping public keys anonymous." The paper compares this to a stock exchange tape, which shows the time and size of trades but not who made them.

Satoshi recommends a new key pair for every transaction, and is upfront about the limit: multi-input transactions reveal that their inputs share an owner.

## 11. Calculations: how safe is it to wait?

This is the mathematical section. Satoshi models an attacker racing the honest chain as a "Gambler's Ruin" problem and shows the attacker's chance of catching up drops exponentially with each block added after a transaction. He includes C code and tables of results. For example, an attacker with 10% of the network's power has under a 0.1% chance of catching up once a payment is 5 blocks deep.

He also notes what an attacker *can't* do even with a faster chain: create coins out of nothing or take money that never belonged to them. At most they can try to reverse one of their own recent payments.

## 12. Conclusion: a system without trust

The paper closes by restating the design: coins made of digital signatures, plus a peer-to-peer network using proof-of-work to record a public history that becomes "computationally impractical for an attacker to change if honest nodes control a majority of CPU power." Nodes "vote with their CPU power" by building on valid blocks and refusing invalid ones.

## The references: whose ideas it builds on

The final page lists eight references, including Wei Dai's b-money (1998), Haber and Stornetta's work on time-stamping digital documents (1991), Adam Back's Hashcash (2002) and Ralph Merkle's 1980 paper on public-key protocols. Bitcoin stitched together existing ideas in a new way.

## How to read it yourself

The original PDF is still hosted at [bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf). A good way in: read the abstract, then sections 1, 4, 5 and 12. That's the core argument. Come back to 7, 8 and 11 for the engineering and the maths.
