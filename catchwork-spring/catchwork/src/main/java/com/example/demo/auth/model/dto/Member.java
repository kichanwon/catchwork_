package com.example.demo.auth.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

	private String memNo;
	private String memId;
	private String memPw;
	private String memNickname;
	private String memName;
	private String memTel;
	private String memEmail;
	private Date memBirthday;
	private String memGender;
	private String memAddr;
	private Date memEnrollDate;
	private String memSmsFl;
	private Integer memType;
	private Integer memStatus;
	private Date memStatusDate;
	private String memProfilePath;
	private Date membershipUpdate;
	
	// 기업회원용
	private Integer corpNo;

	@Builder.Default
	private int memGrade = 0;
	
//	기업회원
	private String corpRegNo;      // 사업자번호
	private String corpMemDept;    // 부서명
}
