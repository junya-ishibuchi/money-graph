import { parse } from 'csv-parse';

export interface ParsedTransaction {
  date: Date;
  description: string;
  amount: number;
}

export async function parseCsvTransactions(csvContent: string): Promise<ParsedTransaction[]> {
  return new Promise((resolve, reject) => {
    const transactions: ParsedTransaction[] = [];
    
    parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }, (err, records) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        for (const record of records) {
          // Common CSV headers for credit card statements
          const date = parseDate(record.Date || record.date || record.DATE);
          const description = record.Description || record.description || record.DESC || '';
          const amount = parseAmount(record.Amount || record.amount || record.AMOUNT || '0');

          if (date && description && !isNaN(amount)) {
            transactions.push({
              date,
              description: description.trim(),
              amount,
            });
          }
        }
        
        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

function parseAmount(amountStr: string): number {
  if (!amountStr) return 0;
  
  // Remove currency symbols and commas
  const cleanAmount = amountStr.replace(/[$,]/g, '');
  return parseFloat(cleanAmount) || 0;
}