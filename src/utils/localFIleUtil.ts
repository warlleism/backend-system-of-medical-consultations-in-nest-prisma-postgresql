import * as fs from 'fs';
import * as path from 'path';

export async function savePdfToFile(base64Pdf: string, id: number): Promise<string> {

    function isValidBase64(str: string): boolean {
        const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
        return base64Regex.test(str);
    }

    try {
        const base64Data = base64Pdf.replace(/^data:application\/pdf;base64,/, '');

        if (!isValidBase64(base64Data)) {
            throw new Error('Invalid base64 string.');
        }

        const pdfBuffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(__dirname, '..', '..', 'src', 'pdfs', `${String(id)}.pdf`);

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, pdfBuffer);

        return filePath;
    } catch (error) {
        console.log('Error saving PDF:', error);
        throw new Error('Failed to save PDF.');
    }
}



export async function deletePdf(id: number): Promise<void> {
    const fileName = `${id}.pdf`;
    const filePath = path.join(__dirname, '..', '..', 'src', 'pdfs', fileName);

    try {
        await fs.promises.access(filePath);
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error('Error deleting PDF:', error);
        throw error;
    }
}