// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. 활동/출석 관련 API (예: /api/user-info/attendance)는 9005 포트로 프록시
      "/api/user-info/attendance": {
        target: "http://138.2.124.21:9005", // ✅ 활동 API 서버 (9005 포트)
        changeOrigin: true,
        secure: false,
        // 이 경로에 대해서는 /api/user-info/attendance 를 유지해야 하므로 rewrite는 보통 불필요
      },
      // 2. 그 외 /api/user-info/ 관련 API (예: 프로필, 친구)는 9007 포트로 프록시
      //    주의: 위 '/api/user-info/attendance' 규칙이 먼저 매치되므로,
      //    이 규칙은 그 외의 /api/user-info/ 하위 경로에 적용됩니다.
      "/api/user-info": {
        target: "http://138.2.124.21:9007", // ✅ 사용자 정보, 친구 API 서버 (9007 포트)
        changeOrigin: true,
        secure: false,
      },
      // 3. 만약 /v1/auth/refresh 와 같이 완전히 다른 경로 패턴의 API가 있다면
      //    그것도 별도의 프록시 규칙으로 추가해야 할 수 있습니다 (예: 9007 포트 사용).
      "/v1/auth": {
        // 예시: 토큰 재발급 API가 9007 포트를 사용한다면
        target: "http://138.2.124.21:9007",
        changeOrigin: true,
        secure: false,
      },
      // 다른 /api 경로 패턴이 있다면 여기에 추가
      "/api": {
        target: "http://138.2.124.21:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
