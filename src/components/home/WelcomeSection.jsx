export function WelcomeSection({ myData }) {
  const role = myData?.member?.role;
  const name = myData?.member?.name || "사용자";

  // 역할에 따른 환영 메시지 생성
  const welcomeMessage =
    role === "STUDENT"
      ? `안녕하세요! ${name}님! 👋`
      : `안녕하세요! ${name} 교수님! 👋`;

  // 역할에 따른 사용자 정보 조합
  const userInfoParts = [
    role === "STUDENT" && myData?.studentProfile?.major,
    role === "STUDENT" && `${myData?.studentProfile?.grade}학년`,
    myData?.studentProfile?.university || myData?.professorProfile?.university,
    role === "PROFESSOR" && myData?.professorProfile?.major,
  ].filter(Boolean);

  return (
    <section className="mb-6 rounded-xl bg-white p-6 shadow font-suit">
      <p className="text-lg font-semibold text-textMain">{welcomeMessage}</p>
      <p className="mt-1 text-sm text-textSub">{userInfoParts.join(" / ")}</p>
    </section>
  );
}
