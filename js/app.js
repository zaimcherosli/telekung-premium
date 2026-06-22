/* ==========================================================================
   premium logic script - telekung premium sales page
   handles: state configuration, swatches, price calculation, timer, toyyibpay
   ========================================================================== */

// 1. DATA CONFIGURATION (15 Colors per Design)
const designsData = {
    "design-a": {
        name: "Design A: Eksklusif Lace",
        baseImage: "images/design-a/putih.png",
        colors: [
            { name: "Putih", hex: "#FFFFFF", image: "images/design-a/putih.png", filter: "" },
            { name: "Hitam", hex: "#1A1A1A", filter: "brightness(0.15) contrast(1.1)" },
            { name: "Navy", hex: "#1A2535", filter: "brightness(0.2) sepia(0.2) hue-rotate(200deg) saturate(2)" },
            { name: "Dusty Pink", hex: "#D4A5A5", filter: "sepia(0.4) hue-rotate(320deg) saturate(1.1) brightness(0.95)" },
            { name: "Olive", hex: "#707D65", filter: "sepia(0.4) hue-rotate(60deg) saturate(0.8) brightness(0.85)" },
            { name: "Maroon", hex: "#5E1914", filter: "sepia(0.5) hue-rotate(335deg) saturate(1.8) brightness(0.6)" },
            { name: "Kelabu (Grey)", hex: "#8A9597", filter: "grayscale(1) brightness(0.85)" },
            { name: "Lavender", hex: "#B1A7D1", filter: "sepia(0.3) hue-rotate(230deg) saturate(0.8) brightness(0.95)" },
            { name: "Emerald Green", hex: "#0F5241", filter: "sepia(0.5) hue-rotate(110deg) saturate(1.5) brightness(0.55)" },
            { name: "Mustard Gold", hex: "#DDA15E", filter: "sepia(0.5) hue-rotate(10deg) saturate(1.2) brightness(0.9)" },
            { name: "Royal Blue", hex: "#00539C", filter: "sepia(0.3) hue-rotate(190deg) saturate(1.8) brightness(0.7)" },
            { name: "Lilac", hex: "#D6C7E2", filter: "sepia(0.2) hue-rotate(250deg) saturate(0.7) brightness(1.05)" },
            { name: "Soft Mint", hex: "#B8E0D2", filter: "sepia(0.2) hue-rotate(90deg) saturate(0.6) brightness(1.1)" },
            { name: "Peach Cream", hex: "#F3C5B5", filter: "sepia(0.3) hue-rotate(350deg) saturate(0.9) brightness(1.05)" },
            { name: "Beige", hex: "#E9D8A6", filter: "sepia(0.4) hue-rotate(15deg) saturate(0.7) brightness(1.05)" }
        ]
    },
    "design-b": {
        name: "Design B: Sutera Renda Emas",
        baseImage: "images/design-b/dusty-pink.png",
        colors: [
            { name: "Dusty Pink", hex: "#D4A5A5", image: "images/design-b/dusty-pink.png", filter: "" },
            { name: "Putih", hex: "#FFFFFF", filter: "brightness(1.3) grayscale(1) contrast(0.9)" },
            { name: "Hitam", hex: "#1A1A1A", filter: "brightness(0.15) contrast(1.1)" },
            { name: "Navy", hex: "#1A2535", filter: "brightness(0.2) sepia(0.2) hue-rotate(200deg) saturate(2)" },
            { name: "Olive", hex: "#707D65", filter: "sepia(0.4) hue-rotate(60deg) saturate(0.8) brightness(0.85)" },
            { name: "Maroon", hex: "#5E1914", filter: "sepia(0.5) hue-rotate(335deg) saturate(1.8) brightness(0.6)" },
            { name: "Kelabu (Grey)", hex: "#8A9597", filter: "grayscale(1) brightness(0.85)" },
            { name: "Lavender", hex: "#B1A7D1", filter: "sepia(0.3) hue-rotate(230deg) saturate(0.8) brightness(0.95)" },
            { name: "Emerald Green", hex: "#0F5241", filter: "sepia(0.5) hue-rotate(110deg) saturate(1.5) brightness(0.55)" },
            { name: "Mustard Gold", hex: "#DDA15E", filter: "sepia(0.5) hue-rotate(10deg) saturate(1.2) brightness(0.9)" },
            { name: "Royal Blue", hex: "#00539C", filter: "sepia(0.3) hue-rotate(190deg) saturate(1.8) brightness(0.7)" },
            { name: "Lilac", hex: "#D6C7E2", filter: "sepia(0.2) hue-rotate(250deg) saturate(0.7) brightness(1.05)" },
            { name: "Soft Mint", hex: "#B8E0D2", filter: "sepia(0.2) hue-rotate(90deg) saturate(0.6) brightness(1.1)" },
            { name: "Peach Cream", hex: "#F3C5B5", filter: "sepia(0.3) hue-rotate(350deg) saturate(0.9) brightness(1.05)" },
            { name: "Beige", hex: "#E9D8A6", filter: "sepia(0.4) hue-rotate(15deg) saturate(0.7) brightness(1.05)" }
        ]
    },
    "design-c": {
        name: "Design C: Minimalis Premium",
        baseImage: "images/design-c/cream.png",
        colors: [
            { name: "Cream", hex: "#F5F0E6", image: "images/design-c/cream.png", filter: "" },
            { name: "Putih", hex: "#FFFFFF", filter: "brightness(1.1) saturate(0.2)" },
            { name: "Hitam", hex: "#1A1A1A", filter: "brightness(0.15) contrast(1.1)" },
            { name: "Navy", hex: "#1A2535", filter: "brightness(0.2) sepia(0.2) hue-rotate(200deg) saturate(2)" },
            { name: "Dusty Pink", hex: "#D4A5A5", filter: "sepia(0.4) hue-rotate(320deg) saturate(1.1) brightness(0.95)" },
            { name: "Olive", hex: "#707D65", filter: "sepia(0.4) hue-rotate(60deg) saturate(0.8) brightness(0.85)" },
            { name: "Maroon", hex: "#5E1914", filter: "sepia(0.5) hue-rotate(335deg) saturate(1.8) brightness(0.6)" },
            { name: "Kelabu (Grey)", hex: "#8A9597", filter: "grayscale(1) brightness(0.85)" },
            { name: "Lavender", hex: "#B1A7D1", filter: "sepia(0.3) hue-rotate(230deg) saturate(0.8) brightness(0.95)" },
            { name: "Emerald Green", hex: "#0F5241", filter: "sepia(0.5) hue-rotate(110deg) saturate(1.5) brightness(0.55)" },
            { name: "Mustard Gold", hex: "#DDA15E", filter: "sepia(0.5) hue-rotate(10deg) saturate(1.2) brightness(0.9)" },
            { name: "Royal Blue", hex: "#00539C", filter: "sepia(0.3) hue-rotate(190deg) saturate(1.8) brightness(0.7)" },
            { name: "Lilac", hex: "#D6C7E2", filter: "sepia(0.2) hue-rotate(250deg) saturate(0.7) brightness(1.05)" },
            { name: "Soft Mint", hex: "#B8E0D2", filter: "sepia(0.2) hue-rotate(90deg) saturate(0.6) brightness(1.1)" },
            { name: "Peach Cream", hex: "#F3C5B5", filter: "sepia(0.3) hue-rotate(350deg) saturate(0.9) brightness(1.05)" }
        ]
    }
};

// 2. CONFIGURATOR STATE
let currentDesign = "design-a";
let currentColorName = "Putih";
let currentQuantity = 1;

const UNIT_PRICE = 89;

// 3. SELECTION LOGIC
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    // Render initial swatches
    renderSwatches(currentDesign);
    updateCalculations();

    // Design selectors
    const designCards = document.querySelectorAll(".design-card");
    designCards.forEach(card => {
        card.addEventListener("click", () => {
            designCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            
            const designId = card.getAttribute("data-design");
            const designTitle = card.getAttribute("data-design-title");
            
            currentDesign = designId;
            document.getElementById("gallery-design-name").innerText = designTitle;
            document.getElementById("summary-design-title").innerText = designTitle;

            // Render new swatches for this design
            renderSwatches(designId);
            updateCalculations();
        });
    });

    // Quantity selectors
    const qtyMinus = document.getElementById("qty-minus");
    const qtyPlus = document.getElementById("qty-plus");
    const selectionQty = document.getElementById("selection-qty");

    qtyMinus.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            selectionQty.value = currentQuantity;
            updateCalculations();
        }
    });

    qtyPlus.addEventListener("click", () => {
        if (currentQuantity < 10) {
            currentQuantity++;
            selectionQty.value = currentQuantity;
            updateCalculations();
        }
    });

    // Courier selectors change listener
    const couriers = document.getElementsByName("courier");
    couriers.forEach(courier => {
        courier.addEventListener("change", () => {
            // Update active state class on parent label
            document.querySelectorAll(".courier-card").forEach(c => c.classList.remove("active"));
            courier.closest(".courier-card").classList.add("active");
            updateCalculations();
        });
    });

    // Auto update courier based on state selection
    const stateSelector = document.getElementById("cust-state");
    stateSelector.addEventListener("change", () => {
        const selectedState = stateSelector.value;
        const semSettle = ["Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Pulau Pinang", "Perak", "Perlis", "Selangor", "Terengganu", "Wilayah Persekutuan Kuala Lumpur", "Wilayah Persekutuan Putrajaya"];
        
        if (selectedState === "Sabah") {
            document.querySelector('input[name="courier"][value="sabah"]').checked = true;
            triggerCourierChange("sabah");
        } else if (selectedState === "Sarawak" || selectedState === "Wilayah Persekutuan Labuan") {
            document.querySelector('input[name="courier"][value="sarawak"]').checked = true;
            triggerCourierChange("sarawak");
        } else {
            document.querySelector('input[name="courier"][value="semenanjung"]').checked = true;
            triggerCourierChange("semenanjung");
        }
        updateCalculations();
    });

    // Setup Modals
    setupModals();

    // Start promo countdown timer
    startCountdown();

    // Mobile sticky CTA display controller
    setupStickyCTA();

    // Setup checkout action button
    document.getElementById("btn-submit-payment").addEventListener("click", createBill);
}

function triggerCourierChange(value) {
    document.querySelectorAll(".courier-card").forEach(c => c.classList.remove("active"));
    document.getElementById(`label-${value}`).classList.add("active");
}

// 4. RENDERING COLOR SWATCHES
function renderSwatches(designId) {
    const swatchesContainer = document.getElementById("swatches-container");
    swatchesContainer.innerHTML = "";

    const design = designsData[designId];
    if (!design) return;

    // Reset to first color of the design
    const defaultColor = design.colors[0];
    currentColorName = defaultColor.name;
    document.getElementById("active-color-display").innerText = currentColorName;
    document.getElementById("gallery-color-name").innerText = `Warna: ${currentColorName}`;
    document.getElementById("summary-color-title").innerText = currentColorName;

    // Set product main image
    const mainImg = document.getElementById("main-product-img");
    const summaryImg = document.getElementById("summary-product-img");
    
    mainImg.src = design.baseImage;
    mainImg.alt = `Telekung ${design.name} - ${currentColorName}`;
    mainImg.style.filter = defaultColor.filter || "none";
    
    summaryImg.src = design.baseImage;
    summaryImg.style.filter = defaultColor.filter || "none";

    design.colors.forEach((color, index) => {
        const swatchBtn = document.createElement("button");
        swatchBtn.type = "button";
        swatchBtn.className = `swatch-btn ${index === 0 ? 'active' : ''}`;
        swatchBtn.setAttribute("data-color-name", color.name);
        
        swatchBtn.innerHTML = `
            <div class="swatch-circle" style="background-color: ${color.hex};"></div>
            <span class="swatch-label">${color.name}</span>
        `;

        swatchBtn.addEventListener("click", () => {
            document.querySelectorAll(".swatch-btn").forEach(b => b.classList.remove("active"));
            swatchBtn.classList.add("active");

            currentColorName = color.name;
            document.getElementById("active-color-display").innerText = currentColorName;
            document.getElementById("gallery-color-name").innerText = `Warna: ${currentColorName}`;
            document.getElementById("summary-color-title").innerText = currentColorName;

            // Handle image swapping
            if (color.image) {
                // If a dedicated high-res color image exists, use it and clear filters
                mainImg.src = color.image;
                summaryImg.src = color.image;
                mainImg.style.filter = "none";
                summaryImg.style.filter = "none";
            } else {
                // Otherwise fall back to the design's base image and apply custom color-filter
                mainImg.src = design.baseImage;
                summaryImg.src = design.baseImage;
                mainImg.style.filter = color.filter || "none";
                summaryImg.style.filter = color.filter || "none";
            }
            mainImg.alt = `Telekung ${design.name} - ${currentColorName}`;
        });

        swatchesContainer.appendChild(swatchBtn);
    });
}

// 5. PRICE CALCULATOR
function updateCalculations() {
    // 1. Subtotal
    const subtotal = currentQuantity * UNIT_PRICE;
    document.getElementById("summary-qty-title").innerText = `${currentQuantity} unit`;
    document.getElementById("summary-qty-label").innerText = currentQuantity;
    document.getElementById("summary-subtotal").innerText = `RM${subtotal.toFixed(2)}`;

    // 2. Shipping cost
    const selectedCourier = document.querySelector('input[name="courier"]:checked').value;
    let shippingFee = 0;
    
    if (selectedCourier === "sabah" || selectedCourier === "sarawak") {
        shippingFee = 15;
        document.getElementById("summary-shipping").innerText = `RM${shippingFee.toFixed(2)}`;
    } else {
        shippingFee = 0;
        document.getElementById("summary-shipping").innerText = "PERCUMA";
    }

    // 3. Grand Total
    const grandTotal = subtotal + shippingFee;
    document.getElementById("summary-grandtotal").innerText = `RM${grandTotal.toFixed(2)}`;
}

// 6. PROMO COUNTDOWN TIMER
function startCountdown() {
    // Target date: set to 3 days from current date dynamically, so it never reaches zero 
    // and breaks conversion. But developers can change this variable to a static date.
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59, 0);

    // To use a fixed date, uncomment this line:
    // const targetDate = new Date("2026-06-30T23:59:59");

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            // Auto reset timer to tomorrow if expired for continuous promo look
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + 1);
            targetDate.setHours(23, 59, 59, 0);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// 7. STICKY CTA CONTROLLER
function setupStickyCTA() {
    const stickyCta = document.getElementById("mobile-sticky-cta");
    const heroBtn = document.querySelector(".hero-actions");

    window.addEventListener("scroll", () => {
        if (!heroBtn) return;
        const rect = heroBtn.getBoundingClientRect();
        
        // If hero action button is scrolled past, show the sticky CTA on mobile
        if (rect.bottom < 0) {
            stickyCta.classList.remove("hidden");
        } else {
            stickyCta.classList.add("hidden");
        }
    });
}

// 8. PRIVACY & TERMS MODAL DIALOGS
function setupModals() {
    const privacyModal = document.getElementById("privacy-modal");
    const termsModal = document.getElementById("terms-modal");

    document.getElementById("modal-privacy-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        privacyModal.showModal();
    });

    document.getElementById("modal-terms-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        termsModal.showModal();
    });

    document.getElementById("privacy-close").addEventListener("click", () => {
        privacyModal.close();
    });

    document.getElementById("terms-close").addEventListener("click", () => {
        termsModal.close();
    });

    // Close on clicking backdrop
    privacyModal.addEventListener("click", (e) => {
        if (e.target === privacyModal) privacyModal.close();
    });

    termsModal.addEventListener("click", (e) => {
        if (e.target === termsModal) termsModal.close();
    });
}

// 9. TOYYIBPAY INTEGRATION
function createBill() {
    // Validate checkout form
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    // Get Form Data
    const name = document.getElementById("cust-name").value;
    const phone = document.getElementById("cust-phone").value;
    const email = document.getElementById("cust-email").value;
    const address = document.getElementById("cust-address").value;
    const address2 = document.getElementById("cust-address2").value;
    const city = document.getElementById("cust-city").value;
    const postcode = document.getElementById("cust-postcode").value;
    const state = document.getElementById("cust-state").value;
    const courier = document.querySelector('input[name="courier"]:checked').value;

    const fullAddress = `${address}${address2 ? ', ' + address2 : ''}, ${postcode} ${city}, ${state}, Malaysia`;
    
    // Calculate total amount
    const subtotal = currentQuantity * UNIT_PRICE;
    const shippingFee = (courier === "sabah" || courier === "sarawak") ? 15 : 0;
    const totalAmount = subtotal + shippingFee;

    // Compile order details
    const designTitle = designsData[currentDesign].name;
    const orderDetails = `${designTitle} - Warna ${currentColorName} (x${currentQuantity})`;

    // ToyyibPay Parameters Placeholder
    const TOYYIBPAY_USER_SECRET_KEY = "TOYYIBPAY_USER_SECRET_KEY"; // Ganti dengan key anda
    const TOYYIBPAY_CATEGORY_CODE = "TOYYIBPAY_CATEGORY_CODE";     // Ganti dengan category code anda

    // Visual loading state
    const btnPay = document.getElementById("btn-submit-payment");
    const originalText = btnPay.innerHTML;
    btnPay.disabled = true;
    btnPay.innerHTML = `
        <span class="spinner"></span> Memproses Pembayaran...
    `;

    // TOYYIBPAY INTEGRATION ARCHITECTURE:
    // Direct browser-to-ToyyibPay calls fail because of CORS restrictions on API keys 
    // and expose secret tokens. The correct architecture is sending data to a secure 
    // Cloudflare Worker or backend endpoint, which returns the redirect URL.
    
    // We send payload to our serverless Cloudflare Pages function or worker.
    const checkoutData = {
        name: name,
        phone: phone,
        email: email,
        address: fullAddress,
        orderDetails: orderDetails,
        amount: totalAmount, // Send in Ringgit
        categoryCode: TOYYIBPAY_CATEGORY_CODE,
        secretKey: TOYYIBPAY_USER_SECRET_KEY
    };

    console.log("Menghantar maklumat pesanan ke ToyyibPay Gateway:", checkoutData);

    // Sandbox url endpoint fallback for local demonstration
    // If running in development/local and Cloudflare Worker is not deployed, we show a gorgeous mock payment success redirect
    const isLocalDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (isLocalDev) {
        setTimeout(() => {
            alert(`[SIMULASI TOYYIBPAY]\n\nData dihantar ke Worker:\nBarangan: ${orderDetails}\nNama: ${name}\nJumlah: RM${totalAmount.toFixed(2)}\nAlamat: ${fullAddress}\n\nMenghubungkan ke ToyyibPay FPX Sandbox...`);
            
            // Redirecting to mock success/payment window
            const mockRedirectUrl = `https://toyyibpay.com/index.php/payment/mock/${encodeURIComponent(orderDetails)}/${totalAmount}`;
            // For now, let's open a stylized alert/receipt or forward to WhatsApp
            const waMsg = `Salam HQ, saya baru saja menempah:\n- *${orderDetails}*\n- *Jumlah:* RM${totalAmount.toFixed(2)}\n- *Nama:* ${name}\n- *Telefon:* ${phone}\n- *Alamat:* ${fullAddress}\n\nSila berikan butiran pembayaran.`;
            const waUrl = `https://wa.me/60123456789?text=${encodeURIComponent(waMsg)}`;
            window.location.href = waUrl;
        }, 1500);
    } else {
        // PRODUCTION ARCHITECTURE - CALLING CLOUDFLARE WORKER / PAGES FUNCTIONS
        fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkoutData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal menyambung ke pelayan pembayaran.");
            }
            return response.json();
        })
        .then(data => {
            // Data returns { redirectUrl: "https://toyyibpay.com/..." }
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                throw new Error(data.message || "Ralat memproses tempahan.");
            }
        })
        .catch(err => {
            alert(`Sistem Pembayaran Automatik:\n${err.message}\n\nKami mengalihkan anda ke talian WhatsApp HQ untuk manual order.`);
            
            const waMsg = `Salam HQ, saya mahu tempah:\n*${orderDetails}*\n\n*Nama:* ${name}\n*No Tel:* ${phone}\n*Alamat:* ${fullAddress}\n*Jumlah:* RM${totalAmount.toFixed(2)}`;
            window.location.href = `https://wa.me/60123456789?text=${encodeURIComponent(waMsg)}`;
        })
        .finally(() => {
            btnPay.disabled = false;
            btnPay.innerHTML = originalText;
        });
    }
}
