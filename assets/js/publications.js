/**
 * Publications Module for Dr. Khairy Sayed's Academic Website
 * Renders verified publications from data/publications.json with search, filtering, and DOI links.
 */

let allPublications = [];
let filteredPublications = [];
let displayedCount = 8; // Initial count for homepage preview
const incrementCount = 10;

async function initPublications() {
  const container = document.getElementById('publications-list');
  const countDisplay = document.getElementById('publications-count');
  const searchInput = document.getElementById('pub-search-input');
  const typeFilter = document.getElementById('pub-type-filter');
  const yearFilter = document.getElementById('pub-year-filter');
  const loadMoreBtn = document.getElementById('pub-load-more-btn');

  if (!container) return;

  try {
    const res = await fetch('data/publications.json');
    if (!res.ok) throw new Error('Could not load publications');
    allPublications = await res.json();
    filteredPublications = [...allPublications];

    // Populate Year dropdown dynamically
    if (yearFilter) {
      const years = Array.from(new Set(allPublications.map(p => p.year).filter(Boolean))).sort().reverse();
      years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearFilter.appendChild(opt);
      });
    }

    renderPublications();

    // Event listeners
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        displayedCount = 8;
        applyFilters();
      });
    }

    if (typeFilter) {
      typeFilter.addEventListener('change', () => {
        displayedCount = 8;
        applyFilters();
      });
    }

    if (yearFilter) {
      yearFilter.addEventListener('change', () => {
        displayedCount = 8;
        applyFilters();
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        displayedCount += incrementCount;
        renderPublications();
      });
    }

  } catch (err) {
    console.error('Error fetching publications:', err);
    container.innerHTML = `
      <div class="p-6 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <p>Could not load publications data. Please ensure <code class="text-xs bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">data/publications.json</code> is accessible.</p>
      </div>
    `;
  }
}

function applyFilters() {
  const searchInput = document.getElementById('pub-search-input');
  const typeFilter = document.getElementById('pub-type-filter');
  const yearFilter = document.getElementById('pub-year-filter');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedType = typeFilter ? typeFilter.value : 'all';
  const selectedYear = yearFilter ? yearFilter.value : 'all';

  filteredPublications = allPublications.filter(pub => {
    const matchesSearch = !query || 
      pub.title.toLowerCase().includes(query) || 
      (pub.journal && pub.journal.toLowerCase().includes(query)) ||
      (pub.doi && pub.doi.toLowerCase().includes(query));

    const matchesType = selectedType === 'all' || pub.type === selectedType;
    const matchesYear = selectedYear === 'all' || pub.year === selectedYear;

    return matchesSearch && matchesType && matchesYear;
  });

  renderPublications();
}

function renderPublications() {
  const container = document.getElementById('publications-list');
  const countDisplay = document.getElementById('publications-count');
  const loadMoreBtn = document.getElementById('pub-load-more-btn');

  if (!container) return;

  if (countDisplay) {
    countDisplay.textContent = `Showing ${Math.min(displayedCount, filteredPublications.length)} of ${filteredPublications.length} publications (Total: ${allPublications.length})`;
  }

  if (filteredPublications.length === 0) {
    container.innerHTML = `
      <div class="p-10 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <svg class="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-medium">No publications found matching your criteria.</p>
        <p class="text-xs text-slate-400 mt-1">Try clearing your search query or selecting a different filter.</p>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }

  const toDisplay = filteredPublications.slice(0, displayedCount);

  container.innerHTML = toDisplay.map((pub, idx) => {
    const isJournal = pub.type === 'journal-article';
    const badgeColor = isJournal 
      ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50'
      : (pub.type === 'conference-paper' 
        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
        : 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50');

    const doiSection = pub.doi ? `
      <div class="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a href="${pub.doiUrl}" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors bg-cyan-50 dark:bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-200 dark:border-cyan-800/40">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>DOI: ${pub.doi}</span>
        </a>
        <button onclick="copyToClipboard('${pub.doi}', this)" class="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Copy DOI">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </button>
      </div>
    ` : '';

    return `
      <article class="p-5 md:p-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-200">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}">
              ${pub.typeDisplay}
            </span>
            ${pub.year ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300">${pub.year}</span>` : ''}
          </div>
          <span class="text-xs text-slate-400 font-mono">#${pub.id}</span>
        </div>
        
        <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          ${pub.doiUrl ? `<a href="${pub.doiUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">${pub.title}</a>` : pub.title}
        </h3>

        ${pub.journal ? `<p class="mt-2 text-sm text-slate-600 dark:text-slate-300 font-medium italic">${pub.journal}</p>` : ''}
        
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Authors: <span class="font-medium text-slate-700 dark:text-slate-300">${pub.authors}</span>
        </p>

        ${doiSection}
      </article>
    `;
  }).join('');

  if (loadMoreBtn) {
    if (displayedCount >= filteredPublications.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }
}

function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = `
      <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-emerald-500 font-medium">Copied!</span>
    `;
    setTimeout(() => {
      btnElement.innerHTML = originalText;
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', initPublications);
