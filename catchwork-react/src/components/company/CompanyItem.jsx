import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosApi } from "../../api/axiosAPI";
import "./CompanyItem.css";
import defaultImg from "../../assets/icon.png";
import { useAuthStore } from "../../stores/authStore";
import { extractPixelColor } from "../../api/extractPixelColor";

const CompanyItem = ({ company: companyInfo }) => {
  const companyImgUrl = import.meta.env.VITE_FILE_COMPANY_IMG_URL;
  const { memNo } = useAuthStore();
  const [company, setCompany] = useState(companyInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [pixelColor, setPixelColor] = useState("transparent");
  // console.log("기업 정보 확인:", company);

  // 기업 로고 색상 추출
  useEffect(() => {
    if (company?.corpLogo) {
      const imageUrl = `${companyImgUrl}/${company.corpLogo}`;
      extractPixelColor(imageUrl, 1, 1)
        .then((color) => {
          setPixelColor(color.hex);
        })
        .catch((error) => {
          console.error("색상 추출 실패:", error);
          setPixelColor("transparent");
        });
    }
  }, [company?.corpLogo, companyImgUrl]);

  const handleToggleBookmark = async (e) => {
    e.preventDefault(); // 링크 이동 방지

    if (!memNo) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (isLoading) return; // 중복 클릭 방지
    try {
      setIsLoading(true); //  로딩 시작
      const res = await axiosApi.post("/company/toggle-favorite", {
        corpNo: company.corpNo,
        memNo: memNo,
      });

      const { isSaved, totalFav } = res.data;

      setCompany((prev) => ({
        ...prev,
        isSaved,
        favs: totalFav,
      }));
    } catch (err) {
      console.error("관심 기업 토글 실패:", err);
      alert("즐겨찾기 변경에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link to={`/company/${company.corpNo}`} className="company-item-link">
      <div className="company-item">
        {/* 로고 영역 */}
        <div className="company-item-logo-area">
          <div
            className="company-item-image-background"
            style={{
              backgroundColor: pixelColor, // 추출된 색상 사용
            }}
          />
          <img
            src={
              company.corpLogo
                ? `${companyImgUrl}/${company.corpLogo}`
                : defaultImg //기업 로고 없을때 넣을 이미지
            }
            alt="기업 로고"
            className="company-item-logo"
          />
        </div>

        {/* 회사명 */}
        <h3 className="company-name">{company.corpName}</h3>

        {/* 기업형태 + 모집중인 공고 */}
        <p className="company-info">
          {company.corpType} &nbsp;|&nbsp; 모집중인 채용공고{" "}
          {company.recruitCount}
        </p>

        {/* 메타 정보 */}
        <div className="company-meta">
          <div className="company-bookmark-area">
            <div className="bookmark" onClick={handleToggleBookmark}>
              <i
                className={
                  company.isSaved === 1
                    ? "fa-solid fa-bookmark"
                    : "fa-regular fa-bookmark"
                }
              ></i>{" "}
              {company.favs ?? 0}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyItem;
