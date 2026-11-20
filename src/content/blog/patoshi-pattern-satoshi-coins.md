---
title: "How Many Bitcoin Does Satoshi Have? The Patoshi Pattern and the ~1.1 Million BTC Estimate"
meta_title: "How Many Bitcoin Does Satoshi Have? The Patoshi Pattern | MOOD"
description: "The Patoshi pattern links about 22,000 early blocks, roughly 1.1M BTC, to one miner who is probably Satoshi. How it was found, the evidence and the doubts."
date: "2026-11-20"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Patoshi pattern: quick facts"
faqs:
  - title: "How many bitcoin does Satoshi have?"
    content: "Estimates for the Patoshi miner run from 600,000–700,000 BTC (BitMEX Research, 2018) to about 1.1 million BTC (Lerner, 2019). Arkham labels 1,096,354 BTC.[^3][^4][^6] None of these proves Satoshi owns them."
  - title: "What is the Patoshi pattern?"
    content: "It is a fingerprint in Bitcoin's first blocks, from 2009–2010. It shows up in the ExtraNonce counter, in the nonce's last byte and in the block timestamps, and Sergio Demian Lerner reads it as about 22,000 blocks from one miner.[^3]"
  - title: "Who discovered the Patoshi pattern?"
    content: "Sergio Demian Lerner, on his Bitslog blog, 17 April 2013.[^1]"
  - title: "Did Satoshi mine 1 million bitcoin?"
    content: "Possibly. Lerner says yes, at about 1.1 million.[^3] BitMEX Research thinks 1 million \"may be an overestimate.\"[^4] Greg Maxwell disputes the single-miner reading altogether.[^3]"
  - title: "Has Satoshi ever spent his bitcoin?"
    content: "Very little. Lerner found about 100 BTC spent from the pattern by 2013,[^2] and Decrypt reported in October 2025 that the ~1.1 million BTC had never moved.[^7]"
  - title: "Can the genesis block's 50 BTC be spent?"
    content: "No. That output can't be spent.[^9]"
after_faq: |
  ## Wear block 0

  Whoever the Patoshi miner was, it built every one of those roughly 22,000 blocks on top of block 0. Our [Genesis T-shirt](/products/genesis-t-shirt) carries that block. The [Whitepaper T-shirt](/products/whitepaper-t-shirt) prints the paper that started it all, and the [Pizza T-shirt](/products/pizza-t-shirt) marks the moment early coins first bought something real. See them all on our [Bitcoin T-shirts](/bitcoin-t-shirts) page, or put the dates in order with our [Bitcoin history timeline, 2008–2010](/blog/bitcoin-history-timeline-2008-2010). Most of the arguments above were first fought out on [BitcoinTalk](/blog/bitcointalk-forum-founded-2009).<sup><a href="#source-3">3</a></sup>

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  1. <span id="source-1"></span>Sergio Demian Lerner, ["The Well Deserved Fortune of Satoshi Nakamoto, Bitcoin creator, Visionary and Genius,"](https://bitslog.com/2013/04/17/the-well-deserved-fortune-of-satoshi-nakamoto/) Bitslog, 17 Apr 2013 (ExtraNonce method; blocks 0–36,288; "around 1M Bitcoins"; 1,814,400 BTC awarded, 1,148,800 unspent; restarts every ~100 hours)
  2. <span id="source-2"></span>Sergio Demian Lerner, ["Satoshi's Fortune: a more accurate figure,"](https://bitslog.com/2013/04/24/satoshi-s-fortune-a-more-accurate-figure/) Bitslog, 24 Apr 2013, with author replies of 6 May 2013 (19,600 blocks / 980K BTC; ~0.1% error; pattern starts at block 1; block 12 first other miner; ~100 BTC spent)
  3. <span id="source-3"></span>Sergio Demian Lerner, ["The Return of the Deniers and the Revenge of Patoshi,"](https://bitslog.com/2019/04/16/the-return-of-the-deniers-and-the-revenge-of-patoshi/) Bitslog, 16 Apr 2019 (name "Patoshi"; ~22k blocks; ~1.1M coins; nonce LSB in [0..9] ∪ [19..58]; 27.68k blocks in range; 99.9% unspent; 0 of 694 timestamp inversions between Patoshi blocks; 43% of first 50k blocks; quote from nullc)
  4. <span id="source-4"></span>BitMEX Research, ["Does Satoshi have a million bitcoin?,"](https://farside.co.uk/satoshis-1-million-bitcoin/) 20 Aug 2018 (now hosted by Farside Investors) (14,815 + 4,553 blocks; 600,000–700,000 BTC; block 9 in an 11-block slope)
  5. <span id="source-5"></span>Adrianne Jeffries, ["Four years and $100 million later, Bitcoin's mysterious creator remains anonymous,"](https://www.theverge.com/2013/5/6/4295028/report-satoshi-nakamoto) The Verge, 6 May 2013 (Gavin Andresen quote)
  6. <span id="source-6"></span>Jamie Redman, ["Arkham Intelligence Data Unmasks Satoshi's $108 Billion Bitcoin Vault,"](https://news.bitcoin.com/arkham-intelligence-data-unmasks-satoshis-108-billion-bitcoin-vault/) Bitcoin.com News, 4 Feb 2025 (Arkham's statement: 22,000 addresses, 1,096,354 BTC; dust and inscriptions flowing in)
  7. <span id="source-7"></span>Decrypt, ["Will Satoshi Nakamoto Move Any Bitcoin This Year? Degens Are Betting on It,"](https://decrypt.co/345028/will-satoshi-nakamoto-move-bitcoin-this-year-degens-betting) 20 Oct 2025
  8. <span id="source-8"></span>mempool.space, [transaction f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16](https://mempool.space/tx/f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16) (block 170, 12 Jan 2009 03:30:25 UTC; input is the 50 BTC coinbase of block 9, tx 0437cd7f…a597c9; outputs 10 BTC and 40 BTC)
  9. <span id="source-9"></span>Bitcoin Wiki, ["Genesis block"](https://en.bitcoin.it/wiki/Genesis_block) (first 50 BTC reward can't be spent due to a quirk in the code; unknown if intentional)

---

**Nobody knows for sure, but the best-known estimate is about 1.1 million BTC.** That figure comes from the "Patoshi pattern": a fingerprint in Bitcoin's earliest blocks that researcher Sergio Demian Lerner says links about 22,000 blocks to one miner.<sup><a href="#source-3">3</a></sup> Lerner first put the figure at around 1 million BTC in April 2013,<sup><a href="#source-1">1</a></sup> then counted 19,600 blocks, or 980,000 BTC, a week later.<sup><a href="#source-2">2</a></sup> In 2019 he raised it to about 22,000 blocks and roughly 1.1 million BTC.<sup><a href="#source-3">3</a></sup> BitMEX Research came up lower in 2018, at perhaps 600,000–700,000 BTC.<sup><a href="#source-4">4</a></sup> Treat all of these as statistical estimates, not proof. Nothing in the blockchain names Satoshi as the owner, and as far as public trackers show, the coins have essentially never moved.<sup><a href="#source-6">6</a></sup><sup><a href="#source-7">7</a></sup>

## The Patoshi pattern at a glance

| Fact | Value | Source |
|---|---|---|
| Discovered by | Sergio Demian Lerner, Bitslog, 17 April 2013 | Bitslog<sup><a href="#source-1">1</a></sup> |
| First estimate | "around 1M Bitcoins," judged by eye | Bitslog<sup><a href="#source-1">1</a></sup> |
| Refined count (24 Apr 2013) | 19,600 blocks = 980,000 BTC | Bitslog<sup><a href="#source-2">2</a></sup> |
| Latest Lerner estimate (16 Apr 2019) | ~22,000 blocks, ~1.1M BTC | Bitslog<sup><a href="#source-3">3</a></sup> |
| BitMEX Research (20 Aug 2018) | "Perhaps 600,000 to 700,000 bitcoin" | BitMEX Research<sup><a href="#source-4">4</a></sup> |
| Arkham Intelligence label (Feb 2025) | 22,000 addresses holding 1,096,354 BTC | Arkham via Bitcoin.com News<sup><a href="#source-6">6</a></sup> |
| Share unspent | 99.9% of Patoshi blocks vs. 10% of other early blocks | Bitslog<sup><a href="#source-3">3</a></sup> |
| Starts at | Block 1, right after the genesis block | Bitslog<sup><a href="#source-2">2</a></sup> |

## What is the Patoshi pattern?

When Satoshi released [Bitcoin v0.1 in January 2009](/blog/bitcoin-v0-1-release-2009), mining was done by the client software itself. Every block's coinbase transaction carried a counter called the **ExtraNonce**. It went up each time the 32-bit nonce in the block header ran out of values.<sup><a href="#source-1">1</a></sup><sup><a href="#source-3">3</a></sup>

Lerner noticed that in the early software this counter did not reset between blocks. It only went back to zero when the miner restarted the program. That made it work like a slow clock unique to each miner.<sup><a href="#source-1">1</a></sup><sup><a href="#source-3">3</a></sup> When he plotted ExtraNonce against block number, one set of blocks formed long, steep, evenly sloped lines that restarted now and then. The lines barely overlapped, and they began at block 1.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup> He wrote that the restarts came "approximately every 100 hours, probably to backup the wallet."<sup><a href="#source-1">1</a></sup>

In 2019 he named this miner **Patoshi**, and the blocks it produced the "Patoshi pattern."<sup><a href="#source-3">3</a></sup>

## How many bitcoin did the Patoshi miner mine?

Each early block paid a 50 BTC reward, so the estimates are simply block counts multiplied by 50.<sup><a href="#source-1">1</a></sup><sup><a href="#source-2">2</a></sup>

1. **17 April 2013, "around 1M":** Lerner looked at blocks 0 to 36,288 and wrote: "I estimate at eyesight that Satoshi fortune is around 1M Bitcoins, or 100M USD at current exchange rate." He also noted that of the 1,814,400 BTC paid out in that range, 1,148,800 BTC had never been spent (63%).<sup><a href="#source-1">1</a></sup>
2. **24 April 2013, 980,000:** He masked by hand every block outside the pattern, counted 19,600 blocks, or 980K BTC, and put the error at "about 0.1%, at most." He also found that block 12 seemed to be the first one mined by somebody else.<sup><a href="#source-2">2</a></sup>
3. **20 August 2018, 600,000–700,000:** BitMEX Research redid the count for 2009. Up to August 2009 it agreed with Lerner. After that, it said, the slopes became too inconsistent to pin on one miner. It assigned 14,815 blocks (740,750 BTC) to the dominant miner, plus a "weak allocation" of 4,553 blocks (227,650 BTC), and concluded that "perhaps 600,000 to 700,000 bitcoin is a better estimate."<sup><a href="#source-4">4</a></sup>
4. **16 April 2019, ~1.1 million:** Lerner's "The Return of the Deniers and the Revenge of Patoshi" put the pattern at "about 22k blocks in total" and said Satoshi "mined close to 1.1M coins."<sup><a href="#source-3">3</a></sup>

## What is the evidence that one miner mined them?

Lerner's 2019 post gives three separate lines of evidence:<sup><a href="#source-3">3</a></sup>

- **The ExtraNonce slopes.** Patoshi's counter climbed faster than its real hash rate would explain, which makes its blocks easy to separate from everyone else's. He puts the tagging error at about 0.1%.
- **The nonce fingerprint.** By the end of 2013, Lerner had found that in Patoshi blocks the lowest byte of the nonce only ever took values in **0–9 and 19–58**, not the usual 0–255. Of the first 50,000 blocks, 27,680 have a nonce in that range, where chance would predict about 10,000. Lerner showed the gap is explained by roughly 22,000 Patoshi blocks. Why the range was restricted, he wrote, "I didn't know, and I still don't."
- **The clock.** Block timestamps sometimes go backwards between consecutive blocks from different computers. Lerner counted 694 such reversals in the first 50,000 blocks and found **zero** between two Patoshi blocks, even though Patoshi blocks make up 43% of that range. He read this as "a single PC clock."

Lerner's argument also fits the timing. In 2009 there was so little mining that difficulty stayed at its minimum,<sup><a href="#source-3">3</a></sup> until the [first difficulty adjustment at block 32,256](/blog/first-bitcoin-difficulty-adjustment-2009). Mining pools were still far off: the [first pool, Slush's,](/blog/first-bitcoin-mining-pool-slush-2010) only arrived in late 2010.

## Is the Patoshi miner definitely Satoshi?

No. The pattern points to one dominant early miner. Calling that miner Satoshi is an inference.

- In 2013, Gavin Andresen, who took over Bitcoin development from Satoshi, told The Verge: "It sure looks like one person (or group of cooperating people) mined about a million bitcoins in 2009, and the most likely suspect is Satoshi."<sup><a href="#source-5">5</a></sup>
- BitMEX Research wrote that "none of the above says much about whether the dominant miner was Satoshi." It noted that Satoshi did mine block 9, which falls in the dominant miner's slopes, but only in "a slope of just 11 blocks, so it's certainly not conclusive."<sup><a href="#source-4">4</a></sup>
- Bitcoin developer Greg Maxwell ("nullc") has publicly disputed the single-miner reading. Lerner quotes him arguing there is "fairly strong evidence that they were not mined by a single party."<sup><a href="#source-3">3</a></sup>

The block 9 link is easy to check on-chain. Block 170, mined at 03:30:25 UTC on 12 January 2009, holds the transaction that sent 10 BTC to Hal Finney, and it spends the 50 BTC reward from block 9.<sup><a href="#source-8">8</a></sup> That story is in [Hal Finney and the first Bitcoin transaction](/blog/hal-finney-first-bitcoin-transaction).

## Have Satoshi's coins ever moved?

According to the public trackers, almost never.

- In 2013, Lerner said he saw "only two blocks rewards (100 BTC)" from the pattern being spent, and allowed that "there may be some few more."<sup><a href="#source-2">2</a></sup>
- In 2019 he put the unspent share at 99.9% of Patoshi blocks.<sup><a href="#source-3">3</a></sup>
- In February 2025, Arkham Intelligence said it had added "22,000 Satoshi addresses with a total BTC balance of 1,096,354" based on the Patoshi pattern, and that these "include the only (known) addresses from which Satoshi spent BTC from."<sup><a href="#source-6">6</a></sup>
- In October 2025, Decrypt reported that Satoshi "is believed to own approximately 1.1 million BTC" and "has never moved any of it." It added that a Polymarket bet on whether Satoshi would move coins would settle against those Arkham-labelled wallets.<sup><a href="#source-7">7</a></sup>

Coins regularly flow *into* these addresses as dust, donations and messages. That doesn't count as Satoshi moving anything.<sup><a href="#source-6">6</a></sup> Satoshi himself went quiet in 2011; see [Satoshi's last message](/blog/satoshi-last-message-2011).

## Does Satoshi own the genesis block's 50 BTC?

Not in any usable way. The 50 BTC reward in the [genesis block](/blog/genesis-block-message-chancellor-on-brink) can't be spent, because of a quirk in how block 0 is written into the code. Whether that was deliberate is unknown.<sup><a href="#source-9">9</a></sup> Lerner's pattern starts at block 1.<sup><a href="#source-2">2</a></sup> You can look the block up yourself with [our block explorer guide](/blog/find-genesis-block-pizza-transaction-explorer).
