import React from 'react';
import { Box, Typography } from '@mui/material';

// URL của ảnh full màn hình (thay bằng URL bạn cung cấp)
const backgroundImageUrl = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100%', // Đã có height từ MainLayout
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Để định vị dòng chữ
      }}
    >
      {/* Dòng chữ lớn ngay trên hình nền */}
      <Typography
        variant="h2" // Kích thước chữ lớn
        sx={{
          color: 'white', // Màu chữ trắng
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Thêm bóng để tăng độ tương phản
          textAlign: 'center', // Căn giữa
          fontWeight: 'bold', // Chữ đậm
          position: 'absolute', // Định vị tuyệt đối để nằm trên hình nền
          top: '20%', // Đặt cách đỉnh 20% để không sát mép trên
          transform: 'translateY(-50%)', // Căn chỉnh dọc
          px: 2, // Padding ngang để tránh sát mép
        }}
      >
        CineViet Movie Manager 
      </Typography>
    </Box>
  );
};

export default HomePage;