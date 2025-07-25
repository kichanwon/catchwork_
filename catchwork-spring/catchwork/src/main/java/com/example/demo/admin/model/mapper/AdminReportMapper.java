package com.example.demo.admin.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.admin.model.dto.AdminReport;
import com.example.demo.admin.model.dto.ReportList;
import com.example.demo.admin.model.dto.ReportSearchCriteria;
import com.example.demo.admin.model.dto.ReportSummary;
import com.example.demo.admin.model.dto.TargetInfo;
import com.example.demo.report.model.dto.Report;

@Mapper
public interface AdminReportMapper {

	/** 신고 요약 정보 조회
	 * @author BAEBAE
	 * @param criteria
	 * @return
	 */
	ReportSummary getReportSummary(ReportSearchCriteria criteria);

	/** 신고 처리 상태 변경
	 * @author BAEBAE
	 * @param report
	 * @return
	 */
	int updateReportStatusToComplete(Report report);

	/** 그룹화 된 신고 목록 조회
	 * @author BAEBAE
	 * @param criteria
	 * @return
	 */
	int getGroupedReportTotalCount(ReportSearchCriteria criteria);

	/** 그룹화 된 신고 목록 조회
	 * @author BAEBAE
	 * @param criteria
	 * @return
	 */
	List<ReportList> getGroupedReportList(ReportSearchCriteria criteria);
	
    /** 특정 대상에 대한 모든 신고 내역 조회
     * @author BAEBAE
     * @param params
     * @return
     */
    List<AdminReport> getReportsByTarget(Map<String, Object> params);

    /** 신고 대상의 상세 정보 조회
     * @author BAEBAE
     * @param params
     * @return
     */
    TargetInfo getTargetInfo(Map<String, Object> params);

    /** 제재 기록 추가
     * @author BAEBAE
     * @param params
     * @return
     */
    int insertBan(Map<String, Object> params);

    /** 신고 대상의 상태 변경 (정지처리)
     * @author BAEBAE
     * @param params
     * @return
     */
    int updateTargetStatus(Map<String, Object> params);

}
