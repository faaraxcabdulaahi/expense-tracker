import type { MonthlySummary } from "../types/analytics";
import { apiCall } from "./api";


export const analyticsService = {
  // Get monthly summary from backend
  async getMonthlySummary(): Promise<MonthlySummary[]> {
    const response = await apiCall<MonthlySummary[]>('get', '/transaction/monthly-summary');
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Get platform statistics (admin only)
  async getPlatformStats(): Promise<any> {
    const response = await apiCall('get', '/admin/overview');
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },
};