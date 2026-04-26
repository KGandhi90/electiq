/**
 * Returns a score performance label and color.
 * @param {number} score - Score out of 10
 * @returns {{ label: string, color: string }}
 */
export function getScoreResult(score) {
  if (score <= 3) return { 
    label: 'Keep learning! 📚', 
    color: 'text-muted' 
  }
  if (score <= 6) return { 
    label: 'Not bad! 👍', 
    color: 'text-warning' 
  }
  if (score <= 9) return { 
    label: 'Election Expert! 🏆', 
    color: 'text-success' 
  }
  return { 
    label: 'Perfect Score! 🇮🇳', 
    color: 'text-saffron' 
  }
}

/**
 * Returns the next fact index, cycling back 
 * to 0 after the last fact.
 * @param {number} current - Current index
 * @param {number} total - Total facts count
 * @returns {number}
 */
export function getNextFactIndex(current, total) {
  return current === total - 1 ? 0 : current + 1
}

/**
 * Formats a share message for quiz results.
 * @param {number} score - Score out of 10
 * @returns {string}
 */
export function formatShareText(score) {
  return `I scored ${score}/10 on the ElectIQ ` +
         `Indian Elections Quiz! 🗳️ Test your ` +
         `knowledge at ${window.location.origin}`
}

/**
 * Returns keyword-matched mock AI response.
 * @param {string} input - User message
 * @returns {string}
 */
export function getMockReply(input) {
  const msg = input.toLowerCase()
  if (msg.includes('register') || 
      msg.includes('registration'))
    return 'To register as a voter, visit ' +
           'voters.eci.gov.in and fill Form 6. ' +
           'You need proof of age and address. ' +
           'You can also register through the ' +
           'Voter Helpline App or your local ' +
           'Booth Level Officer.'
  if (msg.includes('evm') || 
      msg.includes('voting machine'))
    return 'EVMs (Electronic Voting Machines) ' +
           'are standalone devices with zero ' +
           'internet or wireless connectivity, ' +
           'making remote hacking impossible. ' +
           'They have been used in Indian ' +
           'elections since 1999 and undergo ' +
           'rigorous testing before every poll.'
  if (msg.includes('lok sabha') || 
      msg.includes('vidhan sabha') ||
      msg.includes('difference'))
    return 'Lok Sabha is the lower house of ' +
           'Parliament — 543 directly elected ' +
           'seats, 5-year term. Vidhan Sabha ' +
           'is the State Assembly — each state ' +
           'has one with varying seat counts. ' +
           'Both use the First Past The Post ' +
           'voting system.'
  if (msg.includes('nota'))
    return 'NOTA (None Of The Above) was ' +
           'introduced in 2013 by Supreme ' +
           'Court order. It lets you formally ' +
           'reject all candidates. NOTA votes ' +
           'are counted and published, but the ' +
           'candidate with the most votes still ' +
           'wins regardless.'
  if (msg.includes('count') || 
      msg.includes('counting'))
    return 'After polling, EVMs are stored in ' +
           'strong rooms under CCTV and armed ' +
           'guard. On counting day, votes are ' +
           'tallied at counting centres under ' +
           'strict observation by candidates ' +
           'and their representatives.'
  if (msg.includes('mcc') || 
      msg.includes('model code'))
    return 'The Model Code of Conduct (MCC) ' +
           'kicks in immediately when elections ' +
           'are announced. It prevents the ' +
           'ruling party from announcing new ' +
           'schemes, using government resources ' +
           'for campaigns, or transferring key ' +
           'officials — until results are declared.'
  if (msg.includes('age') || 
      msg.includes('18') ||
      msg.includes('minimum'))
    return 'The minimum voting age in India ' +
           'is 18 years, reduced from 21 by the ' +
           '61st Constitutional Amendment in ' +
           '1988, effective from 1989.'
  if (msg.includes('bjp') || 
      msg.includes('congress') ||
      msg.includes('party'))
    return 'India has a multi-party system ' +
           'with 2 major national parties — ' +
           'BJP and INC — and dozens of ' +
           'significant regional parties like ' +
           'TMC, SP, DMK, AAP, and NCP. The ' +
           'ECI recognizes parties as National ' +
           'or State parties based on electoral ' +
           'performance thresholds.'
  if (msg.includes('constitution') || 
      msg.includes('article'))
    return 'Indian elections are governed by ' +
           'Part XV of the Constitution ' +
           '(Articles 324-329). Article 324 ' +
           'establishes the Election Commission. ' +
           'The Representation of the People ' +
           'Act 1951 provides the detailed ' +
           'legal framework for conducting ' +
           'elections.'
  return 'Great question about Indian ' +
         'elections! I can help with voter ' +
         'registration, EVMs, political ' +
         'parties, the Constitution, election ' +
         'process, and much more. What would ' +
         'you like to know specifically?'
}
