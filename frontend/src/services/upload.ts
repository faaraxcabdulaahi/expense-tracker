import { apiCall } from './api';

export interface UploadResponse {
  url: string;
  message: string;
  user?: any; // User data from backend
}

export const uploadService = {
  // Upload profile picture
  async uploadProfilePicture(formData: FormData): Promise<UploadResponse> {
    const response = await apiCall<UploadResponse>('post', '/upload/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to upload profile picture');
    }
    
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    return response.data;
  },

  // Remove profile picture
  async removeProfilePicture(): Promise<{ message: string; user?: any }> {
    const response = await apiCall<{ message: string; user?: any }>('delete', '/upload/profile-picture');
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to remove profile picture');
    }
    
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    return response.data;
  },
};