import { jsPDF } from 'jspdf';
import { CarModel } from '../types';

/**
 * Loads an image through the local backend proxy to bypass CORS restrictions
 * and converts it into a base64 Data URL for jsPDF embedding.
 */
async function loadVehicleImageAsBase64(imageUrl: string): Promise<string | null> {
  if (!imageUrl) return null;

  try {
    const proxyUrl = `/api/v1/vehicles/image-proxy?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      // Fallback: attempt direct fetch if proxy fails
      const directResponse = await fetch(imageUrl, { mode: 'cors' }).catch(() => null);
      if (!directResponse || !directResponse.ok) return null;
      const blob = await directResponse.blob();
      return await blobToDataUrl(blob);
    }
    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch (err) {
    console.warn('[PDF Generator] Image conversion skipped:', err);
    return null;
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generates and downloads a rich, multi-page official vehicle E-Brochure PDF
 * complete with authentic car imagery, specifications, variants, and dealership info.
 */
export async function generateVehicleBrochurePDF(car: CarModel): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Attempt to load the best authentic vehicle image
  const primaryImageUrl = car.heroBanner || car.cardImage || (car.additionalImages && car.additionalImages[0]);
  const vehicleImageData = primaryImageUrl ? await loadVehicleImageAsBase64(primaryImageUrl) : null;

  // ==========================================
  // PAGE 1: HERO, SPECIFICATIONS & VARIANTS
  // ==========================================

  // 1. Top Header Bar (Nissan Black & Crimson Accent)
  doc.setFillColor(17, 17, 17); // #111111
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setFillColor(195, 0, 47); // #c3002f Nissan Crimson Red
  doc.rect(0, 24, pageWidth, 2, 'F');

  // Header Brand Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('TARA NISSAN', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(195, 0, 47);
  doc.text('AUTHORIZED SHOWROOM & WORKSHOP (MOTIHARI)', margin, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('OFFICIAL E-BROCHURE', pageWidth - margin, 12, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 180, 180);
  doc.text(`REF: TN-${car.id.toUpperCase()}-${new Date().getFullYear()}`, pageWidth - margin, 18, { align: 'right' });

  let curY = 32;

  // 2. Vehicle Model Title & Tagline
  doc.setTextColor(195, 0, 47);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(car.badge ? car.badge.toUpperCase() : 'OFFICIAL NISSAN SHOWCASE', margin, curY);

  curY += 6;
  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(`NISSAN ${car.name.toUpperCase()}`, margin, curY);

  curY += 5;
  doc.setTextColor(90, 90, 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(car.tagline || 'Experience Innovative Japanese Engineering', margin, curY);

  // Price Badge (Right aligned)
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(pageWidth - margin - 65, 30, 65, 15, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('EX-SHOWROOM STARTING AT', pageWidth - margin - 32.5, 35, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(195, 0, 47);
  doc.text(car.priceDisplay || `₹ ${car.priceRaw} Lakh*`, pageWidth - margin - 32.5, 41, { align: 'center' });

  curY += 8;

  // 3. Embedded Authentic Vehicle Image
  const imgBoxHeight = 58;
  const imgBoxWidth = contentWidth;

  if (vehicleImageData) {
    try {
      // Light background frame for vehicle presentation
      doc.setFillColor(248, 248, 248);
      doc.setDrawColor(225, 225, 225);
      doc.roundedRect(margin, curY, imgBoxWidth, imgBoxHeight, 2, 2, 'FD');

      // Embed image centered within frame
      doc.addImage(vehicleImageData, 'JPEG', margin + 4, curY + 2, imgBoxWidth - 8, imgBoxHeight - 4, undefined, 'FAST');
    } catch {
      drawFallbackVehicleGraphic(doc, margin, curY, imgBoxWidth, imgBoxHeight, car.name);
    }
  } else {
    drawFallbackVehicleGraphic(doc, margin, curY, imgBoxWidth, imgBoxHeight, car.name);
  }

  curY += imgBoxHeight + 6;

  // 4. Key Technical Specifications Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('KEY TECHNICAL SPECIFICATIONS', margin, curY);

  curY += 4;
  doc.setDrawColor(195, 0, 47);
  doc.setLineWidth(0.6);
  doc.line(margin, curY, margin + 40, curY);

  curY += 4;

  const specRows = [
    { label: 'Engine', val: car.engine || '1.0L Turbo / Naturally Aspirated' },
    { label: 'Max Power / Torque', val: car.power || '100 PS / 160 Nm' },
    { label: 'Fuel Efficiency (Mileage)', val: car.mileage || '20.0 kmpl*' },
    { label: 'Safety NCAP Rating', val: car.safetyRating || '5-Star Adult Safety Rated' },
    { label: 'Ground Clearance', val: car.groundClearance || '205 mm' },
    { label: 'Seating Capacity', val: car.seatingCapacity || '5 Passengers' },
    { label: 'Transmission Choices', val: (car.transmission || []).join(' / ') || 'Manual / X-Tronic CVT' },
    { label: 'Fuel Types', val: (car.fuelTypes || []).join(', ') || 'Petrol' },
  ];

  const colWidth = (contentWidth - 6) / 2;
  const rowHeight = 7.5;

  specRows.forEach((spec, idx) => {
    const isLeft = idx % 2 === 0;
    const x = isLeft ? margin : margin + colWidth + 6;
    const y = curY + Math.floor(idx / 2) * rowHeight;

    // Alternating zebra row fill
    if (Math.floor(idx / 2) % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(x, y - 4, colWidth, rowHeight, 'F');
    }
    doc.setDrawColor(230, 230, 230);
    doc.rect(x, y - 4, colWidth, rowHeight, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);
    doc.text(spec.label, x + 2.5, y + 1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(17, 17, 17);
    const splitVal = doc.splitTextToSize(spec.val, colWidth - 45);
    doc.text(splitVal[0] || spec.val, x + 44, y + 1);
  });

  curY += Math.ceil(specRows.length / 2) * rowHeight + 8;

  // 5. Variants & Trims Lineup
  if (car.variants && car.variants.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    doc.text('AVAILABLE VARIANTS & PRICING (EX-SHOWROOM)', margin, curY);

    curY += 4;
    doc.setDrawColor(195, 0, 47);
    doc.setLineWidth(0.6);
    doc.line(margin, curY, margin + 40, curY);

    curY += 4;

    // Table Header
    doc.setFillColor(34, 34, 34);
    doc.rect(margin, curY, contentWidth, 6.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text('VARIANT TRIM', margin + 4, curY + 4.5);
    doc.text('TRANSMISSION / FUEL', margin + 50, curY + 4.5);
    doc.text('EX-SHOWROOM PRICE', margin + 105, curY + 4.5);
    doc.text('KEY HIGHLIGHT EQUIPMENT', margin + 145, curY + 4.5);

    curY += 6.5;

    car.variants.slice(0, 5).forEach((variant, vIdx) => {
      const vHeight = 8;
      if (vIdx % 2 === 1) {
        doc.setFillColor(248, 248, 248);
        doc.rect(margin, curY, contentWidth, vHeight, 'F');
      }
      doc.setDrawColor(230, 230, 230);
      doc.rect(margin, curY, contentWidth, vHeight, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(17, 17, 17);
      doc.text(variant.name, margin + 4, curY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(70, 70, 70);
      doc.text(`${variant.transmission} | ${variant.fuel}`, margin + 50, curY + 5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(195, 0, 47);
      doc.text(variant.price, margin + 105, curY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(80, 80, 80);
      const featText = (variant.keyFeatures || []).slice(0, 2).join(', ');
      const trimmedFeat = doc.splitTextToSize(featText || 'Standard Active Equipment', 48);
      doc.text(trimmedFeat[0] || featText, margin + 145, curY + 5);

      curY += vHeight;
    });
  }

  // Page 1 Footer
  drawPageFooter(doc, 1, 2, pageWidth, pageHeight, margin);

  // ==========================================
  // PAGE 2: HIGHLIGHTS, COLORS & SHOWROOM CONTACT
  // ==========================================
  doc.addPage();

  // Page 2 Header Bar
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setFillColor(195, 0, 47);
  doc.rect(0, 16, pageWidth, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`NISSAN ${car.name.toUpperCase()} — ADVANCED FEATURES & SHOWROOM SERVICES`, margin, 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(200, 200, 200);
  doc.text('TARA NISSAN MOTIHARI', pageWidth - margin, 10, { align: 'right' });

  curY = 25;

  // 1. Overview Description
  if (car.description) {
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(margin, curY, contentWidth, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(195, 0, 47);
    doc.text('VEHICLE OVERVIEW & DESIGN PHILOSOPHY', margin + 4, curY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    const descLines = doc.splitTextToSize(car.description, contentWidth - 8);
    doc.text(descLines.slice(0, 2), margin + 4, curY + 10);

    curY += 24;
  }

  // 2. Standout Key Highlights & Safety
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text('SIGNATURE FEATURES & NISSAN INTELLIGENT MOBILITY', margin, curY);

  curY += 3.5;
  doc.setDrawColor(195, 0, 47);
  doc.setLineWidth(0.6);
  doc.line(margin, curY, margin + 50, curY);

  curY += 5;

  const highlights = car.keyHighlights && car.keyHighlights.length > 0
    ? car.keyHighlights
    : [
        'Advanced Active Safety Shield with Electronic Stability Control & Hill Start Assist',
        'Intuitive Touchscreen Infotainment with Wireless Apple CarPlay & Android Auto',
        'Around View 360-Degree Camera Monitor with Bird-Eye Perspective',
        'High Ground Clearance engineered with heavy-duty suspension for Indian highways',
        'Signature LED Projector Headlamps with integrated Boomerang Daytime Running Lights',
        'Class-leading cabin ergonomics with premium soft-touch upholstery and ample legroom',
      ];

  const halfLen = Math.ceil(highlights.length / 2);
  const leftHighlights = highlights.slice(0, halfLen);
  const rightHighlights = highlights.slice(halfLen, halfLen * 2);
  const colW = (contentWidth - 6) / 2;

  [leftHighlights, rightHighlights].forEach((colList, cIdx) => {
    const startX = cIdx === 0 ? margin : margin + colW + 6;
    let localY = curY;

    colList.forEach((item) => {
      // Bullet dot
      doc.setFillColor(195, 0, 47);
      doc.circle(startX + 2, localY - 0.5, 1, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(40, 40, 40);
      const lines = doc.splitTextToSize(item, colW - 8);
      doc.text(lines, startX + 6, localY);
      localY += lines.length * 4.2 + 2;
    });
  });

  curY += Math.max(leftHighlights.length, rightHighlights.length) * 8.5 + 4;

  // 3. Exterior Color Portfolio
  if (car.colors && car.colors.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    doc.text('OFFICIAL EXTERIOR COLOR PALETTE', margin, curY);

    curY += 3.5;
    doc.setDrawColor(195, 0, 47);
    doc.setLineWidth(0.6);
    doc.line(margin, curY, margin + 40, curY);

    curY += 5;

    const swatchWidth = contentWidth / car.colors.length;
    car.colors.forEach((col, idx) => {
      const sx = margin + idx * swatchWidth;
      const rgb = hexToRgb(col.hex);

      // Color preview box
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.setDrawColor(180, 180, 180);
      doc.roundedRect(sx + 2, curY, swatchWidth - 4, 10, 1, 1, 'FD');

      // Color Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(30, 30, 30);
      const colLines = doc.splitTextToSize(col.name, swatchWidth - 4);
      doc.text(colLines[0] || col.name, sx + swatchWidth / 2, curY + 14, { align: 'center' });
    });

    curY += 21;
  }

  // 4. Tara Nissan Dealership & Contact Banner
  doc.setFillColor(244, 246, 248);
  doc.setDrawColor(210, 215, 220);
  doc.roundedRect(margin, curY, contentWidth, 38, 2, 2, 'FD');

  // Red left accent border
  doc.setFillColor(195, 0, 47);
  doc.rect(margin, curY, 2.5, 38, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 17, 17);
  doc.text('TARA NISSAN — MOTIHARI AUTHORIZED SHOWROOM & SERVICE BAY', margin + 6, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  doc.text('Showroom & Workshop Address: NH28, Bapudham Motihari, Bihar - 845402', margin + 6, curY + 12);
  doc.text('Official Sales & Service Phone: +91 9031005087 | WhatsApp Showroom: +91 9031005087', margin + 6, curY + 17);
  doc.text('Operating Timings: 9:00 AM – 7:30 PM (All 7 Days Open, Including Sundays)', margin + 6, curY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(195, 0, 47);
  doc.text('Genuine 3-Year / 100,000 KM Warranty | 24x7 Roadside Assistance | Nissan Quick Service Available', margin + 6, curY + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Book test drive or service appointment online at Tara Nissan Portal or visit nissan.in', margin + 6, curY + 34);

  curY += 43;

  // 5. Legal Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = '*Ex-showroom prices are indicative and subject to change without prior notification. Applicable road tax, registration, insurance, handling charges, and accessories are additional. Mileage figures certified under standard test conditions as per Rule 115 of CMVR. Specifications, colors, and equipment availability may vary across trims. For accurate on-road quotation, visit Tara Nissan Motihari showroom.';
  const discLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(discLines, margin, curY);

  // Page 2 Footer
  drawPageFooter(doc, 2, 2, pageWidth, pageHeight, margin);

  // Download Trigger
  const sanitizedName = car.name.replace(/\s+/g, '_');
  doc.save(`Nissan_${sanitizedName}_Official_Brochure.pdf`);
}

function drawPageFooter(doc: jsPDF, pageNum: number, totalPages: number, pageWidth: number, pageHeight: number, margin: number) {
  const footerY = pageHeight - 10;

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(130, 130, 130);
  doc.text('© Tara Nissan Motihari. Official Nissan India authorized dealer catalog. Visit https://www.nissan.in', margin, footerY + 2);

  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY + 2, { align: 'right' });
}

function drawFallbackVehicleGraphic(doc: jsPDF, x: number, y: number, w: number, h: number, carName: string) {
  doc.setFillColor(240, 240, 240);
  doc.setDrawColor(210, 210, 210);
  doc.roundedRect(x, y, w, h, 2, 2, 'FD');

  doc.setFillColor(17, 17, 17);
  doc.roundedRect(x + w / 2 - 35, y + h / 2 - 8, 70, 16, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`NISSAN ${carName.toUpperCase()}`, x + w / 2, y + h / 2 + 2, { align: 'center' });
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r: isNaN(r) ? 30 : r, g: isNaN(g) ? 30 : g, b: isNaN(b) ? 30 : b };
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return {
    r: isNaN(r) ? 30 : r,
    g: isNaN(g) ? 30 : g,
    b: isNaN(b) ? 30 : b,
  };
}
