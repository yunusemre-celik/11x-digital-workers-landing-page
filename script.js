/**
 * 11x — Digital Workers Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Sticky State
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // 3. Worker Showcase Data & Switcher
  const workersData = {
    alice: {
      name: 'Alice',
      role: 'Autonomous Sales Development Representative (SDR)',
      badgeClass: 'badge-wisteria',
      badgeText: 'Autonomous Outbound',
      status: 'Live Autopilot · 3,420 accounts enriched today',
      image: 'assets/worker-alice.jpg',
      headline: 'Alice books high-value pipeline while you sleep.',
      summary: 'Alice acts as a full-time outbound SDR. She conducts comprehensive multi-source account research, detects buying intent, writes hyper-personalized emails, engages over LinkedIn, handles objections, and schedules meetings straight into your reps’ calendars.',
      capabilities: [
        {
          title: 'Deep Account Reconnaissance',
          desc: 'Parses 10-K filings, quarterly earnings, job listings, and tech stacks to find authentic pain points.'
        },
        {
          title: 'Hyper-Personalized Multi-Channel',
          desc: 'Executes bespoke email and LinkedIn outreach with tone matched to your top enterprise closers.'
        },
        {
          title: 'Autonomous Calendar Scheduling',
          desc: 'Answers questions, overcomes gatekeepers, and routes qualified buyers directly into calendar slots.'
        },
        {
          title: 'Closed-Loop CRM Hygiene',
          desc: 'Logs every single touchpoint, response, and sentiment metric back into Salesforce or HubSpot.'
        }
      ],
      metric: '3.4x more meetings booked vs. manual SDR teams'
    },
    jordan: {
      name: 'Jordan',
      role: 'Autonomous Phone & Conversational Voice Agent',
      badgeClass: 'badge-desert-clay',
      badgeText: 'Voice & Telephony',
      status: 'Inbound Ready · 42 calls handled this hour',
      image: 'assets/worker-jordan.jpg',
      headline: 'Human-grade phone outreach with sub-400ms latency.',
      summary: 'Jordan speaks naturally with prospective clients over the phone. Equipped with enterprise-level latency, dynamic objection handling, and emotional tone calibration, Jordan qualifies leads, confirms attendance, and conducts outbound discovery calls.',
      capabilities: [
        {
          title: 'Sub-400ms Voice Latency',
          desc: 'Converses with fluid cadence, zero robotic awkward pauses, and natural conversational turn-taking.'
        },
        {
          title: 'Real-Time Objection Handling',
          desc: 'Trained on tens of thousands of enterprise sales playbooks to overcome pricing and timing pushback.'
        },
        {
          title: 'Live Warm Transfers',
          desc: 'Instantly routes high-intent prospective buyers to live human account executives in real time.'
        },
        {
          title: 'Instant Call Synthesis & Sync',
          desc: 'Produces call transcripts, action item summaries, and CRM deal stage progressions in seconds.'
        }
      ],
      metric: '< 400ms response latency with 94% call resolution'
    },
    julian: {
      name: 'Julian',
      role: 'Autonomous Market & Account Intelligence Researcher',
      badgeClass: 'badge-dusty-sky',
      badgeText: 'Market Intelligence',
      status: 'Radar Scanning · 19,400 signal events logged',
      image: 'assets/worker-julian.jpg',
      headline: 'Superhuman account reconnaissance across the entire web.',
      summary: 'Julian continuously monitors your target account universe. He tracks executive leadership transitions, new patent filings, cloud infrastructure migrations, and procurement signals to trigger perfectly timed outreach for Alice and Jordan.',
      capabilities: [
        {
          title: 'Executive Movement Radar',
          desc: 'Alerts the moment champion buyers change companies or new department heads take charge.'
        },
        {
          title: 'Technographic Fingerprinting',
          desc: 'Detects complementary software installations and contract renewal dates across 50,000+ domains.'
        },
        {
          title: 'Regulatory & 10-K Analysis',
          desc: 'Synthesizes public filings and press releases into clear, prioritized commercial triggers.'
        },
        {
          title: 'Dynamic ICP Scoring',
          desc: 'Constantly re-ranks accounts according to real-time intent density and propensity to convert.'
        }
      ],
      metric: 'Over 25,000 daily web signals synthesized into pipeline'
    },
    arthur: {
      name: 'Arthur',
      role: 'Autonomous RevOps & Inbound Qualification Agent',
      badgeClass: 'badge-sandstone',
      badgeText: 'RevOps & Inbound',
      status: 'Standby · Instant response SLA: 18s',
      image: 'assets/worker-arthur.jpg',
      headline: 'Qualify inbound leads in under 30 seconds, 24/7/365.',
      summary: 'Arthur bridges the gap between marketing demand generation and sales execution. He enriches demo request form submissions, checks ICP fit, orchestrates immediate outbound contact, and eliminates lead decay forever.',
      capabilities: [
        {
          title: 'Instant Inbound Triage',
          desc: 'Contacts inbound demo requests within 30 seconds via personalized email or voice sequence.'
        },
        {
          title: 'Automatic Lead Enrichment',
          desc: 'Augments bare inbound contact information with verified company revenue, headcount, and tools.'
        },
        {
          title: 'Smart Rep Routing',
          desc: 'Enforces routing rules, territories, and quota balancing across your sales organization.'
        },
        {
          title: 'No-Show Follow-Up Cadence',
          desc: 'Automatically re-engages missed demo attendees with gentle multi-touch rescheduling nudges.'
        }
      ],
      metric: 'Under 30s median response time across 100% of leads'
    }
  };

  const tabButtons = document.querySelectorAll('.worker-tab-btn');
  const portraitImg = document.getElementById('portraitWorkerImage');
  const portraitBadgeText = document.getElementById('portraitStatusText');
  const portraitName = document.getElementById('portraitWorkerName');
  const portraitRole = document.getElementById('portraitWorkerRole');
  const detailBadge = document.getElementById('detailWorkerBadge');
  const detailTitle = document.getElementById('detailWorkerTitle');
  const detailSummary = document.getElementById('detailWorkerSummary');
  const detailCapabilities = document.getElementById('detailCapabilitiesGrid');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const workerKey = btn.dataset.worker;
      const data = workersData[workerKey];
      if (!data) return;

      // Update portrait card
      if (portraitImg) {
        portraitImg.style.opacity = '0.5';
        setTimeout(() => {
          portraitImg.src = data.image;
          portraitImg.alt = data.name + ' - ' + data.role;
          portraitImg.style.opacity = '1';
        }, 150);
      }
      if (portraitBadgeText) portraitBadgeText.textContent = data.status;
      if (portraitName) portraitName.textContent = data.name;
      if (portraitRole) portraitRole.textContent = data.role;

      // Update detail panel
      if (detailBadge) {
        detailBadge.className = 'worker-badge-pill ' + data.badgeClass;
        detailBadge.textContent = data.badgeText;
      }
      if (detailTitle) detailTitle.textContent = data.headline;
      if (detailSummary) detailSummary.textContent = data.summary;

      if (detailCapabilities) {
        detailCapabilities.innerHTML = data.capabilities.map(cap => `
          <div class="capability-card">
            <h4 class="capability-title">${cap.title}</h4>
            <p class="capability-desc">${cap.desc}</p>
          </div>
        `).join('');
      }
    });
  });

  // 4. Interactive Simulation Console Tabs
  const simNavBtns = document.querySelectorAll('.sim-nav-btn');
  const simTabContents = document.querySelectorAll('.sim-tab-content');

  simNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.simTab;
      simNavBtns.forEach(b => b.classList.remove('active'));
      simTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById('sim-' + tabId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 5. Interactive ROI & Capacity Calculator
  const repsSlider = document.getElementById('repsInput');
  const acvSlider = document.getElementById('acvInput');
  const meetingsSlider = document.getElementById('meetingsInput');

  const repsDisplay = document.getElementById('repsValueDisplay');
  const acvDisplay = document.getElementById('acvValueDisplay');
  const meetingsDisplay = document.getElementById('meetingsValueDisplay');

  const calcPipelineOutput = document.getElementById('calcPipelineOutput');
  const calcSavingsOutput = document.getElementById('calcSavingsOutput');
  const calcHoursOutput = document.getElementById('calcHoursOutput');

  function updateCalculator() {
    if (!repsSlider || !acvSlider || !meetingsSlider) return;

    const reps = parseInt(repsSlider.value, 10);
    const acv = parseInt(acvSlider.value, 10);
    const meetings = parseInt(meetingsSlider.value, 10);

    if (repsDisplay) repsDisplay.textContent = reps + (reps === 1 ? ' rep' : ' reps');
    if (acvDisplay) acvDisplay.textContent = '$' + acv.toLocaleString();
    if (meetingsDisplay) meetingsDisplay.textContent = meetings + ' / mo';

    // Calculation logic
    // Traditional human SDR: ~12 meetings/mo. 11x digital worker boosts pipeline by 3.2x
    const extraMeetingsPerMonth = Math.round(meetings * 1.85 * reps);
    const closeRate = 0.18; // 18% close rate
    const pipelineMonthly = extraMeetingsPerMonth * (acv * 0.25);
    const annualSavings = reps * 85000; // Average SDR OTE savings
    const hoursSavedMonthly = reps * 110; // Hours saved from manual prospecting

    if (calcPipelineOutput) calcPipelineOutput.textContent = '$' + Math.round(pipelineMonthly).toLocaleString();
    if (calcSavingsOutput) calcSavingsOutput.textContent = '$' + Math.round(annualSavings).toLocaleString() + ' / yr';
    if (calcHoursOutput) calcHoursOutput.textContent = hoursSavedMonthly.toLocaleString() + ' hrs / mo';
  }

  [repsSlider, acvSlider, meetingsSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', updateCalculator);
  });
  updateCalculator();

  // 6. Floating Chat Widget (Ask Julian)
  const julianWidget = document.getElementById('julianWidget');
  const julianTrigger = document.getElementById('julianTrigger');
  const julianPanel = document.getElementById('julianPanel');
  const julianCloseBtn = document.getElementById('julianCloseBtn');
  const julianInput = document.getElementById('julianInput');
  const julianSendBtn = document.getElementById('julianSendBtn');
  const julianFeed = document.getElementById('julianFeed');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (julianTrigger && julianPanel) {
    julianTrigger.addEventListener('click', () => {
      julianPanel.classList.toggle('active');
      if (julianPanel.classList.contains('active')) {
        julianInput?.focus();
      }
    });
  }

  if (julianCloseBtn && julianPanel) {
    julianCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      julianPanel.classList.remove('active');
    });
  }

  const julianKnowledge = [
    {
      keywords: ['alice', 'sdr', 'email', 'outbound', 'prospecting'],
      response: "Alice is our autonomous SDR. She continuously investigates target accounts, identifies relevant decision-makers via LinkedIn and proprietary databases, drafts hyper-tailored email sequences, handles inbound replies, and schedules demos directly into your reps' calendars."
    },
    {
      keywords: ['jordan', 'voice', 'phone', 'call', 'latency'],
      response: "Jordan is our autonomous phone agent with sub-400ms voice response latency. He handles both inbound customer inquiries and outbound prospecting phone calls with human-grade conversational cadence, overcoming objections and executing live warm transfers."
    },
    {
      keywords: ['soc2', 'security', 'compliance', 'privacy', 'gdpr'],
      response: "Security and compliance are foundational at 11x. We are SOC2 Type II and ISO 27001 certified, and fully compliant with GDPR and CCPA. All CRM bi-directional sync operations are encrypted end-to-end with enterprise-grade tenant isolation."
    },
    {
      keywords: ['salesforce', 'hubspot', 'crm', 'integration', 'sync'],
      response: "11x provides native, bidirectional integrations for Salesforce and HubSpot. All prospect interactions, phone recordings, meeting notes, and deal stage updates sync automatically in real time without manual data entry."
    },
    {
      keywords: ['pricing', 'cost', 'pilot', 'contract', 'hire'],
      response: "11x digital workers are contracted as autonomous team members with transparent annual or monthly platform licenses. Customers typically observe an 80%+ reduction in cost per qualified meeting compared to hiring traditional human SDR cohorts. Click 'Book a Demo' to see customized pricing for your fleet!"
    }
  ];

  function addChatMessage(text, sender = 'julian') {
    if (!julianFeed) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble bubble-${sender}`;
    bubble.textContent = text;
    julianFeed.appendChild(bubble);
    julianFeed.scrollTop = julianFeed.scrollHeight;
  }

  function handleUserMessage(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();
    addChatMessage(cleanQuery, 'user');
    if (julianInput) julianInput.value = '';

    // Simulate thinking delay
    setTimeout(() => {
      const lower = cleanQuery.toLowerCase();
      let matched = julianKnowledge.find(k => k.keywords.some(w => lower.includes(w)));
      if (matched) {
        addChatMessage(matched.response, 'julian');
      } else {
        addChatMessage("I'm Julian, research intelligence specialist at 11x. I can guide you through our autonomous workers (Alice for outbound, Jordan for voice, Arthur for inbound), enterprise compliance, or schedule a tailored live platform demo for your team!", 'julian');
      }
    }, 600);
  }

  if (julianSendBtn && julianInput) {
    julianSendBtn.addEventListener('click', () => handleUserMessage(julianInput.value));
    julianInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserMessage(julianInput.value);
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.prompt || chip.textContent;
      handleUserMessage(text);
    });
  });

  // 7. Booking / Get Started Modal Drawer
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.js-open-demo-modal');
  const bookingForm = document.getElementById('bookingForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');
  const pickerItems = document.querySelectorAll('.picker-item');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  pickerItems.forEach(item => {
    item.addEventListener('click', () => {
      pickerItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modalSuccessMsg) {
        bookingForm.style.display = 'none';
        modalSuccessMsg.style.display = 'block';
      }
    });
  }

  // 8. Screenshot Lightbox Modal
  const screenshotTrigger = document.getElementById('screenshotTrigger');
  const screenshotModal = document.getElementById('screenshotModal');
  const screenshotClose = document.getElementById('screenshotClose');

  if (screenshotTrigger && screenshotModal) {
    screenshotTrigger.addEventListener('click', () => {
      screenshotModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeScreenshotModal() {
    if (screenshotModal) {
      screenshotModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (screenshotClose) screenshotClose.addEventListener('click', closeScreenshotModal);
  if (screenshotModal) {
    screenshotModal.addEventListener('click', (e) => {
      if (e.target === screenshotModal) closeScreenshotModal();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeScreenshotModal();
      julianPanel?.classList.remove('active');
    }
  });

  // 9. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          navMenu?.classList.remove('open');
        }
      }
    });
  });
});
