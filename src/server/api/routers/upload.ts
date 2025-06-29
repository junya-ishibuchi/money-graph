import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { parseCsvTransactions } from '@/lib/csv-parser';

export const uploadRouter = createTRPCRouter({
  csvTransactions: publicProcedure
    .input(
      z.object({
        csvContent: z.string().min(1, 'CSV content cannot be empty'),
        userId: z.string().optional().default('default-user'), // Hardcoded for now
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Parse CSV
        const transactions = await parseCsvTransactions(input.csvContent);
        
        if (transactions.length === 0) {
          throw new Error('No valid transactions found in CSV');
        }

        // Save to database
        const savedTransactions = await ctx.db.transaction.createMany({
          data: transactions.map(transaction => ({
            date: transaction.date,
            description: transaction.description,
            amount: transaction.amount,
            userId: input.userId,
          })),
        });

        return {
          success: true,
          count: savedTransactions.count,
          message: `Successfully imported ${savedTransactions.count} transactions`,
        };
      } catch (error) {
        throw new Error(
          `Failed to process CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }),
});