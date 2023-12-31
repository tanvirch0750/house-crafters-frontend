export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://house-crafters.vercel.app/api/v1'
  );
};

// 'https://house-crafters.vercel.app/api/v1'
// 'http://localhost:5001/api/v1'
