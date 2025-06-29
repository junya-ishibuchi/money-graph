import { parseCsvTransactions } from '../csv-parser';

describe('CSV Parser', () => {
  const mockCsvData = `Date,Description,Amount
2024-01-15,Grocery Store,-45.67
2024-01-16,Gas Station,-32.50
2024-01-17,Salary Deposit,2500.00`;

  it('should parse CSV transactions correctly', async () => {
    const result = await parseCsvTransactions(mockCsvData);
    
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      date: new Date('2024-01-15'),
      description: 'Grocery Store',
      amount: -45.67,
    });
    expect(result[1]).toEqual({
      date: new Date('2024-01-16'),
      description: 'Gas Station',
      amount: -32.50,
    });
    expect(result[2]).toEqual({
      date: new Date('2024-01-17'),
      description: 'Salary Deposit',
      amount: 2500.00,
    });
  });

  it('should handle different column names', async () => {
    const csvWithDifferentHeaders = `DATE,DESC,AMOUNT
2024-01-15,Coffee Shop,-4.50`;
    
    const result = await parseCsvTransactions(csvWithDifferentHeaders);
    
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe('Coffee Shop');
    expect(result[0].amount).toBe(-4.50);
  });

  it('should handle currency symbols and commas in amounts', async () => {
    const csvWithCurrency = `Date,Description,Amount
2024-01-15,Big Purchase,"$1,234.56"`;
    
    const result = await parseCsvTransactions(csvWithCurrency);
    
    expect(result).toHaveLength(1);
    expect(result[0].amount).toBe(1234.56);
  });

  it('should skip empty lines', async () => {
    const csvWithEmptyLines = `Date,Description,Amount
2024-01-15,Valid Transaction,-10.00

2024-01-16,Another Valid Transaction,-20.00`;
    
    const result = await parseCsvTransactions(csvWithEmptyLines);
    
    expect(result).toHaveLength(2);
  });

  it('should handle invalid date formats gracefully', async () => {
    const csvWithInvalidDate = `Date,Description,Amount
invalid-date,Should be skipped,-10.00
2024-01-15,Valid Transaction,-20.00`;
    
    const result = await parseCsvTransactions(csvWithInvalidDate);
    
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe('Valid Transaction');
  });

  it('should handle empty CSV content', async () => {
    const result = await parseCsvTransactions('');
    expect(result).toHaveLength(0);
  });

  it('should handle CSV with only headers', async () => {
    const csvWithOnlyHeaders = 'Date,Description,Amount';
    
    const result = await parseCsvTransactions(csvWithOnlyHeaders);
    
    expect(result).toHaveLength(0);
  });
});