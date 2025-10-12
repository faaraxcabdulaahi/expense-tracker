// import React, { useState, useRef } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Camera, Loader2, Upload, User, X } from 'lucide-react';
// import { uploadService } from '../../services/upload';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';


// export function ProfilePictureUpload() {
//   const { user, updateUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       setError('Please select an image file (JPEG, PNG, etc.)');
//       return;
//     }

//     // Validate file size (2MB limit)
//     if (file.size > 2 * 1024 * 1024) {
//       setError('Image size must be less than 2MB');
//       return;
//     }

//     setError(null);
    
//     // Create preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPreviewUrl(e.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpload = async () => {
//     const file = fileInputRef.current?.files?.[0];
//     if (!file) {
//       setError('Please select an image first');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setError(null);

//       // Upload the image
//       const formData = new FormData();
//       formData.append('image', file);

//       const response = await uploadService.uploadProfilePicture(formData);
      
//       // Update user context with new profile picture
//       if (response.url) {
//         await updateUser({ profilePicture: response.url });
//       }

//       // Reset preview and file input
//       setPreviewUrl(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }

//       // Show success message (you can add toast notification here)
//       console.log('Profile picture updated successfully');

//     } catch (err: any) {
//       setError(err.message || 'Failed to upload profile picture');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRemovePicture = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Call API to remove profile picture
//       await uploadService.removeProfilePicture();
      
//       // Update user context
//       await updateUser({ profilePicture: '' });

//       // Reset preview
//       setPreviewUrl(null);

//       console.log('Profile picture removed successfully');

//     } catch (err: any) {
//       setError(err.message || 'Failed to remove profile picture');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setPreviewUrl(null);
//     setError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Camera className="h-5 w-5" />
//           Profile Picture
//         </CardTitle>
//         <CardDescription>
//           Upload a new profile picture to personalize your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {/* Current Profile Picture */}
//           <div className="flex flex-col items-center space-y-4">
//             <div className="relative">
//               {previewUrl ? (
//                 <div className="relative">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="h-32 w-32 rounded-full object-cover border-4 border-blue-200"
//                   />
//                   <button
//                     onClick={handleCancel}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ) : user?.profilePicture ? (
//                 <div className="relative">
//                   <img
//                     src={user.profilePicture}
//                     alt={user.name}
//                     className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
//                   />
//                   <button
//                     onClick={handleRemovePicture}
//                     disabled={isLoading}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors disabled:opacity-50"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-gray-200">
//                   <User className="h-16 w-16 text-muted-foreground" />
//                 </div>
//               )}
//             </div>
            
//             {!user?.profilePicture && !previewUrl && (
//               <p className="text-sm text-muted-foreground text-center">
//                 No profile picture set
//               </p>
//             )}
//           </div>

//           {/* File Input */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <Input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 className="flex-1"
//                 disabled={isLoading}
//               />
//               <Button
//                 onClick={() => fileInputRef.current?.click()}
//                 variant="outline"
//                 disabled={isLoading}
//                 className="flex items-center gap-2"
//               >
//                 <Upload className="h-4 w-4" />
//                 Browse
//               </Button>
//             </div>

//             {/* Help Text */}
//             <div className="text-xs text-muted-foreground space-y-1">
//               <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
//               <p>• Maximum file size: 2MB</p>
//               <p>• Recommended dimensions: 256x256 pixels</p>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//                 <p className="text-sm text-red-800">{error}</p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             {previewUrl && (
//               <div className="flex gap-3 pt-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleCancel}
//                   disabled={isLoading}
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleUpload}
//                   disabled={isLoading}
//                   className="flex-1 flex items-center gap-2"
//                 >
//                   {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//                   Upload Picture
//                 </Button>
//               </div>
//             )}

//             {/* Remove Button for existing picture */}
//             {user?.profilePicture && !previewUrl && (
//               <Button
//                 variant="outline"
//                 onClick={handleRemovePicture}
//                 disabled={isLoading}
//                 className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//                 Remove Profile Picture
//               </Button>
//             )}
//           </div>

//           {/* Upload Progress (optional) */}
//           {isLoading && (
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span>Uploading...</span>
//                 <span>Please wait</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Camera, Loader2, Upload, User, X } from 'lucide-react';
import { uploadService } from '../../services/upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function ProfilePictureUpload() {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    setError(null);
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.onerror = () => {
      setError('Failed to read the image file');
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Add user ID if available
      if (user?.id) {
        formData.append('userId', user.id);
      }

      console.log('Uploading file:', selectedFile.name, selectedFile.size, selectedFile.type);

      const response = await uploadService.uploadProfilePicture(formData);
      
      // Update user context with new profile picture
      if (response.url) {
        await updateUser({ profilePicture: response.url });
      }

      // Reset preview and file input
      setPreviewUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      console.log('Profile picture updated successfully:', response);

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePicture = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Call API to remove profile picture
      const response = await uploadService.removeProfilePicture();
      
      // Update user context
      await updateUser({ profilePicture: '' });

      // Reset preview
      setPreviewUrl(null);
      setSelectedFile(null);

      console.log('Profile picture removed successfully:', response);

    } catch (err: any) {
      console.error('Remove picture error:', err);
      setError(err.message || 'Failed to remove profile picture. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Profile Picture
        </CardTitle>
        <CardDescription>
          Upload a new profile picture to personalize your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 w-32 rounded-full object-cover border-4 border-blue-200"
                  />
                  <button
                    onClick={handleCancel}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : user?.profilePicture ? (
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt={user.name || 'User profile'}
                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    onClick={handleRemovePicture}
                    disabled={isLoading}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors disabled:opacity-50"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-gray-200">
                  <User className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            
            {!user?.profilePicture && !previewUrl && (
              <p className="text-sm text-muted-foreground text-center">
                No profile picture set
              </p>
            )}
          </div>

          {/* File Input - Hidden but functional */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading}
          />

          {/* File Selection Area */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedFile ? `Selected: ${selectedFile.name}` : 'No file chosen'}
                </p>
                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  disabled={isLoading}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
              <p>• Maximum file size: 2MB</p>
              <p>• Recommended dimensions: 256x256 pixels</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            {previewUrl && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="flex-1 flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Upload Picture
                </Button>
              </div>
            )}

            {/* Remove Button for existing picture */}
            {user?.profilePicture && !previewUrl && (
              <Button
                variant="outline"
                onClick={handleRemovePicture}
                disabled={isLoading}
                className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Remove Profile Picture
              </Button>
            )}
          </div>

          {/* Upload Progress */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>Please wait</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}