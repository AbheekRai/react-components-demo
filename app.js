// Sample data from the provided JSON
const sampleData = {
  users: [
    {"id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin", "status": "Active"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "User", "status": "Active"},
    {"id": 3, "name": "Bob Johnson", "email": "bob@example.com", "role": "Moderator", "status": "Inactive"},
    {"id": 4, "name": "Alice Brown", "email": "alice@example.com", "role": "User", "status": "Active"},
    {"id": 5, "name": "Charlie Wilson", "email": "charlie@example.com", "role": "Admin", "status": "Pending"}
  ],
  products: [
    {"id": 1, "name": "Wireless Headphones", "category": "Electronics", "price": 199.99, "stock": 45},
    {"id": 2, "name": "Coffee Maker", "category": "Appliances", "price": 89.99, "stock": 23},
    {"id": 3, "name": "Running Shoes", "category": "Sports", "price": 129.99, "stock": 67},
    {"id": 4, "name": "Desk Lamp", "category": "Office", "price": 39.99, "stock": 12},
    {"id": 5, "name": "Bluetooth Speaker", "category": "Electronics", "price": 79.99, "stock": 88}
  ],
  orders: [
    {"id": "ORD-001", "customer": "John Doe", "date": "2024-01-15", "amount": 299.99, "status": "Delivered"},
    {"id": "ORD-002", "customer": "Jane Smith", "date": "2024-01-16", "amount": 159.99, "status": "Processing"},
    {"id": "ORD-003", "customer": "Bob Johnson", "date": "2024-01-17", "amount": 89.99, "status": "Shipped"},
    {"id": "ORD-004", "customer": "Alice Brown", "date": "2024-01-18", "amount": 199.99, "status": "Pending"},
    {"id": "ORD-005", "customer": "Charlie Wilson", "date": "2024-01-19", "amount": 349.99, "status": "Delivered"}
  ]
};

// Application state
let currentTheme = 'light';
let currentPage = 'overview';
let currentTableDemo = 'users';
let tableSort = {};
let selectedRows = {
  users: new Set(),
  products: new Set(),
  orders: new Set()
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeInputFieldPlayground();
  initializeDataTables();
  
  // Show the overview page by default
  showPage('overview');
});

// Theme Management
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  currentTheme = prefersDark ? 'dark' : 'light';
  updateTheme();
  
  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  updateTheme();
}

function updateTheme() {
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('.theme-toggle__icon');
  icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Navigation Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const page = e.target.getAttribute('data-page');
      showPage(page);
    });
  });
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Show selected page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    currentPage = pageId;
  }
  
  // Update navigation active state
  document.querySelectorAll('.nav-menu__link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`[data-page="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Initialize page-specific functionality
  if (pageId === 'datatable') {
    showTableDemo(currentTableDemo);
  }
}

// InputField Playground
function initializeInputFieldPlayground() {
  const variantSelect = document.getElementById('variantSelect');
  const sizeSelect = document.getElementById('sizeSelect');
  const typeSelect = document.getElementById('typeSelect');
  const disabledCheck = document.getElementById('disabledCheck');
  const invalidCheck = document.getElementById('invalidCheck');
  const loadingCheck = document.getElementById('loadingCheck');
  const clearButtonCheck = document.getElementById('clearButtonCheck');
  
  if (!variantSelect) return;
  
  const controls = [
    variantSelect, sizeSelect, typeSelect, 
    disabledCheck, invalidCheck, loadingCheck, clearButtonCheck
  ];
  
  controls.forEach(control => {
    if (control) {
      control.addEventListener('change', updatePlaygroundInput);
    }
  });
  
  // Initialize clear button functionality
  const playgroundInput = document.getElementById('playgroundInput');
  if (playgroundInput) {
    const clearButton = playgroundInput.querySelector('.input-field__clear');
    const input = playgroundInput.querySelector('.input-field__input');
    
    if (clearButton && input) {
      clearButton.addEventListener('click', () => {
        input.value = '';
        input.focus();
        updateClearButtonVisibility();
      });
      
      input.addEventListener('input', updateClearButtonVisibility);
    }
  }
  
  // Initial update
  updatePlaygroundInput();
}

function updatePlaygroundInput() {
  const playgroundInput = document.getElementById('playgroundInput');
  if (!playgroundInput) return;
  
  const variantSelect = document.getElementById('variantSelect');
  const sizeSelect = document.getElementById('sizeSelect');
  const typeSelect = document.getElementById('typeSelect');
  const disabledCheck = document.getElementById('disabledCheck');
  const invalidCheck = document.getElementById('invalidCheck');
  const loadingCheck = document.getElementById('loadingCheck');
  const clearButtonCheck = document.getElementById('clearButtonCheck');
  
  const input = playgroundInput.querySelector('.input-field__input');
  const clearButton = playgroundInput.querySelector('.input-field__clear');
  const loading = playgroundInput.querySelector('.input-field__loading');
  const error = playgroundInput.querySelector('.input-field__error');
  
  // Reset classes
  playgroundInput.className = 'input-field';
  
  // Apply variant
  const variant = variantSelect?.value || 'outlined';
  playgroundInput.classList.add(`input-field--${variant}`);
  
  // Apply size
  const size = sizeSelect?.value || 'md';
  playgroundInput.classList.add(`input-field--${size}`);
  
  // Apply states
  if (disabledCheck?.checked) {
    playgroundInput.classList.add('input-field--disabled');
    input.disabled = true;
  } else {
    input.disabled = false;
  }
  
  if (invalidCheck?.checked) {
    playgroundInput.classList.add('input-field--invalid');
    error.classList.remove('hidden');
  } else {
    error.classList.add('hidden');
  }
  
  if (loadingCheck?.checked) {
    playgroundInput.classList.add('input-field--loading');
    loading.classList.remove('hidden');
  } else {
    loading.classList.add('hidden');
  }
  
  // Apply type
  const type = typeSelect?.value || 'text';
  input.type = type;
  
  // Show/hide clear button
  if (clearButtonCheck?.checked) {
    updateClearButtonVisibility();
  } else {
    clearButton.classList.add('hidden');
  }
}

function updateClearButtonVisibility() {
  const playgroundInput = document.getElementById('playgroundInput');
  const clearButtonCheck = document.getElementById('clearButtonCheck');
  
  if (!playgroundInput || !clearButtonCheck?.checked) return;
  
  const input = playgroundInput.querySelector('.input-field__input');
  const clearButton = playgroundInput.querySelector('.input-field__clear');
  
  if (input.value.length > 0) {
    clearButton.classList.remove('hidden');
  } else {
    clearButton.classList.add('hidden');
  }
}

// DataTable Management
function initializeDataTables() {
  // Initialize all table demos
  renderTable('users', sampleData.users);
  renderTable('products', sampleData.products);
  renderTable('orders', sampleData.orders);
  
  // Add event listeners for sorting
  document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', handleSort);
  });
  
  // Add event listeners for row selection
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.classList.contains('select-all-checkbox')) {
      checkbox.addEventListener('change', handleSelectAll);
    } else if (checkbox.closest('.data-table')) {
      checkbox.addEventListener('change', handleRowSelection);
    }
  });
}

function showTableDemo(demoType) {
  // Hide all table demos
  document.querySelectorAll('.table-demo').forEach(demo => {
    demo.classList.add('hidden');
  });
  
  // Show selected demo
  const targetDemo = document.getElementById(`${demoType}-demo`);
  if (targetDemo) {
    targetDemo.classList.remove('hidden');
    currentTableDemo = demoType;
  }
  
  // Update tab active state
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  const activeTab = document.querySelector(`[data-demo="${demoType}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

function renderTable(tableType, data) {
  const tableBody = document.getElementById(`${tableType}TableBody`);
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = generateTableRow(tableType, item, index);
    tableBody.appendChild(row);
  });
  
  // Add event listeners to new checkboxes
  tableBody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleRowSelection);
  });
  
  updateSelectedCount(tableType);
}

function generateTableRow(tableType, item, index) {
  const isSelected = selectedRows[tableType].has(item.id);
  const checkboxId = `${tableType}-row-${index}`;
  
  switch (tableType) {
    case 'users':
      return `
        <td class="data-table__checkbox">
          <input type="checkbox" id="${checkboxId}" data-table="${tableType}" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
        </td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.role}</td>
        <td><span class="status ${getStatusClass(item.status)}">${item.status}</span></td>
      `;
    case 'products':
      return `
        <td class="data-table__checkbox">
          <input type="checkbox" id="${checkboxId}" data-table="${tableType}" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
        </td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.stock}</td>
      `;
    case 'orders':
      return `
        <td class="data-table__checkbox">
          <input type="checkbox" id="${checkboxId}" data-table="${tableType}" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
        </td>
        <td>${item.id}</td>
        <td>${item.customer}</td>
        <td>${item.date}</td>
        <td>$${item.amount.toFixed(2)}</td>
        <td><span class="status ${getStatusClass(item.status)}">${item.status}</span></td>
      `;
    default:
      return '';
  }
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'active':
    case 'delivered':
      return 'status--success';
    case 'pending':
    case 'processing':
      return 'status--warning';
    case 'inactive':
      return 'status--error';
    case 'shipped':
      return 'status--info';
    default:
      return 'status--info';
  }
}

function handleSort(event) {
  const header = event.currentTarget;
  const column = header.getAttribute('data-column');
  const table = header.closest('table');
  const tableId = table.id;
  const tableType = tableId.replace('Table', '');
  
  if (!column || !sampleData[tableType]) return;
  
  // Determine sort direction
  let direction = 'asc';
  if (tableSort[tableType] && tableSort[tableType].column === column) {
    direction = tableSort[tableType].direction === 'asc' ? 'desc' : 'asc';
  }
  
  tableSort[tableType] = { column, direction };
  
  // Update header classes
  table.querySelectorAll('.sortable').forEach(h => {
    h.classList.remove('asc', 'desc');
  });
  header.classList.add(direction);
  
  // Sort data
  const sortedData = [...sampleData[tableType]].sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];
    
    // Handle numeric values
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    // Handle string values
    aVal = String(aVal).toLowerCase();
    bVal = String(bVal).toLowerCase();
    
    if (direction === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
  
  renderTable(tableType, sortedData);
}

function handleSelectAll(event) {
  const checkbox = event.target;
  const table = checkbox.closest('table');
  const tableId = table.id;
  const tableType = tableId.replace('Table', '');
  
  const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
  
  if (checkbox.checked) {
    // Select all rows
    sampleData[tableType].forEach(item => {
      selectedRows[tableType].add(item.id);
    });
    rowCheckboxes.forEach(cb => cb.checked = true);
  } else {
    // Deselect all rows
    selectedRows[tableType].clear();
    rowCheckboxes.forEach(cb => cb.checked = false);
  }
  
  updateSelectedCount(tableType);
  updateSelectAllState(tableType);
}

function handleRowSelection(event) {
  const checkbox = event.target;
  const tableType = checkbox.getAttribute('data-table');
  const itemId = checkbox.getAttribute('data-id');
  
  if (!tableType || !itemId) return;
  
  if (checkbox.checked) {
    selectedRows[tableType].add(itemId);
  } else {
    selectedRows[tableType].delete(itemId);
  }
  
  updateSelectedCount(tableType);
  updateSelectAllState(tableType);
}

function updateSelectedCount(tableType) {
  const countElement = document.getElementById(`${tableType}SelectedCount`);
  if (countElement) {
    const count = selectedRows[tableType].size;
    countElement.textContent = `${count} selected`;
  }
}

function updateSelectAllState(tableType) {
  const selectAllCheckbox = document.querySelector(`#${tableType}Table .select-all-checkbox`);
  if (!selectAllCheckbox) return;
  
  const totalRows = sampleData[tableType].length;
  const selectedCount = selectedRows[tableType].size;
  
  if (selectedCount === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (selectedCount === totalRows) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
}

// Global functions for HTML onclick handlers
window.showPage = showPage;
window.showTableDemo = showTableDemo;

// Accessibility enhancements
document.addEventListener('keydown', function(event) {
  // Handle Enter key on clickable elements
  if (event.key === 'Enter') {
    const target = event.target;
    
    if (target.classList.contains('nav-menu__link') || 
        target.classList.contains('demo-tab') ||
        target.classList.contains('sortable')) {
      target.click();
      event.preventDefault();
    }
  }
  
  // Handle Escape key to close/reset states
  if (event.key === 'Escape') {
    // Could be used to close modals or reset focus
    const activeElement = document.activeElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  }
});

// Handle window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    // Recalculate any layout-dependent features
    // This could include table column widths, etc.
  }, 250);
});

// Performance optimization: Debounce input events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling
window.addEventListener('error', function(event) {
  console.error('Application error:', event.error);
  // In a real application, you might want to show a user-friendly error message
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Initial setup complete
console.log('React Component Library Demo initialized successfully');