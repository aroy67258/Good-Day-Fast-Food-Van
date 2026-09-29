import * as THREE from 'three';

// Create a high-resolution canvas texture for the roof signboard
export function createSignboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Background deep red with gold border
  ctx.fillStyle = '#8B1414';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border
  ctx.strokeStyle = '#F5A623';
  ctx.lineWidth = 12;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  // Inner thin border
  ctx.strokeStyle = '#FFE082';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Main text: GOOD DAY
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 84px Outfit, "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.fillText('GOOD DAY', canvas.width / 2, 85);

  // Subtitle: FAST FOOD VAN
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 44px Outfit, sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;
  ctx.fillText('FAST FOOD VAN', canvas.width / 2, 160);

  // Tagline: 100% PURE VEG
  ctx.fillStyle = '#4ADE80';
  ctx.font = 'bold 26px Poppins, sans-serif';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText('★ 100% PURE VEGETARIAN STREET FOOD ★', canvas.width / 2, 215);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Create side banner texture
export function createSideBannerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Background warm gold-yellow
  ctx.fillStyle = '#F5A623';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top and bottom red stripes
  ctx.fillStyle = '#8B1414';
  ctx.fillRect(0, 0, canvas.width, 24);
  ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

  // Good Day Fast Food Van
  ctx.fillStyle = '#8B1414';
  ctx.font = '900 68px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOOD DAY FAST FOOD VAN', canvas.width / 2, 90);

  // Details
  ctx.fillStyle = '#1B5E20';
  ctx.font = 'bold 36px Poppins, sans-serif';
  ctx.fillText('100% VEGETARIAN • DELICIOUS INDIAN STREET FOOD', canvas.width / 2, 160);

  ctx.fillStyle = '#1C1917';
  ctx.font = '500 24px Poppins, sans-serif';
  ctx.fillText('Burgers • Momos • Chowmein • Rolls • Rice • Chilli', canvas.width / 2, 205);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Create 100% Veg Emblem texture
export function createVegEmblemTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Transparent background
  ctx.clearRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;
  const radius = 230;

  // Outer dark ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#064E3B';
  ctx.fill();

  // White inner ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 16, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Green inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 45, 0, Math.PI * 2);
  ctx.fillStyle = '#15803D';
  ctx.fill();

  // Top text: 100%
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('100%', cx, cy - 90);

  // Sub text: VEGETARIAN
  ctx.font = 'bold 34px Outfit, sans-serif';
  ctx.fillText('VEGETARIAN', cx, cy - 45);

  // Leaves symbol in the center
  ctx.fillStyle = '#4ADE80';
  // Leaf 1
  ctx.beginPath();
  ctx.ellipse(cx - 35, cy + 45, 55, 30, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  // Leaf 2
  ctx.beginPath();
  ctx.ellipse(cx + 35, cy + 45, 55, 30, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Stem
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx, cy + 120);
  ctx.lineTo(cx, cy + 40);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// Create number plate texture
export function createLicensePlateTexture(text = 'UP 70 GD 2024'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F5A623';
  ctx.fillRect(0, 0, 512, 128);

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 500, 116);

  // Left blue IND band
  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(6, 6, 60, 116);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IND', 36, 75);

  // Registration number
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 58px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 280, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Create mini menu board texture for inside kitchen & counter
export function createMenuBoardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Background deep red/maroon
  ctx.fillStyle = '#7F1D1D';
  ctx.fillRect(0, 0, 512, 768);

  // Header
  ctx.fillStyle = '#F5A623';
  ctx.fillRect(15, 15, 482, 110);

  ctx.fillStyle = '#7F1D1D';
  ctx.font = 'bold 36px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GOOD DAY MENU', 256, 60);

  ctx.font = 'bold 20px Poppins, sans-serif';
  ctx.fillText('100% VEGETARIAN FAST FOOD', 256, 95);

  // Menu items list
  const categories = [
    { name: '★ BURGERS', items: ['Aloo Tikki Burger', 'Paneer Burger', 'Cheese Burger'] },
    { name: '★ CHOWMEIN', items: ['Veg Chowmein', 'Hakka Noodles', 'Chilli Garlic'] },
    { name: '★ MOMOS', items: ['Steamed Momos', 'Fried Momos', 'Kurkure Momos'] },
    { name: '★ ROLLS', items: ['Veg Roll', 'Paneer Roll', 'Spring Roll'] },
    { name: '★ CHILLI & RICE', items: ['Paneer Chilli', 'Veg Fried Rice', 'Manchurian'] },
  ];

  let y = 160;
  categories.forEach((cat) => {
    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cat.name, 35, y);
    y += 28;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '17px Poppins, sans-serif';
    cat.items.forEach((item) => {
      ctx.fillText(`• ${item}`, 45, y);
      y += 22;
    });
    y += 15;
  });

  // Footer
  ctx.fillStyle = '#F5A623';
  ctx.fillRect(15, 700, 482, 50);
  ctx.fillStyle = '#7F1D1D';
  ctx.font = 'bold 20px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DELIVERY AVAILABLE: 8081551589', 256, 732);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
