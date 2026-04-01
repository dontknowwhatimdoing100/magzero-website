/* ═══════════════════════════════════════════════
   Parts Catalog — Search, Filter, Auth, Cart
═══════════════════════════════════════════════ */

// ── State ──
let currentUser = JSON.parse(localStorage.getItem('mz_user') || 'null');
let quoteCart = JSON.parse(localStorage.getItem('mz_cart') || '[]');
let sortCol = 'partNo';
let sortDir = 'asc';

// ── Auth System ──
function initAuth() {
  renderAuthBar();
}

function renderAuthBar() {
  const bar = document.getElementById('authBar');
  if (!bar) return;
  if (currentUser) {
    const initials = (currentUser.first[0] + currentUser.last[0]).toUpperCase();
    bar.innerHTML = `
      <div class="auth-user-badge">
        <span class="user-avatar">${initials}</span>
        ${currentUser.first} ${currentUser.last}
      </div>
      <button class="btn-sm btn-auth-logout" onclick="logout()">Sign Out</button>
      <button class="cart-toggle" onclick="toggleCart()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Quote <span class="cart-count" id="cartCount">${quoteCart.length}</span>
      </button>`;
  } else {
    bar.innerHTML = `
      <button class="btn-sm btn-auth-login" onclick="showModal('login')">Sign In</button>
      <button class="btn-sm btn-auth-signup" onclick="showModal('signup')">Create Account</button>
      <button class="cart-toggle" onclick="toggleCart()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Quote <span class="cart-count" id="cartCount">${quoteCart.length}</span>
      </button>`;
  }
}

function showModal(type) {
  const overlay = document.getElementById('authModal');
  const content = document.getElementById('authModalContent');
  overlay.classList.add('active');

  if (type === 'signup') {
    content.innerHTML = `
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h2>Create Account</h2>
      <p class="modal-sub">Sign up to request parts quotes and track orders.</p>
      <form onsubmit="handleSignup(event)">
        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" id="signupFirst" placeholder="John" required>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" id="signupLast" placeholder="Smith" required>
          </div>
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" id="signupCompany" placeholder="ACME Mechanical">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="signupEmail" placeholder="john@company.com" required>
          <div class="form-error" id="signupEmailError">This email is already registered.</div>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" id="signupPhone" placeholder="(555) 123-4567">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="signupPass" placeholder="Min 6 characters" minlength="6" required>
        </div>
        <button type="submit" class="btn-modal-submit">Create Account</button>
      </form>
      <div class="modal-switch">Already have an account? <a onclick="showModal('login')">Sign in</a></div>`;
  } else {
    content.innerHTML = `
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h2>Sign In</h2>
      <p class="modal-sub">Access your quote history and saved parts lists.</p>
      <form onsubmit="handleLogin(event)">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="loginEmail" placeholder="john@company.com" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="loginPass" placeholder="Your password" required>
          <div class="form-error" id="loginError">Invalid email or password.</div>
        </div>
        <button type="submit" class="btn-modal-submit">Sign In</button>
      </form>
      <div class="modal-switch">Don't have an account? <a onclick="showModal('signup')">Create one</a></div>`;
  }
}

function closeModal() {
  document.getElementById('authModal').classList.remove('active');
}

function handleSignup(e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('mz_users') || '[]');
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();

  if (users.find(u => u.email === email)) {
    const err = document.getElementById('signupEmailError');
    err.style.display = 'block';
    return;
  }

  const user = {
    first: document.getElementById('signupFirst').value.trim(),
    last: document.getElementById('signupLast').value.trim(),
    company: document.getElementById('signupCompany').value.trim(),
    email: email,
    phone: document.getElementById('signupPhone').value.trim(),
    pass: document.getElementById('signupPass').value,
    created: new Date().toISOString()
  };

  users.push(user);
  localStorage.setItem('mz_users', JSON.stringify(users));
  currentUser = user;
  localStorage.setItem('mz_user', JSON.stringify(user));
  closeModal();
  renderAuthBar();
  renderTable();
}

function handleLogin(e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('mz_users') || '[]');
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    document.getElementById('loginError').style.display = 'block';
    return;
  }

  currentUser = user;
  localStorage.setItem('mz_user', JSON.stringify(user));
  closeModal();
  renderAuthBar();
  renderTable();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('mz_user');
  renderAuthBar();
  renderTable();
}

// ── Cart System ──
function addToCart(partId) {
  const part = PARTS_CATALOG.find(p => p.id === partId);
  if (!part) return;

  if (!currentUser) {
    showModal('login');
    return;
  }

  const existing = quoteCart.find(c => c.id === partId);
  if (existing) {
    existing.qty++;
  } else {
    quoteCart.push({ id: partId, partNo: part.partNo, desc: part.desc, qty: 1 });
  }
  saveCart();
  renderAuthBar();
  renderTable();
}

function removeFromCart(partId) {
  quoteCart = quoteCart.filter(c => c.id !== partId);
  saveCart();
  renderAuthBar();
  renderCart();
  renderTable();
}

function updateQty(partId, delta) {
  const item = quoteCart.find(c => c.id === partId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('mz_cart', JSON.stringify(quoteCart));
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = quoteCart.length;
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('open');
  if (drawer.classList.contains('open')) renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const success = document.getElementById('quoteSuccess');

  success.classList.remove('show');

  if (quoteCart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p>Your quote cart is empty.<br>Add parts from the catalog.</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  container.innerHTML = quoteCart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-pn">${item.partNo}</div>
        <div class="cart-item-desc">${item.desc}</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateQty('${item.id}', -1)">&minus;</button>
        <span>${item.qty}</span>
        <button onclick="updateQty('${item.id}', 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">&times;</button>
    </div>
  `).join('');
}

function submitQuote() {
  if (quoteCart.length === 0) return;
  if (!currentUser) { showModal('login'); return; }

  const notes = document.getElementById('quoteNotes')?.value || '';
  const quote = {
    user: currentUser,
    items: quoteCart,
    notes: notes,
    submitted: new Date().toISOString()
  };

  // Save to localStorage history
  const history = JSON.parse(localStorage.getItem('mz_quotes') || '[]');
  history.push(quote);
  localStorage.setItem('mz_quotes', JSON.stringify(history));

  // Clear cart
  quoteCart = [];
  saveCart();
  renderAuthBar();
  renderTable();

  // Show success
  document.getElementById('cartItems').innerHTML = '';
  document.getElementById('cartFooter').style.display = 'none';
  document.getElementById('quoteSuccess').classList.add('show');
}

// ── Table Rendering ──
function getFilteredParts() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const catFilter = document.getElementById('categoryFilter')?.value || '';
  const modelFilter = document.getElementById('modelFilter')?.value || '';

  let parts = PARTS_CATALOG;

  if (query) {
    parts = parts.filter(p =>
      p.partNo.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  if (catFilter) {
    parts = parts.filter(p => p.category === catFilter);
  }

  if (modelFilter) {
    parts = parts.filter(p => p.models.some(m => m.startsWith(modelFilter) || m === modelFilter));
  }

  // Sort
  parts = [...parts].sort((a, b) => {
    let va = a[sortCol] || '';
    let vb = b[sortCol] || '';
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return parts;
}

function renderTable() {
  const tbody = document.getElementById('partsBody');
  const countEl = document.getElementById('resultCount');
  if (!tbody) return;

  const parts = getFilteredParts();
  countEl.textContent = `${parts.length} part${parts.length !== 1 ? 's' : ''}`;

  if (parts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="no-results">No parts found matching your search. Try a different part number or filter.</td></tr>`;
    return;
  }

  const cartIds = new Set(quoteCart.map(c => c.id));

  tbody.innerHTML = parts.map(p => {
    const inCart = cartIds.has(p.id);
    const modelTags = p.models.map(m => {
      const fam = m.replace(/\d+/,'').toLowerCase();
      return `<span class="model-tag ${fam}">${m}</span>`;
    }).join('');

    return `<tr>
      <td class="part-number">${p.partNo}</td>
      <td class="part-desc">${p.desc}</td>
      <td><span class="part-category-badge">${p.category}</span></td>
      <td><div class="model-tags">${modelTags}</div></td>
      <td>${p.rev || '-'}</td>
      <td><button class="btn-add-quote ${inCart ? 'added' : ''}" onclick="addToCart('${p.id}')">${inCart ? '&#10003; Added' : '+ Quote'}</button></td>
    </tr>`;
  }).join('');
}

function sortTable(col) {
  if (sortCol === col) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortCol = col;
    sortDir = 'asc';
  }
  // Update header arrows
  document.querySelectorAll('.parts-table th').forEach(th => {
    th.classList.remove('sort-active');
    const arrow = th.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = '';
  });
  const activeHeader = document.querySelector(`.parts-table th[data-col="${col}"]`);
  if (activeHeader) {
    activeHeader.classList.add('sort-active');
    const arrow = activeHeader.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = sortDir === 'asc' ? '\u25B2' : '\u25BC';
  }
  renderTable();
}

// ── Populate Filters ──
function initFilters() {
  const catSelect = document.getElementById('categoryFilter');
  const modelSelect = document.getElementById('modelFilter');

  if (catSelect) {
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });
  }

  if (modelSelect) {
    // Add family groups then individual models
    MODEL_FAMILIES.forEach(fam => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = fam + ' Series';
      ALL_MODELS.filter(m => m.startsWith(fam)).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        optgroup.appendChild(opt);
      });
      modelSelect.appendChild(optgroup);
    });
  }
}

// ── Event Listeners ──
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initFilters();
  renderTable();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(renderTable, 150);
    });
  }

  document.getElementById('categoryFilter')?.addEventListener('change', renderTable);
  document.getElementById('modelFilter')?.addEventListener('change', renderTable);

  // Close modal on overlay click
  document.getElementById('authModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Close cart on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.getElementById('cartDrawer')?.classList.remove('open');
    }
  });
});
