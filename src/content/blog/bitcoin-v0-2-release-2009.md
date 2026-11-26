---
title: "Bitcoin v0.2: The 16 December 2009 Release That Brought Linux, Tor Proxy Support and the Tray Icon"
meta_title: "Bitcoin v0.2 Release, 16 Dec 2009: Linux, Tor, Tray | MOOD"
description: "Satoshi announced Bitcoin 0.2 on 16 Dec 2009: a Linux version, Windows installer, tray icon and autostart by Martti Malmi, plus multi-core mining and Tor proxy."
date: "2026-11-26"
author: "Vlad"
image: "/images/metaimage.png"
draft: false
categories:
  - "History"
tags:
  - "Bitcoin"
  - "History"
faq_section_title: "Bitcoin v0.2 release: quick facts"
faqs:
  - title: "When was Bitcoin 0.2 released?"
    content: "Satoshi Nakamoto announced it on the Bitcoin Forum on 16 December 2009 at 22:45:36 UTC,[^2] and on the bitcoin-list mailing list early on 17 December (UTC).[^6]"
  - title: "What was new in Bitcoin 0.2?"
    content: "From Martti Malmi: minimize to tray, autostart on boot, a new options dialog, a Windows setup program and a Linux version. From Satoshi: multi-processor coin generation, proxy support for Tor and faster initial block download.[^1]"
  - title: "Was Bitcoin 0.2 the first version for Linux?"
    content: "It was the first release to include a Linux download. Satoshi's mailing-list note said \"Windows, and now Linux version available,\" and the forum notes list \"Linux version (tested on Ubuntu)\" as new.[^6][^1]"
  - title: "Who is sirius-m?"
    content: "Martti Malmi's username. Satoshi thanked \"Martti Malmi (sirius-m)\" in the release notes,[^1] and the Bitcoin Wiki calls him the second Bitcoin developer after Satoshi.[^16]"
  - title: "Did Bitcoin 0.2 use Tor by default?"
    content: "No. The proxy setting was off by default (`fUseProxy = false`); when enabled it pointed to `127.0.0.1:9050`, the default port of a local Tor client.[^14][^15]"
  - title: "Where can I see the Bitcoin 0.2 code?"
    content: "On GitHub, under the `v0.2.0` tag of `bitcoin/bitcoin`, which points to the \"0.2 rc2\" commit of 14 December 2009.[^8] Treat it as history, not software to run."
after_faq: |
  ## Wear the history

  v0.2 is the release that made Bitcoin something you could leave running. We print the moments it was built on, from the whitepaper to the genesis block. Browse the range in our [Bitcoin T-shirts](/bitcoin-t-shirts) collection.

  <a href="/bitcoin-t-shirts" className="btn btn-primary">Shop Bitcoin T-shirts</a>

  ## Sources

  1. <span id="source-1"></span>satoshi, ["Bitcoin 0.2 released!"](https://bitcointalk.org/index.php?topic=16.0), Bitcoin Forum (BitcoinTalk) topic 16, 16 Dec 2009 10:45:36 PM (forum time; last edited 17 Dec 2009 02:11:25 AM). Three SourceForge downloads; feature list by Martti Malmi and Satoshi Nakamoto; thanks to Malmi "for hosting the new site and this forum" and New Liberty Standard for testing Linux. Replies: SmokeTooMuch 17 Dec 2009 ("Great, now i create much more coins than before"); RogerRabbit 12 Jan 2010 ("Tor has been working great for my Bitcoin now")
  2. <span id="source-2"></span>Satoshi Nakamoto Institute, BitcoinTalk thread 10, ["Bitcoin 0.2 released!"](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/10/) (dated 16 Dec 2009 at 22:45:36 UTC)
  3. <span id="source-3"></span>Satoshi Nakamoto Institute, BitcoinTalk thread 7, ["[OLD THREAD] Bitcoin version 0.2 development status"](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/7/) (27 Nov 2009 22:48:39 UTC; Malmi's tray, autostart, options dialog, setup EXE; Satoshi's multi-processor and proxy support "coming in version 0.2")
  4. <span id="source-4"></span>Satoshi Nakamoto Institute, BitcoinTalk thread 6, ["Repost: Linux/UNIX compile"](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/6/) (repost of scott's 8 Oct 2009 request; Satoshi's 27 Nov 2009 17:27:09 UTC reply: Martti's Linux port merged, New Liberty Standard testing, "It'll be in the next release, version 0.2"; command line "on the to-do list after 0.2")
  5. <span id="source-5"></span>Martti Malmi, ["Satoshi - Sirius emails 2009-2011"](https://mmalmi.github.io/satoshi/) (published for the 2024 UK trial where he was a witness). Emails used: #27 (Malmi, 24 Aug 2009, tray/autostart plan); #31 (Satoshi, 29 Aug 2009, "most important missing feature", "300% more nodes" vs "3% more"); #72 (Satoshi, 9 Nov 2009, thanks for Linux build, autostart, tray, setup); #102 (Satoshi, 20 Nov 2009, "All those factors multiply together"); #127 (Malmi, 13 Dec 2009, RC "No problems so far", attachment names); #128 (Malmi, 15 Dec 2009, RC2 test, final exams); #129–#130 (16 Dec 2009, sender-side fixes, "About 1,5h"); #131 (Satoshi, 16 Dec 2009 16:54:46 UTC, planned announcement text incl. "new forum at http://www.bitcoin.org/smf/"); #132 (bitcoin-list announcement, 17 Dec 2009)
  6. <span id="source-6"></span>Satoshi Nakamoto Institute, bitcoin-list email 29, ["[bitcoin-list] Bitcoin 0.2 released"](https://satoshi.nakamotoinstitute.org/emails/bitcoin-list/29/) (17 Dec 2009 at 06:52:09 UTC per SNI; Malmi's copy shows 06:49:02 +0000; "Windows, and now Linux version available"; "new forum at http://www.bitcoin.org/smf/")
  7. <span id="source-7"></span>Satoshi Nakamoto Institute, bitcoin-list email 25, ["[bitcoin-list] Bitcoin v0.1.5 released"](https://satoshi.nakamotoinstitute.org/emails/bitcoin-list/25/) (4 Feb 2009 19:46:04 UTC); list index shows no release announcement between 0.1.5 and 0.2: [bitcoin-list index](https://satoshi.nakamotoinstitute.org/emails/)
  8. <span id="source-8"></span>GitHub, bitcoin/bitcoin tag [`v0.2.0`](https://github.com/bitcoin/bitcoin/tree/v0.2.0) → [commit e2c2648](https://github.com/bitcoin/bitcoin/commit/e2c2648c14f4b87d331dbc30f0f2bd4aab9ce7e6) by s_nakamoto, 14 Dec 2009 02:12:01 UTC, "filter out duplicate getblocks and don't relay inv messages during initial block download -- 0.2 rc2" (git-svn trunk@49); repository history begins with sirius-m's "First commit" and "Added changelog.txt", 30 Aug 2009 (commit list via https://api.github.com/repos/bitcoin/bitcoin/commits?since=2009-08-01T00:00:00Z&until=2010-01-15T00:00:00Z)
  9. <span id="source-9"></span>GitHub, bitcoin/bitcoin [commit dba0fd9](https://github.com/bitcoin/bitcoin/commit/dba0fd9b6a76897bbb42b2b6dcfb3b84b8558936) by sirius-m, 24 Sep 2009, "tray icon + ask before closing" (trunk@10)
  10. <span id="source-10"></span>GitHub, bitcoin/bitcoin [commit 661f878](https://github.com/bitcoin/bitcoin/commit/661f878002d789f7e50b19d63da246414015c44b) by sirius-m, 3 Oct 2009, "Added NSIS installer generation script" (trunk@13)
  11. <span id="source-11"></span>GitHub, bitcoin/bitcoin [commit 99cef99](https://github.com/bitcoin/bitcoin/commit/99cef996c788755af95a0a614d7154a30928d4b9) by s_nakamoto, 21 Oct 2009, "flush wallet.dat, multi-proc, reorg options, revert to startup folder shortcut" (trunk@15)
  12. <span id="source-12"></span>GitHub, bitcoin/bitcoin [commit dd51920](https://github.com/bitcoin/bitcoin/commit/dd519206a684c772a4a06ceecc87c665ad09d8be) by s_nakamoto, 29 Oct 2009, "addr relaying fixes, proxy option and privacy patches, …" (trunk@18)
  13. <span id="source-13"></span>GitHub, bitcoin/bitcoin [commit fe9f3d6](https://github.com/bitcoin/bitcoin/commit/fe9f3d626d79f71d819caf43878299fa5e6af83e) by sirius-m, 31 Oct 2009, "Linux alternatives for the Windows headers and PerformanceCounter. Some typedefs and #defines for the Linux build. Fixed GetDataDir." (trunk@23)
  14. <span id="source-14"></span>Bitcoin v0.2.0 source on GitHub: [`net.cpp`](https://raw.githubusercontent.com/bitcoin/bitcoin/v0.2.0/net.cpp) (`int fUseProxy = false;`, `CAddress addrProxy("127.0.0.1:9050");`), [`main.cpp`](https://raw.githubusercontent.com/bitcoin/bitcoin/v0.2.0/main.cpp) (`wxThread::GetCPUCount()`, one `ThreadBitcoinMiner` per processor, `fLimitProcessors`), [`serialize.h`](https://raw.githubusercontent.com/bitcoin/bitcoin/v0.2.0/serialize.h) (`VERSION = 200`), [`changelog.txt`](https://raw.githubusercontent.com/bitcoin/bitcoin/v0.2.0/changelog.txt) ("Changes after 0.1.5")
  15. <span id="source-15"></span>Tor Project, Tor manual, [SocksPort](https://2019.www.torproject.org/docs/tor-manual.html.en) ("…ports 9100 and 9050 (because this is the default)")
  16. <span id="source-16"></span>Bitcoin Wiki, ["Sirius"](https://en.bitcoin.it/wiki/Martti_Malmi) (redirect from Martti Malmi): "the second Bitcoin developer after Satoshi and the founder of the Bitcoin Forum"
  17. <span id="source-17"></span>Bitcoin Wiki, ["History"](https://en.bitcoin.it/wiki/History) (2008: "October 31 Bitcoin whitepaper published"; 2009: "January 3 Genesis block established", "January 9 Bitcoin v0.1 released", "October 5 Exchange rates published by New Liberty Standard. $1 = 1,309.03 BTC", "December 16 Bitcoin v0.2 released", "December 30 First difficulty increase"; 2010: "May 22 laszlo first to buy pizza with Bitcoins")
  18. <span id="source-18"></span>satoshi, ["Welcome to the new Bitcoin forum!"](https://bitcointalk.org/index.php?topic=5.msg28), Bitcoin Forum topic 5, 22 Nov 2009 06:04:28 PM (forum time, UTC)

---

**Satoshi Nakamoto announced Bitcoin 0.2 on the Bitcoin Forum at 22:45:36 UTC on 16 December 2009, in a post titled "Bitcoin 0.2 released!"**[^1][^2] It was the first Bitcoin release with a Linux download ("tested on Ubuntu") and a Windows setup program, and the release notes credited most of the new features to a second developer, Martti Malmi (sirius-m): minimize to tray, autostart on boot, a new options dialog, the Windows installer and the Linux version.[^1] Satoshi's own additions were multi-processor coin generation, "proxy support for use with TOR" and fixes for slowdowns in the initial block download.[^1] The same notes went to the bitcoin-list mailing list early on 17 December (UTC).[^6]

![MOOD blog: Bitcoin v0.2 release, 16 December 2009](/images/metaimage.png)

Eleven months after [Bitcoin v0.1](/blog/bitcoin-v0-1-release-2009) (9 January 2009, per the Bitcoin Wiki),[^17] v0.2 was about getting more people to run a node, and to keep running it.

## Bitcoin v0.2 at a glance

| Date (UTC) | Event | Source |
|---|---|---|
| 4 Feb 2009 | v0.1.5 announced on bitcoin-list, the last release announced there before 0.2 | SNI[^7] |
| 24 Aug 2009 | Malmi emails Satoshi: next he'll build "minimize to tray" and autostart | Malmi archive[^5] |
| 24 Sep 2009 | Malmi commits "tray icon + ask before closing" (SVN r10) | GitHub[^9] |
| 3 Oct 2009 | Malmi adds the NSIS Windows installer script (r13) | GitHub[^10] |
| 21 Oct 2009 | Satoshi commits "flush wallet.dat, multi-proc, reorg options…" (r15) | GitHub[^11] |
| 29 Oct 2009 | Satoshi commits "proxy option and privacy patches" (r18) | GitHub[^12] |
| 31 Oct 2009 | Malmi commits Linux alternatives to Windows-only code (r23) | GitHub[^13] |
| 27 Nov 2009 | Satoshi pre-announces 0.2 features on the forum | SNI[^3][^4] |
| 13 Dec 2009 | Malmi tests the emailed release candidate: "No problems so far" | Malmi archive[^5] |
| 14 Dec 2009 | Commit "…-- 0.2 rc2" (r49); GitHub's `v0.2.0` tag points to it | GitHub[^8] |
| 16 Dec 2009, 22:45:36 | "Bitcoin 0.2 released!" on the forum | BitcoinTalk,[^1] SNI[^2] |
| 17 Dec 2009 | "Bitcoin 0.2 released" on bitcoin-list | SNI,[^6] Malmi archive[^5] |

![Timeline of Bitcoin v0.2: Malmi's tray-icon plan on 24 August 2009, tray icon commit 24 September, multi-processor mining 21 October, proxy option 29 October, pre-announcement 27 November, release candidate 13 December, release 16 December 2009](/images/blog/bitcoin-v0-2-release-2009-timeline.svg)

## What the release notes said

The forum post opened with "Bitcoin version 0.2 is here!" and three SourceForge downloads: a Windows setup `.exe`, a Windows `.zip` and a Linux `.tar.gz`.[^1] The features were listed by author:

| Martti Malmi | Satoshi Nakamoto |
|---|---|
| Minimize to system tray option | Multi-processor support for coin generation |
| Autostart on boot, "so you can keep it running in the background automatically" | Proxy support for use with TOR |
| New options dialog layout "for future expansion" | Fixed some slowdowns in the initial block download |
| Setup program for Windows | |
| Linux version (tested on Ubuntu) | |

Satoshi closed with "Major thanks to Martti Malmi (sirius-m) for all his coding work and for hosting the new site and this forum, and New Liberty Standard for his help with testing the Linux version."[^1] The forum he meant is the one Satoshi had opened with "Welcome to the new Bitcoin forum!" on 22 November 2009,[^18] today's [BitcoinTalk](/blog/bitcointalk-forum-founded-2009). New Liberty Standard is the same person who published [Bitcoin's first dollar exchange rate](/blog/first-bitcoin-price-2009), $1 = 1,309.03 BTC, on 5 October 2009.[^17]

![Table splitting the Bitcoin 0.2 release notes into Martti Malmi's features (tray, autostart, options dialog, Windows setup, Linux) and Satoshi Nakamoto's (multi-processor generation, Tor proxy, faster initial block download)](/images/blog/bitcoin-v0-2-release-2009-features.svg)

## Why the tray icon mattered: "300% more nodes"

The most interesting part of v0.2 is the reasoning behind it, which we can read now because Malmi later published his emails with Satoshi, writing that he decided to share them for "an important trial in the UK in 2024" where he was a witness.[^5]

On 24 August 2009 Malmi wrote that he would next build "minimize to tray" and an option to autostart Bitcoin with Windows, "so the number of nodes online would stay higher," and after that maybe a Linux port.[^5] Satoshi replied on 29 August that Malmi had "put your finger on the most important missing feature right now":[^5]

> "Without auto-run, we'll almost never retain nodes after an initial tryout interest. Auto-running as a minimized tray icon by default was the key to success for the early file sharing networks."

He was less keen on Linux at that point: "Auto-run might give us 300% more nodes while Linux might give us 3% more."[^5] Those are Satoshi's guesses in a private email, not measurements. In the end v0.2 shipped both.

By 20 November 2009 he had put the whole release in one line: "The linux version, setup exe, tor option and better website/forum will all increase the percentage of visitors who can use it, and the autostart and minimize to tray will increase how many keep running it. All those factors multiply together."[^5]

## The Linux version

Linux was a long-standing request. On the new forum Satoshi reposted a question from user scott, first posted on 8 October 2009, asking for a Linux/UNIX build, and answered on 27 November: "Martti's Linux port was merged into the main code branch and New Liberty Standard has been testing it. It'll be in the next release, version 0.2." A command-line version was "on the to-do list after 0.2."[^4]

The code history matches. On 31 October 2009 Malmi (as sirius-m) committed "Linux alternatives for the Windows headers and PerformanceCounter. Some typedefs and #defines for the Linux build."[^13] On 9 November Satoshi emailed him: "You got a lot done with the Linux build, autostart, minimize to tray, setup and everything, it's really appreciated."[^5]

## Tor proxy and multi-core mining, in the code

Satoshi's two headline features are easy to see in the `v0.2.0` source on GitHub:[^14]

- **Tor proxy.** `net.cpp` defines `fUseProxy = false` and `addrProxy("127.0.0.1:9050")`. Port 9050 is Tor's default SOCKS port.[^15] So the option was off by default, and when switched on it pointed at a Tor client on the same computer. The work had landed on 29 October 2009 as "proxy option and privacy patches."[^12] At least one user reported using it: in the release thread, on 12 January 2010, RogerRabbit wrote that "Tor has been working great for my Bitcoin now."[^1]
- **Multi-processor generation.** `main.cpp` asks `wxThread::GetCPUCount()` how many processors the machine has and starts one `ThreadBitcoinMiner` per processor, unless the user set a limit.[^14] The "multi-proc" commit is dated 21 October 2009.[^11] The first reply in the release thread, from SmokeTooMuch, quoted that line: "Great, now i create much more coins than before."[^1]

Excerpts from Bitcoin v0.2.0 (`net.cpp` and `main.cpp`):

```
int fUseProxy = false;
CAddress addrProxy("127.0.0.1:9050");
wxThread::GetCPUCount()
ThreadBitcoinMiner
fLimitProcessors
```

In the same release the source sets `VERSION = 200` in `serialize.h`, and `changelog.txt` begins "Changes after 0.1.5," listing the options panel, minimize to tray, startup on boot, "ask before closing" and the NSIS installer.[^14]

## The last week before release

The emails show a small, careful launch:[^5]

- **13 Dec 2009.** Malmi replies to Satoshi's "Version 0.2 almost ready to release" with "No problems so far. Seems fine." The quoted attachments are `bitcoin-0.2.0-setup.zip`, `bitcoin-0.2.0-linux.tar.gz` and `bitcoin-0.2.0-win32.zip`.
- **14 Dec 2009.** Satoshi commits a fix to the initial block download, labelled "0.2 rc2."[^8]
- **15 Dec 2009.** Malmi tests RC2 on Windows and Ubuntu, mentioning he's in the middle of his final exams.
- **16 Dec 2009.** Malmi reports the initial download took "About 1,5h." Satoshi explains that most fixes are on the sender's side, so "It'll get better as the network upgrades to 0.2." At 16:54 UTC he sends the "planned release announcement text… Probably releasing shortly." About six hours later it was on the forum.[^2]

The draft had a line the forum version dropped: "We also have a new forum at http://www.bitcoin.org/smf/".[^5] Posted on that forum, it wasn't needed. It did appear in the mailing-list version the next morning.[^6] The site and forum were hosted by Malmi, as the notes say;[^1] the domain story is in [When was bitcoin.org registered?](/blog/bitcoin-org-domain-2008).

## Who was Martti Malmi?

The Bitcoin Wiki describes Sirius, aka Martti Malmi, as "the second Bitcoin developer after Satoshi and the founder of the Bitcoin Forum."[^16] His first commits in today's GitHub history are the repository's own "First commit" and "Added changelog.txt" on 30 August 2009, imported from SourceForge SVN.[^8] v0.2 is the release where his work was named feature by feature.[^1]

## Where v0.2 sits on the timeline

- 31 Oct 2008: the whitepaper,[^17] on our [Whitepaper T-shirt](/products/whitepaper-t-shirt)
- 3 Jan 2009: the genesis block,[^17] on our [Genesis T-shirt](/products/genesis-t-shirt)
- 8–9 Jan 2009: [Bitcoin v0.1](/blog/bitcoin-v0-1-release-2009)
- 22 Nov 2009: [the forum opens](/blog/bitcointalk-forum-founded-2009)[^18]
- 16 Dec 2009: Bitcoin v0.2[^17]
- 30 Dec 2009: [the first difficulty adjustment](/blog/first-bitcoin-difficulty-adjustment-2009)[^17]
- 22 May 2010: Pizza Day,[^17] on our [Pizza T-shirt](/products/pizza-t-shirt)

More dates are in our [2008–2010 Bitcoin history timeline](/blog/bitcoin-history-timeline-2008-2010) and the [Bitcoin anniversaries calendar](/blog/bitcoin-anniversaries-calendar).
