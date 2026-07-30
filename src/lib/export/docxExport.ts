import { Document, Packer, Paragraph, TextRun, HeadingLevel, Header, AlignmentType } from 'docx';

export interface DOCXOptions {
  title: string;
  content: string;
}

export async function generateDOCX({ title, content }: DOCXOptions): Promise<Blob> {
  // Strip HTML tags for Word paragraph mapping
  const cleanText = content.replace(/<[^>]*>/g, '\n');
  const rawLines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440, // 1 inch
              left: 2160, // 1.5 inches (Generous Binding Gutter Margin)
              right: 1440, // 1 inch
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'UNIVERSITY OF IBADAN — RESEARCH MANAGEMENT OFFICE (RMO)',
                    bold: true,
                    size: 16, // 8pt
                    color: '002147',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Official Publication | 2025 Edition | Date: ${new Date().toLocaleDateString()}`,
                italics: true,
                size: 18, // 9pt
                color: 'DAA520',
              }),
            ],
            spacing: { after: 300 },
          }),
          ...rawLines.map(
            (line) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    size: 23, // 11.5pt
                  }),
                ],
                spacing: { after: 140 },
              })
          ),
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export function downloadDOCX(blob: Blob, fileName: string = 'ui_2025_report.docx') {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}
