// import React from "react";

// const EnrollmentPeriodForm = ({
//   universities,
//   formData,
//   onSubmit,
//   onCancel,
//   onChange,
//   isSubmitting,
//   errorMessage,
//   isEditMode,
// }) => (
//   <div className="w-full md:w-2/5">
//     <div className="bg-white rounded-lg shadow p-6">
//       <h3 className="text-lg font-bold mb-4">
//         {isEditMode ? "수강신청기간 수정" : "신규 등록"}
//       </h3>
//       <form onSubmit={onSubmit} className="space-y-4">
//         {/* 학교 선택 */}
//         <div>
//           <label className="block text-sm font-medium mb-1">학교</label>
//           <select
//             name="universityId"
//             value={formData.universityId}
//             onChange={onChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">학교 선택</option>
//             {universities.map((uni) => (
//               <option key={uni.id} value={uni.id}>
//                 {uni.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* 학년도 입력 */}
//         <div>
//           <label className="block text-sm font-medium mb-1">학년도</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year}
//             onChange={onChange}
//             className="w-full p-2 border rounded"
//             placeholder="2024"
//             required
//           />
//         </div>

//         {/* 학년/학기 선택 */}
//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="block text-sm font-medium mb-1">학년</label>
//             <select
//               name="grade"
//               value={formData.grade}
//               onChange={onChange}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">학년 선택</option>
//               {[1, 2, 3, 4].map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}학년
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="w-1/2">
//             <label className="block text-sm font-medium mb-1">학기</label>
//             <select
//               name="semester"
//               value={formData.semester}
//               onChange={onChange}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">학기 선택</option>
//               {[1, 2].map((semester) => (
//                 <option key={semester} value={semester}>
//                   {semester}학기
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* 시작일/종료일 선택 */}
//         <div>
//           <label className="block text-sm font-medium mb-1">시작일</label>
//           <input
//             type="datetime-local"
//             name="startDate"
//             value={formData.startDate}
//             onChange={onChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">종료일</label>
//           <input
//             type="datetime-local"
//             name="endDate"
//             value={formData.endDate}
//             onChange={onChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* 에러 메시지 */}
//         {errorMessage && (
//           <div className="text-red-500 text-sm">{errorMessage}</div>
//         )}

//         {/* 액션 버튼 */}
//         <div className="pt-4 flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isSubmitting ? "처리 중..." : isEditMode ? "수정" : "등록"}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// export default EnrollmentPeriodForm;
import React from "react";

const EnrollmentPeriodForm = ({
  universities,
  formData,
  onSubmit,
  onCancel,
  onChange,
  isSubmitting,
  errorMessage,
  isEditMode,
}) => (
  <div className="w-full md:w-2/5">
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4">
        {isEditMode ? "수강신청기간 수정" : "신규 등록"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* 학교 선택 */}
        <div>
          <label className="block text-sm font-medium mb-1">학교</label>
          <select
            name="universityId"
            value={formData.universityId}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">학교 선택</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        {/* 학년도 입력 */}
        <div>
          <label className="block text-sm font-medium mb-1">학년도</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={onChange}
            className="w-full p-2 border rounded"
            placeholder="2024"
            required
          />
        </div>

        {/* 학년/학기 선택 */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">학년</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">학년 선택</option>
              {[1, 2, 3, 4].map((grade) => (
                <option key={grade} value={grade}>
                  {grade}학년
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">학기</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={onChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">학기 선택</option>
              {[1, 2].map((semester) => (
                <option key={semester} value={semester}>
                  {semester}학기
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 시작일/종료일 선택 */}
        <div>
          <label className="block text-sm font-medium mb-1">시작일</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">종료일</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        {/* 액션 버튼 */}
        <div className="pt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "처리 중..." : isEditMode ? "수정" : "등록"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default EnrollmentPeriodForm;
