---
title: "The Bitcoin 2013 Fork: How Block 225,430 Split the Chain (11–12 March 2013)"
meta_title: "The Bitcoin 2013 Fork: Block 225,430 Explained | MOOD"
description: "On 11 March 2013 one block split Bitcoin in two: v0.8 accepted it, v0.7 didn't. What happened, the Berkeley DB lock bug, the rollback, BIP 50 and the lessons."
date: "2026-11-21"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Bitcoin 2013 fork: quick facts"
faqs:
  - title: "What was the Bitcoin 2013 fork?"
    content: "On 11–12 March 2013, block 225,430 was accepted by Bitcoin 0.8 nodes but rejected by many 0.7 and older nodes. For several hours that left two competing chains, until miners moved back to the chain old nodes accepted.[^1][^2]"
  - title: "Was the March 2013 fork a hard fork?"
    content: "It was an unplanned split, not a planned upgrade. On the night, developers on IRC called it an \"accidental hardfork.\"[^11] BIP 50 describes a database limit that had silently become a consensus rule, which is why many people call it an unintended hard fork.[^1]"
  - title: "What is BIP 50?"
    content: "BIP 50, \"March 2013 Chain Fork Post-Mortem,\" is Gavin Andresen's write-up of what went wrong and what was done about it. It was assigned on 20 March 2013, and parts were revised in February 2016.[^1][^12]"
  - title: "Did anyone lose bitcoin in the 2013 fork?"
    content: "Miners lost the rewards for blocks on the abandoned chain.[^1][^5] One double spend of 211.9093 BTC hit OKPay, and OKPay later said the situation was resolved.[^7] The official notice told users their bitcoins were safe.[^2]"
  - title: "How did the bitcoin price react?"
    content: "Ars Technica reported a drop from more than $48 to less than $37, about 23%, before a recovery to about $46.[^4]"
  - title: "Can I still see block 225,430?"
    content: "Yes. Explorers show the surviving block 225,430 (hash ending …575932, 23:24:19 UTC).[^9] The abandoned block (hash ending …80c023) exists only in archives and stale-block datasets.[^3][^10]"
after_faq: |
  ## Both chains started at block 0

  The two chains of March 2013 shared everything up to block 225,429. That shared history goes all the way back to the genesis block,[^3][^10] the block on our [Genesis T-shirt](/products/genesis-t-shirt). The [Whitepaper T-shirt](/products/whitepaper-t-shirt) carries the design the 2013 developers were trying to stay faithful to. The [Pizza T-shirt](/products/pizza-t-shirt) marks the first time bitcoin bought something real, and that kind of trust is exactly what a chain split puts at risk. You'll find all three on our [Bitcoin T-shirts](/bitcoin-t-shirts) page. If you want to look up blocks yourself, start with our [block explorer guide](/blog/find-genesis-block-pizza-transaction-explorer). For more dates like this one, see the [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar).

  <a href="/products/genesis-t-shirt" className="btn btn-primary">Shop the Genesis T-shirt</a>

  ## Sources

  1. <span id="source-1"></span>Gavin Andresen, ["BIP 50: March 2013 Chain Fork Post-Mortem,"](https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki) bitcoin/bips on GitHub (assigned 2013-03-20; what went wrong; ~60% hash power on 0.8; BTCGuild and Slush downgrades; double spend; root cause in Berkeley DB locks; 500,000-byte self-imposed limit before 0.7; LevelDB; blkindex.dat page layout; 0.8.1 action items, 10,000 locks, 537,000 locks; -alertnotify; mempool explanation; block 252,451 on 16 Aug 2013)
  2. <span id="source-2"></span>bitcoin.org, ["11/12 March 2013 Chain Fork Information"](https://bitcoin.org/en/alert/2013-03-11-chain-fork) (block 225,430 from a 0.8.0 miner; pools asked to switch back to 0.7; "Nothing"; "Are my bitcoins safe? Yes."; last updated 16 May 2013)
  3. <span id="source-3"></span>Pieter Wuille, ["Alert: chain fork caused by pre-0.8 clients dealing badly with large blocks,"](https://bitcointalk.org/index.php?topic=152030.0) BitcoinTalk, 12 Mar 2013, 01:29:57 UTC, plus his follow-up at 01:30:26 UTC (miner instructions; BTCGuild switching; forking block hash 000000000000015c…80c023 with >1700 transactions; old-chain block 00000000000001c1…575932)
  4. <span id="source-4"></span>Timothy B. Lee, ["Major glitch in Bitcoin network sparks sell-off; price temporarily falls 23%,"](https://arstechnica.com/information-technology/2013/03/major-glitch-in-bitcoin-network-sparks-sell-off-price-temporarily-falls-23/) Ars Technica, 11 Mar 2013 (US time) (price from above $48 to below $37, recovery to about $46; Mt. Gox suspension)
  5. <span id="source-5"></span>Vitalik Buterin, ["Bitcoin Network Shaken by Blockchain Fork,"](https://bitcoinmagazine.com/technical/bitcoin-network-shaken-by-blockchain-fork-1363144448) Bitcoin Magazine, 13 Mar 2013 (first noticed ~23:30 GMT; 10,000-lock limit and >5,000 transactions; 13-block peak lead; convergence at block 225,454 at 06:19; "24 blocks or 6 hours"; ~$26,000 in lost rewards at 25 BTC per block; $10,000 OKPay double spend; pool concentration; 2010 overflow comparison)
  6. <span id="source-6"></span>bitcoin.org, ["Bitcoin Core version 0.8.1 released,"](https://bitcoin.org/en/release/v0.8.1) 18 Mar 2013, with the 0.8.0 notes (0.8.0 dated 19 Feb 2013; LevelDB for indexes; 0.8.1's "just two changes": rule from 21 Mar to 15 May 2013 and checkpoint at 225,430) ([0.8.0](https://bitcoin.org/en/release/v0.8.0))
  7. <span id="source-7"></span>macbook-air, ["A successful DOUBLE SPEND US$10000 against OKPAY this morning.,"](https://bitcointalk.org/index.php?topic=152348.0) BitcoinTalk, 12 Mar 2013, 18:22:02 UTC (211.9093 BTC to 12z2n8YCJw1BEsJhhQPLCTuLqwH341nKnE; $9,800 credited at BTC-e; double spends in pre-0.8 block 225,446; quote). OKPAY account reply, 13 Mar 2013, 10:25:08 UTC ("Yes we resolved this situation."), [page 4](https://bitcointalk.org/index.php?topic=152348.60)
  8. <span id="source-8"></span>Pieter Wuille, "Re: [Bitcoin-development] 0.8.1 ideas," [bitcoin-development mailing list](https://mirror.b10c.me/lists/bitcoindev/20130313183824.GB7921@vps7135.xlshosting.net/), 13 Mar 2013, 18:38 UTC (also [mail-archive](https://www.mail-archive.com/bitcoin-development@lists.sourceforge.net/msg01877.html))
  9. <span id="source-9"></span>Blockstream Esplora API, checked 21 Nov 2026: [block 225,430](https://blockstream.info/block/00000000000001c108384350f74090433e7fcf79a606b8e797f065b130575932) (00000000000001c1…575932; 1363044259 = 23:24:19 UTC 11 Mar 2013; 797 tx; 249,119 bytes; previous block 0000000000000366…46d006); block 225,446 (05:01:40 UTC, 12 Mar); 225,454 (06:19:32 UTC); 225,455 (06:20:04 UTC); 252,451 (0000000000000024b5…26eed07; 12:09:07 UTC, 16 Aug 2013; 1,486 tx; 824,638 bytes); address 12z2n8YC… with 0 transactions (and [mempool.space](https://mempool.space/block/00000000000001c108384350f74090433e7fcf79a606b8e797f065b130575932))
  10. <span id="source-10"></span>[bitcoin-data/stale-blocks dataset](https://github.com/bitcoin-data/stale-blocks), GitHub (stale block 225,430, 000000000000015c…80c023; its raw header has previous block 225,429 and timestamp 22:39:09 UTC, 11 Mar 2013, decoded by us)
  11. <span id="source-11"></span>LearnBitcoin, ["The 2013 Chain Fork,"](https://www.learnbitcoin.com/rabbit-hole/2013-chain-fork) published 1 Oct 2026, a reconstruction from the #bitcoin-dev IRC archives (Slush's pool mined the big block; BTC Guild rollback and developer ACKs around 00:30–00:45 UTC; "yay accidental hardfork"; ~13-block peak; "Disconnect 25 blocks"; Slush's failed downgrade and patched 0.8; old chain can't converge on its own)
  12. <span id="source-12"></span>[GitHub commit history for bip-0050.mediawiki](https://github.com/bitcoin/bips/commits/master/bip-0050.mediawiki) (9 Feb 2016: "bip-0050: Final update to what actually occurred"; 1 Feb 2016: Draft → Final)

---

**On the night of 11 to 12 March 2013, Bitcoin split into two chains for several hours.** A miner running the new Bitcoin 0.8 produced a large block at height 225,430. Nodes on 0.8 accepted it, but many nodes on 0.7 and older rejected it, so the two versions started building separate chains.[^2] The cause was a hidden limit in older versions: they didn't configure enough Berkeley DB database locks to process some large but otherwise valid blocks. Bitcoin 0.8 had moved to LevelDB, which doesn't have that limit.[^1] Developers and pool operators fixed it by getting miners back onto the chain that old software could follow. That chain overtook the 0.8 chain early on 12 March.[^1][^5][^9] The bug was written up in BIP 50, and the temporary fix shipped in Bitcoin 0.8.1.[^1][^6]

## The March 2013 fork at a glance

| Fact | Value | Source |
|---|---|---|
| Fork height | Block 225,430 | bitcoin.org alert[^2] |
| Forking (abandoned) block | 000000000000015c50b165fcdd33556f8b44800c5298943ac70b112df480c023, ">1700 transactions" | Pieter Wuille, BitcoinTalk[^3] |
| Its header timestamp | 22:39:09 UTC, 11 Mar 2013 | Stale-block header data[^10] |
| Surviving block 225,430 | 00000000000001c108384350f74090433e7fcf79a606b8e797f065b130575932, 23:24:19 UTC, 797 transactions, 249,119 bytes | Blockstream explorer[^9] |
| Root cause | Pre-0.8 versions had too few Berkeley DB locks; 0.8 used LevelDB | BIP 50[^1] |
| Hash power on the 0.8 side | "around 60%" | BIP 50[^1] |
| Old chain overtakes | Block 225,455, 06:20:04 UTC, 12 Mar 2013 | Blockstream explorer[^9] |
| Known double spend | 211.9093 BTC (about $10,000) paid to OKPay | BitcoinTalk[^7] |
| Price reaction | From above $48 to below $37, about 23% | Ars Technica[^4] |
| Fix | Bitcoin 0.8.1, released 18 Mar 2013 | bitcoin.org release notes[^6] |
| Post-mortem | BIP 50, by Gavin Andresen | BIP 50[^1] |

## What happened in the March 2013 Bitcoin fork?

Bitcoin 0.8.0 came out on 19 February 2013. Its headline change was that LevelDB now stored the transaction and block indexes. Berkeley DB was kept only for the wallet file.[^6] It was meant as a speed-up, not a rule change.[^5]

On 11 March, a miner running 0.8.0 produced a large block at height 225,430 that older versions couldn't handle.[^2] Pieter Wuille said in his alert that the block had more than 1,700 transactions.[^3] LearnBitcoin, which rebuilt the night from IRC logs, says Slush's pool mined it.[^11] Many 0.7 nodes rejected the block, so they waited for a different block at the same height. Nodes running 0.8 accepted it and kept building on top of it.[^2]

That left two chains with the same history up to block 225,429.[^3][^10] According to BIP 50, the 0.8 chain had about 60% of the mining hash power, so the split was never going to fix itself.[^1] Old nodes would keep rejecting block 225,430 however much work was built on top of it.[^11]

![Diagram of the March 2013 Bitcoin chain split: after block 225,429 the chain forks into a v0.8 branch starting with a large block 225,430 and a v0.7 branch that eventually overtakes it at block 225,455](/images/blog/bitcoin-2013-fork-diagram.svg)

## Timeline of the 2013 fork (UTC)

All times are UTC. Block times come from block headers, which miners set themselves, so treat them as approximate to the minute.

| Time (UTC) | Event | Source |
|---|---|---|
| 11 Mar, 22:39:09 | Large block 225,430 mined on the 0.8 side | Stale-block header data[^10] |
| 11 Mar, 23:24:19 | A different block 225,430 (797 transactions, 249 KB) is mined on the side old nodes accept. This is the one that survives | Blockstream explorer[^9] |
| ~11 Mar, 23:30 | Fork first noticed on the #bitcoin-dev IRC channel | Bitcoin Magazine[^5] |
| 12 Mar, 00:30–00:45 | BTC Guild's operator starts rolling back to 0.7, and developers agree to prefer the 0.7 chain | LearnBitcoin (IRC log)[^11] |
| 12 Mar, 01:29:57 | Pieter Wuille's alert on BitcoinTalk: "If you're a miner, please do not mine on 0.8 code. Stop, or switch back to 0.7." | BitcoinTalk[^3] |
| 12 Mar, ~02:00 | The 0.8 chain's lead peaks at about 13 blocks | Bitcoin Magazine,[^5] LearnBitcoin[^11] |
| 12 Mar, 06:19:32 | The old chain draws level at block 225,454 | Blockstream explorer,[^9] Bitcoin Magazine[^5] |
| 12 Mar, 06:20:04 | Block 225,455 puts the old chain ahead, and 0.8 nodes reorganise onto it | Blockstream explorer,[^9] LearnBitcoin[^11] |

From the abandoned block's timestamp to block 225,455 is about 7 hours 41 minutes.[^9][^10] Bitcoin Magazine's report at the time said "6 hours" and "24 blocks".[^5] LearnBitcoin points out that nodes which reorganised logged "Disconnect 25 blocks."[^11]

![Timeline of the March 2013 Bitcoin fork in UTC, from the large block at 22:39 on 11 March to the old chain overtaking at 06:20 on 12 March](/images/blog/bitcoin-2013-fork-timeline.svg)

## What caused it? The Berkeley DB lock limit

BIP 50 states the root cause plainly: "Bitcoin versions prior to 0.8 configure an insufficient number of Berkeley DB locks to process large but otherwise valid blocks."[^1]

- **The trigger was not block size as such.** BIP 50 says the forking block had "a larger number of total transaction inputs than previously seen." It adds that because full-size blocks had already worked on testnet, "it did not occur to anyone that there could be blocks that were smaller but require more locks than were available."[^1]
- **Bigger blocks had only just started.** Before 0.7, unmodified miners capped their own blocks at 500,000 bytes. Version 0.7 made that target configurable, and "miners had been encouraged to increase this target in the week prior to the incident."[^1]
- **The numbers.** Bitcoin Magazine put Bitcoin's lock limit at 10,000 and said block 225,430 touched more than 5,000 transactions at once, which needed more than 10,000 locks.[^5]
- **Why 0.8 was fine.** Version 0.8 used LevelDB, "which did not implement the same locking limits as BDB."[^1]
- **Even 0.7 nodes didn't all agree.** Locks are taken per database page, so the number a block needs "depends on the exact arrangement of the blkindex.dat on disk." In principle, one 0.7.2 node could make a block that other 0.7.2 nodes couldn't validate.[^1]

BIP 50's verdict is that the lock setting had "implicitly had become a network consensus rule determining block validity (albeit an inconsistent and unsafe rule, since the lock usage could vary from node to node)."[^1] One caveat on that quote: the BIP's history on GitHub shows a February 2016 edit titled "bip-0050: Final update to what actually occurred," so not all of its current wording dates from 2013.[^12]

## How was the fork resolved?

**Miners went back to the old chain.** There were two options: move everyone onto 0.8, or get enough miners off the 0.8 chain for the 0.7 chain to overtake it. Developers picked the second, because both old and new software could follow that chain.[^5] Wuille's alert told miners to stop mining on 0.8 or switch back to 0.7, and said "BTCGuild is switching to 0.7, so the old chain will get a majority hash rate soon."[^3]

**The pools paid for it.** BIP 50 credits Marek Palatinus (Slush) and Michael Marsee (Eleuthria of BTC Guild) with acting fast "despite the fact that this caused them to sacrifice significant amounts of money."[^1] BIP 50 says both pools downgraded to 0.7. LearnBitcoin's reading of the IRC log is that Slush's downgrade failed, and his pool instead ran 0.8 with an emergency patch that rejected the one problem block.[^1][^11] Bitcoin Magazine estimated the lost block rewards on the abandoned chain at about $26,000.[^5]

**Businesses paused.** BIP 50 notes that deposits at the major exchanges and payments via BitPay were "suspended (and then un-suspended) very quickly."[^1] Ars Technica reported that Mt. Gox suspended Bitcoin transactions shortly after Wuille's call for merchants to stop.[^4]

**Ordinary users didn't have to do anything.** The official bitcoin.org notice told non-miners to do "Nothing," because their software "will switch to the correct chain automatically, no matter which version you are running." To "Are my bitcoins safe?" it answered: "Yes."[^2]

## Bitcoin 0.8.1 and BIP 50

- **0.8.1 (18 March 2013).** The release notes describe "just two changes" from 0.8.0. The first was a new block-acceptance rule, enforced "from 21 March 2013 until 15 May 2013 to prevent accepting blocks that fail to validate on pre-0.8 peers." The second was a compiled-in checkpoint at block 225,430, "the first block of the 11 March 2013 chain fork."[^6]
- **BIP 50 action items.** BIP 50 lists a 0.8.1 that would reject blocks "that would probably cause more than 10,000 locks to be taken" and cap the size of blocks it created at 500,000 bytes. It also lists a patch for older versions that raised their lock limit to 537,000, a bitcoin.org upgrade page, and two months of alerts to old clients.[^1]
- **Better alerts.** Developers added `-alertnotify`, which runs a command when an alert arrives, and started broadcasting weekly test alerts on testnet.[^1]
- **The real end.** According to BIP 50, unpatched old nodes were finally forked off on 16 August 2013, when block 252,451 "was accepted by the main network."[^1] On-chain, that block is timestamped 12:09:07 UTC and holds 1,486 transactions in 824,638 bytes.[^9]

## The OKPay double spend

BIP 50 records "at least one large double spend" during the split, and adds that it was "done by someone experimenting to see if it was possible and was not intended to be malicious."[^1]

The person behind it, BitcoinTalk user macbook-air, posted the details himself (his times are in UTC+8). Before he knew about the fork, he paid OKPay 211.9093 BTC to fund about $10,000 of deposit at BTC-e. That payment confirmed only on the 0.8 chain, and BTC-e credited him $9,800. Once he worked out what had happened, he made two transactions spending the same coins elsewhere, and they were confirmed in block 225,446 on the pre-0.8 chain.[^7] Converted to UTC, that's 05:01, and block 225,446 on today's chain is indeed timestamped 05:01:40 UTC. The OKPay address he named shows no transactions on the surviving chain.[^9]

He finished his post with: "I bet merchants would think twice before they decide to accept Bitcoins after the incident."[^7] The next morning an account posting as OKPAY wrote in the same thread: "Yes we resolved this situation."[^7]

BIP 50's best explanation for why the double spend worked, even though both chains saw the transactions in the same order, is that "the memory pools were cleared when the mining pool nodes were downgraded."[^1]

## Why the 2013 fork still matters

- **Changing the software can change the rules.** Nobody meant to change consensus. A database swap did it anyway.[^1][^5] The day after, Wuille wrote on the developer mailing list: "The protocol is whatever the network enforces." He also wrote: "0.7 and before had a bug, but 0.8 was wrong for not following the rules of the network (which I hate to say, as I'm responsible for many changes in 0.8)."[^8]
- **Majority hash power didn't decide it.** The chain with about 60% of the hash power was the one abandoned, because the other chain was the one every node could follow.[^1][^3]
- **Coordination depended on a handful of pools.** Bitcoin Magazine noted that a controlled switch was only possible because a few large pools controlled most of the hash power and could be contacted directly.[^5]
- **Confirmations aren't final during a split.** OKPay's payment had confirmed, but on the chain that lost.[^7]

This wasn't Bitcoin's first consensus emergency. In August 2010 a single transaction created more than 184 billion BTC.[^5] We covered it in [the 184 billion bitcoin overflow bug](/blog/bitcoin-value-overflow-incident-2010). Mining pools mattered here because of how quickly they had taken over after [the first pool, Slush's, in 2010](/blog/first-bitcoin-mining-pool-slush-2010). The 25 BTC block reward that made the abandoned blocks so costly dated from [the first halving in November 2012](/blog/first-bitcoin-halving-2012).[^5] Exchanges like Mt. Gox, which goes back to [the first Bitcoin exchanges of 2010](/blog/first-bitcoin-exchange-2010), had to freeze deposits.[^4] All of this was being run by developers after [Satoshi's last message in 2011](/blog/satoshi-last-message-2011), and argued out on [BitcoinTalk](/blog/bitcointalk-forum-founded-2009).[^3]
