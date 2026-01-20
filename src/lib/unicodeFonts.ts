// Unicode font transformations for social media text styling

type CharMap = { [key: string]: string };

// Helper to convert string to array of Unicode characters (handles surrogate pairs)
const toCharArray = (str: string): string[] => [...str];

const createCharMap = (uppercase: string, lowercase: string, digits?: string): CharMap => {
  const map: CharMap = {};
  const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const digitChars = '0123456789';
  
  const upperChars = toCharArray(uppercase);
  const lowerChars = toCharArray(lowercase);
  const digitArray = digits ? toCharArray(digits) : [];
  
  for (let i = 0; i < 26; i++) {
    map[upperAlphabet[i]] = upperChars[i] || upperAlphabet[i];
    map[lowerAlphabet[i]] = lowerChars[i] || lowerAlphabet[i];
  }
  
  if (digits) {
    for (let i = 0; i < 10; i++) {
      map[digitChars[i]] = digitArray[i] || digitChars[i];
    }
  }
  
  return map;
};

// Font style definitions
export const fontStyles: { name: string; transform: (text: string) => string; category: string }[] = [
  // Bold styles
  {
    name: "Bold",
    category: "Bold",
    transform: (text) => transformText(text, createCharMap(
      "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
      "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
      "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗"
    ))
  },
  {
    name: "Bold Italic",
    category: "Bold",
    transform: (text) => transformText(text, createCharMap(
      "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁",
      "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛"
    ))
  },
  // Italic styles
  {
    name: "Italic",
    category: "Italic",
    transform: (text) => transformText(text, createCharMap(
      "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
      "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"
    ))
  },
  // Script styles
  {
    name: "Script",
    category: "Script",
    transform: (text) => transformText(text, createCharMap(
      "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
      "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"
    ))
  },
  {
    name: "Bold Script",
    category: "Script",
    transform: (text) => transformText(text, createCharMap(
      "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩",
      "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"
    ))
  },
  // Fraktur styles
  {
    name: "Fraktur",
    category: "Gothic",
    transform: (text) => transformText(text, createCharMap(
      "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
      "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
    ))
  },
  {
    name: "Bold Fraktur",
    category: "Gothic",
    transform: (text) => transformText(text, createCharMap(
      "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅",
      "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"
    ))
  },
  // Double-struck
  {
    name: "Double Struck",
    category: "Fancy",
    transform: (text) => transformText(text, createCharMap(
      "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
      "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
      "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡"
    ))
  },
  // Monospace
  {
    name: "Monospace",
    category: "Tech",
    transform: (text) => transformText(text, createCharMap(
      "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
      "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
      "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
    ))
  },
  // Sans-serif styles
  {
    name: "Sans-Serif",
    category: "Sans",
    transform: (text) => transformText(text, createCharMap(
      "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹",
      "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓",
      "𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫"
    ))
  },
  {
    name: "Sans-Serif Bold",
    category: "Sans",
    transform: (text) => transformText(text, createCharMap(
      "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
      "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
      "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"
    ))
  },
  {
    name: "Sans-Serif Italic",
    category: "Sans",
    transform: (text) => transformText(text, createCharMap(
      "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡",
      "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"
    ))
  },
  {
    name: "Sans-Serif Bold Italic",
    category: "Sans",
    transform: (text) => transformText(text, createCharMap(
      "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕",
      "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"
    ))
  },
  // Circled styles
  {
    name: "Circled",
    category: "Symbols",
    transform: (text) => transformText(text, createCharMap(
      "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
      "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
      "⓪①②③④⑤⑥⑦⑧⑨"
    ))
  },
  {
    name: "Negative Circled",
    category: "Symbols",
    transform: (text) => transformText(text, createCharMap(
      "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩",
      "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩",
      "⓿❶❷❸❹❺❻❼❽❾"
    ))
  },
  // Squared styles
  {
    name: "Squared",
    category: "Symbols",
    transform: (text) => transformText(text, createCharMap(
      "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉",
      "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉"
    ))
  },
  {
    name: "Negative Squared",
    category: "Symbols",
    transform: (text) => transformText(text, createCharMap(
      "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉",
      "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉"
    ))
  },
  // Parenthesized
  {
    name: "Parenthesized",
    category: "Symbols",
    transform: (text) => transformText(text, createCharMap(
      "🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩",
      "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵",
      "⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽"
    ))
  },
  // Special decorative styles
  {
    name: "Fullwidth",
    category: "Wide",
    transform: (text) => transformText(text, createCharMap(
      "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
      "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
      "０１２３４５６７８９"
    ))
  },
  // Superscript
  {
    name: "Superscript",
    category: "Small",
    transform: (text) => transformText(text, createCharMap(
      "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ",
      "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ",
      "⁰¹²³⁴⁵⁶⁷⁸⁹"
    ))
  },
  {
    name: "Subscript",
    category: "Small",
    transform: (text) => transformText(text, createCharMap(
      "ₐBCDₑFGₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZ",
      "ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz",
      "₀₁₂₃₄₅₆₇₈₉"
    ))
  },
  // Small caps
  {
    name: "Small Caps",
    category: "Small",
    transform: (text) => transformText(text, createCharMap(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"
    ))
  },
  // Inverted/Upside down
  {
    name: "Upside Down",
    category: "Fun",
    transform: (text) => {
      const map: CharMap = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
        'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
        'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
        'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
        'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
        'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ɹ', 'S': 'S', 'T': '⊥', 'U': '∩',
        'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
        '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", "'": ',', '"': '„',
        '!': '¡', '?': '¿', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}',
        '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
      };
      return text.split('').reverse().map(c => map[c] || c).join('');
    }
  },
  // Mirror/Reversed
  {
    name: "Mirror",
    category: "Fun",
    transform: (text) => {
      const map: CharMap = {
        'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ꟻ', 'g': 'ǫ',
        'h': 'ʜ', 'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'ᴎ',
        'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'ƚ', 'u': 'u',
        'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'ꙃ',
        'A': 'A', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ', 'G': 'Ꭾ',
        'H': 'H', 'I': 'I', 'J': 'Ⴑ', 'K': 'ꓘ', 'L': '⅃', 'M': 'M', 'N': 'И',
        'O': 'O', 'P': 'ꟼ', 'Q': 'Ọ', 'R': 'Я', 'S': 'Ꙅ', 'T': 'T', 'U': 'U',
        'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ꙃ',
        '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
        '<': '>', '>': '<', '/': '\\', '\\': '/'
      };
      return text.split('').reverse().map(c => map[c] || c).join('');
    }
  },
  // Strikethrough
  {
    name: "Strikethrough",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0336').join('')
  },
  // Underline
  {
    name: "Underline",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0332').join('')
  },
  // Double Underline
  {
    name: "Double Underline",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0333').join('')
  },
  // Slash through
  {
    name: "Slash Through",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0338').join('')
  },
  // Dotted
  {
    name: "Dotted Above",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0307').join('')
  },
  {
    name: "Dotted Below",
    category: "Decorated",
    transform: (text) => text.split('').map(c => c + '\u0323').join('')
  },
  // Currency style
  {
    name: "Currency",
    category: "Fun",
    transform: (text) => transformText(text, createCharMap(
      "₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ",
      "₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ"
    ))
  },
  // Greek-like
  {
    name: "Greek Style",
    category: "Fun",
    transform: (text) => transformText(text, createCharMap(
      "ΛBҼↁΣFGΉIJҜLMПӨPQЯƧƬЦVЩXYZ",
      "αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz"
    ))
  },
  // Leet speak
  {
    name: "Leet Speak",
    category: "Tech",
    transform: (text) => transformText(text, createCharMap(
      "48CD3FG#1JKLMN0PQR57UVWXY2",
      "48cd3fg#1jklmn0pqr57uvwxy2",
      "0123456789"
    ))
  },
  // Bubble text
  {
    name: "Bubble",
    category: "Fun",
    transform: (text) => transformText(text, createCharMap(
      "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
      "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
      "⓪①②③④⑤⑥⑦⑧⑨"
    ))
  },
  // Medieval
  {
    name: "Medieval",
    category: "Gothic",
    transform: (text) => transformText(text, createCharMap(
      "ᗩᗷᑕᗪᗴᖴᘜᕼᎥᒍᛕᒪᗰᑎᗝᑭᑫᖇᔕ丅ᑌᐯᗯ᙭Ƴ乙",
      "ᗩᗷᑕᗪᗴᖴᘜᕼᎥᒍᛕᒪᗰᑎᗝᑭᑫᖇᔕ丅ᑌᐯᗯ᙭Ƴ乙"
    ))
  },
  // Aesthetic vaporwave
  {
    name: "Vaporwave",
    category: "Aesthetic",
    transform: (text) => text.split('').join(' ')
  },
  // Wavy text
  {
    name: "Wavy",
    category: "Aesthetic",
    transform: (text) => {
      return text.split('').map((c, i) => {
        const decorators = ['\u0303', '\u0360', '\u0361'];
        return c + decorators[i % decorators.length];
      }).join('');
    }
  },
  // Creepy/Zalgo light
  {
    name: "Creepy",
    category: "Fun",
    transform: (text) => {
      const above = ['\u030d', '\u030e', '\u0304', '\u0305'];
      const below = ['\u0316', '\u0317', '\u0318', '\u0319'];
      return text.split('').map(c => {
        const a = above[Math.floor(Math.random() * above.length)];
        const b = below[Math.floor(Math.random() * below.length)];
        return c + a + b;
      }).join('');
    }
  },
  // Sparkles
  {
    name: "Sparkles",
    category: "Decorated",
    transform: (text) => `✨ ${text} ✨`
  },
  {
    name: "Stars",
    category: "Decorated",
    transform: (text) => `★彡 ${text} 彡★`
  },
  {
    name: "Hearts",
    category: "Decorated",
    transform: (text) => `♡ ${text} ♡`
  },
  {
    name: "Flowers",
    category: "Decorated",
    transform: (text) => `✿ ${text} ✿`
  },
  {
    name: "Wings",
    category: "Decorated",
    transform: (text) => `༺ ${text} ༻`
  },
  {
    name: "Japanese Brackets",
    category: "Decorated",
    transform: (text) => `【${text}】`
  },
  {
    name: "Fancy Arrows",
    category: "Decorated",
    transform: (text) => `➤ ${text} ➤`
  },
  {
    name: "Crown",
    category: "Decorated",
    transform: (text) => `♔ ${text} ♔`
  },
  {
    name: "Music Notes",
    category: "Decorated",
    transform: (text) => `♪ ${text} ♪`
  },
  {
    name: "Fire",
    category: "Decorated",
    transform: (text) => `🔥 ${text} 🔥`
  }
];

// Helper function to transform text using a character map
function transformText(text: string, charMap: CharMap): string {
  return text.split('').map(char => charMap[char] || char).join('');
}

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = new Set(fontStyles.map(style => style.category));
  return Array.from(categories);
};

// Filter styles by category
export const getStylesByCategory = (category: string): typeof fontStyles => {
  return fontStyles.filter(style => style.category === category);
};
