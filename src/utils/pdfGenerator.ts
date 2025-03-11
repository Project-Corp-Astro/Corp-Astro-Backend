import { createWriteStream } from "fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generatePdfReport = async (chartData: any, outputPath: string) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Add content to the PDF
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText("Natal Chart Report", {
    x: 50,
    y: height - 50,
    size: 30,
    font,
    color: rgb(0, 0, 0),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  createWriteStream(outputPath).write(pdfBytes);
};