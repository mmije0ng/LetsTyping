import React from "react";
import styled from "styled-components";

const ListItemComponent = ({ item, isSelected, onSelect }) => {
    return (
        <StyledListItem
            isSelected={isSelected}
            onClick={() => onSelect(item)} // 클릭 시 해당 아이템 선택
        >
            <h3>{item.title}</h3>
            <p>{item.content}</p>
        </StyledListItem>
    );
};

const StyledListItem = styled.div`
    background-color: ${({ isSelected }) => (isSelected ? "#CED8F6" : "#f5f5f5")};
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
    height: 203.01px; /* 고정된 높이 */
    overflow: hidden; /* 넘치는 내용을 숨김 */

    h3 {
        margin: 0;
        font-size: 18px;
        white-space: nowrap; /* 한 줄로 제한 */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #555;
        overflow: hidden; /* 넘치는 내용을 숨김 */
        text-overflow: ellipsis;
        display: -webkit-box; /* flexbox 기반으로 처리 */
        -webkit-line-clamp: 3; /* 3줄까지만 표시 */
        -webkit-box-orient: vertical; /* 텍스트 방향 */
    }
`;

export default ListItemComponent;