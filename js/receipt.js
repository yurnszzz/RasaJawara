/* ============================================
   Rasa Jawara — Receipt Module
   receipt.js — Generate, Download, WhatsApp
   ============================================ */

let receiptData = {
  orderNo: "",
  name: "",
  phone: "",
  total: 0,
  items: [],
};

// ——— Generate Receipt ———
function generateReceipt(e) {
  e.preventDefault();
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;

  const orderNo = "ORD-" + Date.now();

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  receiptData = {
    orderNo,
    name,
    phone,
    total,
    items: cart.map((item) => ({ ...item })),
  };

  // Populate receipt
  document.getElementById("receipt-order-no").innerText = orderNo;
  document.getElementById("receipt-date").innerText = dateStr + " " + timeStr;
  document.getElementById("receipt-customer").innerText = name;
  document.getElementById("receipt-phone").innerText = phone;

  // Build bank accounts from config
  const bankHtml = CONFIG.BANK_ACCOUNTS.map(
    (acc) =>
      `<span>${acc.bank}: <span class="font-mono font-bold">${acc.number}</span></span>`
  ).join("");
  document.getElementById("receipt-bank-accounts").innerHTML = bankHtml;

  // Populate items table
  const itemsHtml = cart
    .map(
      (item) =>
        `<tr>
          <td class="py-1 pr-2 text-left">${item.name}</td>
          <td class="py-1 px-1 text-center">${item.qty}</td>
          <td class="py-1 px-1 text-right">${parseInt(item.price).toLocaleString("id-ID")}</td>
          <td class="py-1 pl-1 text-right">${parseInt(item.price * item.qty).toLocaleString("id-ID")}</td>
        </tr>`
    )
    .join("");
  document.getElementById("receipt-items").innerHTML = itemsHtml;
  document.getElementById("receipt-total").innerText =
    "Rp " + total.toLocaleString("id-ID");

  // Close checkout and show receipt
  closeCheckout();
  const modal = document.getElementById("receipt-modal");
  modal.classList.remove("hidden");
}

function closeReceiptModal() {
  const modal = document.getElementById("receipt-modal");
  modal.classList.add("hidden");

  cart = [];
  updateCartUI();
  document.getElementById("order-form").reset();
}

// ——— Download Receipt as Image ———
async function downloadReceipt() {
  const receiptContent = document.getElementById("receipt-content");
  const images = receiptContent.querySelectorAll("img");

  // Show loading state on button
  const btn = event.currentTarget;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  btn.disabled = true;

  try {
    // Try capture with allowTaint
    const canvas = await html2canvas(receiptContent, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: false,
      allowTaint: true,
    });

    try {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "kwitansi-rjs-" + receiptData.orderNo + ".png";
      link.href = dataURL;
      link.click();
      showToast("Kwitansi berhasil didownload!");
    } catch (exportError) {
      // Tainted canvas — hide images and retry
      images.forEach((img) => (img.style.visibility = "hidden"));

      const placeholder = document.createElement("div");
      placeholder.id = "logo-placeholder";
      placeholder.innerHTML =
        '<p style="text-align:center;font-weight:bold;color:#4A3321;font-size:18px;padding:12px 0;">RASA JAWARA SOUVENIR</p>';
      receiptContent.insertBefore(placeholder, receiptContent.firstChild);

      const canvas2 = await html2canvas(receiptContent, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      images.forEach((img) => (img.style.visibility = "visible"));
      const ph = document.getElementById("logo-placeholder");
      if (ph) ph.remove();

      const link = document.createElement("a");
      link.download = "kwitansi-rjs-" + receiptData.orderNo + ".png";
      link.href = canvas2.toDataURL("image/png");
      link.click();
      showToast("Kwitansi berhasil didownload!");
    }
  } catch (error) {
    console.error("Download error:", error);
    if (
      confirm(
        "Gagal download otomatis. Gunakan Print (Ctrl+P) untuk menyimpan sebagai PDF?"
      )
    ) {
      window.print();
    }
  } finally {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
  }
}

// ——— WhatsApp Confirmation ———
function confirmViaWhatsApp() {
  let message = `*Konfirmasi Pembayaran*\n`;
  message += `━━━━━━━━━━━━━━━━━\n`;
  message += `No. Order: ${receiptData.orderNo}\n`;
  message += `Nama: ${receiptData.name}\n`;
  message += `No HP: ${receiptData.phone}\n`;
  message += `━━━━━━━━━━━━━━━━━\n\n`;
  message += `*Detail Pesanan:*\n`;

  receiptData.items.forEach((item, i) => {
    message += `${i + 1}. ${item.name} (${item.qty}x) - Rp ${(
      item.price * item.qty
    ).toLocaleString("id-ID")}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL: Rp ${receiptData.total.toLocaleString("id-ID")}*\n`;
  message += `━━━━━━━━━━━━━━━━━\n\n`;
  message += `Saya sudah melakukan pembayaran. Mohon konfirmasi pesanan saya. Terima kasih!`;

  window.open(
    `https://wa.me/${CONFIG.WA_PHONE}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  closeReceiptModal();
}
