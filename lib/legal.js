export const LEGAL_EFFECTIVE = '7 September 2026'
export const LEGAL_VERSION = '2026-09-07'

export const LEGAL_CONTACTS = Object.freeze({
  general: 'legal@lusorae.pt',
  privacy: 'privacy@lusorae.pt',
  copyright: 'copyright@lusorae.pt',
})

export const LEGAL_DOCUMENTS = [
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
          'By creating an account, submitting material or continuing to use an account after a material update, you agree to the version of these Terms then in effect. If you do not agree, do not create an account or use account-only features.',
        ],
      },
      {
        id: 'accounts', title: '2. Eligibility and accounts',
        paragraphs: ['You must be at least 16 years old, or the minimum age required to consent to an online service in your country if higher. You must provide accurate registration information and keep your credentials secure.'],
        bullets: [
          'One person may operate one ordinary account unless a legitimate editorial or testing need has been approved.',
          'Usernames must not impersonate GTA LORE, Rockstar Games, Take-Two, staff, moderators or another person.',
          'You are responsible for activity performed through your account until you report compromise or revoke the affected session.',
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
        bullets: [
          'Account identity: email address, username, display name, optional biography, role, verification state and account timestamps.',
          'Authentication and security: a password hash, opaque session and one-time-token hashes, device/browser label, user agent, last-active time, failed-login state and a one-way hash of the network address.',
          'Personal wiki data: watchlist, reading history when enabled, collections, saved pages, private notes, preferences, notification state and achievements.',
          'Contribution data: correction or source suggestions, supporting links, review state and the account associated with the submission.',
          'Communications: verification and recovery delivery status. The service does not store the readable password or the raw network address in its audit log.',
          'On-device data: recent searches, unfinished suggestion drafts, vehicle favourites/comparisons and whether the cinematic introduction has been shown in the current tab session.',
        ],
      },
      {
        id: 'purposes', title: '3. Purposes and legal bases',
        bullets: [
          'Contract and requested service: create the account, authenticate it, keep sessions, deliver personal wiki tools and process account requests.',
          'Legitimate interests: defend the service, rate-limit abuse, diagnose failures, preserve editorial integrity and maintain a reduced security audit. These uses are limited against user privacy interests.',
          'Consent or user choice where applicable: optional public profile and reading-history preference. These settings can be changed in the account area.',
          'Legal obligation and legal claims: respond to valid legal process, protect rights and retain limited records where the law requires it.',
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
          'A minimal record may be retained longer only where required for legal claims, compliance, fraud prevention or attribution of already-published contributions.',
        ],
      },
      {
        id: 'rights', title: '6. Your choices and rights',
        paragraphs: ['Depending on applicable law, you may request access, correction, deletion, restriction, portability or objection, and may complain to your local supervisory authority. Requests are normally answered within one month where the GDPR applies.'],
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
        paragraphs: ['Passwords are processed with a memory-hard salted hash. Authentication cookies are HTTP-only, SameSite Strict and Secure in production. Mutation requests require an anti-forgery token and trusted origin; sessions and one-time tokens are stored only as hashes. No system is risk-free, so users should use a unique password and revoke unfamiliar sessions promptly.'],
      },
      {
        id: 'transfers', title: '8. International processing',
        paragraphs: ['Infrastructure may process data outside the user’s country. Where transfer rules apply, GTA LORE will rely on an adequacy decision, approved contractual safeguards or another lawful transfer mechanism required for the service provider involved.'],
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
    description: 'A complete inventory of browser storage used by GTA LORE, with purpose, duration and user controls.',
    readTime: '5 min',
    sections: [
      {
        id: 'position', title: '1. Our position',
        paragraphs: ['GTA LORE does not use advertising, cross-site tracking or analytics cookies. It uses first-party security cookies for account functions and local browser storage for features the user requests. If non-essential tracking is introduced, it will remain disabled until valid consent is obtained where required.'],
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
          { name: 'gta-lore:recent-searches', purpose: 'Shows up to six recent searches on this device.', duration: 'Until browser data is cleared', category: 'Preference' },
          { name: 'gta-lore:suggestion:*', purpose: 'Keeps an unfinished editorial suggestion on this device.', duration: 'Until submitted, emptied or browser data is cleared', category: 'User-requested draft' },
          { name: 'la:favs / la:compare', purpose: 'Keeps vehicle favourites and comparison choices on this device.', duration: 'Until removed or browser data is cleared', category: 'Preference' },
          { name: 'gta-lore-intro-cinema-v3', purpose: 'Prevents the cinematic introduction repeating within the same tab session.', duration: 'Current tab session', category: 'Interface state' },
        ],
      },
      {
        id: 'control', title: '4. Your controls',
        paragraphs: ['Signing out removes authentication cookies. Browser settings can remove or block cookies and local storage, but blocking necessary cookies prevents sign-in and account mutations. Recent searches, drafts, favourites and comparisons remain only on the device and can also be removed by clearing site data.'],
      },
      {
        id: 'changes', title: '5. Changes to storage',
        paragraphs: [`This inventory is reviewed when browser storage changes. Questions may be sent to ${LEGAL_CONTACTS.privacy}.`],
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
          'Rockstar states that its fan-content guidance is intended for occasional non-commercial in-game use by individuals and does not cover broader digital publishing. Because GTA LORE is an ongoing digital encyclopedia, the operator should obtain case-by-case written clearance from copyright@take2games.com for continued use of protected media.',
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
          'A statement that the information is accurate and that the sender is authorised to act, made under penalty of perjury where applicable.',
        ],
      },
      {
        id: 'process', title: '6. Review and counter-notice',
        paragraphs: ['GTA LORE will acknowledge a sufficiently detailed notice, preserve relevant records and assess the identified use. It may remove or restrict material while reviewing. The contributor may be informed and may respond with evidence of ownership, permission, licence, public-domain status or an applicable legal exception.'],
        bullets: [
          'Notices are evaluated against the law that applies; sending a notice does not guarantee removal.',
          'Clearly invalid, abusive or materially incomplete notices may be rejected with an explanation.',
          'Restoration may occur after a valid counter-notice or resolution, unless the rights holder begins appropriate legal proceedings.',
          'Repeated infringement may lead to contribution restrictions or account termination.',
        ],
      },
      {
        id: 'trademarks', title: '7. Trademarks and attribution',
        paragraphs: ['Do not use GTA LORE or third-party marks in a way that suggests sponsorship, official status or source endorsement. When reusing CC BY-SA text, credit GTA LORE or the named contributors, link to the source page and licence, identify changes and license adaptations under the same terms.'],
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

export const LEGAL_BY_SLUG = Object.fromEntries(LEGAL_DOCUMENTS.map((document) => [document.slug, document]))
