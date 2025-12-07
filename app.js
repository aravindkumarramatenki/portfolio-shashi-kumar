/* app.js — small interactive behaviors for the VLSI portfolio */

document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle && navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after click
        if (mainNav.classList.contains('open')) mainNav.classList.remove('open');
      }
    });
  });

  // project case data (keeps HTML minimal)
  const CASES = {
    block1: {
      title: 'Block-I — Optimization & Timing Closure',
      meta: 'TSMC 28nm · ~280K cells · Target 500MHz',
      snapshot: [
        'Technology Node: TSMC 28nm',
        'Gate Count: ~280K cell instances',
        'Operating Frequency: 500 MHz (2ns)'
      ],
      tools: ['Design Compiler', 'Genus', 'Innovus', 'PrimeTime'],
      process: [
        'Floorplanning: macro placement for minimal congestion and improved PG planning to reduce IR drop and avoid PG-DRC issues.',
        'Optimization: congestion map analysis; placement blockages and cell padding applied to reduce hotspots.',
        'Timing: CTS using CCD methodology; independently executed ECO fixes for setup and hold violations to achieve timing closure.'
      ],
      results: [
        'Achieved timing closure for target frequency across worst corners.',
        'Reduced local congestion in critical regions and improved power-grid reliability.'
      ]
    },

    block2: {
      title: 'Block-II — RTL Synthesis & Timing Validation',
      meta: 'TSMC 28nm · 421 gates · Dual-clock 200MHz',
      snapshot: [
        'Technology Node: TSMC 28nm',
        'Gate Count: ~421 gates (block-level)',
        'Operating Frequency: 200 MHz (dual-clock)'
      ],
      tools: ['Design Compiler', 'Genus', 'Innovus', 'PrimeTime'],
      process: [
        'RTL Synthesis: complete RTL-to-Gate Level Netlist flow and lint/sanity checks.',
        'Timing QoR: applied constraint refinement, path grouping for critical paths, and iterative synthesis-timing loops.',
        'Validation: produced timing reports and sanity checks across multi-corner setups.'
      ],
      results: [
        'Improved timing QoR with focused path-group handling.',
        'Produced clean GLN ready for downstream P&R flow.'
      ]
    },

    block3: {
      title: 'Block-III — Placement & Clock Implementation',
      meta: 'TSMC 28nm · ~60K gates · Target 400MHz',
      snapshot: [
        'Technology Node: TSMC 28nm',
        'Gate Count: ~60K gates',
        'Operating Frequency: 400 MHz'
      ],
      tools: ['Design Compiler', 'Genus', 'Innovus', 'PrimeTime'],
      process: [
        'Placement: defined bounds, iterative congestion analysis and incremental placement optimization.',
        'CTS: built clock tree using NDR (Non-Default Routing) to minimize skew and ensure clock reaches all sequential cells.',
        'ECO: performed localized ECO fixes to align timing along critical paths.'
      ],
      results: [
        'Balanced clock distribution with minimized skew.',
        'Achieved timing goals with controlled area and power trade-offs.'
      ]
    }
  };

  // open case modal
  const openButtons = document.querySelectorAll('.open-case');
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-content');
  const modalClose = document.getElementById('modal-close');

  function openCase(key) {
    const data = CASES[key];
    if (!data) return;
    modalContent.innerHTML = buildCaseHtml(data);
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCase() {
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      openCase(key);
    });
  });

  modalClose.addEventListener('click', closeCase);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeCase();
  });

  // escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeCase();
  });

  function buildCaseHtml(data) {
    return `
      <header>
        <h3>${data.title}</h3>
        <p class="muted">${data.meta}</p>
      </header>
      <section>
        <h4>Project Snapshot</h4>
        <ul>
          ${data.snapshot.map(s => `<li class="mono">${s}</li>`).join('')}
        </ul>

        <h4>Tools Used</h4>
        <p>${data.tools.join(' · ')}</p>

        <h4>Execution / Process</h4>
        <ol>
          ${data.process.map(p => `<li>${p}</li>`).join('')}
        </ol>

        <h4>Key Results</h4>
        <ul>
          ${data.results.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  // =====================================================
  // SCROLL TRIGGERED NEON BORDER - CORRECTLY PLACED
  // =====================================================

  const sections = document.querySelectorAll('.section');

  function checkSections() {
      sections.forEach(sec => {
          const rect = sec.getBoundingClientRect();
          if (rect.top < window.innerHeight - 120) {
              sec.classList.add('in-view');
          }
      });
  }

  window.addEventListener('scroll', checkSections);
  checkSections();

}); // CORRECTLY CLOSES the DOMContentLoaded function