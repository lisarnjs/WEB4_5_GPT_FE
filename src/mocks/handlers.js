// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // 로그인
  rest.post(
    "https://api.unihub.com/api/members/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();

      if (email === "student@unihub.com" && password === "1234") {
        return res(
          ctx.status(200),
          ctx.json({
            code: 200,
            message: "로그인 성공",
            data: {
              accessToken: "mock-access-token",
              refreshToken: "mock-refresh-token",
            },
          })
        );
      }

      return res(
        ctx.status(401),
        ctx.json({ message: "이메일 또는 비밀번호가 잘못되었습니다." })
      );
    }
  ),

  // 마이페이지 (학생용)
  rest.get(
    "https://api.unihub.com/api/members/12/students/me",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: "학생 내 정보 조회에 성공했습니다.",
          data: {
            id: 12,
            email: "student@unihub.com",
            name: "홍길동",
            role: "STUDENT",
            studentProfile: {
              studentId: "20231234",
              universityName: "Unihub대학교",
              majorName: "컴퓨터공학",
              grade: 2,
              semester: 1,
            },
          },
        })
      );
    }
  ),
];
