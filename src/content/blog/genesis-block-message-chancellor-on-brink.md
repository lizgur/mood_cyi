---
title: "What Does the Genesis Block Message Mean?"
meta_title: "Genesis Block Message: 'Chancellor on Brink' Explained"
description: "Bitcoin's first block carries a Times headline from 3 Jan 2009. What it says, why it's there, and how to check the coinbase hex yourself."
date: "2026-10-27"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "Genesis block"
faq_section_title: "Genesis block message: quick facts"
faqs:
  - title: "What is the exact genesis block message?"
    content: "\"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.\" It's stored as text in the coinbase input of Bitcoin's block 0."
  - title: "What does \"chancellor on brink\" mean?"
    content: "It refers to Alistair Darling, then the UK's Chancellor of the Exchequer, who was reported to be close to approving a second bailout for British banks in January 2009."
  - title: "Why did Satoshi put a headline in the genesis block?"
    content: "At minimum, it proves the block was created no earlier than 3 January 2009, which shows there was no hidden head start. Many also see it as a comment on bank bailouts, but Satoshi never confirmed a reason."
  - title: "Can the 50 BTC from the genesis block be spent?"
    content: "No. Because of how the genesis block is handled in the code, its reward can't be spent. Whether that was intentional is unknown."
  - title: "When was block 1 mined?"
    content: "Block 1's timestamp is 9 January 2009, about six days after the genesis block. The reason for the gap isn't known."
after_faq: |
  ## Wearing a piece of block 0

  I started Mood because moments like this deserve more than a footnote. Our [Genesis tee](/products/genesis-t-shirt) prints that same Times headline from the genesis block, for people who'd rather carry the story than explain it. If you like the early history, the rest of our [Bitcoin T-shirts](/bitcoin-t-shirts) follow the same idea, and the story before the genesis block starts with the paper itself, covered in our [Bitcoin whitepaper anniversary](/blog/bitcoin-whitepaper-anniversary) post.

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis tee</a>

  ## Sources

  - [Bitcoin Wiki, "Genesis block"](https://en.bitcoin.it/wiki/Genesis_block) (coinbase text and hex, unspendable reward, 6-day gap, theories)
  - [Block 0 on mempool.space](https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f)
  - [Joshua Davis, The New Yorker, "The Crypto-Currency" (2011)](https://www.newyorker.com/magazine/2011/10/10/the-crypto-currency)
  - [Bitcoin Stack Exchange, "Why can't the genesis block coinbase be spent?"](https://bitcoin.stackexchange.com/questions/10009/why-can-t-the-genesis-block-coinbase-be-spent)
  - [Bank of England / HM Treasury, UK bank recapitalisation announcements, October 2008](https://www.bankofengland.co.uk/-/media/boe/files/news/2008/october/recapitalisation-of-the-uk-banking-system.pdf)
  - [Satoshi Nakamoto, "Bitcoin v0.1 released", Cryptography Mailing List, 8 January 2009 UTC](https://satoshi.nakamotoinstitute.org/emails/cryptography/16/)
  - Block 1 timestamp via Blockstream API (height 1 → 1231469665 → 2009-01-09 02:54:25 UTC)
---

The genesis block message is a line of text Satoshi Nakamoto placed inside Bitcoin's very first block: **"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."** It copies a front-page headline from the British newspaper The Times on 3 January 2009. Its practical job was to act as a timestamp, proving the block could not have been made before that date. Because the headline was about a government rescuing banks, many people also read it as a comment on the financial system Bitcoin offered an alternative to, though Satoshi never spelled that out.

## Where the message lives

Every Bitcoin block starts with a special transaction called the coinbase. It's the transaction that creates new coins for whoever mined the block, and its input has a free-form field that miners can fill with almost any data.

In block 0, the genesis block, Satoshi used that field for the headline. The block is hardcoded into the Bitcoin software, it doesn't point back to any earlier block (there wasn't one), and its 50 BTC reward went to the address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa. Because of a quirk in how the genesis block is handled in the code, those first 50 coins can't be spent. Nobody knows for sure whether that was deliberate.

## Why a newspaper headline? The timestamp role

A headline is a neat trick for proving time. Nobody could know what The Times would print on 3 January 2009 until that morning, so a block that contains the headline must have been created on or after that day.

This matters for trust. It shows the chain didn't secretly start months earlier with Satoshi quietly mining a big pile of coins before anyone else could join. The headline sets a public "no earlier than" date for the start of the ledger. It can't prove when the block was made *at the latest*, but it closes off the worry that history was quietly running in the background before launch.

## The headline in context: Alistair Darling and the bailouts

In early 2009, Britain was deep in the financial crisis. Alistair Darling was Chancellor of the Exchequer, the UK's finance minister. The government had already put large sums into rescuing banks in autumn 2008, and The Times was reporting that a second round of support was being weighed.

That's the plain meaning of the words: the Chancellor was close to approving another bank bailout.

Did Satoshi pick it to make a point? Many people think so. The Bitcoin Wiki describes it as likely both a timestamp and a comment on the instability of the banking system, and the choice of the British paper has led some writers, including The New Yorker in 2011, to suggest Satoshi may have lived in the UK. But these are readings, not confirmations. Satoshi never publicly explained the choice, and it's best to hold the political reading as an interpretation rather than a stated fact. Either way, a bank bailout headline sitting in the first block of a currency designed to work without banks is hard to forget.

## The six-day gap before block 1

Bitcoin aims for a block about every ten minutes. Yet block 1 carries a timestamp of 9 January 2009, 02:54:25 UTC — roughly six days after the genesis block's 3 January timestamp (18:15:05 UTC).

No one knows exactly why. Theories include Satoshi testing the software on a private network before reusing the genesis block for the real launch, or simply taking time to mine and prepare before going public. The Bitcoin software itself was announced on the cryptography mailing list on 8 January 2009 (UTC). Treat any single explanation as a guess.

## How to read the message yourself

You don't need to trust me or anyone else. The text is right there in the raw data.

The coinbase input of block 0 is this hex string:

```
04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73
```

The first few bytes (`04ffff001d010445`) are technical data. Everything after that is plain ASCII text. Here's a short way to check it:

1. Open block 0 in a block explorer such as mempool.space and look at the coinbase transaction's input.
2. Copy the hex after `...0445`, starting at `5468652054696d6573`.
3. Paste it into any hex-to-text converter, or run `echo 5468...6b73 | xxd -r -p` in a terminal.
4. You'll get: *The Times 03/Jan/2009 Chancellor on brink of second bailout for banks*.

It's one of my favourite small moments in Bitcoin: anyone with a browser can read the founding note for themselves.
