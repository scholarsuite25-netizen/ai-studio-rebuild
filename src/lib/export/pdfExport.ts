import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { BindingMarginMode } from '@/types';

export interface PDFOptions {
  title: string;
  content: string;
  author?: string;
  showWatermark?: boolean;
  bindingMargin?: BindingMarginMode;
}

export async function generatePDF({
  title,
  content,
  author = 'University of Ibadan RMO',
  showWatermark = true,
  bindingMargin = 'generous',
}: PDFOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  let cursorY = height - 70;

  // Binding Margin Gutter calculation (left margin offset)
  const leftMargin = bindingMargin === 'generous' || bindingMargin === 'spine_bound' ? 85 : 50;

  if (showWatermark) {
    // 1. Top-Left Corner Navy & Gold Accent Stripes
    page.drawRectangle({
      x: 0,
      y: height - 12,
      width: 90,
      height: 12,
      color: rgb(0, 0.13, 0.28),
    });
    page.drawRectangle({
      x: 0,
      y: height - 90,
      width: 12,
      height: 90,
      color: rgb(0, 0.13, 0.28),
    });
    page.drawRectangle({
      x: 90,
      y: height - 12,
      width: 25,
      height: 12,
      color: rgb(0.85, 0.65, 0.13),
    });

    // Double Corner Frame Lines
    page.drawLine({ start: { x: 25, y: height - 60 }, end: { x: 130, y: height - 60 }, color: rgb(0, 0.13, 0.28), thickness: 1 });
    page.drawLine({ start: { x: 25, y: height - 64 }, end: { x: 140, y: height - 64 }, color: rgb(0, 0.13, 0.28), thickness: 0.75 });
    page.drawLine({ start: { x: 60, y: height - 25 }, end: { x: 60, y: height - 130 }, color: rgb(0, 0.13, 0.28), thickness: 1 });
    page.drawLine({ start: { x: 64, y: height - 25 }, end: { x: 64, y: height - 140 }, color: rgb(0, 0.13, 0.28), thickness: 0.75 });

    // 2. Top-Right Official UI Crest Badge
    page.drawRectangle({
      x: width - 85,
      y: height - 75,
      width: 48,
      height: 55,
      color: rgb(0, 0.13, 0.28),
      borderColor: rgb(0.85, 0.65, 0.13),
      borderWidth: 2,
    });
    page.drawText('UI', {
      x: width - 72,
      y: height - 42,
      size: 16,
      font: boldFont,
      color: rgb(0.85, 0.65, 0.13),
    });
    page.drawText('RMO', {
      x: width - 74,
      y: height - 60,
      size: 10,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    // 3. Center Subdued Crest Watermark Frame
    page.drawRectangle({
      x: width / 2 - 110,
      y: height / 2 - 150,
      width: 240,
      height: 300,
      borderColor: rgb(0.9, 0.9, 0.93),
      borderWidth: 3,
      opacity: 0.12,
    });
    page.drawText('UNIVERSITY OF IBADAN', {
      x: width / 2 - 100,
      y: height / 2,
      size: 16,
      font: boldFont,
      color: rgb(0, 0.13, 0.28),
      opacity: 0.08,
    });
    page.drawText('RECTE SAPERE FONS', {
      x: width / 2 - 70,
      y: height / 2 - 30,
      size: 12,
      font: boldFont,
      color: rgb(0.85, 0.65, 0.13),
      opacity: 0.1,
    });

    // 4. Bottom-Right Corner Accent Stripes
    page.drawRectangle({
      x: width - 90,
      y: 0,
      width: 90,
      height: 12,
      color: rgb(0, 0.13, 0.28),
    });
    page.drawRectangle({
      x: width - 12,
      y: 0,
      width: 12,
      height: 90,
      color: rgb(0, 0.13, 0.28),
    });
    page.drawRectangle({
      x: width - 115,
      y: 0,
      width: 25,
      height: 12,
      color: rgb(0.85, 0.65, 0.13),
    });
  }

  // Header Title with Left Binding Margin
  page.drawText(title, {
    x: leftMargin,
    y: cursorY - 10,
    size: 18,
    font: boldFont,
    color: rgb(0, 0.13, 0.28),
  });

  cursorY -= 35;

  // Metadata Line
  page.drawText(`Publisher: ${author} | Date: ${new Date().toLocaleDateString()}`, {
    x: leftMargin,
    y: cursorY,
    size: 9,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  cursorY -= 25;

  // Render Content
  const cleanText = content.replace(/<[^>]*>/g, ' ');
  const lines = cleanText.split('\n').flatMap((line) => {
    const words = line.trim().split(/\s+/);
    const wrapped: string[] = [];
    let currentLine = '';
    words.forEach((word) => {
      if ((currentLine + word).length > 62) {
        wrapped.push(currentLine);
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });
    if (currentLine) wrapped.push(currentLine);
    return wrapped;
  });

  lines.slice(0, 38).forEach((line) => {
    if (cursorY < 60) return;
    page.drawText(line, {
      x: leftMargin,
      y: cursorY,
      size: 10,
      font: font,
      color: rgb(0.15, 0.15, 0.15),
    });
    cursorY -= 16;
  });

  return await pdfDoc.save();
}

export function downloadPDF(pdfBytes: Uint8Array, fileName: string = 'ui_2025_report.pdf') {
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}
