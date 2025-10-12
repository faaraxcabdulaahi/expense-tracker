import type { PlatformStats, User } from '../types/admin';
import { apiCall } from './api';

export const adminService = {
  // Get platform statistics
  async getPlatformStats(): Promise<PlatformStats> {
    const response = await apiCall<PlatformStats>('get', '/admin/overview');
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Get all users (admin only)
  async getUsers(): Promise<User[]> {
    const response = await apiCall<User[]>('get', '/admin/users');
    if (!response.success) throw new Error(response.error);
    return response.data!;
  },

  // Update user role
  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<void> {
    const response = await apiCall('patch', `/admin/users/${userId}/role`, { role });
    if (!response.success) throw new Error(response.error);
  },

  // Delete user
  async deleteUser(userId: string): Promise<void> {
    const response = await apiCall('delete', `/admin/users/${userId}`);
    if (!response.success) throw new Error(response.error);
  },
};