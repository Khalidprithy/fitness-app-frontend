const extractPublicIdFromUrl = (url: string): string => {
  // Regular expression to match the public ID portion of the URL
  const regex = /\/image\/upload\/v\d+\/(.+?)\.[a-zA-Z]+$/;
  const match = url.match(regex);
  if (!match) {
    throw new Error('Invalid Cloudinary URL');
  }
  return match[1];
};

// Function to upload images to Cloudinary
export const uploadToCloudinary = async (
  files: File | File[],
  folderName: string = 'test'
): Promise<string | string[]> => {
  // Convert single file to an array for uniform processing
  const fileArray = Array.isArray(files) ? files : [files];

  const uploadPromises = fileArray.map(async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'devkbin');
    formData.append('folder', folderName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dlcti0s8p/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Cloudinary image upload failed: ${error}`);
    }

    const data = await response.json();
    return data.secure_url;
  });

  try {
    // Wait for all uploads to complete
    const urls = await Promise.all(uploadPromises);
    // Return a single URL if only one file was uploaded, otherwise return an array of URLs
    return fileArray.length === 1 ? urls[0] : urls;
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error('Error uploading files:', error);
    throw error;
  }
};

// Function to delete an image from Cloudinary using the full URL
export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  // Extract the public ID from the URL

  const publicId = extractPublicIdFromUrl(imageUrl);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dlcti0s8p/image/destroy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: '761643598476934',
        upload_preset: 'devkbin'
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudinary image delete failed: ${error}`);
  }

  const data = await response.json();

  if (data.result !== 'ok') {
    throw new Error(`Cloudinary image delete failed: ${data.result}`);
  }
};
