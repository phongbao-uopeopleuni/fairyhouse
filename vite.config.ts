import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          gioi_thieu: path.resolve(__dirname, 'gioi-thieu.html'),
          phong: path.resolve(__dirname, 'phong.html'),
          phong_doi_am_cung: path.resolve(__dirname, 'phong/phong-doi-am-cung.html'),
          phong_gia_dinh: path.resolve(__dirname, 'phong/phong-gia-dinh.html'),
          phong_nhom_ban: path.resolve(__dirname, 'phong/phong-nhom-ban.html'),
          cam_nang_hue: path.resolve(__dirname, 'cam-nang-hue.html'),
          dia_diem_du_lich: path.resolve(__dirname, 'bai-viet/dia-diem-du-lich-gan-fairys-house-hue.html'),
          an_gi_o_hue: path.resolve(__dirname, 'bai-viet/an-gi-o-hue.html'),
          kinh_nghiem_dat_homestay: path.resolve(__dirname, 'bai-viet/kinh-nghiem-dat-homestay-o-hue.html'),
          error_404: path.resolve(__dirname, '404.html'),
          // English (ENG) version files
          main_en: path.resolve(__dirname, 'en/index.html'),
          gioi_thieu_en: path.resolve(__dirname, 'en/gioi-thieu.html'),
          phong_en: path.resolve(__dirname, 'en/phong.html'),
          phong_doi_am_cung_en: path.resolve(__dirname, 'en/phong/phong-doi-am-cung.html'),
          phong_gia_dinh_en: path.resolve(__dirname, 'en/phong/phong-gia-dinh.html'),
          phong_nhom_ban_en: path.resolve(__dirname, 'en/phong/phong-nhom-ban.html'),
          cam_nang_hue_en: path.resolve(__dirname, 'en/cam-nang-hue.html'),
          dia_diem_du_lich_en: path.resolve(__dirname, 'en/bai-viet/dia-diem-du-lich-gan-fairys-house-hue.html'),
          an_gi_o_hue_en: path.resolve(__dirname, 'en/bai-viet/an-gi-o-hue.html'),
          kinh_nghiem_dat_homestay_en: path.resolve(__dirname, 'en/bai-viet/kinh-nghiem-dat-homestay-o-hue.html'),
          error_404_en: path.resolve(__dirname, 'en/404.html'),
        },
      },
    },
  };
});
