
document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const addItemBtn = document.getElementById('add-item-btn');
    const pdfBtn = document.getElementById('pdf-btn');

    // 1. AUTOMATIC LIVE CALCULATION ENGINE
    function calculateInvoice() {
        let subtotal = 0;
        const rows = itemsContainer.querySelectorAll('.item-row');

        rows.forEach(row => {
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const qty = parseInt(row.querySelector('.item-qty').value) || 0;
            subtotal += price * qty;
        });

        const taxRate = 0.18; // 18% GST calculation
        const taxAmount = subtotal * taxRate;
        const grandTotal = subtotal + taxAmount;

        // Formatted to the standard Indian Currency Numbering System (en-IN)
        document.getElementById('display-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('display-tax').textContent = `₹${taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('display-total').textContent = `₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // 2. DYNAMIC ROW INSERTION ENGINE
    addItemBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.className = 'item-row';
        newRow.innerHTML = `
            <div class="input-group main-desc">
                <input type="text" class="item-desc" placeholder="e.g., SEO Optimization">
            </div>
            <div class="input-group small">
                <input type="number" class="item-price" placeholder="0.00" min="0" step="0.01">
            </div>
            <div class="input-group small">
                <input type="number" class="item-qty" placeholder="1" value="1" min="1">
            </div>
            <div class="action-cell">
                <button class="delete-row-btn pdf-hide" title="Remove Item"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        itemsContainer.appendChild(newRow);
        calculateInvoice();
    });

    // 3. ROW DELETION ENGINE
    itemsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.delete-row-btn')) {
            const rows = itemsContainer.querySelectorAll('.item-row');
            if (rows.length > 1) {
                e.target.closest('.item-row').remove();
                calculateInvoice();
            } else {
                alert("An invoice must contain at least one line item.");
            }
        }
    });

    // Auto-calculate on input changes
    itemsContainer.addEventListener('input', calculateInvoice);

    // 4. BULLETPROOF NATIVE SYSTEM PRINT TRIGGER
    pdfBtn.addEventListener('click', () => {
        window.print();
    });
});

