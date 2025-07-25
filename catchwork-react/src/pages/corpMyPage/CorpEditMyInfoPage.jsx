import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./CorpEditMyInfoPage.module.css"; // ✅ 모듈 CSS로 변경
import { axiosApi } from "../../api/axiosAPI";
import ConfirmPwModal from "../../components/myPage/ConfirmPwModal";
import useLoginMember from "../../stores/loginMember";

const CorpEditMyInfoPage = () => {
  const navigate = useNavigate();
  const { loginMember, corpInfo, setCorpInfo } = useOutletContext();
  const { setLoginMember } = useLoginMember();

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    loading: false,
  });

  const [formData, setFormData] = useState({
    memEmail: "",
    memTel: "",
    memName: "",
    corpMemDept: "",
  });

  useEffect(() => {
    setFormData({
      memEmail: loginMember?.memEmail || "",
      memTel: loginMember?.memTel || "",
      memName: loginMember?.memName || "",
      corpMemDept: corpInfo?.corpMemDept || "",
    });
  }, [loginMember, corpInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "memTel") {
      const onlyNums = value.replace(/\D/g, "");
      let formattedTel = "";

      if (onlyNums.length < 4) {
        formattedTel = onlyNums;
      } else if (onlyNums.length < 8) {
        formattedTel = onlyNums.slice(0, 3) + "-" + onlyNums.slice(3);
      } else {
        formattedTel =
          onlyNums.slice(0, 3) +
          "-" +
          onlyNums.slice(3, 7) +
          "-" +
          onlyNums.slice(7, 11);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formattedTel,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal("password");
  };

  const openModal = (type) => {
    setModalState({ isOpen: true, type, loading: false });
  };

  const closeModal = () => {
    if (!modalState.loading) {
      setModalState({ isOpen: false, type: null, loading: false });
    }
  };

  const verifyPassword = async (password) => {
    try {
      setModalState((prev) => ({ ...prev, loading: true }));
      const response = await axiosApi.post("/corp/verifyPassword", {
        memNo: loginMember.memNo,
        memPw: password,
      });
      return response.status === 200 ? response.data : false;
    } catch {
      return false;
    } finally {
      setModalState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handlePasswordConfirm = async (password) => {
    const isPasswordValid = await verifyPassword(password);
    if (isPasswordValid) {
      closeModal();
      await performSubmit();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const performSubmit = async () => {
    const requestData = {
      memNo: loginMember.memNo,
      memEmail: formData.memEmail,
      memTel: formData.memTel,
      memName: formData.memName,
      corpMemDept: formData.corpMemDept,
    };

    try {
      const resp = await axiosApi.post("/corp/updateMemberInfo", requestData);
      if (resp.status === 200) {
        const newInfo = await axiosApi.get("/corp/mypage");
        window.dispatchEvent(new Event("profileUpdated"));
        setCorpInfo(newInfo.data);
        await setLoginMember();
        navigate("/corpmypage");
      }
    } catch {
      alert("회원 정보 수정 중 오류 발생");
    }
  };

  if (!loginMember) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.editMyInfoContainer}>
      <form onSubmit={handleSubmit} className={styles.editMyInfoForm}>
        <div className={styles.infoCard}>
          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>기업명</span>
            <span className={styles.infoValue}>
              {corpInfo?.corpName || "기업명 없음"}
            </span>
          </div>

          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>아이디</span>
            <span className={styles.infoValue}>{loginMember.memId}</span>
          </div>

          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>이메일</span>
            <div className={styles.inputWrapper}>
              <input
                name="memEmail"
                value={formData.memEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>전화번호</span>
            <div className={styles.inputWrapper}>
              <input
                name="memTel"
                value={formData.memTel}
                onChange={handleInputChange}
                required
                placeholder="010-1234-5678"
                maxLength={13}
              />
            </div>
          </div>

          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>이름</span>
            <div className={styles.inputWrapper}>
              <input
                name="memName"
                value={formData.memName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.infoContent}>
            <span className={styles.infoLabel}>부서명</span>
            <div className={styles.inputWrapper}>
              <input
                name="corpMemDept"
                value={formData.corpMemDept}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.submitButtonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={
              !formData.memEmail ||
              !formData.memTel ||
              !formData.memName ||
              !formData.corpMemDept
            }
          >
            수정하기
          </button>
        </div>

        <ConfirmPwModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onConfirm={handlePasswordConfirm}
          loading={modalState.loading}
        />
      </form>
    </div>
  );
};

export default CorpEditMyInfoPage;
