import React from "react";
import styles from "./BanTable.module.css";
import { truncateText } from './../../../hooks/admin/mainUtils';

const BanTableRow = ({ banItem, onRelease, onRowClick }) => {
  const handleClickRow = () => {
    onRowClick(banItem.banNo);
  };

  const handleRelease = (e) => {
    e.stopPropagation();
    onRelease(banItem.banNo, banItem.banTargetNo, banItem.banTargetType);
  };

  return (
    <tr onClick={handleClickRow}>
      <td>{banItem.banNo}</td>
      <td>{banItem.banTargetType}</td>
      <td>{truncateText(banItem.target, 30)}</td>
      <td>
        <button className={styles.releaseButton} onClick={handleRelease}>
          해제
        </button>
      </td>
    </tr>
  );
};

export default BanTableRow;
