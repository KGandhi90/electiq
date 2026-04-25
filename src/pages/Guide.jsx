import { useState } from 'react'
import GuideTab from '../components/GuideTab'
import FlipCard from '../components/FlipCard'

const TABS = [
  { id: 'register',   label: 'Register'    },
  { id: 'voterid',    label: 'Voter ID'    },
  { id: 'pollday',    label: 'Poll Day'    },
  { id: 'evm',        label: 'EVM & VVPAT' },
  { id: 'candidates', label: 'Candidates'  },
  { id: 'nota',       label: 'NOTA'        },
]

const registerSteps = [
  { n: 1, title: 'Check Eligibility',   desc: 'Indian citizen · 18+ years · ordinary resident of the constituency' },
  { n: 2, title: 'Visit the Portal',    desc: 'Go to voters.eci.gov.in or download the Voter Helpline App' },
  { n: 3, title: 'Fill Form 6',         desc: 'New registration. Use Form 8 for corrections to existing entries' },
  { n: 4, title: 'Submit Documents',    desc: 'Proof of age (birth certificate, Aadhaar, passport) + address proof' },
  { n: 5, title: 'Receive your EPIC',   desc: 'Voter ID delivered by post or download e-EPIC instantly from the portal' },
]

const pollDaySteps = [
  { n: 1, title: 'Check Your Booth',    desc: 'Find your polling station at voters.eci.gov.in or via the Voter Helpline App' },
  { n: 2, title: 'Carry Valid ID',      desc: 'Bring your EPIC (Voter ID) or any 12 approved alternative documents' },
  { n: 3, title: 'Join the Queue',      desc: 'Reach your polling station, join the line, and wait for your turn' },
  { n: 4, title: 'Get Your Slip',       desc: 'Officer verifies your name on the roll and marks your finger with indelible ink' },
  { n: 5, title: 'Enter the Booth',     desc: 'Enter the voting compartment — this is a secret, private space' },
  { n: 6, title: 'Cast Your Vote',      desc: 'Press the button next to your chosen candidate on the EVM' },
  { n: 7, title: 'Verify on VVPAT',     desc: 'Check the paper slip that appears for 7 seconds to confirm your vote' },
]

const approvedIds = ['Passport', 'Driving Licence', 'Aadhaar', 'PAN Card', 'MNREGA Card', 'Pension Document', 'Passbook with Photo', 'Service ID', 'Smart Card', 'MP/MLA/MLC ID']
const voterIdChips = ['Name', 'Photo', 'Voter ID No.', "Father/Husband's Name", 'Address', 'Age']
const evmFlipCards = [
  { myth: 'EVMs can be hacked remotely',       fact: 'EVMs are standalone with zero wireless or network connectivity whatsoever' },
  { myth: 'One party always gets bonus votes', fact: 'EVMs are randomly assigned + tested multiple times before and after polling' },
]
const candidateCards = [
  { icon: '📋', title: 'Nomination Requirements', desc: 'Must be Indian citizen, 25+ for Lok Sabha, not disqualified, and pay security deposit of ₹25,000 (₹12,500 for SC/ST).' },
  { icon: '📄', title: 'Affidavit Disclosure',    desc: 'Candidates must declare assets, liabilities, criminal record, and educational qualification in a sworn affidavit.' },
  { icon: '🔢', title: 'Election Symbol',         desc: 'Recognised parties get reserved symbols. Independents get symbols from an approved list assigned by the Returning Officer.' },
]
const notaCards = [
  { title: 'What it means',                  desc: 'NOTA lets voters formally reject all candidates on the ballot without spoiling their vote.' },
  { title: 'When introduced',                desc: 'Introduced on 27 September 2013 following a landmark Supreme Court directive.' },
  { title: 'What happens to NOTA votes',     desc: 'NOTA votes are counted and declared but do not affect the result — the candidate with most votes still wins.' },
  { title: 'Why it matters',                 desc: 'It gives voters a formal mechanism to express dissatisfaction and compels parties to field better candidates.' },
]

function StepCard({ step }) {
  return (
    <div style={{ background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FF9933', color: '#0C0C14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{step.n}</div>
      <div>
        <p style={{ fontSize: '13px', color: '#F0F0F0', fontWeight: 500 }}>{step.title}</p>
        <p style={{ fontSize: '12px', color: '#6B6B7A', marginTop: '4px', lineHeight: 1.5 }}>{step.desc}</p>
      </div>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <div style={{ background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px' }}>
      <p style={{ fontSize: '13px', color: '#F0F0F0', fontWeight: 500, marginBottom: '8px' }}>{title}</p>
      {children}
    </div>
  )
}

function Chip({ label }) {
  return (
    <span style={{ background: '#1C1C2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', fontSize: '11px', color: '#6B6B7A', padding: '4px 12px', display: 'inline-block' }}>{label}</span>
  )
}

function RegisterTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4">
      {registerSteps.map((s) => <StepCard key={s.n} step={s} />)}
      <div className="md:col-span-2" style={{ background: '#1C1C2E', borderLeft: '2px solid #4A7FE8', borderRadius: '12px', padding: '16px' }}>
        <p style={{ fontSize: '13px', color: '#6B6B7A', lineHeight: 1.6 }}>💡 You can also register via your local BLO (Booth Level Officer) by visiting your nearest polling booth.</p>
      </div>
    </div>
  )
}

function VoterIdTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4">
      <InfoCard title="What is EPIC?">
        <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>Elector's Photo Identity Card — official proof of voter registration.</p>
      </InfoCard>
      <InfoCard title="What it contains">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {voterIdChips.map((c) => <Chip key={c} label={c} />)}
        </div>
      </InfoCard>
      <InfoCard title="Lost your card?">
        <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>Download e-EPIC from voters.eci.gov.in using your voter ID number.</p>
      </InfoCard>
      <InfoCard title="Verify your name">
        <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>Visit electoralsearch.eci.gov.in to confirm you're on the electoral roll.</p>
      </InfoCard>
    </div>
  )
}

function PollDayTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4">
      {pollDaySteps.map((s) => <StepCard key={s.n} step={s} />)}
      <div className="md:col-span-2" style={{ background: '#1C1C2E', borderRadius: '16px', padding: '16px' }}>
        <p style={{ fontSize: '11px', color: '#FF9933', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px' }}>Accepted as Alternative ID</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{approvedIds.map((id) => <Chip key={id} label={id} />)}</div>
      </div>
    </div>
  )
}

function EvmTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4">
      <InfoCard title="EVM — Electronic Voting Machine">
        <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>A standalone, tamper-proof machine with no internet or wireless connectivity. Consists of a Ballot Unit and Control Unit. Records up to 2,000 votes per unit.</p>
      </InfoCard>
      <InfoCard title="VVPAT — Voter Verified Paper Audit Trail">
        <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>Prints a paper slip showing the candidate name and symbol after you vote. Visible for 7 seconds before dropping into a sealed box. Provides a paper trail for audits.</p>
      </InfoCard>
      <div className="md:col-span-2">
        <p style={{ fontSize: '11px', color: '#6B6B7A', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '12px' }}>Myth vs Fact</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {evmFlipCards.map((card, i) => <FlipCard key={i} myth={card.myth} fact={card.fact} />)}
        </div>
      </div>
    </div>
  )
}

function CandidatesTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-4">
      {candidateCards.map((card) => (
        <div key={card.title} style={{ background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '14px' }}>
          <span style={{ fontSize: '22px' }}>{card.icon}</span>
          <div>
            <p style={{ fontSize: '13px', color: '#F0F0F0', fontWeight: 500 }}>{card.title}</p>
            <p style={{ fontSize: '12px', color: '#6B6B7A', marginTop: '6px', lineHeight: 1.55 }}>{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function NotaTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4">
      <div className="md:col-span-2" style={{ background: '#13131E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', color: '#6B6B7A', fontWeight: 700 }}>NOTA</p>
        <p style={{ fontSize: '40px', marginTop: '8px' }}>✗</p>
        <p style={{ fontSize: '12px', color: '#6B6B7A', marginTop: '8px' }}>None Of The Above</p>
      </div>
      {notaCards.map((card) => (
        <InfoCard key={card.title} title={card.title}>
          <p style={{ fontSize: '12px', color: '#6B6B7A', lineHeight: 1.5 }}>{card.desc}</p>
        </InfoCard>
      ))}
    </div>
  )
}

const TAB_CONTENT = {
  register:   <RegisterTab />,
  voterid:    <VoterIdTab />,
  pollday:    <PollDayTab />,
  evm:        <EvmTab />,
  candidates: <CandidatesTab />,
  nota:       <NotaTab />,
}

export default function Guide() {
  const [activeTab, setActiveTab] = useState('register')

  return (
    <div className="page-enter py-5 md:py-8">
      {/* Header */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', color: '#F0F0F0', fontWeight: 700 }}>How to Vote</h1>
      </div>

      {/* Tab strip */}
      <GuideTab tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content — constrained to max-w-3xl on large screens */}
      <div className="max-w-3xl mx-auto">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  )
}
