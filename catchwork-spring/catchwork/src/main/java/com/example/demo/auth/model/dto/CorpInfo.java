package com.example.demo.auth.model.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CorpInfo {
    private String corpRegNo;
    private String corpCEOName;
    private LocalDate corpOpenDate;
    private String corpName;
    private String corpType;
    private String corpAddr;
    private String detailAddress;
    private String corpHomeLink;
    private String corpBM;
    private String corpDetail;
    private String corpBenefit;
    private String corpBenefitDetail;
    private String corpLogo; //MultipartFile로 분리 필요
    private Integer corpStatus;
    private LocalDate corpStatusDate;
}
