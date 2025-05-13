export function WelcomeSection({ myData }) {
  const role = myData?.member?.role;
  const name = myData?.member?.name || "사용자";

  // 역할에 따른 환영 메시지 생성
  const welcomeMessage = {
    STUDENT: `안녕하세요! ${name}님! 👋`,
    PROFESSOR: `안녕하세요! ${name} 교수님! 👋`,
    ADMIN: `안녕하세요! 관리자님! 👋`,
  };

  // 역할에 따른 사용자 정보 조합
  const userInfoParts = [
    role === "STUDENT" && myData?.studentProfile?.major,
    role === "STUDENT" && `${myData?.studentProfile?.grade}학년`,
    myData?.studentProfile?.university || myData?.professorProfile?.university,
    role === "PROFESSOR" && myData?.professorProfile?.major,
  ].filter(Boolean);

  return (
    <section className="mb-6 rounded-xl bg-white p-6 shadow font-suit">
      <p className="text-xl font-semibold text-textMain">
        {welcomeMessage[role]}
      </p>
      <p className="mt-1 text-lg text-textSub">{userInfoParts.join(" / ")}</p>
    </section>
  );
}
