export const LEGAL_EFFECTIVE = '13 September 2026'
export const LEGAL_VERSION = '2026-09-13'

export const LEGAL_CONTACTS = Object.freeze({
  general: 'legal@lusorae.pt',
  privacy: 'privacy@lusorae.pt',
  copyright: 'copyright@lusorae.pt',
})

const LEGAL_REFERENCE_HOSTS = new Set([
  'rockstargames.com', 'www.rockstargames.com', 'support.rockstargames.com',
  'eur-lex.europa.eu', 'commission.europa.eu', 'www.cnpd.pt', 'cnpd.pt',
  'www.copyright.gov', 'copyright.gov', 'creativecommons.org',
  'resend.com', 'www.ovhcloud.com',
])

// Legal pages may cite regulators, legislation and licence texts as well as
// Rockstar. Community databases and editorial websites stay outside this
// deliberately narrow trust boundary.
export function isLegalReferenceUrl(value) {
  try {
    const url = new URL(String(value))
    return url.protocol === 'https:' && LEGAL_REFERENCE_HOSTS.has(url.hostname.toLowerCase())
  } catch {
    return false
  }
}

// Kept intact so an account holder can inspect the exact policy text that was
// accepted under the preceding registration version.
export const LEGAL_DOCUMENTS_2026_09_12 = [
  {
    slug: 'terms',
    title: 'Terms of Use',
    shortTitle: 'Terms',
    description: 'The agreement governing access, accounts, contributions and acceptable use of GTA LORE.',
    readTime: '8 min',
    sections: [
      {
        id: 'scope', title: '1. Scope and acceptance',
        paragraphs: [
          'These Terms govern access to lusorae.pt and the GTA LORE encyclopedia, including accounts, personal wiki tools, editorial suggestions and other features made available through the service. Reading public pages does not require an account.',
          'These Terms form a contract with you when you create an account or submit material. That agreement is given explicitly: the registration form requires you to tick a box accepting the Terms and acknowledging the Privacy Notice, and the account record stores the moment of acceptance together with the document version accepted. If you do not agree, do not create an account or use account-only features.',
          'Reading public pages requires no account and no agreement, and nothing here treats continued browsing as acceptance of a contract. For anonymous readers the sections on acceptable use and intellectual property operate as the site’s own rules of access, enforceable under applicable law rather than as terms you have signed.',
        ],
      },
      {
        id: 'accounts', title: '2. Eligibility and accounts',
        paragraphs: ['You must be at least 16 years old, or the minimum age required to consent to an online service in your country if higher. You must provide accurate registration information and keep your credentials secure.'],
        bullets: [
          'One person may operate one ordinary account unless a legitimate editorial or testing need has been approved.',
          'Usernames must not impersonate GTA LORE, Rockstar Games, Take-Two, staff, moderators or another person.',
          'You are responsible for activity you authorise, and for taking reasonable care of your credentials. You are not responsible for unauthorised activity that occurs without your fault, and nothing here displaces protections applicable law gives you. Report a suspected compromise promptly so sessions can be revoked.',
          'Accounts may not be sold, transferred, automated in bulk or used to evade a restriction.',
        ],
      },
      {
        id: 'contributions', title: '3. Contributions and licence',
        paragraphs: [
          'You retain copyright in original text you submit. By submitting it for publication, you grant GTA LORE a worldwide, non-exclusive, royalty-free licence to host, reproduce, format, moderate and publish it for operation of the archive.',
          'If a textual contribution is accepted into a public article, you additionally agree that it may be made available under Creative Commons Attribution-ShareAlike 4.0. This does not apply to third-party artwork, screenshots, trademarks, quotations or other material GTA LORE cannot license.',
        ],
        bullets: [
          'Submit only material you created, material you are authorised to use, or material permitted by law.',
          'Cite a reliable source for factual additions and distinguish confirmed information, reporting, analysis and rumour.',
          'Do not submit private information, leaked personal data, fabricated evidence or instructions that facilitate abuse.',
          'A submission is a proposal: editors may reject, shorten, correct, reclassify or remove it.',
        ],
      },
      {
        id: 'acceptable-use', title: '4. Acceptable use',
        paragraphs: ['Use the service lawfully, in good faith and without degrading access for other readers. The following conduct is prohibited:'],
        bullets: [
          'Harassment, threats, hate speech, sexual abuse material, doxxing or targeted disclosure of personal information.',
          'Copyright or trademark infringement, malware, phishing, credential theft, fraud or unlawful content.',
          'Spam, undisclosed paid advocacy, coordinated manipulation, deceptive identities or artificial engagement.',
          'Automated scraping that ignores technical limits, denial-of-service activity, security probing without written permission or attempts to bypass access controls.',
          'Using GTA LORE to promote cheats, account trading, unauthorised ports or commercial exploitation of Rockstar intellectual property.',
        ],
      },
      {
        id: 'moderation', title: '5. Moderation and enforcement',
        paragraphs: ['GTA LORE may preserve evidence, restrict a feature, remove content, revoke sessions, suspend an account or permanently block access when reasonably necessary to enforce these Terms, protect users, comply with law or maintain the archive. Measures should be proportionate to severity, recurrence and risk.'],
        bullets: [
          'Except in urgent safety, security or legal cases, a reason should be provided for a material account action.',
          'A user may appeal by contacting the legal desk with the account name, decision and relevant evidence.',
          'Creating another account to evade an active restriction is itself a violation.',
          'Public article history and accepted contributions may remain where necessary for attribution, integrity or legal obligations, even after account closure.',
        ],
      },
      {
        id: 'intellectual-property', title: '6. Intellectual property and fan status',
        paragraphs: [
          'GTA LORE is an independent, unofficial and non-commercial fan reference. It is not affiliated with, authorised by or endorsed by Rockstar Games, Take-Two Interactive or their subsidiaries.',
          'Grand Theft Auto, GTA, Rockstar Games and related names, characters, artwork and marks belong to their respective owners. Their appearance is for identification, commentary, criticism and encyclopedic reference and does not transfer ownership to GTA LORE.',
        ],
      },
      {
        id: 'service', title: '7. Service, suspension and changes',
        paragraphs: [
          'The archive may change, interrupt or retire features; correct or remove records; and update security requirements. No particular page, account feature or stored draft is guaranteed to remain available. Material policy changes will be dated and presented clearly before they bind future account use where required.',
        ],
      },
      {
        id: 'warranties', title: '8. Warranties and liability',
        paragraphs: [
          'The service and its content are provided on an “as available” basis. GTA LORE does not promise that every record is complete, current, error-free or suitable for a particular purpose. Nothing in these Terms excludes liability that cannot lawfully be excluded, including mandatory consumer rights.',
          'To the extent permitted by law, GTA LORE is not liable for indirect or consequential loss arising from reliance on archive content, third-party links, service interruption or unauthorised account access outside its reasonable control.',
        ],
      },
      {
        id: 'law-contact', title: '9. Applicable law and contact',
        paragraphs: [
          'These Terms are governed by Portuguese law, without removing any mandatory protection granted by the law of your habitual residence. Before court proceedings, both sides should try in good faith to resolve a dispute through the legal contact below. Mandatory jurisdiction rules remain unaffected.',
          `Questions and formal notices may be sent to ${LEGAL_CONTACTS.general}.`,
        ],
      },
    ],
    references: [
      ['Wikimedia Foundation Terms of Use — structural reference', 'https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use'],
      ['Creative Commons BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
      ['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material'],
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Notice',
    shortTitle: 'Privacy',
    description: 'What personal data the archive processes, why it is needed, how long it remains and how users control it.',
    readTime: '9 min',
    sections: [
      {
        id: 'controller', title: '1. Controller and contact',
        paragraphs: [
          `The operator of GTA LORE at lusorae.pt is the controller for personal data described in this notice. Privacy questions and rights requests may be sent to ${LEGAL_CONTACTS.privacy}. The operator may request limited information to verify that a requester controls the relevant account.`,
        ],
      },
      {
        id: 'data', title: '2. Data we process',
        paragraphs: ['Creating an account requires an email address, a username, a display name and a password, and requires accepting the Terms of Use. Without them the account cannot be created, because they are what identifies and secures it. Everything else is optional: the biography starts empty, the public user page and reading history are off until switched on, and none of them is needed to read the archive or to hold an account.'],
        bullets: [
          'Account identity: email address, username, display name, optional biography, role, verification state and account timestamps.',
          'Authentication and security: a password hash, opaque session and one-time-token hashes, a coarse device/browser label, last-active time, failed-login state and a keyed one-way digest of the network address.',
          'Personal wiki data: watchlist, reading history when enabled, collections, saved pages, private notes, preferences, notification state and achievements.',
          'Contribution data: correction or source suggestions, supporting links, review state and the account associated with the submission.',
          'Communications: verification and recovery delivery status. The service does not store the readable password or the raw network address in its audit log.',
          'On-device data: recent searches, unfinished suggestion drafts, vehicle favourites/comparisons and whether the cinematic introduction has been shown in the current tab session.',
        ],
      },
      {
        id: 'purposes', title: '3. Purposes and legal bases',
        paragraphs: ['Each purpose below is matched to one legal basis. Where the basis is consent, the processing does not begin until the setting is switched on, and switching it off stops it.'],
        bullets: [
          'Create and authenticate an account, keep sessions signed in and deliver the personal wiki tools — legal basis: performance of a contract (GDPR Article 6(1)(b)).',
          'Send verification and password-recovery messages — legal basis: performance of a contract (Article 6(1)(b)).',
          'Defend the service: rate-limit abuse, block forged requests, diagnose failures, preserve editorial integrity and keep a privacy-reduced security audit — legal basis: legitimate interests (Article 6(1)(f)), balanced against the privacy interests of users and kept to the minimum that works.',
          'Show a public user page with display name, biography and accepted-contribution count — legal basis: consent (Article 6(1)(a)). Off by default; switched on in Account → Preferences.',
          'Record reading history — legal basis: consent (Article 6(1)(a)). Off by default; switched on in Account → Preferences.',
          'Respond to valid legal process, establish or defend legal claims and keep records the law requires — legal basis: legal obligation (Article 6(1)(c)) and legitimate interests in legal claims (Article 6(1)(f)).',
        ],
      },
      {
        id: 'sharing', title: '4. Processors and disclosure',
        paragraphs: ['Personal data is not sold and is not used for behavioural advertising. It may be processed by infrastructure providers strictly to host the service, store its database, deliver transactional email and protect availability.'],
        bullets: [
          'Email addresses and message contents are sent to the configured transactional email provider when verification or recovery is requested.',
          'Hosting and database providers process encrypted transport and operational data under their service terms.',
          'Information may be disclosed when legally required or reasonably necessary to protect users, the service or the rights of another person.',
          'Public profile fields are visible only when the user enables the public-profile preference. Private notes and collections are not published.',
        ],
      },
      {
        id: 'retention', title: '5. Retention schedule',
        bullets: [
          'Ordinary sessions expire after 7 days; “remember me” sessions expire after 30 days and may be revoked earlier.',
          'The anti-forgery token stored in a cookie expires after 24 hours. Password-reset links expire after 1 hour; email-verification links expire after 24 hours.',
          'Privacy-reduced security audit records expire automatically after 180 days.',
          'Account details and personal wiki data remain while the account exists or until the user deletes the relevant item, disables history, clears history or deletes the account.',
          'Rate-limit records expire automatically after their short security window. On-device storage remains until the feature clears it or the user clears browser storage.',
          'A minimal record may outlive the periods above only in four cases, and each one ends: for a legal claim, until the claim or dispute is finally resolved and any appeal period has passed; for a legal obligation, for as long as that obligation requires and no longer; for fraud and abuse prevention, until the ban or restriction it supports is lifted or expires; and for attribution, for as long as the accepted contribution remains published under its licence.',
        ],
      },
      {
        id: 'rights', title: '6. Your choices and rights',
        paragraphs: [
          'Depending on applicable law, you may request access, correction, deletion, restriction, portability or objection, and may complain to your local supervisory authority. Requests are normally answered within one month where the GDPR applies.',
          'Where processing is based on consent — the public user page and reading history — you may withdraw that consent at any time, and withdrawing it is as simple as giving it: the same switch in Account → Preferences. Withdrawal stops the processing from that point onwards and does not affect the lawfulness of processing carried out before it.',
        ],
        bullets: [
          'Export profile and personal wiki data from Account → Preferences.',
          'Correct the display name, username and biography from Account → Identity.',
          'Disable and erase reading history from Preferences, or clear it immediately from History.',
          'Revoke devices from Account → Sessions; change the password or permanently delete the account from Account → Password.',
          `For a request that cannot be completed in the interface, email ${LEGAL_CONTACTS.privacy}.`,
        ],
      },
      {
        id: 'security', title: '7. Security',
        paragraphs: ['Passwords are processed with a memory-hard salted hash. Email addresses, private notes, contribution details and private review notes are encrypted at rest. Authentication cookies are HTTP-only, SameSite Strict and Secure in production. Mutation requests require an anti-forgery token and trusted origin; sessions and one-time tokens are stored only as hashes. No system is risk-free, so users should use a unique password and revoke unfamiliar sessions promptly.'],
      },
      {
        id: 'transfers', title: '8. International processing',
        paragraphs: [
          'This section describes what happens today, not what might happen in principle.',
          'The archive database runs on the operator’s own server and is not exposed to the public internet: account records, personal wiki data and contribution records are not transferred to a third-party database provider.',
          'One external processor receives personal data: Resend, the transactional email provider, which receives the recipient email address and the message content when a verification or password-recovery email is sent. Nothing else is routed to it, and it is not used for newsletters or marketing.',
          `Where that delivery involves a transfer outside the EEA, it is carried out under the provider’s data-processing terms and the transfer safeguards they incorporate. A copy of the safeguards relied on for that transfer can be requested from ${LEGAL_CONTACTS.privacy}.`,
        ],
      },
      {
        id: 'children', title: '9. Children and changes',
        paragraphs: ['Accounts are not intended for children below the minimum age stated in the Terms. If such an account is identified, it may be deleted. This notice is versioned by its effective date; material changes will be highlighted and, where required, notified before taking effect.'],
      },
    ],
    references: [
      ['European Commission — information for individuals', 'https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en'],
      ['European Commission — handling rights requests', 'https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/dealing-requests-individuals_en'],
      ['Wikimedia Foundation Privacy Policy — structural reference', 'https://foundation.wikimedia.org/wiki/Policy:Privacy_policy'],
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookies & Local Storage',
    shortTitle: 'Cookies',
    description: 'The browser storage GTA LORE uses, as of the version stated below, with purpose, duration and user controls.',
    readTime: '5 min',
    sections: [
      {
        id: 'position', title: '1. Our position',
        paragraphs: [
          'GTA LORE does not use advertising, cross-site tracking or analytics cookies, and it does not profile readers. It uses first-party security cookies for account functions and local browser storage for features the reader uses.',
          'One item is worth naming plainly rather than hiding behind a category. Recent searches are stored on your device so the search panel can show them back to you. That is a convenience, not something the service strictly needs, and it is currently written without asking you first. It never leaves your device, is never sent to the server and can be cleared from the search panel or by clearing site data — but if you would rather it were not stored at all, say so and it will be put behind a choice.',
        ],
      },
      {
        id: 'cookies', title: '2. First-party cookies',
        items: [
          { name: '__Host-gtalore_session', purpose: 'Authenticates an account with an opaque token. HTTP-only, Secure in production and SameSite Strict.', duration: '7 days, or 30 days when “Remember me” is selected', category: 'Strictly necessary' },
          { name: '__Host-gtalore_csrf', purpose: 'Prevents forged cross-site account requests. HTTP-only, Secure in production and SameSite Strict.', duration: '24 hours', category: 'Strictly necessary' },
        ],
        note: 'In local development the same cookies omit the __Host- prefix and are named gtalore_session and gtalore_csrf.',
      },
      {
        id: 'storage', title: '3. On-device storage',
        items: [
          { name: 'gta-lore:recent-searches', purpose: 'Shows up to six of your own recent searches when you reopen the search panel. Written when you open a search result.', duration: 'Until cleared from the search panel or with browser data', category: 'Preference — not strictly necessary' },
          { name: 'gta-lore:suggestion:*', purpose: 'Keeps an unfinished editorial suggestion on this device so it is not lost before you submit it.', duration: 'Until submitted, emptied or browser data is cleared', category: 'Necessary for a feature you asked for' },
          { name: 'la:favs / la:compare', purpose: 'Keeps the vehicle favourites and comparison choices you selected.', duration: 'Until removed or browser data is cleared', category: 'Necessary for a feature you asked for' },
          { name: 'gta-lore:filters:* (session)', purpose: 'Remembers whether a filter panel was left open or closed, for the current tab only.', duration: 'Current tab session', category: 'Interface state' },
          { name: 'gta-lore:radio:* (session)', purpose: 'Remembers the radio index filters and the selected station, for the current tab only.', duration: 'Current tab session', category: 'Interface state' },
        ],
      },
      {
        id: 'control', title: '4. Your controls',
        paragraphs: ['Signing out removes authentication cookies. Browser settings can remove or block cookies and local storage, but blocking necessary cookies prevents sign-in and account mutations. Recent searches, drafts, favourites and comparisons remain only on the device and can also be removed by clearing site data.'],
      },
      {
        id: 'changes', title: '5. Changes to storage',
        paragraphs: [`This list describes the browser storage used by GTA LORE as of version 2026-09-12. It is re-checked against the code when storage changes; if you find something stored that is not listed here, that is a defect and we want to know — write to ${LEGAL_CONTACTS.privacy}.`],
      },
    ],
    references: [
      ['ICO — cookies and similar technologies', 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/'],
      ['ICO — strictly necessary exceptions', 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/'],
    ],
  },
  {
    slug: 'copyright',
    title: 'Copyright & IP Policy',
    shortTitle: 'Copyright',
    description: 'Ownership, fan-project status, content licensing and a precise notice-and-action process.',
    readTime: '7 min',
    sections: [
      {
        id: 'status', title: '1. Independent fan project',
        paragraphs: ['GTA LORE is an unofficial, independent and non-commercial encyclopedia. It is not sponsored, approved or operated by Rockstar Games, Take-Two Interactive or any related company. References to their games and marks identify the subject of commentary and research only.'],
      },
      {
        id: 'ownership', title: '2. Ownership and licences',
        bullets: [
          'Rockstar Games, Take-Two and their licensors retain all rights in game titles, logos, characters, artwork, screenshots, footage, audio and other proprietary material.',
          'Original GTA LORE text is made available under CC BY-SA 4.0 unless a page states otherwise.',
          'Accepted original community text is covered by the contribution licence in the Terms and may be published under CC BY-SA 4.0.',
          'Third-party media, quotations, trademarks and linked source material are excluded from the GTA LORE text licence and keep their original rights status.',
          'A source credit is not itself permission to reuse an image. Reusers must assess the licence or applicable legal exception for each asset.',
        ],
      },
      {
        id: 'fan-material', title: '3. Rockstar material',
        paragraphs: [
          'The archive limits use of Rockstar material to what is reasonably needed for identification, reporting, criticism and encyclopedic context. Rockstar’s published fan-content policy describes tolerance for occasional non-commercial fan use but reserves the right to request removal. GTA LORE treats that policy as revocable guidance, not as ownership, a licence or endorsement.',
          'Rockstar’s published guidance states that its general fan-use policy is directed at occasional non-commercial use by individuals and does not extend to books, magazines or digital publishing, and it provides a contact for case-by-case licensing requests. GTA LORE separately assesses the permissions, licences and legal exceptions that apply to each use it makes, including quotation, reporting, criticism and other exceptions available under applicable copyright law.',
        ],
      },
      {
        id: 'music', title: '4. Music, trailers and pre-release material',
        paragraphs: ['A track appearing in a Rockstar trailer or other published footage does not grant GTA LORE a licence to reproduce, stream, download or preview that recording. Music may involve separate rights held by performers, record labels, composers and publishers. The archive therefore publishes factual track metadata only and does not host audio.'],
        bullets: [
          'A “Rockstar credit” label means Rockstar named the recording in its verified publication; it does not mean the song is confirmed for the final game soundtrack.',
          'An “official-media appearance” label means a recording is audible in Rockstar-published footage, while the title and artist may remain an editorial identification.',
          'Community rumours are text-only, explicitly unverified and never accompanied by leaked audio, footage, downloads or links to leaked material.',
          'Users may not upload copyrighted music, ripped game audio, leaked builds, pre-release footage or other material they are not authorised to publish.',
        ],
      },
      {
        id: 'notice', title: '5. Copyright notice',
        paragraphs: [`A rights holder or authorised agent may send a notice to ${LEGAL_CONTACTS.copyright}. A useful notice should contain:`],
        bullets: [
          'A physical or electronic signature of the rights holder or authorised agent.',
          'Identification of the protected work, or a representative list if several works are involved.',
          'The exact GTA LORE URL and enough detail to locate the material complained of.',
          'The sender’s name and reliable contact details.',
          'A good-faith statement that the disputed use is not authorised by the owner, its agent or the law.',
          'A statement that the information given is accurate and that the sender is the rights holder or authorised to act for them.',
        ],
      },
      {
        id: 'process', title: '6. Review and counter-notice',
        paragraphs: [
          'This is the ordinary process, and it applies to every complaint wherever it comes from. GTA LORE will acknowledge a sufficiently detailed notice, preserve relevant records and assess the identified use. It may remove or restrict material while reviewing. The contributor may be informed and may respond with evidence of ownership, permission, licence, public-domain status or an applicable legal exception.',
          'United States DMCA procedure — where legally applicable. If a complaint is made under the United States Digital Millennium Copyright Act, the statutory elements of that Act apply to it, including the requirement that the complaining party’s statement of authority be made under penalty of perjury, the counter-notification procedure, and restoration within the statutory window unless the rights holder notifies that it has filed court proceedings. Sending a complaint from outside that framework does not make it a DMCA notice, and a complaint under another country’s law is handled under the ordinary process above.',
        ],
        bullets: [
          'Notices are evaluated against the law that applies; sending a notice does not guarantee removal.',
          'Clearly invalid, abusive or materially incomplete notices may be rejected with an explanation.',
          'Material may be restored once the question is resolved — for example on evidence of permission, licence or an applicable exception — or where the law that governs the complaint requires restoration.',
          'Repeated infringement may lead to contribution restrictions or account termination.',
        ],
      },
      {
        id: 'trademarks', title: '7. Trademarks and attribution',
        paragraphs: [
          'Do not use GTA LORE or third-party marks in a way that suggests sponsorship, official status or source endorsement.',
          'When reusing text published under CC BY-SA 4.0, the licence sets the conditions and they are not a menu to choose from: credit the creator or creators and any other attribution parties identified on the source page, keep the copyright and licence notice, link to the source page and to the licence where reasonably practicable, state whether you changed the material, and release any adaptation under the same licence. Where the source page names individual contributors, naming only GTA LORE is not sufficient attribution.',
        ],
      },
    ],
    references: [
      ['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material'],
      ['U.S. Copyright Office — Section 512 resources', 'https://www.copyright.gov/512/'],
      ['Creative Commons BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
    ],
  },
  {
    slug: 'community',
    title: 'Community Guidelines',
    shortTitle: 'Community',
    description: 'The conduct, sourcing and editorial standards expected from every account and contributor.',
    readTime: '6 min',
    sections: [
      {
        id: 'principles', title: '1. Core principles',
        bullets: [
          'Be accurate: state only what the cited evidence supports.',
          'Be transparent: label inference, uncertainty, conflicts of interest and changes to sourced material.',
          'Be civil: criticise claims and sources without attacking people.',
          'Be constructive: propose an actionable correction and explain why it improves the archive.',
          'Protect people: never expose private information or create a real-world safety risk.',
        ],
      },
      {
        id: 'editorial', title: '2. Editorial submissions',
        paragraphs: ['Suggestions should be concise enough to review and complete enough to verify. Except for obvious typographical corrections, include a direct source URL and separate the source’s claim from your interpretation.'],
        bullets: [
          'Official Rockstar material is the strongest source for announcements, names and published facts.',
          'Reputable reporting may document interviews, previews and statements not available on an official page.',
          'Community databases may help discovery but should not silently turn speculation into confirmation.',
          'Leaks, datamining and rumours must be identified as such and may be excluded when privacy, safety or copyright risk outweighs encyclopedic value.',
          'Paid, promotional or personal relationships relevant to a proposed edit must be disclosed.',
        ],
      },
      {
        id: 'conduct', title: '3. Unacceptable conduct',
        bullets: [
          'Harassment, intimidation, stalking, discrimination, hate speech or threats.',
          'Doxxing, sexual exploitation, graphic real-world abuse or encouragement of self-harm.',
          'Impersonation, fabricated citations, manipulated evidence, spam or coordinated disruption.',
          'Copyright infringement, publication of credentials or private material, malware or attempts to compromise the service.',
          'Repeated edit campaigning after a good-faith editorial decision without new evidence.',
        ],
      },
      {
        id: 'enforcement', title: '4. Enforcement ladder',
        paragraphs: ['Moderators use the least severe measure reasonably capable of stopping the problem. Context, intent, impact, previous conduct and willingness to correct are considered.'],
        bullets: [
          'Informal guidance or correction for a first low-impact mistake.',
          'Formal warning, rejection or temporary contribution restriction for repeated or material violations.',
          'Immediate content removal, session revocation or suspension for security, safety or legal risk.',
          'Permanent account restriction for severe abuse, repeat infringement or evasion.',
        ],
      },
      {
        id: 'report-appeal', title: '5. Reports and appeals',
        paragraphs: [`Report a policy concern to ${LEGAL_CONTACTS.general} with the page URL, account name if relevant, a concise description and supporting evidence. Do not include unnecessary personal data. An appeal should identify the decision, explain the claimed error and include new or overlooked evidence.`],
      },
    ],
    references: [
      ['Wikimedia Universal Code of Conduct — structural reference', 'https://foundation.wikimedia.org/wiki/Policy:Universal_Code_of_Conduct/en'],
      ['Rockstar Games Community Guidelines', 'https://www.rockstargames.com/community-resources/guidelines'],
    ],
  },
  {
    slug: 'disclaimer',
    title: 'General Disclaimer',
    shortTitle: 'Disclaimer',
    description: 'The limits of an evolving fan encyclopedia: accuracy, advice, third-party material and availability.',
    readTime: '4 min',
    sections: [
      {
        id: 'unofficial', title: '1. Unofficial archive',
        paragraphs: ['GTA LORE is an independent fan project and is not Rockstar Games, Take-Two Interactive or an official GTA VI service. Names and visual material belonging to others are used to identify and discuss their work. No affiliation, endorsement or sponsorship is implied.'],
      },
      {
        id: 'accuracy', title: '2. Accuracy and changing information',
        paragraphs: ['GTA VI information changes as official material, reporting and community research develop. GTA LORE uses source labels to show evidential strength, but a label is an editorial assessment rather than a guarantee. Dates, features, names, platforms and release information can change after publication. Check the linked primary source before relying on a record.'],
      },
      {
        id: 'advice', title: '3. No professional advice',
        paragraphs: ['Archive content is general information and entertainment commentary. It is not legal, financial, medical, security or other professional advice. References to crime, weapons, vehicles or game mechanics describe fictional or reported game content and are not real-world instructions.'],
      },
      {
        id: 'external', title: '4. External links and media',
        paragraphs: ['External sites control their own availability, security, accuracy and policies. A link or citation means the source is relevant to a claim; it does not endorse the whole source. Third-party media remains subject to its owner’s rights and may be changed or removed.'],
      },
      {
        id: 'availability', title: '5. Availability and responsibility',
        paragraphs: ['The service may contain errors, interruptions or incomplete pages. Use it at your own judgment and keep independent copies of any private draft that is important to you. Nothing here limits rights or liability that applicable law does not allow the operator to exclude.'],
      },
    ],
    references: [
      ['Wikimedia Terms summary — no-professional-advice model', 'https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use/Summary'],
      ['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material'],
    ],
  },
]

const section = (document, id, replacement) => ({
  ...document,
  sections: document.sections.map((item) => item.id === id ? { ...item, ...replacement } : item),
})

const currentTerms = (() => {
  let document = LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'terms')
  document = section(document, 'scope', {
    paragraphs: [
      'These Terms govern account registration, personal wiki tools, editorial submissions and other interactive features made available through lusorae.pt. Public encyclopedia pages can be read without an account.',
      'When you create an account, you enter into these Terms with the operator of GTA LORE. The registration form requires an unticked box to be selected before submission, and the account record stores the acceptance time and policy version. Submitting an editorial contribution is also subject to the contribution rules below.',
      'Anonymous reading does not by itself create an account contract. The operator may still protect the service, enforce applicable law, restrict abusive traffic and remove unlawful material. Those operational rights are distinct from obligations accepted by a registered account holder.',
    ],
  })
  document = section(document, 'accounts', {
    paragraphs: ['GTA LORE sets 16 as the minimum age for an account. If the law applicable to you requires parental or guardian authorisation to enter these Terms or provide a particular consent, you must have that authorisation. You must provide accurate registration information and keep your credentials secure.'],
  })
  document = section(document, 'contributions', {
    paragraphs: [
      'You retain copyright in original text you submit. By submitting it for review, you grant the operator a worldwide, non-exclusive, royalty-free licence to host, reproduce, format, moderate and publish it for operation of the archive.',
      'If original text is accepted into a public article, you agree that it may be released under Creative Commons Attribution-ShareAlike 4.0. That public licence is not revocable for copies already licensed under its terms. It does not cover third-party artwork, screenshots, trademarks, quotations or other material the operator cannot license.',
    ],
  })
  document = section(document, 'service', {
    paragraphs: [
      'The archive may change, interrupt or retire features; correct or remove records; and update security requirements. No particular page, account feature or stored draft is guaranteed to remain available.',
      'A material change to the account contract receives a new dated version and a clear notice. Where renewed agreement is required, account-only use will not bind you to that change until the site obtains it. Previous accepted versions remain available in the policy archive.',
    ],
  })
  return {
    ...document,
    readTime: '9 min',
    references: [
      ['Creative Commons BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
      ['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material'],
    ],
  }
})()

const currentPrivacy = (() => {
  let document = LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'privacy')
  document = section(document, 'data', {
    paragraphs: ['Creating an account requires an email address, username, display name and password, together with acceptance of the Terms. These fields identify and secure the account. The biography, public profile and reading history are optional and off by default; none is needed to read the public archive.'],
    bullets: [
      'Account identity: email address, username, display name, optional biography, role, verification state, acceptance record and account timestamps.',
      'Authentication and security: a password hash, opaque session and one-time-token hashes, a coarse device/browser label, last-active time, failed-login state and a keyed one-way digest of the network address.',
      'Personal wiki data: watchlist, reading history when enabled, collections, saved pages, private notes, preferences, notification state and achievements.',
      'Contribution data: correction or source suggestions, supporting links, encrypted detail, review state, review notes and the account associated with the submission.',
      'Communications: verification and recovery delivery status, and correspondence sent to the privacy, copyright or general legal desks.',
      'Operational records: the public access log records time, request method and path without query strings or network addresses, response status, size and duration. Limited connection diagnostics may appear in protected error logs.',
      'On-device data: unfinished suggestion drafts, vehicle favourites and comparisons, and current-tab states for filters and the radio index. The current search interface does not persist search history.',
    ],
  })
  document = section(document, 'purposes', {
    paragraphs: ['Each purpose is matched to a legal basis. Consent-based processing does not begin until the relevant setting is enabled, and disabling it stops that processing. GTA LORE does not profile readers or make decisions producing legal or similarly significant effects solely by automated means.'],
    bullets: [
      'Create and authenticate an account, keep sessions signed in and deliver requested personal wiki tools — performance of a contract (GDPR Article 6(1)(b)).',
      'Send verification and password-recovery messages — performance of a contract (Article 6(1)(b)).',
      'Receive, review and answer editorial suggestions; preserve attribution for accepted text; and maintain the integrity of the archive — performance of the contribution agreement (Article 6(1)(b)) and legitimate interests in accurate, attributable publishing (Article 6(1)(f)).',
      'Defend the service through rate limits, anti-forgery controls, failure diagnosis and a privacy-reduced security audit — legitimate interests in service security and abuse prevention (Article 6(1)(f)), balanced against user privacy and minimised by design.',
      'Show a public profile with display name, biography and accepted-contribution count — consent (Article 6(1)(a)). Off by default and controlled in Account → Privacy.',
      'Record private reading history — consent (Article 6(1)(a)). Off by default and controlled in Account → Privacy.',
      'Answer legal, privacy and copyright correspondence — legitimate interests in handling requests and legal claims (Article 6(1)(f)); where the message exercises a GDPR right, compliance with a legal obligation (Article 6(1)(c)).',
      'Respond to valid legal process, establish or defend legal claims and keep records required by law — legal obligation (Article 6(1)(c)) and legitimate interests in legal claims (Article 6(1)(f)).',
    ],
  })
  document = section(document, 'sharing', {
    paragraphs: ['Personal data is not sold, used for behavioural advertising or shared for independent marketing. The following recipients process only what is needed for their role:'],
    bullets: [
      'OVHcloud provides the virtual-server infrastructure that hosts the application and database and may process hosted data and limited operational metadata under the operator’s instructions.',
      'Resend receives the destination email address and transactional message content only when verification or password recovery is requested.',
      'Competent authorities or another affected person may receive limited information where disclosure is legally required or reasonably necessary to establish, exercise or defend a legal claim.',
      'Public profile fields are disclosed to readers only after the user enables that preference. Private notes, collections, watchlists and reading history are not published.',
      `A current copy of the processor and transfer information can be requested from ${LEGAL_CONTACTS.privacy}.`,
    ],
  })
  document = section(document, 'retention', {
    bullets: [
      'Ordinary sessions expire after 7 days; “remember me” sessions expire after 30 days and may be revoked earlier.',
      'The anti-forgery cookie expires after 24 hours. Password-reset links expire after 1 hour and email-verification links after 24 hours.',
      'Privacy-reduced security audit records expire automatically after 180 days.',
      'Protected web access and error logs rotate daily and keep no more than 14 rotations. The dedicated access format excludes network addresses and query strings.',
      'Account details and personal wiki data remain while the account exists or until the user deletes the relevant item, disables history, clears history or deletes the account.',
      'Rate-limit records expire automatically after their short security window. Current-tab storage ends when the tab session ends; persistent feature storage remains until the user removes the item or clears browser data.',
      'Legal, privacy and copyright correspondence is kept until the request is resolved and then only for as long as reasonably needed to evidence the response, comply with law or handle a related dispute.',
      'A minimal record may remain longer only for a defined reason: until a legal claim and appeal period ends; for the period imposed by law; until a fraud or abuse restriction expires; or, for attribution, while the accepted contribution remains published under its licence.',
    ],
  })
  document = section(document, 'rights', {
    paragraphs: [
      'Under the GDPR you may request access, correction, deletion, restriction or portability, and may object to relevant processing. Requests are normally answered within one month; that period may be extended by up to two further months for a complex or numerous request, with notice during the first month.',
      'Consent for the public profile and reading history can be withdrawn at any time through the same Account → Privacy controls used to give it. Withdrawal stops future processing and does not affect processing that was lawful before withdrawal.',
      'You may lodge a complaint with the supervisory authority where you live or work, or where the alleged infringement occurred. In Portugal, the supervisory authority is the Comissão Nacional de Proteção de Dados (CNPD).',
    ],
    bullets: [
      'Export profile and personal wiki data from Account → Data & privacy.',
      'Correct display name, username and biography from Account → Profile.',
      'Disable and erase reading history in Account → Privacy, or clear it from Account → Watchlist.',
      'Revoke devices from Account → Sessions; change the password or permanently delete the account from Account → Security.',
      `For a request that cannot be completed in the interface, email ${LEGAL_CONTACTS.privacy}.`,
    ],
  })
  document = section(document, 'transfers', {
    paragraphs: [
      'OVHcloud supplies the primary hosting infrastructure. The operator selects and administers the hosting region and does not intentionally route the account database to a separate third-party database service.',
      'Transactional email requires a transfer to Resend (Plus Five Five, Inc.), whose primary processing operations are in the United States. The transferred data is limited to the recipient address and verification or recovery message content.',
      `Resend’s data-processing terms incorporate the European Commission’s Standard Contractual Clauses for transfers requiring Article 46 safeguards and state participation in the EU–US Data Privacy Framework. Information about the safeguards and a copy of the terms relied on can be requested from ${LEGAL_CONTACTS.privacy}.`,
    ],
  })
  return {
    ...document,
    readTime: '11 min',
    references: [
      ['GDPR — Regulation (EU) 2016/679', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679'],
      ['CNPD — rights of data subjects', 'https://www.cnpd.pt/cidadaos/direitos/'],
      ['Resend Data Processing Addendum', 'https://resend.com/legal/dpa'],
      ['OVHcloud — data protection and hosting', 'https://www.ovhcloud.com/en/personal-data-protection/legal-privacy-security/'],
    ],
  }
})()

const currentCookies = (() => {
  let document = LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'cookies')
  document = section(document, 'position', {
    paragraphs: [
      'GTA LORE does not use advertising, cross-site tracking, audience analytics cookies or reader profiling. It uses first-party security cookies for account functions and limited browser storage initiated by features the reader chooses to use.',
      'Search queries are held only in page memory for the open browsing session. Since 13 September 2026, the search interface neither reads nor writes persistent search history. A removal control remains temporarily available in Account → Data & privacy for data left by older releases.',
    ],
  })
  document = section(document, 'storage', {
    items: [
      { name: 'gta-lore:suggestion:*', purpose: 'Keeps an unfinished editorial suggestion after you start using the suggestion feature.', duration: 'Until submitted, emptied or browser data is cleared', category: 'Feature explicitly requested' },
      { name: 'la:favs / la:compare', purpose: 'Keeps vehicle favourites and comparison choices after you select them.', duration: 'Until removed or browser data is cleared', category: 'Feature explicitly requested' },
      { name: 'gta-lore:filters:* (session)', purpose: 'Remembers whether a filter panel was left open or closed in this tab.', duration: 'Current tab session', category: 'Requested interface state' },
      { name: 'gta-lore:radio:* (session)', purpose: 'Remembers radio filters, query and selected station in this tab.', duration: 'Current tab session', category: 'Requested interface state' },
    ],
    note: 'Legacy key gta-lore:recent-searches may remain on devices that used an older release. The current site does not read it; remove it from Account → Data & privacy or clear site data.',
  })
  document = section(document, 'control', {
    paragraphs: ['Signing out removes authentication cookies. Browser settings can remove or block cookies and local storage, but blocking necessary cookies prevents sign-in and protected account changes. Drafts, vehicle selections and current-tab interface state can be removed through the relevant feature or by clearing site data.'],
  })
  document = section(document, 'changes', {
    paragraphs: [`This inventory describes browser storage used by GTA LORE as of version ${LEGAL_VERSION}. It is checked against the implementation when storage behaviour changes. Report an unlisted item to ${LEGAL_CONTACTS.privacy}.`],
  })
  return {
    ...document,
    readTime: '4 min',
    references: [
      ['ePrivacy Directive — Article 5(3)', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32002L0058'],
      ['CJEU Planet49 judgment', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62017CJ0673'],
    ],
  }
})()

const currentCopyright = (() => {
  let document = LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'copyright')
  document = section(document, 'notice', {
    paragraphs: [`A rights holder or authorised agent may send an ordinary copyright complaint to ${LEGAL_CONTACTS.copyright}. If the sender specifically relies on the United States DMCA, the notice must also contain the statements required by 17 U.S.C. §512. A complete notice should contain:`],
    bullets: [
      'A physical or electronic signature of the rights holder or authorised agent.',
      'Identification of the protected work, or a representative list if several works on one site are involved.',
      'The exact GTA LORE URL and enough information to locate the material complained of.',
      'The sender’s name and reliable contact details.',
      'A good-faith statement that the disputed use is not authorised by the owner, its agent or the law.',
      'For a DMCA notice, a statement that the information is accurate and, under penalty of perjury, that the sender is the rights holder or authorised to act for that person.',
    ],
  })
  document = section(document, 'process', {
    paragraphs: [
      'GTA LORE will acknowledge a sufficiently detailed complaint, preserve relevant records and assess the identified use. Material may be removed or restricted during review. The contributor may be informed and may respond with evidence of authorship, permission, licence, public-domain status, misidentification or an applicable legal exception.',
      'A person seeking a United States DMCA counter-notification must send the elements below to the copyright address. This route applies only where Section 512 is legally applicable; publishing it does not represent that GTA LORE is established in the United States or currently claims a Section 512 safe harbour. Complaints under other law use the ordinary review process.',
    ],
    bullets: [
      'The counter-notifier’s physical or electronic signature.',
      'Identification of the removed material and the URL where it appeared before removal.',
      'A statement under penalty of perjury that the material was removed because of mistake or misidentification.',
      'The counter-notifier’s name, address and telephone number, the jurisdiction consent required by Section 512(g), and agreement to accept service of process from the original complainant or their agent.',
      'Where Section 512 applies, a compliant counter-notice is forwarded to the complainant and restoration occurs no sooner than 10 and no later than 14 business days unless notice of a qualifying court action is received.',
      'Outside that procedure, restoration depends on the law that applies and the evidence received. Invalid, abusive or materially incomplete notices may be rejected.',
      'Repeated infringement may lead to contribution restrictions or account termination.',
    ],
  })
  return {
    ...document,
    readTime: '8 min',
    references: [
      ['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material'],
      ['U.S. Copyright Office — Section 512 resources', 'https://www.copyright.gov/512/'],
      ['Creative Commons BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'],
    ],
  }
})()

const currentCommunity = (() => {
  let document = LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'community')
  document = section(document, 'editorial', {
    paragraphs: ['Suggestions should be concise enough to review and complete enough to verify. Except for an obvious typographical correction, the public submission form requires a direct official Rockstar URL and a clear separation between what the source establishes and the contributor’s interpretation.'],
    bullets: [
      'Official Rockstar material is the public submission system’s source boundary for announcements, names and published facts.',
      'Editors may separately document reputable reporting, interviews or previews, but a reader cannot submit a non-Rockstar URL through the public evidence field.',
      'Community databases may assist private discovery but are not published as the archive’s public source and must not turn speculation into confirmation.',
      'Leaks, datamining and rumours must be identified as such and may be excluded when privacy, safety or copyright risk outweighs encyclopedic value.',
      'Paid, promotional or personal relationships relevant to a proposed edit must be disclosed.',
    ],
  })
  return { ...document, references: [['Rockstar Games Community Guidelines', 'https://www.rockstargames.com/community-resources/guidelines']] }
})()

const currentDisclaimer = {
  ...LEGAL_DOCUMENTS_2026_09_12.find(({ slug }) => slug === 'disclaimer'),
  references: [['Rockstar policy on copyrighted material', 'https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material']],
}

export const LEGAL_DOCUMENTS = [currentTerms, currentPrivacy, currentCookies, currentCopyright, currentCommunity, currentDisclaimer]

export const LEGAL_ARCHIVE = Object.freeze([
  {
    version: '2026-09-12',
    effective: '12 September 2026',
    documents: LEGAL_DOCUMENTS_2026_09_12,
    note: 'Policy text used for account acceptance from 12 September 2026 until replaced on 13 September 2026.',
  },
])

export const LEGAL_BY_SLUG = Object.fromEntries(LEGAL_DOCUMENTS.map((document) => [document.slug, document]))
