import { FaqItem } from "@/partials/FaqList";

export type ProductGuide = {
  preface: string;
  title: string;
  /** Only set when the destination page exists in this repo. */
  href?: string;
};

export type ProductEditorial = {
  story: string;
  guide?: ProductGuide;
  faqs: FaqItem[];
};

const WHITEPAPER_GUIDE_PATH = "/blog/bitcoin-whitepaper-anniversary";

/**
 * Per-product story + FAQ copy from the approved 08 brief.
 * FAQ items marked [CONFIRM] in the brief are omitted.
 */
export const productEditorials: Record<string, ProductEditorial> = {
  "genesis-t-shirt": {
    story:
      'On January 3, 2009, Satoshi Nakamoto mined the first block of the Bitcoin blockchain, known as the genesis block (block 0). Inside its coinbase transaction Satoshi embedded a line of text: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." It was the front-page headline of The Times of London that day, about the UK government preparing a second bank rescue during the financial crisis. The headline did two jobs. It proved the block could not have been created before that date, and it pointed to the reason Bitcoin was built: an alternative to a financial system that relied on bailouts. The 50 BTC reward from the genesis block can never be spent, which makes the message a permanent part of Bitcoin\'s history. The MOOD Genesis T-shirt carries that headline across the chest of a black T-shirt.',
    guide: {
      preface: "Read the full story in our guide:",
      title: "The story behind the genesis block headline",
    },
    faqs: [
      {
        title: "What is printed on the Genesis T-shirt?",
        content:
          'The genesis block message "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks," printed on the chest, with a "Code your identity" tagline inside.',
      },
      {
        title: "What is the genesis block?",
        content:
          "The first block of the Bitcoin blockchain, mined by Satoshi Nakamoto on January 3, 2009.",
      },
      {
        title: "Why does the genesis block contain a newspaper headline?",
        content:
          "It timestamps the block and is widely read as a comment on bank bailouts during the 2008 financial crisis.",
      },
    ],
  },
  "whitepaper-t-shirt": {
    story:
      'On October 31, 2008, a person or group using the name Satoshi Nakamoto emailed a cryptography mailing list with a link to a nine-page paper: "Bitcoin: A Peer-to-Peer Electronic Cash System." The Bitcoin Whitepaper described how people could send payments directly to each other without a bank, using a chain of blocks secured by proof of work to stop the same coin being spent twice. Early readers on the list were sceptical, but just over two months later the genesis block was mined and the network went live. Satoshi\'s nine pages remain the founding document of Bitcoin, and October 31 is celebrated every year as Whitepaper Day. The MOOD Whitepaper T-shirt carries an all-over print of the full original Whitepaper, every line and every diagram, with a graffiti-style MOOD logo layered in.',
    guide: {
      preface: "More in our guide:",
      title: "Bitcoin Whitepaper Anniversary: 18 Years Since Oct 31, 2008",
      href: WHITEPAPER_GUIDE_PATH,
    },
    faqs: [
      {
        title: "What is printed on the Whitepaper T-shirt?",
        content:
          "The complete original Bitcoin Whitepaper by Satoshi Nakamoto as an all-over print, with a subtle MOOD graffiti logo.",
      },
      {
        title: "When was the Bitcoin Whitepaper published?",
        content:
          "October 31, 2008, shared on a cryptography mailing list.",
      },
      {
        title: "How long is the Bitcoin Whitepaper?",
        content: "Nine pages.",
      },
    ],
  },
  "pizza-t-shirt": {
    story:
      "On May 22, 2010, a programmer in Florida named Laszlo Hanyecz paid 10,000 BTC to another forum user for two Papa John's pizzas. It was one of the first known times bitcoin was used to buy a physical good, and it showed that the new currency could work in the real world. At the time the coins were worth roughly $41. As the price of bitcoin rose over the following years, those two pizzas became the most famous meal in Bitcoin history, and May 22 is now celebrated as Bitcoin Pizza Day. The MOOD Pizza T-shirt is a white, oversized T-shirt that marks the moment: the real transaction hash from that 2010 purchase runs along the sleeve cuffs, and mini pizzas sit on each sleeve.",
    guide: {
      preface: "Read the full story in our guide:",
      title: "Bitcoin Pizza Day explained",
    },
    faqs: [
      {
        title: "What is printed on the Pizza T-shirt?",
        content:
          "The transaction hash of the 2010 Bitcoin Pizza Day payment on the sleeve cuffs, plus mini pizzas on the sleeves.",
      },
      {
        title: "What is Bitcoin Pizza Day?",
        content:
          "May 22, celebrating Laszlo Hanyecz's 2010 purchase of two pizzas for 10,000 BTC.",
      },
      {
        title: "Is that the real transaction hash?",
        content: "Yes, it is the hash of the original 2010 pizza transaction.",
      },
    ],
  },
};

export const getProductEditorial = (
  handle: string,
): ProductEditorial | undefined => productEditorials[handle];
